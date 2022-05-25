import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import { Link, useHistory, useParams } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from '../../config/Config';
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';

function Videos() {
  // State Variable
  const history = useHistory();
  // const { state, dispatch } = useContext(StudentContext)
  const { type } = useParams();
  const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const [session, setSession] = useState({});
  const [allVideos, setAllVideos] = useState([]);
  const [isAllVideoLoaded, setIsAllVideoLoaded] = useState(false);


  // Fetching the data
  useEffect(() => {
    // Find selected Session
    const availableSession = studentData.session;
    const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
    setSession(found);
    const sessionId = found.session._id;
    const batchId = found.batch._id;

    let videoData = [];

    fetch(Config.SERVER_URL + "/student/searchVideos?session=" + sessionId + "&batch=" + batchId + "&type=" + type, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsallChaptersLoaded(false);
          if (result.success) {
            if (result.data) {
              for (let i = 0; i < result.data.length; i++) {
                if (videoData.some(value => value.title == result.data[i].chapter.title)) {
                  let index = videoData.findIndex(x => x.title == result.data[i].chapter.title);
                  videoData[index].data.push(result.data[i]);
                } else {
                  videoData.push({
                    title: result.data[i].chapter.title,
                    data: [result.data[i]]
                  })
                }

              }

            }


            setAllVideos(videoData);
            // setAllVideos(result.data || []);
            setIsAllVideoLoaded(true);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllVideoLoaded(true);
        }
      );
  }, []);

  return (
    <div className="page-wrapper pt-0" style={{ height: "100%" }}>
      <div className="container-fluid">
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Videos</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Home</Link>
              </li>
              <li className="breadcrumb-item active">videos</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Start Page Content */}
        {/* Row */}
        <div className={"row page-titles mb-0 px-1 shadow-none"} style={{ background: "none" }}>
          {/* Video */}
          <div className="col-lg-12 col-xlg-12 col-md-12 px-0">
            {/* <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

                </div>
              </div>
            </div> */}


            {/* Data */}
            {isAllVideoLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1 shadow-none" style={{ background: "transparent" }}>
                {allVideos.length ? (
                  <div className="accordion" id="accordionExample" style={{ background: "transparent" }}>
                    {allVideos.map((value, index) => {
                      return (
                        <div key={index} className="card border-0 shadow-none mb-1" style={{ background: "transparent" }}>
                          <div className="card-header bg-white ml-0 pl-0 py-2" id={`headingOne${index}`}>
                            <h2 className="m-0 bg-white h6">
                              <button className="btn btn-white btn-block text-left shadow-none border-0" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls="collapseOne">
                                {`${index + 1}) ${value.title}`}
                              </button>
                            </h2>

                            <i data-toggle="collapse" data-target={`#collapse${index}`} style={{ position: "absolute", right: 4, top: 15 }} className={"mdi mdi-arrow-down-bold-circle text-info h5"}></i>
                          </div>

                          <div id={`collapse${index}`} className="collapse px-3 pb-2 bg-dark" aria-labelledby={`headingOne${index}`} data-parent="#accordionExample">

                            {value.data.length ?
                              value.data.map((item, inner_index) => {
                                return (
                                  <div
                                    key={inner_index}
                                    onClick={(evt) => history.push("/student/playVideo", { ...item })}
                                    className="card-body bg-white mt-2 py-2" style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
                                  >
                                    <h6>{`${inner_index + 1}) ${item.name}`}</h6>
                                    <div className="">
                                      <i className="text-danger h5 mdi mdi-play-circle"></i>
                                    </div>
                                  </div>
                                )
                              })
                              : "Video not available"}

                          </div>
                        </div>
                      )
                    })}

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


    </div >
  );
}

export default Videos;
