import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from '../../config/Config';
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

function FormulaCharts() {
  const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const [session, setSession] = useState({});
  const [allFormulaCharts, setAllFormulaCharts] = useState([]);
  const [formulaChartLoaded, setFormulaChartLoaded] = useState(false);
  const [data, setData] = useState({ name: "", video_link: "" });

  const updateState = (value) => {
    setData(value);
  }

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (({ row }) => { return (Number(row.id) + 1) })
    },
    {
      Header: "TITLE",
      accessor: "name",
    },
    {
      Header: "CHAPTER",
      accessor: "chapter.title",
    },
    {
      Header: "UPLOAD DATE",
      accessor: "created_date",
      Cell: ({ value }) => {
        return (format(new Date(value), "dd/MM/yyyy"))
      }
    },

    {
      Header: "ACTION",
      accessor: "",
      disableSortBy: true,
      Cell: row => {
        return (
          <div>
            <button
              type="button"
              className="ml-2 btn btn-danger footable-delete"
              data-toggle="modal"
              data-target="#viewModal"
              onClick={(evt) => updateState(row.row.original)}
            >
              <span
                className="fas fa-eye"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allFormulaCharts, [allFormulaCharts]);
  const tableInstance = useTable(
    {
      columns,
      data: rows_data,
    },
    useGlobalFilter, useSortBy, usePagination
  );

  // destructuring the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter
  } = tableInstance;

  // Destructuring the state
  const { globalFilter } = state;
  // Destructuring the state
  const { pageIndex, pageSize } = state;
  // Fetching the data
  useEffect(() => {
    // Find selected Session
    const availableSession = studentData.session;
    const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
    setSession(found);
    const sessionId = found.session._id;
    const batchId = found.batch._id;

    fetch(Config.SERVER_URL + "/student/searchFormulaCharts?session=" + sessionId + "&batch=" + batchId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setFormulaChartLoaded(true)
          if (result.success) {
            setAllFormulaCharts(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setFormulaChartLoaded(true)
        }
      );
  }, []);


  return (
    <div className="page-wrapper pt-0 " style={{ height: "100%" }}>
      <div className="container-fluid">
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Formula Charts</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Home</Link>
              </li>
              <li className="breadcrumb-item active">formulaCharts</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Start Page Content */}
        {/* Row */}
        <div className={"row page-titles mb-0 px-1 shadow-none"} style={{ background: "none" }}>
          {/* Video */}
          <div className="col-lg-12 col-xlg-12 col-md-12 px-0">
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

                </div>
              </div>
            </div>


            {/* Data */}
            {formulaChartLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allFormulaCharts.length ? (
                  <div className="card-body py-0 px-1">
                    <div className="table-responsive">

                      <table
                        {...getTableProps()}
                        className={"table table-bordered table-striped my-0"}
                      >
                        <thead>
                          {
                            // Loop over the header rows
                            headerGroups.map((headerGroup) => (
                              // Apply the header row props
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                  // Loop over the headers in each row
                                  headerGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                      {
                                        // Render the header
                                        column.render("Header")
                                      }
                                      <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                      </span>
                                    </th>
                                  ))
                                }
                              </tr>
                            ))
                          }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td {...cell.getCellProps()}>
                                      {" "}
                                      {cell.render("Cell")}{" "}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div>
                        <span>
                          Page:{' '}
                          <strong>
                            {pageIndex + 1} of {pageOptions.length}
                          </strong>
                        </span>
                        <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                          {
                            [10, pageCount * 10].map((val, i) => {
                              return (
                                <option key={i} value={val}> {val} </option>
                              )
                            })
                          }
                        </select>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} >Previous</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} >Next</button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div
                    className={
                      "alert alert-danger mx-3 rounded-0 border-0 py-2"
                    }
                  >
                    No Data Available
                  </div>
                )}
              </div>
            ) : (
              <div className={"bg-white p-3 text-center"}>
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading..
              </div>
            )}
          </div>
          {/* End Video */}
        </div>
        {/* Row */}
        {/* End PAge Content */}
      </div>

      {/* Modal Designing */}
      <div>
        {/* -- View Modal -- */}
        <div className="modal fade" id="viewModal">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content rounded-0">
              <div className={"modal-header"}>
                <h4 className={"float-left"}>View Chapter Layout</h4>
              </div>
              <div className="modal-body">
                {/* Information */}
                <div className={"row"}>
                  <div className={"col-md-12 table-responsive px-0"}>
                    <h4 className={"text-info px-2"}>File Information</h4>
                    <table className={"table table-border table-striped"}>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <th>{data.name ? data.name : "N/A"}</th>
                          <th>Course Type</th>
                          <th>{data.course_type ? data.course_type.name : "N/A"}</th>
                        </tr>

                        <tr>
                          <th>Chapter</th>
                          <th>{data.chapter ? data.chapter.title : "N/A"}</th>
                          <th>Created Date</th>
                          <th>{data.created_date ? format(new Date(data.created_date), "dd/MM/yyyy") : "N/A"}</th>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <div className={"col-md-12 mt-1"}>
                    {data.file ? data.file.match(/\.(jpeg|jpg|gif|png)$/) ? <img /> : <iframe src={data.file ? data.file : ""} style={{ width: "100%", height: "400px" }}></iframe> : ""}

                  </div>
                  <div className={"form-group col-md-12"}>
                    <button
                      className="btn btn-secondary rounded-0 px-3"
                      data-dismiss="modal"
                      id={"closeViewModalButton"}
                    >
                      Close
                      </button>
                    <a href={data.file ? data.file : ""} target="_blank" className={"btn btn-info rounded-0 px-3 ml-2"} download > Download </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default FormulaCharts;
