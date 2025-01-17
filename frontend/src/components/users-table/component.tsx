import { columns } from "@/components/users-table/columns";
import { DataTable } from "@/components/data-table";

export default function UsersTable({ data }: { data: any }) {
	return <DataTable columns={columns} data={data} />;
}
