export type Severity = "critical" | "high" | "medium" | "low"

export interface Vulnerability {
  id: string
  name: string
  category: string
  severity: Severity
  cwe: string
  description: string
  impact: string
  detection: string
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "vuln-otp-bypass",
    name: "Improper OTP Authentication Enforcement",
    category: "Authentication / MFA",
    severity: "critical",
    cwe: "CWE-287: Improper Authentication",
    description:
      "The OTP verification step is enforced only on the client side and is not cryptographically bound to the authenticated session on the server. A client that skips the request, or replays a prior response, can reach an authenticated state without ever supplying a valid one-time code.",
    impact:
      "An attacker who can manipulate client-side requests can gain access to an authenticated session without possessing the second factor, fully defeating the purpose of MFA.",
    detection:
      "Static review of the OTP verification handler plus dynamic testing: replaying/omitting the OTP request while observing that session state still transitions to 'authenticated'.",
  },
  {
    id: "vuln-rate-limit",
    name: "Missing OTP Attempt Rate Limiting",
    category: "Authentication / Brute Force",
    severity: "high",
    cwe: "CWE-307: Improper Restriction of Excessive Authentication Attempts",
    description:
      "The OTP validation endpoint does not throttle or lock out repeated incorrect submissions, allowing unlimited guesses against a 6-digit code space.",
    impact:
      "A 6-digit OTP has only 1,000,000 possible values. Without throttling, automated brute-forcing can exhaust the keyspace in a practical timeframe.",
    detection:
      "Send repeated invalid OTP submissions for the same session and confirm no lockout, delay, or CAPTCHA is triggered after N attempts.",
  },
  {
    id: "vuln-session-binding",
    name: "OTP Not Cryptographically Bound to Session",
    category: "Session Management",
    severity: "high",
    cwe: "CWE-384: Session Fixation",
    description:
      "The generated OTP is not tied to a specific session identifier or transaction, so a code issued in one context can be replayed in another.",
    impact:
      "Enables session fixation and replay-style attacks where a valid OTP is reused outside of its intended session context.",
    detection:
      "Trace the OTP generation and validation code paths to confirm whether the session ID is included in the OTP's binding/lookup key.",
  },
  {
    id: "vuln-secret-exposure",
    name: "TOTP Secret Exposed to Client",
    category: "Sensitive Data Exposure",
    severity: "medium",
    cwe: "CWE-200: Exposure of Sensitive Information",
    description:
      "The shared TOTP secret is transmitted to or rendered within client-reachable responses during setup, rather than being kept strictly server-side after enrollment.",
    impact:
      "If intercepted, the secret allows an attacker to generate valid codes indefinitely, independent of any future password change.",
    detection:
      "Inspect network responses during enrollment for the raw secret or QR payload persisting in client storage/logs.",
  },
  {
    id: "vuln-no-audit-log",
    name: "Insufficient Authentication Audit Logging",
    category: "Logging & Monitoring",
    severity: "low",
    cwe: "CWE-778: Insufficient Logging",
    description:
      "Failed and successful OTP verification attempts are not consistently logged with timestamp, source, and outcome.",
    impact:
      "Delays detection of brute-force or bypass attempts and hampers incident response and forensic review.",
    detection:
      "Review application logs for OTP validation events; confirm absence of structured, queryable audit trail entries.",
  },
]

export const featuredVulnerability = vulnerabilities[0]

export interface ScoreCategory {
  label: string
  weight: number
  score: number
}

export const scoreCategories: ScoreCategory[] = [
  { label: "Authentication", weight: 40, score: 35 },
  { label: "OTP Enforcement", weight: 20, score: 10 },
  { label: "Session Security", weight: 15, score: 40 },
  { label: "Rate Limiting", weight: 10, score: 0 },
  { label: "Logging", weight: 10, score: 20 },
  { label: "Transport Security", weight: 5, score: 60 },
]

export const overallScore = 42
export const remediatedScore = 91

export interface RemediationItem {
  id: string
  label: string
  detail: string
  done: boolean
}

