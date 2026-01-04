// src/verify.ts
import * as ed from '@noble/ed25519';
import canonicalize from 'canonicalize';

/**
 * ActProof structure as defined by ActSpec v0.1
 */
export interface ActProof {
  spec: string;
  id: string;
  issued_at: string;
  manifest_hash: string;
  issuer: {
    id: string;
  };
  signature: {
    alg: string;
    value: string;
  };
}

/**
 * Verify an ActProof offline according to ActSpec v0.1.
 *
 * Normative rules enforced:
 * - Spec version lock
 * - Structural validation
 * - Algorithm enforcement (Ed25519 only)
 * - RFC 8785 canonicalization
 * - Full payload signature verification
 *
 * @param proof Full ActProof object (payload + signature)
 * @param publicKeyHex Issuer public key (hex-encoded Ed25519)
 * @returns true if valid and compliant, false otherwise
 */
export async function verifyActProof(
  proof: ActProof,
  publicKeyHex: string
): Promise<boolean> {
  try {
    // 1. SPEC VERSION LOCK (Downgrade protection)
    if (proof.spec !== 'actspec-v0.1') {
      return false;
    }

    // 2. STRUCTURAL VALIDATION (Fail fast)
    if (
      !proof.id ||
      !proof.issued_at ||
      !proof.manifest_hash ||
      !proof.issuer ||
      !proof.issuer.id ||
      !proof.signature ||
      !proof.signature.value ||
      !proof.signature.alg
    ) {
      return false;
    }

    // 3. ALGORITHM ENFORCEMENT
    if (proof.signature.alg !== 'Ed25519') {
      return false;
    }

    // 4. SEPARATE PAYLOAD FROM SIGNATURE
    const { signature, ...payload } = proof;

    // 5. RFC 8785 CANONICALIZATION (MANDATORY)
    const canonicalPayload = canonicalize(payload);
    if (!canonicalPayload) {
      return false;
    }

    // 6. CRYPTOGRAPHIC VERIFICATION (Ed25519)
    const messageBytes = new TextEncoder().encode(canonicalPayload);
    const signatureBytes = ed.etc.hexToBytes(signature.value);
    const publicKeyBytes = ed.etc.hexToBytes(publicKeyHex);

    return await ed.verify(signatureBytes, messageBytes, publicKeyBytes);
  } catch {
    // Fail-safe: any error invalidates the proof
    return false;
  }
  }
