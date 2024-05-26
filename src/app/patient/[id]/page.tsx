import ViewPatientConsultations from "@/Features/Patient/ViewPatientConsultations";
import React from "react";

const Patient = ({ params }: { params: { id: string } }) => {
	return (
		<div className="w-full h-full text-center">
			<ViewPatientConsultations />
		</div>
	);
};

export default Patient;
