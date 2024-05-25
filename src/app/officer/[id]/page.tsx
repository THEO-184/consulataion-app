import Header from "@/components/Header";
import ViewBookedConsultations from "@/Features/Officer/ViewBookedConsultations";
import React from "react";

const OfficerPage = () => {
	return (
		<div className="h-full w-full">
			<Header />
			<ViewBookedConsultations />
		</div>
	);
};

export default OfficerPage;
