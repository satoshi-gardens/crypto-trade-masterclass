export interface GeneralInquiriesTable {
  Row: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    city: string | null;
    country: string | null;
    contact_purpose: string;
    message: string;
    submitted_at: string | null;
  };
  Insert: {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    city?: string | null;
    country?: string | null;
    contact_purpose: string;
    message: string;
    submitted_at?: string | null;
  };
  Update: {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string | null;
    city?: string | null;
    country?: string | null;
    contact_purpose?: string;
    message?: string;
    submitted_at?: string | null;
  };
  Relationships: [];
}