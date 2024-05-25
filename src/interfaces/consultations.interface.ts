export interface ConsultationResponse {
	consultations: Consultation[];
	count: number;
}

export interface Consultation {
	id: number;
	date: string;
	consultationType: string;
	medicalCondition: string;
	notes: any;
	officerId: number;
	patientId: number;
	healthcareProviderId: number;
	createdAt: string;
	updatedAt: string;
	healthcareProvider: HealthcareProvider;
	officer: Officer;
	patient: Patient;
}

export interface HealthcareProvider {
	department: string;
	name: string;
}

export interface Officer {
	name: string;
}

export interface Patient {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}
