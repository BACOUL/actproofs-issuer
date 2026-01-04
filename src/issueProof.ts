/**
 * actproofs-issuer — reference issuing logic (ActSpec v0.1)
 *
 * Responsibility:
 * - Receive a canonical authorization hash
 * - Build a normative ActSpec payload
 * - Canonicalize it (RFC 8785 / JCS)
 * - Sign it with the issuer private key (Ed25519)
 * - Return a portable ActProof object
 *
 * This module:
 * - DOES NOT verify proofs
 * - DOES NOT store proofs
 * - DOES NOT interpret authorization semantics
 */

import { sign } from '@noble/ed25519';
import { randomUUID } from 'crypto';
import canonicalize from 'canonicalize';

/* ============================
   Normative Types (ActSpec v0.1)
   ============================ */

export type IssueRequest = {
  actspec: '0.1';
  manifest_hash: string; // canonicalized + hashed upstream
  issuer: string;        // issuer identifier (DNS / DID / URI)
};

export type ActProofPayload = {
  actspec: '0.1';
  issuer: string;
  manifest_hash: string;
  issued_at: string; // ISO 8601 UTC
};

export type ActProof = {
  actspec: '0.1';
  proof_id: string;
  payload: ActProofPayload;
  signature: string; // base64 (Ed25519)
};

/* ============================
   Issuance Logic
   ============================ */

/**
 * Issue an ActProof compliant with ActSpec v0.1.
 *
 * @param req - issuance request (already canonicalized + hashed upstream)
 * @param privateKey - Ed25519 private key (Uint8Array)
 */
export async function issueActProof(
  req: IssueRequest,
  privateKey: Uint8Array
): Promise<ActProof> {

  if (req.actspec !== '0.1') {
    throw new Error('Unsupported ActSpec version');
  }

  if (!req.manifest_hash) {
    throw new Error('Missing manifest_hash');
  }

  if (!req.issuer) {
    throw new Error('Missing issuer');
  }

  /* ----------------------------
     Build normative payload
     ---------------------------- */

  const payload: ActProofPayload = {
    actspec: '0.1',
    issuer: req.issuer,
    manifest_hash: req.manifest_hash,
    issued_at: new Date().toISOString()
  };

  /* ----------------------------
     Canonicalize (RFC 8785)
     ---------------------------- */

  const canonicalPayload = canonicalize(payload);
  if (!canonicalPayload) {
    throw new Error('Failed to canonicalize payload');
  }

  const payloadBytes = new TextEncoder().encode(canonicalPayload);

  /* ----------------------------
     Sign canonical payload
     ---------------------------- */

  const signatureBytes = await sign(payloadBytes, privateKey);

  /* ----------------------------
     Return portable ActProof
     ---------------------------- */

  return {
    actspec: '0.1',
    proof_id: randomUUID(),
    payload,
    signature: Buffer.from(signatureBytes).toString('base64')
  };
}
