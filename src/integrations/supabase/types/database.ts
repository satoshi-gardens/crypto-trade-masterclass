import { Json } from "./json";
import { CountriesTable } from "./countries";
import { CourseApplicationsTable } from "./course-applications";
import { CoursesTable } from "./courses";
import { GeneralInquiriesTable } from "./general-inquiries";

export interface Database {
  public: {
    Tables: {
      countries: CountriesTable;
      course_applications: CourseApplicationsTable;
      courses: CoursesTable;
      general_inquiries: GeneralInquiriesTable;
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