<script lang="ts">
	export let active: boolean;
</script>

<div class="flex items-center gap-2">
	{#if active}
		Online
		<div class="h-2 w-2 rounded-full bg-green-500"></div>
	{:else}
		Offline
		<div class="h-2 w-2 rounded-full bg-red-500"></div>
	{/if}
</div>
