import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import {format} from 'date-fns';

const GlobalFilter = ({filter, setFilter})=>{
  return(
      <span className={""}>
        <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e)=>setFilter(e.target.value) }/>
      </span>
  )
}

//  Component Function
const QuestionType = React.memo ((props) => {
  const [addingFormData, setAddingFormData] = useState({
    title: "",
    marks: "",
    session: "",
    standard: "",
    comment: "",
  });
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
  const [allStandard, setAllStandard] = useState([]);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  // const [isallQuestionTypeLoaded, setIsallQuestionTypeLoaded] = useState(true);
  const [allQuestionType, setAllQuestionType] = useState([]);
  const [data, setData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData(list);
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();
    fetch(Config.SERVER_URL + "/branch/updateQuestionType", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsUpdateLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsUpdated(true);
            $("#closeUpdateModalButton").click();
          } else {
            if (result.title)
              M.toast({ html: result.title, classes: "bg-danger" });
            if (result.marks)
              M.toast({ html: result.marks, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
            if (result.comment)
              M.toast({ html: result.comment, classes: "bg-danger" });
            if (result.status)
              M.toast({ html: result.status, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsUpdateLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);
    const questionTypeData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/branch/deleteQuestionType", {
      method: "DELETE",
      body: JSON.stringify(questionTypeData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDeleteLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsDeleted(true);
            $("#closeDeleteModalButton").click();
            setDeleteId("");
          } else {
            if (result.Id) M.toast({ html: result._id, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsDeleteLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAdded(false);
    setIsAddLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/branch/addQuestionType", {
      method: "POST",
      body: JSON.stringify({...addingFormData, session : selectedSession}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAddLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            $("#closeAddModalButton").click();
            setIsAdded(true);
            setAddingFormData({
              title: "",
              marks: "",
              standard: "",
              comment: "",
            });
          } else {
            if (result.title)
              M.toast({ html: result.title, classes: "bg-danger" });
            if (result.marks)
              M.toast({ html: result.marks, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });

            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsAddLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Get Data From Database
  useEffect(() => {
    // setIsallQuestionTypeLoaded(true);
    fetch(Config.SERVER_URL + "/branch/searchQuestionType?session="+selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsallQuestionTypeLoaded(false);
          if (result.success) {
            setAllQuestionType(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          // setIsallQuestionTypeLoaded(false);
        }
      );

      // Get All Standard
     fetch(Config.SERVER_URL+"/branch/searchStandard?session="+selectedSession, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // setIsAllCourseTypeLoaded(false);
            if (result.success) {
              setAllStandard(result.data || []);
            //   console.log(allCourseType);
            } else {
              M.toast({ html: result.message, classes: "bg-danger" });
              if(result.session) M.toast({ html: result.session, classes: "bg-danger" });
            }
          },
          (error) => {
            M.toast({ html: error, classes: "bg-danger" });
            // setIsAllCourseTypeLoaded(false);
          }
        );
  }, [isAdded, isUpdated, isDeleted]);

  // Change Branch Session
  const branchSessionHandler = (sessionId)=>{
    localStorage.setItem("branchSession", sessionId);
    window.location.reload();
  }

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "TITLE",
      accessor: "title",
    },
    {
      Header: "MARKS",
      accessor: "marks",
    },
    {
      Header: "STANDARD",
      accessor: "standard.name",
    },
    
    {
      Header: "CREATED DATE",
      accessor: "created_date",
      Cell: ({value})=>{return format(new Date(value), "dd/MM/yyyy")}
    },
    {
      Header: "STATUS",
      accessor: "status",
      // disableSortBy: true,
      Cell: row=>{
        const status = row.row.original.status;
        
        return(
          <span>
            {status ? <span className={"badge badge-info"}>Active</span> : <span className={"badge badge-danger"}>Disable</span>}
          </span>
        )
      }
    },
    {
      Header: "ACTION",
      accessor: "",
      disableSortBy: true,
      Cell: row => {
        
        return(
          <div>
            <button
              type="button"
              className="btn btn-info footable-edit"
              data-toggle="modal"
              data-target="#updateModal"
              onClick={() => updateState(row.row.original)}
            >
              <span
                className="fas fa-pencil-alt"
                aria-hidden="true"
              ></span>
            </button>
            <button
              type="button"
              className="ml-2 btn btn-danger footable-delete"
              data-toggle="modal"
              data-target="#deleteModal"
              onClick={(evt) => setDeleteId(row.row.original._id)}
            >
              <span
                className="fas fa-trash-alt"
                aria-hidden="true"
              ></span>
            </button>

        </div>
        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allQuestionType, [allQuestionType]);
  const tableInstance = useTable(
    {
      columns,
      data: rows_data,
    },
    useGlobalFilter,useSortBy, usePagination
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
  const {globalFilter} = state;
  // Destructuring the state
  const {pageIndex, pageSize} = state;
  // Return function
  return (
    <div className="page-wrapper">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Question Types</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">questionType</li>
            </ol>
          </div>
        </div>

        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row page-titles shadow-none p-0"} style={{background:"none"}}>
          <div className={"col-md-12 px-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> question type
                  </button>
                </div>
              </div>
            </div>

            {/* Data */}
            {/* {!isallQuestionTypeLoaded ? ( */}
              <div className="card border-0 rounded-0 m-0 py-1">
                {allQuestionType.length ? (
                  <div className="card-body py-0">
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
                              {pageIndex+1} of {pageOptions.length}
                            </strong>
                          </span>
                           <select value={pageSize} onChange={(e)=>setPageSize(e.target.value)}>
                             {
                               [10,pageCount*10].map((val, i)=>{
                                 return(
                                   <option key={i} value={val}> {val} </option>
                                 )
                               })
                             }
                           </select>
                           <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
                           <button onClick={()=>previousPage()} disabled={!canPreviousPage} >Previous</button>
                           <button onClick={()=>nextPage()} disabled={!canNextPage} >Next</button>
                           <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}> {'>>'} </button>
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
            {/* ) : (
              <div className={"bg-white p-3 text-center"}>
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading..
              </div>
            )} */}
          </div>
        </div>

        {/* -- Modal Designing -- */}
        <div>
          {/* -- Add Modal -- */}
          <div className="modal fade" id="addModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Add Question Types</h4>
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Title Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            title: evt.target.value,
                          })
                        }
                        value={addingFormData.title}
                        className="form-control"
                        placeholder={"Enter title (Eg: Objective)"}
                      />
                    </div>
                    
                    {/* Marks Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="number"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            marks: evt.target.value,
                          })
                        }
                        value={addingFormData.marks}
                        className="form-control"
                        placeholder={"Enter Marks (Eg: 1)"}
                      />
                    </div>

                    {/* Select Standard */}
                    <div className={"form-group"}>
                      
                      <select
                        className="form-control"
                        onChange={(evt)=>setAddingFormData({...addingFormData, standard: evt.target.value})}
                      >
                        
                        <option value={""} disabled selected hidden> Available Standard </option>
                        {allStandard.map((value, index)=>{
                            return(
                                <option key={index} value={value._id}> {value.name} </option>
                            )
                        })}
                      </select>
                    </div>

                    {/* Comments */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            comment: evt.target.value,
                          })
                        }
                        value={addingFormData.comment}
                        className="form-control"
                        placeholder={"Comments!"}
                      />
                    </div>

                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isAddLaoded ? (
                          <div>
                            <i className="fas fa-plus"></i> Add
                          </div>
                        ) : (
                          <div>
                            <span
                              className="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading..
                          </div>
                        )}
                      </button>

                      <button
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeAddModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Update Modal -- */}
          <div
            className="modal fade"
            id="updateModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Update Question Type</h4>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Title Here */}
                    <div className={"form-group my-3"}>
                      <label className={"text-success"}>Title Here</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({ ...data, title: evt.target.value })
                        }
                        className="form-control border"
                        value={data.title}
                        placeholder={"Enter Title (Eg: Objective)"}
                      />
                    </div>
                    
                    {/* Marks Here */}
                    <div className={"form-group my-3"}>
                      <label className={"text-success"}>Marks Here</label>
                      <input
                        type="number"
                        onChange={(evt) =>
                          setData({ ...data, marks: evt.target.value })
                        }
                        className="form-control border"
                        value={data.marks}
                        placeholder={"Enter Marks (Eg: 1)"}
                      />
                    </div>
                    
                    {/* Select Standard */}
                    <div className={"form-group"}>
                      
                      <select
                        className="form-control"
                        onChange={(evt)=>setData({...data, standard: evt.target.value})}
                      >
                        
                        <option value={""} disabled selected hidden> Available Standard </option>
                        {allStandard.map((value, index)=>{
                            return(
                                <option key={index} value={value._id}> {value.name} </option>
                            )
                        })}
                      </select>
                    </div>


                    {/* Comment */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Comments</label>
                      <input
                        type="text"
                        value={data.comment}
                        onChange={(evt) =>
                          setData({ ...data, comment: evt.target.value })
                        }
                        className="form-control"
                        placeholder={"Comments Here!!"}
                      />
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Select Status!</label>
                      <select
                        className="form-control"
                        onChange={(evt) =>
                          setData({ ...data, status: evt.target.value })
                        }
                      >
                        <option value={""}> Select Status </option>
                        <option
                          value={true}
                          selected={data.status ? "selected" : ""}
                        >
                          Active
                        </option>
                        <option
                          value={false}
                          selected={data.status ? "" : "selected"}
                        >
                          Disable
                        </option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isUpdateLaoded ? (
                          <div>
                            <i className="fas fa-refresh"></i> Update
                          </div>
                        ) : (
                          <div>
                            <span
                              className="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading..
                          </div>
                        )}
                      </button>
                      <button
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeUpdateModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Delete Modal -- */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body text-center">
                  <img
                    style={{ width: "150px" }}
                    className={"img img-fluid"}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5R1g82DqzH4itsxpVCofNGWbAzKN_PJDBew&usqp=CAU"
                    }
                  />
                  <h4 className={"text-center mt-2"}>Do You Want to Delete?</h4>
                  <p className={"badge badge-warning"}>
                    All data that connected with this Session will be
                    automatically deleted.
                  </p>
                  <div className={"form-group"}>
                    <button
                      className="btn btn-info rounded-0 px-3"
                      type={"submit"}
                      onClick={deleteSubmitHandler}
                    >
                      {isDeleteLaoded ? (
                        <div>
                          <i className="fas fa-trash"></i> Yes
                        </div>
                      ) : (
                        <div>
                          <span
                            className="spinner-border spinner-border-sm mr-1"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading..
                        </div>
                      )}
                    </button>
                    <button
                      className="btn btn-secondary rounded-0 ml-2 px-3"
                      data-dismiss="modal"
                      id={"closeDeleteModalButton"}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} );

export default QuestionType;
