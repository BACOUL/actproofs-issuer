/**
 * actproofs-issuer — minimal issuing logic
 *
 * Responsibility:
 * - Receive a canonical authorization hash
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

export type IssueRequest = {
  actspec: '0.1';
  manifest_hash: string; // hex or base64, already canonicalized + hashed
  issuer: string;        // issuer identifier (DNS / DID / URI)
};

export type ActProof = {
  actspec: '0.1';
  proof_id: string;
  issued_at: string; // ISO 8601 UTC
  issuer: string;
  manifest_hash: string;
  signature: string; // base64
};

/**
 * Issue an ActProof.
 *
 * @param req - canonical authorization hash + metadata
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

  const payload = {
    actspec: '0.1',
    issuer: req.issuer,
    manifest_hash: req.manifest_hash,
    issued_at: new Date().toISOString()
  };

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const signatureBytes = await sign(payloadBytes, privateKey);

  return {
    actspec: '0.1',
    proof_id: randomUUID(),
    issued_at: payload.issued_at,
    issuer: req.issuer,
    manifest_hash: req.manifest_hash,
    signature: Buffer.from(signatureBytes).toString('base64')
  };
}
