# Capsule Table

Import `CapsTableImports` from `@capsule-ng/caps/table` and load Capsule foundations.

```html
<caps-table-container>
	<table capsTable striped size="sm" [noBorder]="false">
		<caption>Recent invoices</caption>
		<thead>
			<tr>
				<th scope="col">Invoice</th>
				<th scope="col">Amount</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">INV-001</th>
				<td>€120</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th scope="row">Total</th>
				<td>€120</td>
			</tr>
		</tfoot>
	</table>
</caps-table-container>
```

`CapsTable` adapts Carbon Angular TableDirective's `size` (xs/sm/md/lg/xl,
md default), `striped=false` and `noBorder=true`. All sections/cells, scope,
headers, spans and actions remain native. The container owns responsive overflow.
There are no extra directives on the descendants, no data model and no sorting.

See [anatomy, Carbon sources and migration inventory](../../../docs/specs/caps-tables.md).

The container is keyboard focusable. Native Arrow keys scroll overflowing rows,
with a visible Capsule focus ring. Native cell classes keep their precedence over
default table presentation, including text-right/text-end alignment.
