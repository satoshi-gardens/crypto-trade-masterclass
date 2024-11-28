import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const ReferralAdmin = () => {
  const { data: referrers, isLoading } = useQuery({
    queryKey: ["referrers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referrers")
        .select(`
          *,
          referral_clicks(count),
          referral_conversions(
            id,
            commission_amount,
            paid,
            created_at,
            course_application:course_applications(
              first_name,
              last_name,
              email,
              selected_course,
              package,
              price
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Referral Program Admin</h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Referral Code</TableHead>
                  <TableHead>Total Clicks</TableHead>
                  <TableHead>Total Conversions</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrers?.map((referrer) => (
                  <TableRow key={referrer.id}>
                    <TableCell>{referrer.user_email}</TableCell>
                    <TableCell className="font-mono">
                      {referrer.referral_code}
                    </TableCell>
                    <TableCell>
                      {referrer.referral_clicks?.[0]?.count || 0}
                    </TableCell>
                    <TableCell>
                      {referrer.referral_conversions?.length || 0}
                    </TableCell>
                    <TableCell>
                      CHF{" "}
                      {referrer.total_earnings?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </TableCell>
                    <TableCell>
                      {format(
                        new Date(referrer.created_at),
                        "MMM d, yyyy HH:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Recent Conversions</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrers?.flatMap((referrer) =>
                    referrer.referral_conversions?.map((conversion) => (
                      <TableRow key={conversion.id}>
                        <TableCell>
                          {format(
                            new Date(conversion.created_at),
                            "MMM d, yyyy HH:mm"
                          )}
                        </TableCell>
                        <TableCell>{referrer.user_email}</TableCell>
                        <TableCell>
                          {conversion.course_application?.first_name}{" "}
                          {conversion.course_application?.last_name}
                          <br />
                          <span className="text-sm text-gray-500">
                            {conversion.course_application?.email}
                          </span>
                        </TableCell>
                        <TableCell>
                          {conversion.course_application?.selected_course}
                        </TableCell>
                        <TableCell>
                          {conversion.course_application?.package}
                        </TableCell>
                        <TableCell>
                          CHF{" "}
                          {conversion.commission_amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell>
                          {conversion.paid ? (
                            <span className="text-green-600">Paid</span>
                          ) : (
                            <span className="text-yellow-600">Pending</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ReferralAdmin;