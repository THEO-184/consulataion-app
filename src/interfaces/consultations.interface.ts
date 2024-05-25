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
}

export interface HealthcareProvider {
	department: string;
	name: string;
}

export interface Officer {
	name: string;
}
