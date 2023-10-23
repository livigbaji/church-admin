//
import { /*useState,*/ useEffect } from "react";
import {
  /*Column,*/ useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";
// import { Pagination } from "@/utils";
// import ClipLoader from "react-spinners/ClipLoader";

import "./table.css";
// import { TableLoader } from "../skeleton-loaders";

interface ITableProps {
  data: any;
  columns: any[];
  pageCount: any;
  // title: string;
  loading?: boolean;
  setQueryParams: any;
  // download?: any;
}

export function Table(props: ITableProps) {
  const {
    data,
    columns,
    loading,
    pageCount: controlledPageCount,
    setQueryParams,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    prepareRow,
    state,
    // nextPage,
    // previousPage,
    // setGlobalFilter,
    // canNextPage,
    // canPreviousPage,
    // pageOptions,
    // gotoPage,
    // pageCount,
  } = useTable(
    { columns, data, manualPagination: true, pageCount: controlledPageCount },
    useGlobalFilter,
    usePagination
  );

  const { /*globalFilter,*/ pageIndex, pageSize } = state;

  useEffect(
    () => {
      setQueryParams((state: any) => ({
        ...state,
        skip: pageIndex,
        limit: pageSize,
      }));
    },
    //eslint-disable-next-line
    [pageIndex, pageSize]
  );
  return (
    <div className="relative table-style">
      <>
        {loading ? (
          // <div className="h-[400px] w-full grid place-content-center bg-transparent">
          //   <ClipLoader color="#753FF5" />
          // </div>
          // <TableLoader />
          <div className="flex items-center justify-center w-full h-full">
            loading...
          </div>
        ) : data.length > 0 ? (
          <>
            <div className="w-full overflow-x-scroll table-view">
              <table {...getTableProps()}>
                <thead className="h-[47px]">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="border-b border-[rgba(81,81,81,0.5)] ani-scale"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* <Pagination
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              canPreviousPage={canPreviousPage}
              previousPage={previousPage}
              canNextPage={canNextPage}
              gotoPage={gotoPage}
              nextPage={nextPage}
            /> */}
          </>
        ) : (
          <div className="w-full h-[400px] overflow-x-scroll">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            </table>
            <div className="w-full h-[80%] grid place-content-center">
              <p className="text-[#151515] font-[500] text-[20px] leading-[27px]">
                There's no Data Available
              </p>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
