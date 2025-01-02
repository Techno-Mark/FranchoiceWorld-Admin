"use client";

import CustomChip from "@/@core/components/mui/Chip";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { post } from "@/services/apiService";
import { eventDetails } from "@/services/endpoint/event-details";
import trimText from "@/services/trimText";
import { eventDetailListType } from "@/types/apps/eventDetailListType";
import { investorListType } from "@/types/apps/investorListType";
import CustomTextField from "@core/components/mui/TextField";
import tableStyles from "@core/styles/table.module.css";
import {
  Button,
  TablePagination,
  TextFieldProps,
  Tooltip
} from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import ConfirmUpdateApprove from "./ConfirmUpdateApprove";
import ConfirmUpdateStatus from "./ConfirmUpdateStatus";
import EventFilter from "./filter";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export const initialFilterValue = {
  status: "active",
  category: 0,
  country: 0,
  state: 0,
  city: 0,
  startDate: "",
  endDate: "",
};

type BrandTypeWithAction = eventDetailListType & {
  action?: string;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextFieldProps, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const columnHelper = createColumnHelper<BrandTypeWithAction>();

const EventDetailListTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const router = useRouter();

  const [data, setData] = useState<eventDetailListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
  const [deletingId, setDeletingId] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [sendingMailBrandId, setSendingMailBrandId] = useState<number>(0);
  const [isSendingMail, setIsSendingMail] = useState<boolean>(false);

  const [statusUpdatingId, setStatusUpdatingId] = useState<number>(0);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);
  const [approveUpdatingId, setApproveUpdatingId] = useState<number>(0);
  const [isApproveUpdating, setIsApproveUpdating] = useState<boolean>(false);
  const [changeStatusValue, setChangeStatusValue] = useState(false);

  // Filter
  const [filter, setFilter] =
    useState<typeof initialFilterValue>(initialFilterValue);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const handleFilterChange = (
    key: keyof typeof initialFilterValue,
    value: any
  ) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setIsSaveDisabled(false);
    setIsResetDisabled(false);
  };

  const handleResetFilter = () => {
    setFilter(initialFilterValue);
    setIsResetDisabled(true);
  };

  const handleFilterSaveAndApply = () => {
    setIsFilterOpen(false);
    getData();
  };

  const getData = async () => {
    setLoading(true);
    try {
      const result = await post(eventDetails.list, {
        page: page + 1,
        limit: pageSize,
        search: globalFilter,
        eventCategory: filter.category ? filter.category : [],
        country: filter.country ? filter.country : [],
        state: filter.state ? filter.state : [],
        city: filter.city ? filter.city : [],
        status: filter.status ? filter.status : [],
        startDate: filter.startDate ? filter.startDate : "",
        endDate: filter.endDate ? filter.endDate : "",
      });
      setData(result.ResponseData.eventLists);
      setTotalRows(result.ResponseData.totalRecords);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, pageSize, globalFilter, activeFilter]);

  useEffect(() => {
    if (statusUpdatingId == -1) {
      getData();
    }
  }, [statusUpdatingId]);
  useEffect(() => {
    if (approveUpdatingId == -1) {
      getData();
    }
  }, [approveUpdatingId]);
  useEffect(() => {
    if (deletingId == -1) {
      getData();
    }
  }, [deletingId]);

  const columns = useMemo<ColumnDef<BrandTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor("srNo", {
        header: "Event ID",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.index + 1 + page * pageSize}
          </Typography>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("eventName", {
        header: "Event Name",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.eventName)}
          </Typography>
        ),
      }),
      columnHelper.accessor("startDate", {
        header: "start date",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.startDate)}
          </Typography>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("endDate", {
        header: "end date",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.endDate)}
          </Typography>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("startTime", {
        header: "start time",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.startTime)}
          </Typography>
        ),
      }),
      columnHelper.accessor("endTime", {
        header: "end time",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.endTime)}
          </Typography>
        ),
      }),
      columnHelper.accessor("cityName", {
        header: "city",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.cityName)}
          </Typography>
        ),
      }),
      columnHelper.accessor("categoryName", {
        header: "Category",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {trimText(row.original.categoryName)}
          </Typography>
        ),
      }),
      columnHelper.accessor("userCount", {
        header: "Registered Users Count",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {/* {trimText(row.original.categoryName)} */} 5
          </Typography>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <div className="flex items-center">
            <CustomChip
              size="small"
              round="true"
              label={row.original.status}
              variant="tonal"
              color={row.original.status === "Active" ? "success" : "warning"}
            />
          </div>
        ),
        enableSorting: false,
      }),

      columnHelper.accessor("eventId", {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Tooltip title="View Details" placement="top">
              <IconButton
                onClick={() =>
                  router.push(`/event-details/detail/${row.original.eventId}`)
                }
              >
                <i className="tabler-external-link text-[22px] text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Details" placement="top">
              <IconButton
                onClick={() =>
                  router.push(`/event-details/edit/${row.original.eventId}`)
                }
              >
                <i className="tabler-edit text-[22px] text-textSecondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <IconButton
                onClick={() => {
                  setIsDeleting(true);
                  setDeletingId(row.original.eventId);
                }}
              >
                <i className="tabler-trash text-[22px] text-textSecondary" />
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [router, page, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      rowSelection,
      globalFilter,
      pagination: { pageIndex: page, pageSize },
    },
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalRows / pageSize),
  });

  const handlePageChange = (event: unknown, newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="max-h-[75vh]">
        <LoadingBackdrop isLoading={loading} />
        <div className="flex justify-between flex-col items-start md:flex-row md:items-center py-2 gap-4">
          <div className="h-10 flex items-center">
            <div>
              <Typography variant="h5" className={`capitalize cursor-pointer`}>
                &nbsp; List of Events &nbsp;
              </Typography>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search"
              className="is-full sm:is-auto"
            />
            <div className="flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4">
              <div className="relative">
                <Button
                  onClick={handleOpenFilter}
                  variant="contained"
                  endIcon={<i className="tabler-filter" />}
                >
                  Filter
                </Button>
                {isFilterOpen && (
                  <EventFilter
                    handleCloseFilter={handleCloseFilter}
                    filterValue={filter}
                    handleFilterChange={handleFilterChange}
                    handleResetFilter={handleResetFilter}
                    handleFilterSaveAndApply={handleFilterSaveAndApply}
                    isSaveDisabled={isSaveDisabled}
                    isResetDisabled={isResetDisabled}
                  />
                )}
              </div>
              <Button
                variant="contained"
                startIcon={<i className="tabler-plus" />}
                onClick={() => router.push("/event-details/add")}
              >
                Add New Event
              </Button>
            </div>
            {/* <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              onClick={() => router.push("/content-management/events/add")}
              className="is-full sm:is-auto"
            >
              Add Event
            </Button> */}
          </div>
        </div>
        <Card className="flex flex-col h-full">
          <div className="overflow-x-auto sm:h-[380px] md:h-[400px] lg:h-[460px]">
            <table className={tableStyles.table}>
              <thead className="">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={classnames({
                              "flex items-center": header.column.getIsSorted(),
                              "cursor-pointer select-none":
                                header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <i className="tabler-chevron-up text-xl" />,
                              desc: (
                                <i className="tabler-chevron-down text-xl" />
                              ),
                            }[header.column.getIsSorted() as "asc" | "desc"] ??
                              null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td
                      colSpan={table.getVisibleFlatColumns().length}
                      className="text-center"
                    >
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={classnames({
                        selected: row.getIsSelected(),
                      })}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <TablePagination
            component="div"
            count={totalRows}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Card>
        <ConfirmationDialog
          open={isDeleting}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
          setOpen={(arg1: boolean) => setIsDeleting(arg1)}
        />
        {isStatusUpdating && (
          <ConfirmUpdateStatus
            statusValue={changeStatusValue}
            open={isStatusUpdating}
            statusUpdatingId={statusUpdatingId}
            setStatusUpdatingId={setStatusUpdatingId}
            setOpen={(arg1: boolean) => setIsStatusUpdating(arg1)}
          />
        )}
        {isApproveUpdating && (
          <ConfirmUpdateApprove
            statusValue={changeStatusValue}
            open={isApproveUpdating}
            approveUpdatingId={approveUpdatingId}
            setApproveUpdatingId={setApproveUpdatingId}
            setOpen={(arg1: boolean) => setIsApproveUpdating(arg1)}
          />
        )}
      </div>
    </>
  );
};

export default EventDetailListTable;
