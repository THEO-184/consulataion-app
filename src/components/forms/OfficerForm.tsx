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
import { useAuthControllerOfficerLogin } from "../../../apis/apiComponents";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	password: z.string().min(10, "minimum 10 characters required"),
	email: z.string().email(),
});

export function OfficerForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: login } = useAuthControllerOfficerLogin();

	const {
		formState: { errors },
	} = form;

	console.log("erros", errors);

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		login(
			{
				body: { email: values.email, password: values.password },
			},
			{
				onSuccess(data, variables, context) {
					localStorage.setItem("token", data.token);
					localStorage.setItem(
						"details",
						JSON.stringify({
							name: data.officer.name,
							facilityName: data.officer.healthFacility.name,
						})
					);

					window.location.href = `/officer/${data.officer.id}`;
				},
				onError(error, variables, context) {
					window.alert("Password Incorrect");
					console.log("error", error);
				},
			}
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Sign In As Health Facility Officer</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Officer credentials</DialogTitle>
					<DialogDescription>
						Log in as Health Facility Officer
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
							name="password"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel htmlFor="password" className="text-right">
										Password
									</FormLabel>
									<FormControl>
										<Input
											id="password"
											type="password"
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
