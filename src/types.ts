/**
 * ActSpec v0.1 — Types
 *
 * Normative type definitions for ActProof issuance.
 * These types define the exact input/output contract
 * of a compliant ActProof issuer.
 */

export type IssueRequest = {
  actspec: '0.1';
  manifest_hash: string; // canonicalized hash (hex or base64)
  issuer: string;        // issuer identifier (DNS, URI, DID, etc.)
};

export type ActProof = {
  actspec: '0.1';
  proof_id: string;
  issued_at: string;     // ISO 8601 UTC timestamp
  issuer: string;
  manifest_hash: string;
  signature: string;     // base64 Ed25519 signature
};
