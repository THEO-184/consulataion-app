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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
	password: z.string().min(10, "minimum 10 characters required"),
	email: z.string().email(),
});

export function OfficerForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const {
		formState: { errors },
	} = form;

	console.log("erros", errors);

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
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
