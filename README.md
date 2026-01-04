# actproofs-issuer

Reference implementation of **ActSpec v0.1** — Authorization Receipt Issuer.

This repository provides a **minimal, auditable, and normative reference implementation**
for issuing **ActProofs**, as defined by the ActSpec v0.1 standard.

It is intentionally simple.

---

## Purpose

This repository exists to answer one precise question:

> **“Does this authorization receipt comply with ActSpec v0.1 — yes or no?”**

It defines the **reference behavior** of an ActProofs issuer.

---

## What This Repository Is

This repository is:

- A **reference issuer** for ActSpec v0.1
- A **normative baseline** for compliant implementations
- A **cryptographic signing component**
- A **compliance and audit anchor**

It is designed to be:

- Minimal
- Deterministic
- Auditable
- Stateless by default

---

## What This Repository Is NOT

This repository is **not**:

- ❌ An execution engine  
- ❌ An identity provider (IAM / IdP)  
- ❌ A workflow orchestrator  
- ❌ A logging system  
- ❌ A certification authority  
- ❌ A legal authority  

---

## Fundamental Distinctions (Critical)

### Authorization ≠ Execution

ActProofs certifies that an **authorization intent** was cryptographically signed.

It does **not** guarantee that:
- the action was executed,
- the action succeeded,
- the action was enforced.

Execution remains the responsibility of external systems.

---

### Identity ≠ Key Ownership

ActProofs proves that:

> **A specific cryptographic key authorized an action.**

It does **not** prove:
- biometric identity,
- physical human presence,
- real-world intent beyond key control.

Any identity binding is **out of scope** and handled upstream.

---

## What the Issuer Does

A compliant ActProofs issuer:

1. Receives a **canonical authorization manifest**
2. Verifies structural compliance with ActSpec
3. Signs the manifest hash using a controlled private key
4. Returns a **portable authorization receipt** (`.actproof.json`)
5. Does not retain state by default

That is all.

---

## What the Issuer Does Not Do

The issuer does **not**:

- Execute actions
- Enforce policies
- Store authorization history (unless explicitly extended)
- Validate real-world identity
- Interpret legal meaning
- Act as a trusted third party beyond cryptography

---

## Regulatory Positioning

ActProofs addresses **technical proof requirements**, not legal adjudication.

| Regulatory Requirement                    | Covered |
|-------------------------------------------|---------|
| Proof of explicit authorization            | ✅ |
| Cryptographic non-repudiation               | ✅ |
| Independent auditability                    | ✅ |
| Deterministic verification                 | ✅ |
| Identity verification (human / biometric)  | ❌ |
| Action enforcement                          | ❌ |
| Legal certification / accreditation        | ❌ |

ActProofs provides **evidence**, not legal judgment.

---

## Economic Model

- **Verification is always free**
- **Issuance may be monetized**
- Payment applies to the **cryptographic signing service**
- Proof files are **portable and vendor-independent**

There is no lock-in:  
any compliant verifier can validate an ActProof.

---

## Relationship to Other Repositories

ActSpec └─ defines the standard (what is valid)
ActProofs-API └─ verifies proofs (free, open, stateless)
ActProofs-Issuer └─ signs authorization receipts (reference, monetizable)

Each repository has **one responsibility**.

---

## Status

- Specification: **ActSpec v0.1**
- Issuer: **Reference implementation**
- Maturity: **Audit-ready**
- Scope: **Authorization receipts only**

---

## License

This repository is released under the Apache 2.0 license.

---

## Final Note

If you are looking for:
- execution guarantees → this is not it  
- identity validation → this is not it  
- legal certification → this is not it  

If you need:
- cryptographic proof that an authorization occurred  
- independently verifiable evidence  
- a clean compliance building block  

Then this repository is exactly that.
