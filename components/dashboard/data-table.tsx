import type { ReactNode } from "react";

type DataTableProps<T extends { id: string }> = {
  columns: Array<{
    header: string;
    cell: (row: T) => ReactNode;
    className?: string;
  }>;
  rows: T[];
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white/74">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--line)] text-left">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className={`px-4 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--ink-soft)] ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)] text-sm text-[var(--foreground)]">
            {rows.map((row) => (
              <tr key={row.id} className="align-top">
                {columns.map((column) => (
                  <td key={column.header} className={`px-4 py-4 ${column.className ?? ""}`}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
