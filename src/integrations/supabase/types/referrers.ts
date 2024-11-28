export interface ReferrersTable {
  Row: {
    id: number;
    user_email: string;
    referral_code: string;
    created_at: string | null;
    updated_at: string | null;
    is_active: boolean | null;
    total_earnings: number | null;
  };
  Insert: {
    id?: number;
    user_email: string;
    referral_code: string;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
    total_earnings?: number | null;
  };
  Update: {
    id?: number;
    user_email?: string;
    referral_code?: string;
    created_at?: string | null;
    updated_at?: string | null;
    is_active?: boolean | null;
    total_earnings?: number | null;
  };
  Relationships: [];
}