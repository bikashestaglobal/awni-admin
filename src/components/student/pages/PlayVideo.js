import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import { Link, useParams } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from '../../config/Config';
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import HtmlParser from 'react-html-parser';

const center = {
    position: "relative",
    top: "20%",
}

function PlayVideo({ location }) {
    const { source, name, video_link, notes_file, description } = location.state;
    const [isLoaded, setIsLoaded] = useState(true)
    return (
        <div className="page-wrapper p-0 m-0 bg-white" style={{ height: "100%" }}>
            <div className="container">
                <div className="row p-0">
                    <div className="col-md-12 m-auto" style={{ backgroundColor: "#000" }}>
                        <div className="" style={center}>
                            {source == "YOUTUBE" ? <span>
                                <iframe width="100%" height="240" src={`https://www.youtube.com/embed/${video_link || ""}?modestbranding=1&amp;rel=0`} title={name || ""} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <div style={{ position: "absolute", top: "0", background: "none", height: "100px", width: "100%" }} />
                            </span> : source == "DAILYMOTION" ? <iframe frameBorder="0" allowFullScreen width="100%" height="240" src={`//www.dailymotion.com/embed/video/${video_link}?ui-logo=0&queue-enable=false&sharing-enable=false&fullscreen=true`}></iframe> : ""}
                        </div>
                    </div>
                    <div className="col-md-12 bg-white p-0">
                        <div className="card px-2 m-0 rounded-0 shadow-none py-2 border-0" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <h5>Notes</h5>
                            {notes_file ? <a href={notes_file} target={"_blank"} download><i className={"mdi mdi-download h5 text-info"} /></a> : <h6>Not Available</h6>}
                        </div>

                    </div>
                    <div className="col-md-12 bg-white p-0 mt-1">
                        <div className="card px-2 m-0 rounded-0 shadow-none py-2 border-0 accordion" id="accordionExample">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <h5>Description</h5>
                                <i className={"mdi mdi-arrow-down-bold-circle text-info h5"} id={"heading"} data-toggle="collapse" data-target="#collapseOne" />
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample" style={{ overflowY: "auto", height: "240px" }}>
                                {description ? <div className="card-body p-0 m-0">
                                    {HtmlParser(description)}
                                </div> : <h6>Not Available</h6>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayVideo;
