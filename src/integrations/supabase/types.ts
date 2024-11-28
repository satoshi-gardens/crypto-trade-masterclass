export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          code: string
          created_at: string | null
          id: number
          is_active: boolean | null
          name: string
          priority: number | null
          region: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          priority?: number | null
          region?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          priority?: number | null
          region?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      course_applications: {
        Row: {
          city: string | null
          country: string | null
          email: string
          first_name: string
          id: number
          installment_status: Json | null
          last_name: string
          package: string
          payment_type: string | null
          payment_understanding: boolean | null
          phone: string | null
          price: number
          referral_code: string | null
          selected_course: string
          submitted_at: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          email: string
          first_name: string
          id?: number
          installment_status?: Json | null
          last_name: string
          package: string
          payment_type?: string | null
          payment_understanding?: boolean | null
          phone?: string | null
          price: number
          referral_code?: string | null
          selected_course: string
          submitted_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          email?: string
          first_name?: string
          id?: number
          installment_status?: Json | null
          last_name?: string
          package?: string
          payment_type?: string | null
          payment_understanding?: boolean | null
          phone?: string | null
          price?: number
          referral_code?: string | null
          selected_course?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_applications_referral_code_fkey"
            columns: ["referral_code"]
            isOneToOne: false
            referencedRelation: "referrers"
            referencedColumns: ["referral_code"]
          },
        ]
      }
      courses: {
        Row: {
          complexity: string
          description: string
          id: number
          internal_id: string
          is_extra: boolean | null
          outcome: string
          title: string
        }
        Insert: {
          complexity: string
          description: string
          id?: number
          internal_id: string
          is_extra?: boolean | null
          outcome: string
          title: string
        }
        Update: {
          complexity?: string
          description?: string
          id?: number
          internal_id?: string
          is_extra?: boolean | null
          outcome?: string
          title?: string
        }
        Relationships: []
      }
      general_inquiries: {
        Row: {
          city: string | null
          contact_purpose: string
          country: string | null
          email: string
          first_name: string
          id: number
          last_name: string
          message: string
          phone: string | null
          submitted_at: string | null
        }
        Insert: {
          city?: string | null
          contact_purpose: string
          country?: string | null
          email: string
          first_name: string
          id?: number
          last_name: string
          message: string
          phone?: string | null
          submitted_at?: string | null
        }
        Update: {
          city?: string | null
          contact_purpose?: string
          country?: string | null
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          message?: string
          phone?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      referral_clicks: {
        Row: {
          converted: boolean | null
          created_at: string | null
          id: number
          ip_address: string | null
          page_url: string | null
          referral_code: string
        }
        Insert: {
          converted?: boolean | null
          created_at?: string | null
          id?: number
          ip_address?: string | null
          page_url?: string | null
          referral_code: string
        }
        Update: {
          converted?: boolean | null
          created_at?: string | null
          id?: number
          ip_address?: string | null
          page_url?: string | null
          referral_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_clicks_referral_code_fkey"
            columns: ["referral_code"]
            isOneToOne: false
            referencedRelation: "referrers"
            referencedColumns: ["referral_code"]
          },
        ]
      }
      referral_commission_rules: {
        Row: {
          commission_percentage: number
          created_at: string | null
          id: number
          min_payment_threshold: number | null
          payment_type: string
          payout_schedule: string | null
          updated_at: string | null
        }
        Insert: {
          commission_percentage: number
          created_at?: string | null
          id?: number
          min_payment_threshold?: number | null
          payment_type: string
          payout_schedule?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_percentage?: number
          created_at?: string | null
          id?: number
          min_payment_threshold?: number | null
          payment_type?: string
          payout_schedule?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_conversions: {
        Row: {
          commission_amount: number
          course_application_id: number | null
          created_at: string | null
          id: number
          paid: boolean | null
          referral_code: string
          updated_at: string | null
        }
        Insert: {
          commission_amount: number
          course_application_id?: number | null
          created_at?: string | null
          id?: number
          paid?: boolean | null
          referral_code: string
          updated_at?: string | null
        }
        Update: {
          commission_amount?: number
          course_application_id?: number | null
          created_at?: string | null
          id?: number
          paid?: boolean | null
          referral_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_conversions_course_application_id_fkey"
            columns: ["course_application_id"]
            isOneToOne: false
            referencedRelation: "course_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_conversions_referral_code_fkey"
            columns: ["referral_code"]
            isOneToOne: false
            referencedRelation: "referrers"
            referencedColumns: ["referral_code"]
          },
        ]
      }
      referrers: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean | null
          is_verified: boolean | null
          min_referrals_for_tokens: number | null
          referral_benefits: Json | null
          referral_code: string
          tokens_per_referral: number | null
          total_earnings: number | null
          updated_at: string | null
          user_email: string
          verification_token: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          min_referrals_for_tokens?: number | null
          referral_benefits?: Json | null
          referral_code: string
          tokens_per_referral?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_email: string
          verification_token?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          min_referrals_for_tokens?: number | null
          referral_benefits?: Json | null
          referral_code?: string
          tokens_per_referral?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_email?: string
          verification_token?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          attachment_url: string | null
          created_at: string | null
          display_name: string
          email: string
          full_name: string
          id: number
          is_student: boolean
          is_verified: boolean
          photo_url: string | null
          testimony_text: string
          updated_at: string | null
          verification_token: string
        }
        Insert: {
          attachment_url?: string | null
          created_at?: string | null
          display_name: string
          email: string
          full_name: string
          id?: number
          is_student?: boolean
          is_verified?: boolean
          photo_url?: string | null
          testimony_text: string
          updated_at?: string | null
          verification_token: string
        }
        Update: {
          attachment_url?: string | null
          created_at?: string | null
          display_name?: string
          email?: string
          full_name?: string
          id?: number
          is_student?: boolean
          is_verified?: boolean
          photo_url?: string | null
          testimony_text?: string
          updated_at?: string | null
          verification_token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
