"use client";
import React, { useEffect, useState } from "react";
import { usePatientControllerGetMyConsultation } from "../../apis/apiComponents";
import { ConsultationResponse } from "@/interfaces/consultations.interface";
import { formatDate, formatTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PatientTable } from "@/components/PatientTable";

export interface TableResponse {
	date: string;
	id: number;
	consultationType: string;
	medicalCondition: string;
	healthcareProviderName: string;
	healthcareProviderDepartment: string;
}

const ViewPatientConsultations = () => {
	const [response, setResponse] = useState<Array<TableResponse>>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const { isPending, data } =
		usePatientControllerGetMyConsultation<ConsultationResponse>({});

	console.log("data", data);

	const responseData = data
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
					<PatientTable response={response} />
					{/* <table className="min-w-full bg-white">
						<thead>
							<tr>
								<th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
									ID
								</th>
								<th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
									Date
								</th>
								<th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
									Consultation Type
								</th>
								<th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
									Medical Condition
								</th>
								<th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
									Healthcare Provider Name
								</th>
								<th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
									Healthcare Provider Department
								</th>
							</tr>
						</thead>
						<tbody>
							{response.map((item) => (
								<tr key={item.id} className="border-b">
									<td className=" p-4">{item.id}</td>
									<td className=" p-4">{item.date}</td>
									<td className=" p-4">{item.consultationType}</td>
									<td className=" p-4">{item.medicalCondition}</td>
									<td className=" p-4">{item.healthcareProviderName}</td>
									<td className=" p-4">{item.healthcareProviderDepartment}</td>
								</tr>
							))}
						</tbody>
					</table> */}
				</div>
			)}
		</div>
	);
};

export default ViewPatientConsultations;
