/**
 * actproofs-issuer
 *
 * Reference issuer implementation for ActSpec v0.1.
 *
 * This module exposes:
 * - the normative ActSpec types
 * - the minimal issuing function
 *
 * Nothing more.
 */

export type { IssueRequest, ActProof } from './types';
export { issueActProof } from './issueProof';
