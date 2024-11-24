export interface CountriesTable {
  Row: {
    id: number;
    code: string;
    name: string;
    priority: number | null;
    is_active: boolean | null;
    region: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: number;
    code: string;
    name: string;
    priority?: number | null;
    is_active?: boolean | null;
    region?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: number;
    code?: string;
    name?: string;
    priority?: number | null;
    is_active?: boolean | null;
    region?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Relationships: [];
}