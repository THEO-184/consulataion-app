"use client";
import React, { useEffect, useState } from "react";
import { useConsultationControllerGetPatientConsultation } from "../../../apis/apiComponents";
import { ConsultationResponse } from "@/interfaces/consultations.interface";
import CustomTable, { TableColumn } from "@/components/CustomTable";
import { PatientTableResponse } from "../Patient/ViewPatientConsultations";
import { formatDate, formatTime } from "@/lib/utils";
import {
	SearchConsultationPayloadType,
	SearchRecordsForm,
} from "@/components/forms/SearchRecordsForm";
import { BookConsultationForm } from "@/components/forms/BookConsultationForm";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { LoginOfficerResponseDto } from "../../../apis/apiSchemas";
import { useRouter } from "next/navigation";

interface OfficerTableResponse
	extends Omit<PatientTableResponse, "healthFacility"> {
	patientName: string;
	patientEmail: string;
}

const ViewBookedConsultations = () => {
	const router = useRouter();
	const details = localStorage.getItem("details");
	const user = details
		? (JSON.parse(details) as { name: string; facilityName: string })
		: null;
	const [searchQuery, setSearchQuery] =
		useState<SearchConsultationPayloadType | null>(null);
	console.log("searchQuery", searchQuery);
	const hasParams = searchQuery && Object.values(searchQuery).length > 0;
	const { data, isPending } =
		useConsultationControllerGetPatientConsultation<ConsultationResponse>({
			...(hasParams && { queryParams: { ...searchQuery } }),
		});

	const responseData: OfficerTableResponse[] = data
		? data?.consultations.map((item) => {
				return {
					date: `${formatDate(item.date)} ${formatTime(item.date)}`,
					id: item.id,
					consultationType: item.consultationType,
					medicalCondition: item.medicalCondition,
					healthcareProviderName: item.healthcareProvider.name,
					healthcareProviderDepartment: item.healthcareProvider.department,
					patientEmail: item.patient.email,
					patientName: `${item.patient.firstName} ${item.patient.lastName}`,
				};
			})
		: [];

	const columns: TableColumn<OfficerTableResponse>[] = [
		{ key: "id", header: "ID" },
		{ key: "date", header: "Date" },
		{ key: "consultationType", header: "Consultation Type" },
		{ key: "medicalCondition", header: "Medical Condition" },
		{ key: "healthcareProviderName", header: "Healthcare Provider Name" },
		{
			key: "healthcareProviderDepartment",
			header: "Healthcare Provider Department",
		},
		{ key: "patientEmail", header: "Patient Email" },
		{ key: "patientName", header: "Patient Name" },
	];

	useEffect(() => {
		if (!user) router.back();
	}, [user]);

	return (
		<div className="w-full h-full">
			{isPending ? (
				<h1>Fetching Consultations</h1>
			) : (
				<div>
					<div className="py-6 px-6 flex justify-between">
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

						<div className="flex items-center gap-x-4">
							{user ? (
								<div className="flex items-center gap-x-1">
									<h3 className="text-xl font-semibold">{user.name + " | "}</h3>
									<h3 className="text-xl font-semibold text-indigo-900">
										{user.facilityName}
									</h3>
								</div>
							) : undefined}
							<BookConsultationForm />
						</div>
					</div>
					<div className="overflow-x-auto max-w-screen-2xl mx-auto mt-12">
						<div className="flex items-center">
							<div className="flex items-center gap-x-3">
								<SearchRecordsForm setSearchQuery={setSearchQuery} />
								<Button variant={"ghost"} onClick={() => setSearchQuery(null)}>
									Reset
								</Button>
							</div>
							<h1 className="text-center text-2xl justify-self-center flex-1">
								List of Booked Consultations
							</h1>
						</div>

						<div className="my-5 w-auto mx-auto">
							<CustomTable data={responseData} columns={columns} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewBookedConsultations;
