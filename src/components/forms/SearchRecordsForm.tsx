"use client";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { Button } from "../ui/button";
import { useHealthcareProvidersControllerFindAll } from "../../../apis/apiComponents";
import { useRouter } from "next/navigation";
import { HealthCareProviderResponse } from "@/interfaces/healthcare-providers.interface";

export const SearchConsultationSchema = z.object({
	consultationType: z.string().optional(),
	medicalCondition: z.string().optional(),
	healthcareProvider: z.string().optional(),
	date: z.string().optional(),
	patientName: z.string().optional(),
});

export type SearchConsultationPayloadType = z.infer<
	typeof SearchConsultationSchema
>;

interface SearchFormProps {
	setSearchQuery: React.Dispatch<
		React.SetStateAction<SearchConsultationPayloadType | null>
	>;
}

type QueryParamType = {
	[key: string]: any;
};

export function SearchRecordsForm({ setSearchQuery }: SearchFormProps) {
	const form = useForm<SearchConsultationPayloadType>({
		resolver: zodResolver(SearchConsultationSchema),
	});

	const { data, isPending: isFethcingProviders } =
		useHealthcareProvidersControllerFindAll<HealthCareProviderResponse>({});

	const {
		formState: { errors },
	} = form;

	// 2. Define a submit handler.
	function onSubmit(values: SearchConsultationPayloadType) {
		const queryParam: QueryParamType = {};

		for (const key in values) {
			if (values[key as keyof SearchConsultationPayloadType]) {
				queryParam[key] = values[key as keyof SearchConsultationPayloadType];
			}
		}
		setSearchQuery((prev) => ({ ...prev, ...queryParam }));
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Filter Consultations</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Filter consultations by specific fields</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="consultationType"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="consultationType" className="text-right">
										Consultation Type
									</FormLabel>
									<FormControl>
										<Input
											id="consultationType"
											placeholder="eye screening"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="medicalCondition"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="medicalCondition" className="text-right">
										Medical Condition
									</FormLabel>
									<FormControl>
										<Input id="medicalCondition" placeholder="" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="date" className="text-right">
										Date
									</FormLabel>
									<FormControl>
										<Input type="date" id="date" placeholder="" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="healthcareProvider"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Healthcare Provider</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value?.toString()}
									>
										<FormControl>
											<SelectTrigger disabled={!data}>
												<SelectValue placeholder="Select the health provider" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{data?.healthcareProviders?.map((details) => (
												<SelectItem
													key={details.id}
													value={details.id.toString()}
												>
													{details.name} - {details.department}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<h3 className="my-4 text-black font-medium">Patient Details</h3>

						<FormField
							control={form.control}
							name="patientName"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="patientName" className="text-right">
										Full Name
									</FormLabel>
									<FormControl>
										<Input id="patientName" placeholder="" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Search</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
