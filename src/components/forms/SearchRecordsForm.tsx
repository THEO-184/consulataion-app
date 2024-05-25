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
import { useAuthControllerPatientLogin } from "../../../apis/apiComponents";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	id: z.coerce.number().gt(0),
	email: z.string().email(),
});

export function SearchRecordsForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: login, isPending } = useAuthControllerPatientLogin();

	const {
		formState: { errors },
	} = form;

	console.log("errors", errors);

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		login(
			{
				body: { email: values.email, id: values.id },
			},
			{
				onSuccess(data, variables, context) {
					console.log("data", data);
					localStorage.setItem("token", data.token);

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
				<Button variant="default">Search Records</Button>
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
							name="email"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="email" className="text-right">
										Email
									</FormLabel>
									<FormControl>
										<Input
											id="email"
											type="email"
											placeholder="example@mail.com"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
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
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
