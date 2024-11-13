<script lang="ts">
	import { parse }from 'papaparse';
	interface Props {
		data: string;
		class: string;
	}

	let {data, class: classNames}: Props = $props();
	const df = $derived(parse(data, {header: true}));
	const rows = $derived(df.data);

	// console.log(df);
</script>

<div class="classNames">
	<table>
		<thead>
			<tr>
				<th>a</th>
				<th>b</th>
				<th>c</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td>{row.a}</td>
					<td>{row.b}</td>
					<td>{row.c}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>

</style>
