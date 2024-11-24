export interface CoursesTable {
  Row: {
    id: number;
    title: string;
    description: string;
    outcome: string;
    complexity: string;
    internal_id: string;
    is_extra: boolean | null;
  };
  Insert: {
    id?: number;
    title: string;
    description: string;
    outcome: string;
    complexity: string;
    internal_id: string;
    is_extra?: boolean | null;
  };
  Update: {
    id?: number;
    title?: string;
    description?: string;
    outcome?: string;
    complexity?: string;
    internal_id?: string;
    is_extra?: boolean | null;
  };
  Relationships: [];
}