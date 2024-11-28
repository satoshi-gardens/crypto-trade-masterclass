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

const FraudMonitoring = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fraud-flags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fraud_flags")
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
            <TableHead>Flag Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((flag) => (
            <TableRow key={flag.id}>
              <TableCell>
                {format(new Date(flag.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{flag.referrers?.user_email}</TableCell>
              <TableCell>{flag.flag_type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  flag.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  flag.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {flag.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={flag.status === 'resolved'}
                  onClick={() => {
                    // TODO: Implement resolve flag functionality
                  }}
                >
                  Resolve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FraudMonitoring;