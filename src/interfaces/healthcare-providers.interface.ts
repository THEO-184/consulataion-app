export interface HealthCareProviderResponse {
	healthcareProviders: HealthCareProvider[];
}

export interface HealthCareProvider {
	id: number;
	name: string;
	department: string;
	createdAt: string;
	updatedAt: string;
	healthFacilityId: number;
	_count: Count;
}

export interface Count {
	consultations: number;
}