export const remediationItems: RemediationItem[] = [
  { id: "r1", label: "Enforce OTP validation server-side", detail: "Never trust a client-reported OTP result; validate the code against the server-held secret before elevating session state.", done: false },
  { id: "r2", label: "Bind OTP to session and transaction", detail: "Key OTP generation/lookup by session ID so a code cannot be replayed in a different context.", done: false },
  { id: "r3", label: "Regenerate session ID after each auth stage", detail: "Issue a new session identifier after password success and again after OTP success to prevent fixation.", done: false },
  { id: "r4", label: "Expire OTPs on a short TTL", detail: "Invalidate codes after 30–60 seconds and on first successful use.", done: false },
  { id: "r5", label: "Limit verification attempts", detail: "Lock out or exponentially back off after a small number of consecutive invalid OTP submissions.", done: false },
  { id: "r6", label: "Rate limit at the network layer", detail: "Apply IP- and account-based throttling in front of the authentication endpoints.", done: false },
  { id: "r7", label: "Log all authentication events", detail: "Record every OTP attempt (success/failure), source IP, and timestamp to a queryable audit log.", done: false },
  { id: "r8", label: "Invalidate sessions on logout and password change", detail: "Ensure server-side session revocation, not just client-side cookie clearing.", done: false },
  { id: "r9", label: "Use secure, HttpOnly, SameSite cookies", detail: "Prevent session token theft via XSS or cross-site request flows.", done: false },
  { id: "r10", label: "Never expose secrets to the client", detail: "Keep TOTP shared secrets server-side only after initial enrollment.", done: false },
  { id: "r11", label: "Enforce HTTPS everywhere", detail: "Reject plaintext HTTP for any authentication-related traffic.", done: false },
  { id: "r12", label: "Provide secure MFA recovery", detail: "Offer backup codes or verified out-of-band recovery instead of silently disabling MFA.", done: false },
]

export const secureConfigChecklist = [
  "Password verification",
  "OTP required",
  "Server-side OTP validation",
  "Rate limiting",
  "Session regeneration",
  "Audit logging",
  "Secure cookies",
]

export interface AttackStep {
  id: string
  title: string
  description: string
  request: string
  response: string
  status: number
  timingMs: number
}

export const attackSteps: AttackStep[] = [
  {
    id: "step-1",
    title: "Authentication Request",
    description: "Client submits username and password to the authentication endpoint.",
    request: "POST /validate_login.php\n{ username, password }",
    response: "200 OK — credentials accepted, OTP challenge issued",
    status: 200,
    timingMs: 118,
  },
  {
    id: "step-2",
    title: "OTP Verification",
    description: "Client is expected to submit a 6-digit OTP; verification flow is observed for enforcement gaps.",
    request: "POST /validate_login.php\n{ otp: <client-controlled> }",
    response: "200 OK — session marked authenticated regardless of OTP outcome",
    status: 200,
    timingMs: 94,
  },
  {
    id: "step-3",
    title: "Security Control Analysis",
    description: "Automated analysis inspects session state transitions and server-side enforcement points.",
    request: "Static + dynamic analysis of session middleware",
    response: "No server-side re-validation of OTP result detected",
    status: 200,
    timingMs: 226,
  },
  {
    id: "step-4",
    title: "Vulnerability Detected",
    description: "Analysis engine flags the authentication bypass condition.",
    request: "Correlate session flag with OTP verification result",
    response: "FINDING: CWE-287 Improper Authentication (Critical)",
    status: 409,
    timingMs: 61,
  },
  {
    id: "step-5",
    title: "Risk Assessment",
    description: "Finding is scored and added to the vulnerability report.",
    request: "Risk scoring engine",
    response: "Risk: Critical — remediation required before production use",
    status: 200,
    timingMs: 47,
  },
]

export interface ArchitectureNode {
  id: string
  label: string
  weak?: string
  secure?: string
}

export const architectureFlow: ArchitectureNode[] = [
  { id: "a1", label: "User", weak: "No client trust boundary assumed", secure: "No client trust boundary assumed" },
  { id: "a2", label: "Login Interface", weak: "OTP fields client-validated only", secure: "Client validation is UX-only, never trusted" },
  { id: "a3", label: "Authentication Layer", weak: "Session flag set before OTP check", secure: "Session flag gated strictly on server OTP result" },
  { id: "a4", label: "Password Verification", weak: "No attempt throttling", secure: "Throttled + audited" },
  { id: "a5", label: "OTP Verification", weak: "Result not re-checked server-side", secure: "Server re-validates against TOTP secret + TTL" },
  { id: "a6", label: "Session Management", weak: "No regeneration, fixation possible", secure: "Regenerated per auth stage, bound to OTP" },
  { id: "a7", label: "Security Analysis Engine", weak: "N/A in vulnerable build", secure: "Continuous anomaly + audit monitoring" },
  { id: "a8", label: "Security Report", weak: "N/A in vulnerable build", secure: "Findings tracked to remediation" },
]

export const reportMeta = {
  project: "OTPShield Lab",
  target: "Authorized Local Vulnerable OTP Application",
  finding: featuredVulnerability.name,
  severity: featuredVulnerability.severity,
  risk: "Critical",
  evidence:
    "Session state transitions to 'authenticated' following OTP submission regardless of whether the submitted code matches the server-held TOTP secret.",
  recommendation:
    "Move OTP validation entirely server-side, bind results to the active session, add attempt throttling, and log all verification events.",
}
