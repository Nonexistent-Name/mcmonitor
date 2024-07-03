<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Service } from '$lib/types';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import ServicesTableActions from './services-table-actions.svelte';
	import ServicesTableIndicator from './services-table-indicator.svelte';

	export let services: Service[];

	const table = createTable(readable(services));

	const columns = table.createColumns([
		table.column({ accessor: 'name', header: 'Service' }),
		table.column({
			accessor: 'active',
			header: 'Active',
			cell: ({ value }) => createRender(ServicesTableIndicator, { active: value })
		}),
		table.column({ accessor: 'uptime', header: 'Uptime' }),
		table.column({
			accessor: ({ actions }) => actions,
			header: '',
			cell: ({ value }) => createRender(ServicesTableActions, { actions: value })
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="w-fit rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
