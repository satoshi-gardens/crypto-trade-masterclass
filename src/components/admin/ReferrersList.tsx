import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ReferrersList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["referrers", page],
    queryFn: async () => {
      const { data: referrers, error } = await supabase
        .from("referrers")
        .select(`
          *,
          referral_clicks(count),
          referral_conversions(count)
        `)
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      return referrers;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Referral Code</TableHead>
            <TableHead>Total Clicks</TableHead>
            <TableHead>Total Conversions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((referrer) => (
            <TableRow key={referrer.id}>
              <TableCell>{referrer.user_email}</TableCell>
              <TableCell>{referrer.referral_code}</TableCell>
              <TableCell>{referrer.referral_clicks?.[0]?.count || 0}</TableCell>
              <TableCell>{referrer.referral_conversions?.[0]?.count || 0}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  referrer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {referrer.is_active ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Implement view details modal
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          disabled={!data || data.length < pageSize}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReferrersList;