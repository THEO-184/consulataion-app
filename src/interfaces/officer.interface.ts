export interface OfficerLoginResponse {
	token: string;
	officer: Officer;
}

export interface Officer {
	id: number;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	healthFacilityId: number;
}
