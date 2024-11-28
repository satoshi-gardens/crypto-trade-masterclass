export interface ReferralConversionsTable {
  Row: {
    id: number;
    referral_code: string;
    course_application_id: number | null;
    commission_amount: number;
    paid: boolean | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: number;
    referral_code: string;
    course_application_id?: number | null;
    commission_amount: number;
    paid?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: number;
    referral_code?: string;
    course_application_id?: number | null;
    commission_amount?: number;
    paid?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Relationships: [
    {
      foreignKeyName: "referral_conversions_referral_code_fkey";
      columns: ["referral_code"];
      isOneToOne: false;
      referencedRelation: "referrers";
      referencedColumns: ["referral_code"];
    },
    {
      foreignKeyName: "referral_conversions_course_application_id_fkey";
      columns: ["course_application_id"];
      isOneToOne: false;
      referencedRelation: "course_applications";
      referencedColumns: ["id"];
    }
  ];
}