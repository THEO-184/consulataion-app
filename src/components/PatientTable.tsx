import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PatientTableResponse } from "@/Features/Patient/ViewPatientConsultations";

interface TableProps<T> {
	data: T[]; // Array of data objects for the table
	columns: TableColumn<T>[]; // Array of column definitions
}

export interface TableColumn<T> {
	key: keyof T; // Property key of the data object to access the value
	header: string; // Header text for the column
	render?: (row: T) => React.ReactNode; // Optional custom rendering function
}

const CustomTable = <T,>({ columns, data }: TableProps<T>) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((column) => (
						<TableHead key={column.header} className="text-center">
							{column.header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, id) => (
					<TableRow key={id}>
						{columns.map((column, id) => (
							<TableCell key={id} className="font-medium text-center">
								{column.render
									? column.render(row)
									: (row[column.key] as React.ReactNode)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default CustomTable;
