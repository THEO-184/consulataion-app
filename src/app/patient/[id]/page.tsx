import ViewPatientConsultations from "@/Features/ViewPatientConsultations";
import React from "react";

const Patient = ({ params }: { params: { id: string } }) => {
	return (
		<div className="w-full h-full text-center py-7">
			<h2 className="text-3xl">Below are your upcoming consultations!</h2>
			<ViewPatientConsultations />
		</div>
	);
};

export default Patient;
