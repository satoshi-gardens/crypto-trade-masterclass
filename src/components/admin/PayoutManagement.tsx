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
import { format } from "date-fns";

const PayoutManagement = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["payouts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payout_records")
        .select(`
          *,
          referrers(user_email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Referrer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>
                {format(new Date(payout.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{payout.referrers?.user_email}</TableCell>
              <TableCell>${payout.amount.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  payout.status === 'completed' ? 'bg-green-100 text-green-800' :
                  payout.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {payout.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={payout.status === 'completed'}
                  onClick={() => {
                    // TODO: Implement process payout functionality
                  }}
                >
                  Process Payout
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayoutManagement;