import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTime(dateString: string) {
	const date = new Date(dateString);

	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const minutesStr = minutes < 10 ? "0" + minutes : minutes;

	const formattedTime = `${hours}:${minutesStr} ${ampm}`;
	return formattedTime;
}

export function formatDate(dateString: string) {
	const date = new Date(dateString);

	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	const dayWithSuffix = addOrdinalSuffix(day);

	const formattedDate = `${dayWithSuffix} ${month} ${year}`;
	return formattedDate;
}

function addOrdinalSuffix(day: number) {
	if (day > 3 && day < 21) return `${day}th`;

	switch (day % 10) {
		case 1:
			return `${day}st`;
		case 2:
			return `${day}nd`;
		case 3:
			return `${day}rd`;
		default:
			return `${day}th`;
	}
}
