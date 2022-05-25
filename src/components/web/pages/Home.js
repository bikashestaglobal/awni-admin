import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "../TopNavigation";
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import Footer from "../Footer";

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"))
    if (student) {
      // dispatch({type: "STUDENT", payload: student})
      window.location = "/student/"
    } else {
      // Nothing Do
    }
  }, []);

  return (
    <>
      {/* Top Navigation */}
      <TopNavigation />

      {/* Intro Section */}
      <div className={"container bg-light"} style={{ height: "100%" }}>
        <div className={"row"}>
          <div className={"col-md-6 my-5"}>
            <h1 className={"text-info mt-3"} style={{ fontSize: "40px" }}>Vijay Physics</h1>
            <div className={"devider bg-dark"}></div>
            <h4 className={"my-3"}>Home to Learn Physics!</h4>
            <h5>Here you can learn Physics with high quality videos at affordable price.</h5>
            <div className={"py-2"}>
              <Link className="btn btn-outline-info" to={"/studentLogin"}> <span className="mdi mdi-login"></span> Login </Link>
              <Link className="btn btn-info ml-2" to={"/studentRegistration"}> <span className="mdi mdi-account"></span> Registration </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-none" style={{ background: "none" }}>
              <div className="card-body">
                <img src="../assets/images/website/Animated-OTS-Logo-Medium.gif" className="img img-fluid" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Slider */}
        <div className={"row"}>
          <div className={"col-md-12 px-2"}>
            <div className="text-center mb-4">
              <h2>OUR COURSES</h2>
              <div className={"devider m-auto"} />
              <p className={"my-2"}>
                We provides lots of course for the 11th, 12th, IIT/JEE & MEDICAL students with both mode online and offline.
              </p>
            </div>
            <Slider {...settings}>
              <div className="p-1">
                <div className={"card border-0 rounded-0 mr-2"}>
                  <div className={"card-header bg-white"}>
                    <img className={"img img-fluid"} src={"../assets/images/website/11th.png"} />
                  </div>
                  <div className={"card-body"}>
                    <h4 className={"text-info"}>11th</h4>
                  </div>
                </div>
              </div>

              <div className="p-1">
                <div className={"card border-0 rounded-0 mr-2"}>
                  <div className={"card-header bg-white"}>
                    <img className={"img img-fluid"} src={"../assets/images/website/11th.png"} />
                  </div>
                  <div className={"card-body"}>
                    <h4 className={"text-info"}>12th</h4>
                  </div>
                </div>
              </div>

              <div className="p-1">
                <div className={"card border-0 rounded-0 mr-2"}>
                  <div className={"card-header bg-white"}>
                    <img className={"img img-fluid"} src={"../assets/images/website/iit.png"} />
                  </div>
                  <div className={"card-body"}>
                    <h4 className={"text-info"}>IIT/JEE</h4>
                  </div>
                </div>
              </div>

              <div className="p-1">
                <div className={"card border-0 rounded-0 mr-2"}>
                  <div className={"card-header bg-white"}>
                    <img className={"img img-fluid"} src={"../assets/images/website/medical.png"} />
                  </div>
                  <div className={"card-body"}>
                    <h4 className={"text-info"}>Medical</h4>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        {/* Video Intro */}
        <div className={"row mt-5"}>
          <div className={"col-md-9 m-auto"} >
            <div className="text-center">
              <h2>WHY WAIT JOIN NOW</h2>
              <div className={"devider mb-4 m-auto"} />
              <p className="my-2">
                Join Vijay Physics and boost your knowledge.
              </p>
            </div>
            <div className={"macbook"}>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zMVjauEtwyE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>

        {/* Why Vijay Physics */}
        <div className={"row mt-4"}>
          <div className={"col-md-12 px-2"}>
            <div className="text-center">
              <h2>WE OFFERS</h2>
              <div className={"devider m-auto"} />
            </div>
          </div>

          {/*  */}
          <div className="col-md-12">
            <div className="row">
              <div className={"col-md-3"}>
                <span className={"mdi mdi-web text-info m-0 p-0"} style={{ fontSize: "50px" }} />
                <h3 className={"m-0 p-0"}>Online Classes</h3>
                <p style={{ fontSize: "15px" }}>
                  We offers online classes on Vijay Physics App
            </p>
              </div>

              <div className={"col-md-3"}>
                <span className={"mdi mdi-security-home text-info m-0 p-0"} style={{ fontSize: "50px" }} />
                <h3 className={"m-0 p-0"}>Offline Classes</h3>
                <p style={{ fontSize: "15px" }}>
                  We offers Offline classes at Vijay Physics Near Rangbhumi chowk purnia.
            </p>
              </div>

              <div className={"col-md-3"}>
                <span className={"mdi mdi-book-open-variant text-info m-0 p-0"} style={{ fontSize: "50px" }} />
                <h3 className={"m-0 p-0"}>Online Test</h3>
                <p style={{ fontSize: "15px" }}>
                  We offers online Test on Vijay Physics App
            </p>
              </div>

              <div className={"col-md-3"}>
                <span className={"mdi mdi-book-multiple-variant text-info m-0 p-0"} style={{ fontSize: "50px" }} />
                <h3 className={"m-0 p-0"}>Study Matterials</h3>
                <p style={{ fontSize: "15px" }}>
                  We offers online Test on Vijay Physics App
            </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <Footer />
    </>
  )
};

export default Home;
