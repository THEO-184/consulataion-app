import React, { useState } from "react";
import { BookConsultationForm } from "./forms/BookConsultationForm";
import { SearchRecordsForm } from "./forms/SearchRecordsForm";

const Header = () => {
	return (
		<div className="py-6 px-6 flex justify-between">
			<SearchRecordsForm />
			<BookConsultationForm />
		</div>
	);
};

export default Header;
