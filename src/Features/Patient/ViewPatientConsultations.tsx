"use client";
import React, { useEffect, useState } from "react";
import { ConsultationResponse } from "@/interfaces/consultations.interface";
import { formatDate, formatTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CustomTable, { TableColumn } from "@/components/CustomTable";
import { usePatientControllerGetMyConsultation } from "../../../apis/apiComponents";

export interface PatientTableResponse {
	date: string;
	id: number;
	consultationType: string;
	medicalCondition: string;
	healthcareProviderName: string;
	healthcareProviderDepartment: string;
}

const ViewPatientConsultations = () => {
	const [response, setResponse] = useState<Array<PatientTableResponse>>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const { isPending, data } =
		usePatientControllerGetMyConsultation<ConsultationResponse>({});

	console.log("data", data);

	const responseData: PatientTableResponse[] = data
		? data?.consultations.map((item) => {
				return {
					date: `${formatDate(item.date)} ${formatTime(item.date)}`,
					id: item.id,
					consultationType: item.consultationType,
					medicalCondition: item.medicalCondition,
					healthcareProviderName: item.healthcareProvider.name,
					healthcareProviderDepartment: item.healthcareProvider.department,
				};
			})
		: [];

	const columns: TableColumn<PatientTableResponse>[] = [
		{ key: "id", header: "ID" },
		{ key: "date", header: "Date" },
		{ key: "consultationType", header: "onsultation Type" },
		{ key: "medicalCondition", header: "Medical Condition" },
		{ key: "healthcareProviderName", header: "Healthcare Provider Name" },
		{
			key: "healthcareProviderDepartment",
			header: "Healthcare Provider Department",
		},
	];

	const handleSearchConsultation: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		const searchTerm = e.target.value;
		if (!searchTerm.length) {
			setResponse(responseData);
			setSearchQuery("");
			return;
		}
		setSearchQuery(searchTerm);

		const filteredData = responseData.filter((item) => {
			const Values = Object.values(item) as string[];
			const hasSearchTerm = Values.some((item) =>
				item.toString().toLowerCase().includes(searchTerm.toLowerCase())
			);
			return hasSearchTerm && item;
		});

		setResponse(filteredData);
	};

	useEffect(() => {
		setResponse(responseData);
	}, [data]);

	return (
		<div className="w-full h-full">
			{isPending ? (
				<h1>Fetching Consultations</h1>
			) : (
				<div className="overflow-x-auto max-w-screen-2xl mx-auto mt-12">
					<div className="my-5 max-w-60 mx-auto">
						<Input
							type="search"
							value={searchQuery}
							placeholder="search"
							onChange={handleSearchConsultation}
						/>
					</div>
					<CustomTable data={response} columns={columns} />
				</div>
			)}
		</div>
	);
};

export default ViewPatientConsultations;
