import { Json } from "./json";
import { CountriesTable } from "./countries";
import { CourseApplicationsTable } from "./course-applications";
import { CoursesTable } from "./courses";
import { GeneralInquiriesTable } from "./general-inquiries";
import { ReferrersTable } from "./referrers";
import { ReferralClicksTable } from "./referral-clicks";
import { ReferralConversionsTable } from "./referral-conversions";

export interface Database {
  public: {
    Tables: {
      countries: CountriesTable;
      course_applications: CourseApplicationsTable;
      courses: CoursesTable;
      general_inquiries: GeneralInquiriesTable;
      referrers: ReferrersTable;
      referral_clicks: ReferralClicksTable;
      referral_conversions: ReferralConversionsTable;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}