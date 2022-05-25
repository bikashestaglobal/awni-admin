import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from '../../config/Config';
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import date from 'date-and-time';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

function OnlineTest() {
  // State Variable

  // const { state, dispatch } = useContext(StudentContext)
  const history = useHistory();
  const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const [session, setSession] = useState({});
  const [allOnlineTest, setAllOnlineTest] = useState([]);
  const [data, setData] = useState({ name: "", video_link: "" });
  const [testStatus, setTestStatus] = useState("");
  const [onlineTestLoaded, setOnlineTestLoaded] = useState(false);

  const updateState = (value) => {
    setData(value);
    counterDownHandler(value.date);
  }

  // Counter Down
  const counterDownHandler = (value) => {
    var countDownDate = new Date(value).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      setTestStatus(days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ");

      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        setTestStatus("EXPIRED");
        return ("EXPIRED");
        // document.getElementById("demo").innerHTML = "EXPIRED";
      }

      return (days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ");
    }, 1000);
  }

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (({ row }) => {
        return (Number(row.id) + 1)
      })
    },
    {
      Header: "TITLE",
      accessor: "name",
    },

    {
      Header: "DATE",
      accessor: "start_date",
      Cell: ({ value }) => { return (date.format(new Date(value), 'DD/MM/YYYY hh:mm:ss A')) }
    },
    {

      Header: "ACTION",
      accessor: "",
      disableSortBy: true,
      Cell: (({ row }) => {

        return (
          <div>
            {new Date() > new Date(row.original.end_date) ?
              <button
                type="button"
                className="ml-2 btn btn-success footable-delete"
                onClick={(evt) => history.push("/student/result/" + row.original._id)}
              >
                <span>Result</span>
              </button> :
              <button
                type="button"
                className="ml-2 btn btn-info footable-delete"
                onClick={(evt) => history.push("/student/startOnlineTest/" + row.original._id)}
              >
                <span>Active</span>
              </button>}
          </div>
        )
      })
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allOnlineTest, [allOnlineTest]);
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

    fetch(Config.SERVER_URL + "/student/searchOnlineTest?session=" + sessionId + "&batch=" + batchId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setOnlineTestLoaded(true);
          if (result.success) {
            setAllOnlineTest(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setOnlineTestLoaded(true);
        }
      );
  }, []);


  return (
    <div className="page-wrapper pt-0" style={{ height: "100%" }}>
      <div className="container-fluid">
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Online Test</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Home</Link>
              </li>
              <li className="breadcrumb-item active">online-test</li>
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
            {onlineTestLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allOnlineTest.length ? (
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


    </div>
  );
}

export default OnlineTest;
