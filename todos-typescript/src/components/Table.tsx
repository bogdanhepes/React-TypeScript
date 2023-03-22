import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Column,
  Table,
  getExpandedRowModel,
  ExpandedState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Tablee,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../styled/TableStyled";
import {
  AscStyled,
  CheckStyled,
  CollapseStyled,
  DeleteStyled,
  DescStyled,
  EditStyled,
  ExpandStyled,
  XStyled,
} from "../styled/IconsStyled";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getTodo, getTodos } from "../actions/Todos";
import { RootState } from "../redux/reducers/RootReducer";
import { Loading } from "../styled/LoadingStyled";
import { ThunkDispatch } from "redux-thunk";

import ModalEdit from "./ModalEdit";
import { toast } from "react-toastify";

type todo = {
  id: number;
  description: string;
  status: boolean;
  createdAt: string;
  subRows?: todo[];
};

const TableFn = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleGetTask = (id: number) => {
    setLoading(true);
    dispatch(getTodo(id))
      .then(() => {
        setLoading(false);
        toggleModal();
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to get todo!", {
          toastId: "errorDelete",
        });
      });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    dispatch(deleteTodo(id))
      .then(() => {
        dispatch(getTodos()).then(() => {
          setLoading(false);
          toast.success("Todo deleted successfully!", {
            toastId: "successDelete",
          });
        });
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to delete todo!", {
          toastId: "errorDelete",
        });
      });
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const columns = useMemo<ColumnDef<todo>[]>(
    () => [
      {
        size: 20,
        id: "expandable",
        cell: ({ row }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            {!row.getIsExpanded() ? (
              <ExpandStyled
                {...{
                  onClick: () => row.toggleExpanded(),
                }}
              />
            ) : (
              <CollapseStyled
                {...{
                  onClick: () => row.toggleExpanded(),
                }}
              />
            )}
          </div>
        ),
      },
      {
        size: 20,
        header: "INDEX",
        cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        size: 400,
        header: "DESCRIPTION",
        accessorKey: "description",
      },
      {
        size: 10,
        header: "STATUS",
        accessorKey: "completed",
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) =>
          row.original.status ? <CheckStyled /> : <XStyled />,
      },
      {
        size: 10,
        header: "ACTIONS",
        cell: ({ row }) => (
          <>
            <EditStyled
              onClick={() => {
                handleGetTask(row.original.id);
              }}
            />
            <DeleteStyled onClick={() => handleDelete(row.original.id)} />
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    []
  );
  const { todos } = useSelector((state: RootState) => state.Todos);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  //
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  //

  const table = useReactTable({
    data: todos || [],
    columns,
    state: {
      expanded,
      sorting,
      columnFilters,
    },
    enableFilters: true,
    enableColumnFilters: true,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
    debugTable: true,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
    // eslint-disable-next-line
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Tablee>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader
                    key={header.id}
                    width={header?.getSize() + "px"}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <AscStyled />,
                          desc: <DescStyled />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {row.getIsExpanded() ? (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Created At:</TableCell>
                      <TableCell>
                        {new Date(row.original.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </Tablee>
      )}
      <ModalEdit
        open={open}
        toggleModal={toggleModal}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

function Filter({
  column,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default TableFn;
