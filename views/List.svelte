<script lang="ts">
	import pl from 'nodejs-polars';
	export let data: string;

	const df = pl.readCSV(data);

	console.log(df);
</script>

<div class="number">
</div>

<style>

</style>
