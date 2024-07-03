<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ServiceAction } from '$lib/enums';
	import { Power, RotateCw } from 'lucide-svelte/icons';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	export let actions: ServiceAction[];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#if actions.includes(ServiceAction.Restart)}
			<DropdownMenu.Item>
				<RotateCw class="mr-2 h-4 w-4" />
				Restart
			</DropdownMenu.Item>
		{/if}
		{#if actions.includes(ServiceAction.Stop)}
			<DropdownMenu.Item>
				<Power class="mr-2 h-4 w-4" />
				Stop
			</DropdownMenu.Item>
		{/if}
		{#if actions.includes(ServiceAction.Start)}
			<DropdownMenu.Item>
				<Power class="mr-2 h-4 w-4" />
				Start
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
