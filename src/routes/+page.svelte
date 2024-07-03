<script lang="ts">
	import { ServiceAction } from '$lib/enums';
	import type { PageData } from './$types';
	import ServicesTable from './services-table.svelte';

	export let data: PageData;

	const services = [
		{
			name: 'Server',
			active: true,
			uptime: data.uptime,
			actions: [ServiceAction.Restart]
		},
		{
			name: 'Status Page',
			active: true,
			uptime: data.statuspageUptime,
			actions: [ServiceAction.Restart]
		},
		{
			name: 'Minecraft',
			active: false,
			uptime: data.minecraftUptime,
			actions: data.minecraftRunning
				? [ServiceAction.Restart, ServiceAction.Stop]
				: [ServiceAction.Start]
		}
	];
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40 p-4">
	<ServicesTable {services} />
</div>
