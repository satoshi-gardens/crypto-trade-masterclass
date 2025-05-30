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
      admin_activity_logs: {
        Row: {
          action_details: Json | null
          action_type: string
          admin_id: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
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
      email_templates: {
        Row: {
          created_at: string | null
          description: string | null
          html_content: string
          id: number
          subject: string
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          html_content: string
          id?: number
          subject: string
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          html_content?: string
          id?: number
          subject?: string
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          area: string
          country: string
          created_at: string | null
          email: string
          first_name: string
          id: number
          instagram_handle: string | null
          last_name: string
          message: string
          phone: string | null
          photo_url: string | null
          telegram_handle: string | null
          twitter_handle: string | null
          updated_at: string | null
        }
        Insert: {
          area: string
          country: string
          created_at?: string | null
          email: string
          first_name: string
          id?: number
          instagram_handle?: string | null
          last_name: string
          message: string
          phone?: string | null
          photo_url?: string | null
          telegram_handle?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
        }
        Update: {
          area?: string
          country?: string
          created_at?: string | null
          email?: string
          first_name?: string
          id?: number
          instagram_handle?: string | null
          last_name?: string
          message?: string
          phone?: string | null
          photo_url?: string | null
          telegram_handle?: string | null
          twitter_handle?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fraud_flags: {
        Row: {
          created_at: string | null
          flag_details: Json | null
          flag_type: string
          id: string
          referrer_id: number | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          flag_details?: Json | null
          flag_type: string
          id?: string
          referrer_id?: number | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          flag_details?: Json | null
          flag_type?: string
          id?: string
          referrer_id?: number | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fraud_flags_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "referrers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fraud_flags_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
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
      notifications: {
        Row: {
          created_at: string | null
          expire_date: string
          icon: string
          id: string
          is_active: boolean | null
          link: string | null
          message: string
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expire_date: string
          icon?: string
          id?: string
          is_active?: boolean | null
          link?: string | null
          message: string
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expire_date?: string
          icon?: string
          id?: string
          is_active?: boolean | null
          link?: string | null
          message?: string
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payout_records: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          referrer_id: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          referrer_id?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          referrer_id?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payout_records_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payout_records_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "referrers"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_clicks: {
        Row: {
          converted: boolean | null
          created_at: string | null
          id: number
          ip_address: string | null
          page_url: string | null
          referral_code: string
          referrer_url: string | null
          user_agent: string | null
        }
        Insert: {
          converted?: boolean | null
          created_at?: string | null
          id?: number
          ip_address?: string | null
          page_url?: string | null
          referral_code: string
          referrer_url?: string | null
          user_agent?: string | null
        }
        Update: {
          converted?: boolean | null
          created_at?: string | null
          id?: number
          ip_address?: string | null
          page_url?: string | null
          referral_code?: string
          referrer_url?: string | null
          user_agent?: string | null
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
      referral_code_attempts: {
        Row: {
          attempt_count: number | null
          id: number
          ip_address: string
          last_attempt: string | null
          referral_code: string
        }
        Insert: {
          attempt_count?: number | null
          id?: number
          ip_address: string
          last_attempt?: string | null
          referral_code: string
        }
        Update: {
          attempt_count?: number | null
          id?: number
          ip_address?: string
          last_attempt?: string | null
          referral_code?: string
        }
        Relationships: []
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
          referred_discount_amount: number | null
          referrer_reward_amount: number | null
          referrer_reward_type: string | null
          updated_at: string | null
        }
        Insert: {
          commission_amount: number
          course_application_id?: number | null
          created_at?: string | null
          id?: number
          paid?: boolean | null
          referral_code: string
          referred_discount_amount?: number | null
          referrer_reward_amount?: number | null
          referrer_reward_type?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_amount?: number
          course_application_id?: number | null
          created_at?: string | null
          id?: number
          paid?: boolean | null
          referral_code?: string
          referred_discount_amount?: number | null
          referrer_reward_amount?: number | null
          referrer_reward_type?: string | null
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
          last_ip_address: string | null
          last_login_at: string | null
          min_referrals_for_tokens: number | null
          referral_benefits: Json | null
          referral_code: string
          referred_by: string | null
          reward_eligible: boolean | null
          suspicious_activity: boolean | null
          token_expiry: string | null
          tokens_per_referral: number | null
          total_earnings: number | null
          updated_at: string | null
          user_email: string
          verification_status: string | null
          verification_token: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          last_ip_address?: string | null
          last_login_at?: string | null
          min_referrals_for_tokens?: number | null
          referral_benefits?: Json | null
          referral_code: string
          referred_by?: string | null
          reward_eligible?: boolean | null
          suspicious_activity?: boolean | null
          token_expiry?: string | null
          tokens_per_referral?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_email: string
          verification_status?: string | null
          verification_token?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          last_ip_address?: string | null
          last_login_at?: string | null
          min_referrals_for_tokens?: number | null
          referral_benefits?: Json | null
          referral_code?: string
          referred_by?: string | null
          reward_eligible?: boolean | null
          suspicious_activity?: boolean | null
          token_expiry?: string | null
          tokens_per_referral?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_email?: string
          verification_status?: string | null
          verification_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrers_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "referrers"
            referencedColumns: ["referral_code"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: number
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: number
          key?: string
          updated_at?: string | null
          value?: string
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
          instagram_handle: string | null
          is_student: boolean
          is_verified: boolean
          photo_url: string | null
          telegram_handle: string | null
          testimony_text: string
          twitter_handle: string | null
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
          instagram_handle?: string | null
          is_student?: boolean
          is_verified?: boolean
          photo_url?: string | null
          telegram_handle?: string | null
          testimony_text: string
          twitter_handle?: string | null
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
          instagram_handle?: string | null
          is_student?: boolean
          is_verified?: boolean
          photo_url?: string | null
          telegram_handle?: string | null
          testimony_text?: string
          twitter_handle?: string | null
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
      check_referral_rate_limit: {
        Args: { p_referral_code: string; p_ip_address: string }
        Returns: boolean
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
