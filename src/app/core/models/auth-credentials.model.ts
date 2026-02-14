export type AuthMethod = 'password' | 'fingerprint' | 'face';

export interface AuthCredential {
  id: string;
  user_id: string;
  method: AuthMethod;
  password_hash?: string | null;
  biometric_data?: string | null;
  is_primary: boolean;
  last_used_at?: string | null;
  created_at: string;
}
