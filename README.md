# actproofs-issuer

Commercial issuer implementation for **ActSpec v0.1** — Blind Authorization Proofs.

This repository provides a **minimal issuing service** for ActProofs:
it receives a canonical authorization hash and returns a signed ActProof.

---

## What This Repository Is

This repository is:

- An **ActProof issuer**
- A **signing service** bound to an authorization policy
- A **commercial component** (issuance may be billed)
- A **stateless service** (no proof storage required)

It exists to answer one question:

> “Can this authorization hash be signed under this policy?”

---

## What This Repository Is NOT

This repository is NOT:

- A verifier
- A validator
- A compliance checker
- A reference implementation of the standard
- A substitute for ActSpec or actproofs-api

Verification is intentionally out of scope.
