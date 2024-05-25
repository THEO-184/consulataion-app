export interface PatientLoginResponse {
	token: string;
	patient: Patient;
}

export interface Patient {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}
