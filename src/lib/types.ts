import { ServiceAction } from '$lib/enums';

export type Service = {
	name: string;
	active: boolean;
	uptime: string;
	actions: ServiceAction[];
};

