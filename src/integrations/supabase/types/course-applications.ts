export interface CourseApplicationsTable {
  Row: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    city: string | null;
    country: string | null;
    selected_course: string;
    package: string;
    price: number;
    payment_understanding: boolean | null;
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
    selected_course: string;
    package: string;
    price: number;
    payment_understanding?: boolean | null;
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
    selected_course?: string;
    package?: string;
    price?: number;
    payment_understanding?: boolean | null;
    submitted_at?: string | null;
  };
  Relationships: [];
}