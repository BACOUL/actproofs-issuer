# actproofs-issuer

Reference implementation of **ActSpec v0.1** — Blind Authorization Proofs.

This repository provides a **minimal, auditable, and normative reference implementation** for issuing and verifying **ActProofs**, as defined by the ActSpec v0.1 standard.

It is intentionally simple.

---

## What This Repository Is

This repository is:

- A **reference issuer** for ActSpec v0.1
- A **reference verifier** for ActSpec v0.1
- A **compliance baseline** for third-party implementations
- A **technical companion** to the ActSpec specification

It exists to answer one question:

> “Does this proof comply with ActSpec v0.1 — yes or no?”

---

## What This Repository Is NOT

This repository is **not**:

- A production SaaS
- A full IAM / RBAC / policy engine
- A workflow orchestrator
- A UI or website
- A legal service
- A blockchain system

There is **no frontend**, **no dashboard**, **no user management**, and **no identity logic**.

---

## Related Repositories

- **ActSpec (the standard):**  
  https://github.com/BACOUL/actspec

This repository implements the rules defined in `SPEC.md` of the ActSpec repo.  
If the spec changes, this implementation must change accordingly.

---

## Core Concepts (Short)

- An **ActProof** is a cryptographic receipt.
- It proves that an **authorization decision existed**.
- It does **not** prove execution.
- It does **not** validate correctness.
- It does **not** identify a human actor.

The issuer acts as a **blind notary**:
- It signs a hash.
- It never sees the underlying data.

---

## Repository Scope

This repository covers:

- Blind issuance of ActProofs (hash-only input)
- Offline verification of ActProofs
- Canonicalization enforcement (RFC 8785)
- Cryptographic signature verification (Ed25519)
- Compliance testing using official test vectors

---

## Expected Repository Structure

actproofs-issuer/ ├─ README.md ├─ LICENSE ├─ package.json ├─ src/ │  ├─ issuer/ │  │  └─ issueReceipt.ts │  ├─ verify/ │  │  └─ verifyActProof.ts │  └─ index.ts ├─ fixtures/ │  └─ actspec-v0.1.test-vectors.json ├─ tests/ │  └─ compliance.test.ts

Files may be minimal, but the structure is intentional and normative.

---

## Compliance Philosophy

An implementation is considered **ActSpec v0.1 compliant** if:

- It passes **all official test vectors**
- It enforces **spec version locking**
- It enforces **canonicalization (RFC 8785)**
- It rejects tampered payloads
- It rejects invalid signatures
- It does not rely on non-canonical JSON behavior

If your implementation passes the tests in this repository, it is compliant.

---

## Security Model (Summary)

- **Signature Algorithm:** Ed25519
- **Hash Algorithm:** SHA-256
- **Canonicalization:** RFC 8785 (JCS)
- **Verification:** Fully offline
- **Revocation:** Operational (not cryptographic)

Cryptographic validity and operational trust are **intentionally separated**.

---

## License

Apache License 2.0  
See `LICENSE` for details.

---

## Final Note

This repository is deliberately boring.

That is a feature.

If you are looking for marketing, demos, or UI — this is not the place.  
If you are looking for **clarity, determinism, and auditability** — you are in the right repository.
