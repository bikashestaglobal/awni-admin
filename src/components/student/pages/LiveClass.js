import React, { useState, useEffect, useContext, useMemo } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from '../../config/Config';
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import date from 'date-and-time';
import $ from 'jquery'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

function LiveClass() {
  // State Variable

  const [isAllLiveClassLoaded, setIsAllLiveClassLoaded] = useState(false);
  const [allLiveClass, setAllLiveClass] = useState([]);
  const [studentDetails, setStudentDetails] = useState(JSON.parse(localStorage.getItem("student")) || {});
  // const { state, dispatch } = useContext(StudentContext)

  const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const [session, setSession] = useState({});
  // Change time 24 hour to 12 hour
  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (row) => {
        return (Number(row.row.id) + 1)
      }
    },
    {
      Header: "ACTION",
      accessor: "",
      disableSortBy: true,
      Cell: row => {
        const stdName = studentDetails.name.replace(/ /g, '').toLowerCase();
        const stdEmail = (studentDetails.student_email || stdName + "@gmail.com").replace(/ /g, '').toLowerCase();
        // return (
        setInterval(() => {
          const currentDate = new Date();
          const currentTime = date.format(currentDate, 'hh:mm:ss A');
          const meetingStartTime = date.transform(row.row.original.start_time, 'HH:mm', 'hh:mm:ss A');
          const meetingEndTime = date.transform(row.row.original.end_time, 'HH:mm', 'hh:mm:ss A');
          if (currentTime > meetingStartTime && currentTime < meetingEndTime) {
            $("#join-meeting").show();
            $("#expired-meeting").hide();
          } else {
            $("#join-meeting").hide();
            $("#expired-meeting").show();
          }
        }, 1000)

        // )
        return (<div>
          <button
            type="button"
            id={"join-meeting"}
            style={{ display: "none" }}
            className="ml-2 btn btn-info footable-delete"
            onClick={(evt) => (window.location = `https://brave-darwin-056034.netlify.app/${row.row.original.zoom_meeting_id}/${row.row.original.zoom_meeting_pwd}/${stdName}/${stdEmail || `${stdName}@gmail.com`}`)}
          >
            <span>Join Now</span>
          </button>
          <button
            type="button"
            id={"expired-meeting"}
            style={{ display: "none" }}
            className="ml-2 btn btn-danger footable-delete"
          >
            <span>Class Time Expired</span>
          </button>
        </div>)
      }
    },
    {
      Header: "LIVE CLASS TOPIC",
      accessor: "topic",
    },
    {
      Header: "DATE",
      accessor: "date",
      Cell: ({ value }) => { return (format(new Date(value), "dd/MM/yyyy")) }
    },
    {
      Header: "START TIME",
      accessor: "start_time",
      Cell: ({ value }) => { return date.transform(value, 'HH:mm', 'hh:mm A') }
    },
    {
      Header: "END TIME",
      accessor: "end_time",
      Cell: ({ value }) => { return date.transform(value, 'HH:mm', 'hh:mm A') }
    },


  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allLiveClass, [allLiveClass]);
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

    fetch(Config.SERVER_URL + "/student/searchMeetingForStudent?session=" + found.session._id + "&batch=" + found.batch._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllLiveClassLoaded(true);
          if (result.success) {
            setAllLiveClass(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllLiveClassLoaded(true);
        }
      );
  }, []);
  return (
    <div className="page-wrapper pt-0" style={{ height: "100%" }}>
      <div className="container-fluid">
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Live Class</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Home</Link>
              </li>
              <li className="breadcrumb-item active">liveClass</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
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
            {isAllLiveClassLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allLiveClass.length ? (
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

      </div>
    </div>

  );
}

export default LiveClass;
