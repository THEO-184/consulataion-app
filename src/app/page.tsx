import { OfficerForm } from "@/components/forms/OfficerForm";
import { PatientForm } from "@/components/forms/PatientForms";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center p-24">
			<div className="flex gap-x-10 h-full">
				<PatientForm />
				<OfficerForm />
			</div>
		</main>
	);
}
