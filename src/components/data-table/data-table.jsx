function DataTable({
  columns = [],
  data = [],
  emptyState = "No data found",
  getRowKey = (row, index) => row.id ?? index,
}) {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-alt">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="whitespace-nowrap border-b border-border px-4 py-4 text-left text-xs font-bold text-muted"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className="border-b border-border last:border-b-0 transition hover:bg-surface-alt/70"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={
                      column.className ??
                      "whitespace-nowrap px-4 py-4 text-sm text-text"
                    }
                  >
                    {column.render
                      ? column.render(row, rowIndex)
                      : row[column.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="px-4 py-10 text-center text-sm text-muted"
              >
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;