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
import { format } from "date-fns";

const ActivityLogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["activity-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_activity_logs")
        .select(`
          *,
          admin_users(email)
        `)
        .order("created_at", { ascending: false })
        .limit(50);

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
            <TableHead>Admin</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                {format(new Date(log.created_at), "MMM d, yyyy HH:mm")}
              </TableCell>
              <TableCell>{log.admin_users?.email}</TableCell>
              <TableCell>{log.action_type}</TableCell>
              <TableCell>
                <pre className="text-xs">
                  {JSON.stringify(log.action_details, null, 2)}
                </pre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityLogs;