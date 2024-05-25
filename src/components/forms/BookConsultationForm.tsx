"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import {
	useAuthControllerPatientLogin,
	useConsultationControllerBookConsultation,
	useHealthcareProvidersControllerFindAll,
} from "../../../apis/apiComponents";
import { useRouter } from "next/navigation";
import { HealthCareProviderResponse } from "@/interfaces/healthcare-providers.interface";

const formSchema = z.object({
	consultationType: z.string(),
	medicalCondition: z.string(),
	notes: z.string().optional(),
	healthcareProviderId: z.coerce.number(),
	date: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
});

export function BookConsultationForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { data, isPending: isFethcingProviders } =
		useHealthcareProvidersControllerFindAll<HealthCareProviderResponse>({});
	const { mutate: bookConsultation, isPending } =
		useConsultationControllerBookConsultation();

	const {
		formState: { errors },
	} = form;

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		const { firstName, lastName, email, ...consultationInfo } = values;
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		bookConsultation(
			{
				body: {
					...consultationInfo,
					patient: {
						firstName,
						lastName,
						email,
					},
				},
			},
			{
				onSuccess(data, variables, context) {
					window.location.reload();
				},
				onError(error, variables, context) {
					console.log("error", error);
				},
			}
		);

		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Book Consultation</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Consultation Details</DialogTitle>
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
							name="healthcareProviderId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Healthcare Provider</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
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
											<SelectItem value="23">m@example.com</SelectItem>
											<SelectItem value="34">m@google.com</SelectItem>
											<SelectItem value="24">m@support.com</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<h3 className="my-4 text-black font-medium">Patient Details</h3>

						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="firstName" className="text-right">
										First Name
									</FormLabel>
									<FormControl>
										<Input id="firstName" placeholder="" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="lastName" className="text-right">
										Last Name
									</FormLabel>
									<FormControl>
										<Input id="lastName" placeholder="" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="email" className="text-right">
										Email
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											id="lastName"
											placeholder=""
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
