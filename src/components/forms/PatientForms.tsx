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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { Button } from "../ui/button";
import { useAuthControllerPatientLogin } from "../../../apis/apiComponents";
import Spinner from "../Spinner";

const formSchema = z.object({
	id: z.coerce.number().gt(0),
});

export function PatientForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: login, isPending } = useAuthControllerPatientLogin();

	function onSubmit(values: z.infer<typeof formSchema>) {
		login(
			{
				body: { id: values.id },
			},
			{
				onSuccess(data, variables, context) {
					console.log("data", data);
					localStorage.setItem("token", data.token);
					localStorage.setItem(
						"details",
						JSON.stringify({
							firstName: data.patient.firstName,
							lastName: data.patient.lastName,
						})
					);

					window.location.href = `/patient/${data.patient.id}`;
				},
				onError(error, variables, context) {
					window.alert("Patient Id and/or email incorrect");
					console.log("error", error);
				},
			}
		);

		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Sign In As Patient</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Patient credentials</DialogTitle>
					<DialogDescription>
						Enter your credentials to view your consultations.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="id" className="text-right">
										Patient Id
									</FormLabel>
									<FormControl>
										<Input id="id" placeholder="" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">
								Save changes
								{isPending && <Spinner />}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
