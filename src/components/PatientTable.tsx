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
import { TableResponse } from "@/Features/ViewPatientConsultations";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export function PatientTable({ response }: { response: TableResponse[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="text-center">ID</TableHead>
					<TableHead className="text-center">Date</TableHead>
					<TableHead className="text-center">Consultation Type</TableHead>
					<TableHead className="text-center">Medical Condition</TableHead>
					<TableHead className="text-center">
						Healthcare Provider Name
					</TableHead>
					<TableHead className="text-center">
						Healthcare Provider Department
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{response.map((item) => (
					<TableRow key={item.id}>
						<TableCell className="font-medium">{item.id}</TableCell>
						<TableCell>{item.date}</TableCell>
						<TableCell>{item.consultationType}</TableCell>
						<TableCell>{item.medicalCondition}</TableCell>
						<TableCell>{item.healthcareProviderName}</TableCell>
						<TableCell>{item.healthcareProviderDepartment}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
