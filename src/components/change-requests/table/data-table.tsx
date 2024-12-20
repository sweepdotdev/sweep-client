import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    VisibilityState,
    SortingState,
    getSortedRowModel,
    Row,
    HeaderGroup,
    Header,
    Cell,
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/change-requests/table/pagination";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { Pagination } from "@/models/data-table/pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: Pagination;
    setPagination?: Dispatch<SetStateAction<Pagination>>;
    totalPages?: number;
    setTotalPages?: Dispatch<SetStateAction<number>>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    setPagination,
    totalPages,
}: DataTableProps<TData, TValue>): ReactElement {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        packageManager: false,
        packageManagerVersion: false,
        customBranchName: false,
        customCommitMessage: false,
    });
    const [sorting, setSorting] = useState<SortingState>([]);

    const table: TanstackTable<TData> = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: totalPages,
        onPaginationChange: setPagination,
        state: {
            columnVisibility,
            sorting,
            pagination,
        },
    });

    return (
        <div>
            <div className={"flex flex-col justify-end items-center"}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className={"ml-auto mb-4"}>
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className={"rounded-md border shadow-2xl"}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(
                            (headerGroup: HeaderGroup<TData>): ReactElement => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(
                                        (header: Header<TData, unknown>): ReactElement => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext(),
                                                          )}
                                                </TableHead>
                                            );
                                        },
                                    )}
                                </TableRow>
                            ),
                        )}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(
                                (row: Row<TData>): ReactElement => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map(
                                            (cell: Cell<TData, unknown>): ReactElement => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            ),
                                        )}
                                    </TableRow>
                                ),
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && setPagination && totalPages ? (
                <div className={"mt-4"}>
                    <DataTablePagination table={table} pageCount={totalPages} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
