export interface ReferralClicksTable {
  Row: {
    id: number;
    referral_code: string;
    ip_address: string | null;
    page_url: string | null;
    created_at: string | null;
    converted: boolean | null;
  };
  Insert: {
    id?: number;
    referral_code: string;
    ip_address?: string | null;
    page_url?: string | null;
    created_at?: string | null;
    converted?: boolean | null;
  };
  Update: {
    id?: number;
    referral_code?: string;
    ip_address?: string | null;
    page_url?: string | null;
    created_at?: string | null;
    converted?: boolean | null;
  };
  Relationships: [
    {
      foreignKeyName: "referral_clicks_referral_code_fkey";
      columns: ["referral_code"];
      isOneToOne: false;
      referencedRelation: "referrers";
      referencedColumns: ["referral_code"];
    }
  ];
}