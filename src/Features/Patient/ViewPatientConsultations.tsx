"use client";
import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CustomTable, { TableColumn } from "@/components/CustomTable";
import { usePatientControllerGetMyConsultation } from "../../../apis/apiComponents";
import { LoginPatientResponseDto } from "../../../apis/apiSchemas";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface PatientTableResponse {
	date: string;
	id: number;
	consultationType: string;
	medicalCondition: string;
	healthcareProviderName: string;
	healthcareProviderDepartment: string;
	healthFacility: string;
}

const ViewPatientConsultations = () => {
	const router = useRouter();
	const details = localStorage.getItem("details");
	const user = details
		? (JSON.parse(details) as LoginPatientResponseDto["patient"])
		: null;
	const [response, setResponse] = useState<Array<PatientTableResponse>>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const { isPending, data } = usePatientControllerGetMyConsultation({});

	const responseData: PatientTableResponse[] = data
		? data?.consultations.map((item) => {
				return {
					date: `${formatDate(item.date)} ${formatTime(item.date)}`,
					id: item.id,
					consultationType: item.consultationType,
					medicalCondition: item.medicalCondition,
					healthcareProviderName: item.healthcareProvider.name,
					healthcareProviderDepartment: item.healthcareProvider
						.department as unknown as string,
					healthFacility: item.officer.healthFacility.name,
				};
			})
		: [];

	const columns: TableColumn<PatientTableResponse>[] = [
		{ key: "id", header: "ID" },
		{ key: "date", header: "Date" },
		{ key: "consultationType", header: "Consultation Type" },
		{ key: "medicalCondition", header: "Medical Condition" },
		{ key: "healthcareProviderName", header: "Healthcare Provider Name" },
		{
			key: "healthcareProviderDepartment",
			header: "Healthcare Provider Department",
		},
		{
			key: "healthFacility",
			header: "Health Facility",
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
		if (!user) router.back();
	}, [user]);

	useEffect(() => {
		setResponse(responseData);
	}, [data]);

	return (
		<div className="w-full h-full py-3 px-6">
			<div className="flex justify-between items-center">
				<Button
					variant={"ghost"}
					onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("details");
						router.push("/");
					}}
				>
					Sign Out
				</Button>
				{user ? (
					<h3 className="text-xl font-semibold">
						{user.firstName + " " + user.lastName}
					</h3>
				) : undefined}
			</div>
			{isPending ? (
				<h1>Fetching Consultations</h1>
			) : (
				<div className="overflow-x-auto max-w-screen-2xl mx-auto mt-12">
					<h2 className="text-3xl">Below are your upcoming consultations!</h2>
					<div className="my-5 max-w-96 mx-auto">
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
