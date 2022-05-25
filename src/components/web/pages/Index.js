import React from "react";

const Index = () => {
  return (
    <>
      <html className="no-js" lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Cake Shop</title>
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>

        <body>
          {/* Quick view */}
          <div
            className="modal fade custom-modal"
            id="quickViewModal"
            tabindex="-1"
            aria-labelledby="quickViewModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                      <div className="detail-gallery">
                        <span className="zoom-icon">
                          <i className="fi-rs-search"></i>
                        </span>
                        {/* MAIN SLIDES */}
                        <div className="product-image-slider">
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-2.jpg"
                              alt="product image"
                            />
                          </figure>
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-1.jpg"
                              alt="product image"
                            />
                          </figure>
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-3.jpg"
                              alt="product image"
                            />
                          </figure>
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-4.jpg"
                              alt="product image"
                            />
                          </figure>
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-5.jpg"
                              alt="product image"
                            />
                          </figure>
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-6.jpg"
                              alt="product image"
                            />
                          </figure>
                          <figure className="border-radius-10">
                            <img
                              src="assets/imgs/shop/product-16-7.jpg"
                              alt="product image"
                            />
                          </figure>
                        </div>
                        {/* THUMBNAILS */}
                        <div className="slider-nav-thumbnails">
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-3.jpg"
                              alt="product image"
                            />
                          </div>
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-4.jpg"
                              alt="product image"
                            />
                          </div>
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-5.jpg"
                              alt="product image"
                            />
                          </div>
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-6.jpg"
                              alt="product image"
                            />
                          </div>
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-7.jpg"
                              alt="product image"
                            />
                          </div>
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-8.jpg"
                              alt="product image"
                            />
                          </div>
                          <div>
                            <img
                              src="assets/imgs/shop/thumbnail-9.jpg"
                              alt="product image"
                            />
                          </div>
                        </div>
                      </div>
                      {/* End Gallery */}
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="detail-info pr-30 pl-30">
                        <span className="stock-status out-stock">
                          {" "}
                          Sale Off{" "}
                        </span>
                        <h3 className="title-detail">
                          <a
                            href="shop-product-right.html"
                            className="text-heading"
                          >
                            Seeds of Change Organic Quinoa, Brown
                          </a>
                        </h3>
                        <div className="product-detail-rating">
                          <div className="product-rate-cover text-end">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              (32 reviews)
                            </span>
                          </div>
                        </div>
                        <div className="clearfix product-price-cover">
                          <div className="product-price primary-color float-left">
                            <span className="current-price text-brand">
                              $38
                            </span>
                            <span>
                              <span className="save-price font-md color3 ml-15">
                                26% Off
                              </span>
                              <span className="old-price font-md ml-15">
                                $52
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="detail-extralink mb-30">
                          <div className="detail-qty border radius">
                            <a href="#" className="qty-down">
                              <i className="fi-rs-angle-small-down"></i>
                            </a>
                            <span className="qty-val">1</span>
                            <a href="#" className="qty-up">
                              <i className="fi-rs-angle-small-up"></i>
                            </a>
                          </div>
                          <div className="product-extra-link2">
                            <button
                              type="submit"
                              className="button button-add-to-cart"
                            >
                              <i className="fi-rs-shopping-cart"></i>Add to cart
                            </button>
                          </div>
                        </div>
                        <div className="font-xs">
                          <ul>
                            <li className="mb-5">
                              Vendor: <span className="text-brand">Nest</span>
                            </li>
                            <li className="mb-5">
                              MFG:
                              <span className="text-brand"> Jun 4.2022</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* Detail Info */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <header className="header-area header-style-1 header-height-2">
            <div className="mobile-promotion">
              <span>
                Grand opening, <strong>up to 15%</strong> off all items. Only
                <strong>3 days</strong> left
              </span>
            </div>
            <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
              <div className="container">
                <div className="header-wrap">
                  <div className="logo logo-width-1">
                    <a href="index.html">
                      <img src="assets/imgs/theme/logo.png" alt="logo" />
                    </a>
                  </div>
                  <div className="header-right">
                    <div className="search-style-2">
                      <form action="#">
                        <select className="select-active">
                          <option>All Categories</option>
                          <option>Milks and Dairies</option>
                          <option>Wines & Alcohol</option>
                          <option>Clothing & Beauty</option>
                          <option>Pet Foods & Toy</option>
                          <option>Fast food</option>
                          <option>Baking material</option>
                          <option>Vegetables</option>
                          <option>Fresh Seafood</option>
                          <option>Noodles & Rice</option>
                          <option>Ice cream</option>
                        </select>
                        <input type="text" placeholder="Search for items..." />
                      </form>
                    </div>
                    <div className="header-action-right">
                      <div className="header-action-2">
                        <div className="search-location">
                          <form action="#">
                            <select className="select-active">
                              <option>Your Location</option>
                              <option>Alabama</option>
                              <option>Alaska</option>
                              <option>Arizona</option>
                              <option>Delaware</option>
                              <option>Florida</option>
                              <option>Georgia</option>
                              <option>Hawaii</option>
                              <option>Indiana</option>
                              <option>Maryland</option>
                              <option>Nevada</option>
                              <option>New Jersey</option>
                              <option>New Mexico</option>
                              <option>New York</option>
                            </select>
                          </form>
                        </div>
                        <div className="header-action-icon-2">
                          <a href="shop-compare.html">
                            <img
                              className="svgInject"
                              alt="Nest"
                              src="assets/imgs/theme/icons/icon-compare.svg"
                            />
                            <span className="pro-count blue">3</span>
                          </a>
                          <a href="shop-compare.html">
                            <span className="lable ml-0">Compare</span>
                          </a>
                        </div>
                        <div className="header-action-icon-2">
                          <a href="shop-wishlist.html">
                            <img
                              className="svgInject"
                              alt="Nest"
                              src="assets/imgs/theme/icons/icon-heart.svg"
                            />
                            <span className="pro-count blue">6</span>
                          </a>
                          <a href="shop-wishlist.html">
                            <span className="lable">Wishlist</span>
                          </a>
                        </div>
                        <div className="header-action-icon-2">
                          <a className="mini-cart-icon" href="shop-cart.html">
                            <img
                              alt="Nest"
                              src="assets/imgs/theme/icons/icon-cart.svg"
                            />
                            <span className="pro-count blue">2</span>
                          </a>
                          <a href="shop-cart.html">
                            <span className="lable">Cart</span>
                          </a>
                          <div className="cart-dropdown-wrap cart-dropdown-hm2">
                            <ul>
                              <li>
                                <div className="shopping-cart-img">
                                  <a href="shop-product-right.html">
                                    <img
                                      alt="Nest"
                                      src="assets/imgs/shop/thumbnail-3.jpg"
                                    />
                                  </a>
                                </div>
                                <div className="shopping-cart-title">
                                  <h4>
                                    <a href="shop-product-right.html">
                                      Daisy Casual Bag
                                    </a>
                                  </h4>
                                  <h4>
                                    <span>1 × </span>$800.00
                                  </h4>
                                </div>
                                <div className="shopping-cart-delete">
                                  <a href="#">
                                    <i className="fi-rs-cross-small"></i>
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="shopping-cart-img">
                                  <a href="shop-product-right.html">
                                    <img
                                      alt="Nest"
                                      src="assets/imgs/shop/thumbnail-2.jpg"
                                    />
                                  </a>
                                </div>
                                <div className="shopping-cart-title">
                                  <h4>
                                    <a href="shop-product-right.html">
                                      Corduroy Shirts
                                    </a>
                                  </h4>
                                  <h4>
                                    <span>1 × </span>$3200.00
                                  </h4>
                                </div>
                                <div className="shopping-cart-delete">
                                  <a href="#">
                                    <i className="fi-rs-cross-small"></i>
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <div className="shopping-cart-footer">
                              <div className="shopping-cart-total">
                                <h4>
                                  Total <span>$4000.00</span>
                                </h4>
                              </div>
                              <div className="shopping-cart-button">
                                <a href="shop-cart.html" className="outline">
                                  View cart
                                </a>
                                <a href="shop-checkout.html">Checkout</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="header-action-icon-2">
                          <a href="page-account.html">
                            <img
                              className="svgInject"
                              alt="Nest"
                              src="assets/imgs/theme/icons/icon-user.svg"
                            />
                          </a>
                          <a href="page-account.html">
                            <span className="lable ml-0">Account</span>
                          </a>
                          <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                            <ul>
                              <li>
                                <a href="page-account.html">
                                  <i className="fi fi-rs-user mr-10"></i>My
                                  Account
                                </a>
                              </li>
                              <li>
                                <a href="page-account.html">
                                  <i className="fi fi-rs-location-alt mr-10"></i>
                                  Order Tracking
                                </a>
                              </li>
                              <li>
                                <a href="page-account.html">
                                  <i className="fi fi-rs-label mr-10"></i>My
                                  Voucher
                                </a>
                              </li>
                              <li>
                                <a href="shop-wishlist.html">
                                  <i className="fi fi-rs-heart mr-10"></i>My
                                  Wishlist
                                </a>
                              </li>
                              <li>
                                <a href="page-account.html">
                                  <i className="fi fi-rs-settings-sliders mr-10"></i>
                                  Setting
                                </a>
                              </li>
                              <li>
                                <a href="page-login.html">
                                  <i className="fi fi-rs-sign-out mr-10"></i>
                                  Sign out
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-bottom header-bottom-bg-color sticky-bar">
              <div className="container">
                <div className="header-wrap header-space-between position-relative">
                  <div className="logo logo-width-1 d-block d-lg-none">
                    <a href="index.html">
                      <img src="assets/imgs/theme/logo.png" alt="logo" />
                    </a>
                  </div>
                  <div className="header-nav d-none d-lg-flex">
                    <div className="main-categori-wrap d-none d-lg-block">
                      <a className="categories-button-active" href="#">
                        <span className="fi-rs-apps"></span>
                        <span className="et">Browse</span> All Categories
                        <i className="fa fa-angle-down"></i>
                      </a>
                      <div className="categories-dropdown-wrap categories-dropdown-active-large font-heading">
                        <div className="d-flex categori-dropdown-inner">
                          <ul>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-1.svg"
                                  alt=""
                                />
                                Milks and Dairies
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-2.svg"
                                  alt=""
                                />
                                Clothing & beauty
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-3.svg"
                                  alt=""
                                />
                                Pet Foods & Toy
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-4.svg"
                                  alt=""
                                />
                                Baking material
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-5.svg"
                                  alt=""
                                />
                                Fresh Fruit
                              </a>
                            </li>
                          </ul>
                          <ul className="end">
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-6.svg"
                                  alt=""
                                />
                                Wines & Drinks
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-7.svg"
                                  alt=""
                                />
                                Fresh Seafood
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-8.svg"
                                  alt=""
                                />
                                Fast food
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-9.svg"
                                  alt=""
                                />
                                Vegetables
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-right.html">
                                <img
                                  src="assets/imgs/theme/icons/category-10.svg"
                                  alt=""
                                />
                                Bread and Juice
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div
                          className="more_slide_open"
                          style={{ display: "none" }}
                        >
                          <div className="d-flex categori-dropdown-inner">
                            <ul>
                              <li>
                                <a href="shop-grid-right.html">
                                  <img
                                    src="assets/imgs/theme/icons/icon-1.svg"
                                    alt=""
                                  />
                                  Milks and Dairies
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-right.html">
                                  <img
                                    src="assets/imgs/theme/icons/icon-2.svg"
                                    alt=""
                                  />
                                  Clothing & beauty
                                </a>
                              </li>
                            </ul>
                            <ul className="end">
                              <li>
                                <a href="shop-grid-right.html">
                                  <img
                                    src="assets/imgs/theme/icons/icon-3.svg"
                                    alt=""
                                  />
                                  Wines & Drinks
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-right.html">
                                  <img
                                    src="assets/imgs/theme/icons/icon-4.svg"
                                    alt=""
                                  />
                                  Fresh Seafood
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="more_categories">
                          <span className="icon"></span>
                          <span className="heading-sm-1">Show more...</span>
                        </div>
                      </div>
                    </div>
                    <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
                      <nav>
                        <ul>
                          <li className="hot-deals">
                            <img
                              src="assets/imgs/theme/icons/icon-hot.svg"
                              alt="hot deals"
                            />
                            <a href="#">Hot Deals</a>
                          </li>
                          <li>
                            <a className="active" href="index.html">
                              Home{" "}
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              By Flavour <i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="sub-menu">
                              <li>
                                <a href="#">Chocolate Cakes</a>
                              </li>
                              <li>
                                <a href="#">Eggless Cakes</a>
                              </li>
                              <li>
                                <a href="#">Black Forest Cakes</a>
                              </li>
                              <li>
                                <a href="#">Butterscotch Cakes</a>
                              </li>
                              <li>
                                <a href="#">Strawberry Cakes</a>
                              </li>
                              <li>
                                <a href="#">Red Velvet Cakes</a>
                              </li>
                              <li>
                                <a href="#">Vanilla Cakes</a>
                              </li>
                              <li>
                                <a href="#">Mango Cakes</a>
                              </li>
                              <li>
                                <a href="#">Pineapple Cakes</a>
                              </li>
                              <li>
                                <a href="#">Fruit Cakes</a>
                              </li>
                              <li>
                                <a href="#">Blueberry Cakes</a>
                              </li>
                              <li>
                                <a href="#">Kit Kat Cakes</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">
                              By Type <i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="sub-menu">
                              <li>
                                <a href="#">Photo Cakes</a>
                              </li>
                              <li>
                                <a href="#">Vegan Cakes</a>
                              </li>
                              <li>
                                <a href="#">Heart Shaped Cakes</a>
                              </li>
                              <li>
                                <a href="#">Pinata Cakes</a>
                              </li>
                              <li>
                                <a href="#">Party Cakes</a>
                              </li>
                              <li>
                                <a href="#">Bakery Hampers</a>
                              </li>
                              <li>
                                <a href="#">Midnight Cakes</a>
                              </li>
                              <li>
                                <a href="#">Dry Cakes</a>
                              </li>
                              <li>
                                <a href="#">Pull Me Up Cakes</a>
                              </li>
                              <li>
                                <a href="#">All Cakes </a>
                              </li>
                              <li>
                                <a href="#">Half Cakes</a>
                              </li>
                              <li>
                                <a href="#">Bomb Cakes</a>
                              </li>
                              <li>
                                <a href="#">Surprise Cake Box</a>
                              </li>
                              <li>
                                <a href="#">Rose Cakes</a>
                              </li>
                            </ul>
                          </li>
                          <li className="position-static">
                            <a href="#">
                              Special Days<i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="mega-menu">
                              <li className="sub-mega-menu sub-mega-menu-width-22">
                                <a className="menu-title" href="#">
                                  Anniversary
                                </a>
                                <ul>
                                  <li>
                                    <a href="shop.html">
                                      All Anniversary Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      Anniversary Photo Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      1st Anniversary Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      5th Anniversary Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      10th Anniversary Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      25th Anniversary Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      50th Anniversary Cakes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="shop.html">
                                      Anniversary Cakes For Parents
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="sub-mega-menu sub-mega-menu-width-22">
                                <a className="menu-title" href="#">
                                  Birthday
                                </a>
                                <ul>
                                  <li>
                                    <a href="shop.html">All Birthday Cakes</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">1st Birthday Cakes</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cakes for Her</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cakes for Kids</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cakes for Him</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cakes for Husband</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cakes for Wife</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cakes for Father</a>
                                  </li>
                                </ul>
                              </li>
                              <li className="sub-mega-menu sub-mega-menu-width-22">
                                <a className="menu-title" href="#">
                                  Gift Hampers
                                </a>
                                <ul>
                                  <li>
                                    <a href="shop.html">All Designer Cakes</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Baby shower Cakes</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Barbie Cakes</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cartoon Cakes</a>
                                  </li>
                                  <li>
                                    <a href="shop.html">Cricket Theme Cakes</a>
                                  </li>
                                </ul>
                              </li>
                              <li className="sub-mega-menu sub-mega-menu-width-34">
                                <div className="menu-banner-wrap">
                                  <a href="shop-product-right.html">
                                    <img
                                      src="assets/imgs/banner/banner-menu.png"
                                      alt="Nest"
                                    />
                                  </a>
                                  <div className="menu-banner-content">
                                    <h4>Hot deals</h4>
                                    <h3>
                                      Don't miss
                                      <br />
                                      Trending
                                    </h3>
                                    <div className="menu-banner-price">
                                      <span className="new-price text-success">
                                        Save to 50%
                                      </span>
                                    </div>
                                    <div className="menu-banner-btn">
                                      <a href="shop-product-right.html">
                                        Shop now
                                      </a>
                                    </div>
                                  </div>
                                  <div className="menu-banner-discount">
                                    <h3>
                                      <span>25%</span>
                                      off
                                    </h3>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>

                          <li>
                            <a href="#">
                              Desserts <i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="sub-menu">
                              <li>
                                <a href="#">Cup Cakes</a>
                              </li>
                              <li>
                                <a href="#">Personalised Cupcakes</a>
                              </li>
                              <li>
                                <a href="#">Jar Cakes</a>
                              </li>
                              <li>
                                <a href="#">Personalised Jar Cakes</a>
                              </li>
                              <li>
                                <a href="#">Pastries</a>
                              </li>
                              <li>
                                <a href="#">Brownies</a>
                              </li>
                              <li>
                                <a href="#">All Desserts</a>
                              </li>
                            </ul>
                          </li>

                          <li>
                            <a href="#">
                              Designer Cakes{" "}
                              <i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="sub-menu">
                              <li>
                                <a href="#">All Designer Cakes</a>
                              </li>
                              <li>
                                <a href="#">Minion Cakes</a>
                              </li>
                              <li>
                                <a href="#">Baby shower Cakes</a>
                              </li>
                              <li>
                                <a href="#">Princess Cakes</a>
                              </li>
                              <li>
                                <a href="#">Barbie Cakes</a>
                              </li>
                              <li>
                                <a href="#">PUBG Cakes</a>
                              </li>
                              <li>
                                <a href="#">Rainbow Cakes</a>
                              </li>
                              <li>
                                <a href="#">Mickey Mouse Cakes</a>
                              </li>
                              <li>
                                <a href="#">Car Cakes</a>
                              </li>
                              <li>
                                <a href="#">Chota Bheem Cakes</a>
                              </li>
                              <li>
                                <a href="#">Spiderman Cakes</a>
                              </li>
                              <li>
                                <a href="#">Jungle Theme Cakes</a>
                              </li>
                              <li>
                                <a href="#">Cartoon Cakes</a>
                              </li>
                              <li>
                                <a href="#">Alphabet Cakes</a>
                              </li>
                              <li>
                                <a href="#">Number Cakes</a>
                              </li>
                              <li>
                                <a href="#">Cricket Theme Cakes</a>
                              </li>
                              <li>
                                <a href="#">Super Hero Cakes</a>
                              </li>
                            </ul>
                          </li>

                          <li>
                            <a href="#">Contact</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="hotline d-none d-lg-flex">
                    <img
                      src="assets/imgs/theme/icons/icon-headphone.svg"
                      alt="hotline"
                    />
                    <p>
                      1900 - 888<span>24/7 Support Center</span>
                    </p>
                  </div>
                  <div className="header-action-icon-2 d-block d-lg-none">
                    <div className="burger-icon burger-icon-white">
                      <span className="burger-icon-top"></span>
                      <span className="burger-icon-mid"></span>
                      <span className="burger-icon-bottom"></span>
                    </div>
                  </div>
                  <div className="header-action-right d-block d-lg-none">
                    <div className="header-action-2">
                      <div className="header-action-icon-2">
                        <a href="shop-wishlist.html">
                          <img
                            alt="Nest"
                            src="assets/imgs/theme/icons/icon-heart.svg"
                          />
                          <span className="pro-count white">4</span>
                        </a>
                      </div>
                      <div className="header-action-icon-2">
                        <a className="mini-cart-icon" href="shop-cart.html">
                          <img
                            alt="Nest"
                            src="assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count white">2</span>
                        </a>
                        <div className="cart-dropdown-wrap cart-dropdown-hm2">
                          <ul>
                            <li>
                              <div className="shopping-cart-img">
                                <a href="shop-product-right.html">
                                  <img
                                    alt="Nest"
                                    src="assets/imgs/shop/thumbnail-3.jpg"
                                  />
                                </a>
                              </div>
                              <div className="shopping-cart-title">
                                <h4>
                                  <a href="shop-product-right.html">
                                    Plain Striola Shirts
                                  </a>
                                </h4>
                                <h3>
                                  <span>1 × </span>$800.00
                                </h3>
                              </div>
                              <div className="shopping-cart-delete">
                                <a href="#">
                                  <i className="fi-rs-cross-small"></i>
                                </a>
                              </div>
                            </li>
                            <li>
                              <div className="shopping-cart-img">
                                <a href="shop-product-right.html">
                                  <img
                                    alt="Nest"
                                    src="assets/imgs/shop/thumbnail-4.jpg"
                                  />
                                </a>
                              </div>
                              <div className="shopping-cart-title">
                                <h4>
                                  <a href="shop-product-right.html">
                                    Macbook Pro 2022
                                  </a>
                                </h4>
                                <h3>
                                  <span>1 × </span>$3500.00
                                </h3>
                              </div>
                              <div className="shopping-cart-delete">
                                <a href="#">
                                  <i className="fi-rs-cross-small"></i>
                                </a>
                              </div>
                            </li>
                          </ul>
                          <div className="shopping-cart-footer">
                            <div className="shopping-cart-total">
                              <h4>
                                Total <span>$383.00</span>
                              </h4>
                            </div>
                            <div className="shopping-cart-button">
                              <a href="shop-cart.html">View cart</a>
                              <a href="shop-checkout.html">Checkout</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="mobile-header-active mobile-header-wrapper-style">
            <div className="mobile-header-wrapper-inner">
              <div className="mobile-header-top">
                <div className="mobile-header-logo">
                  <a href="index.html">
                    <img
                      src="assets/imgs/theme/logo.png
"
                      alt="logo"
                    />
                  </a>
                </div>
                <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                  <button className="close-style search-close">
                    <i className="icon-top"></i>
                    <i className="icon-bottom"></i>
                  </button>
                </div>
              </div>
              <div className="mobile-header-content-area">
                <div className="mobile-search search-style-3 mobile-header-border">
                  <form action="#">
                    <input type="text" placeholder="Search for items…" />
                    <button type="submit">
                      <i className="fi-rs-search"></i>
                    </button>
                  </form>
                </div>
                <div className="mobile-menu-wrap mobile-header-border">
                  {/* mobile menu start */}
                  <nav>
                    <ul className="mobile-menu font-heading">
                      <li className="menu-item-has-children">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Cake</a>
                      </li>

                      <li className="menu-item-has-children">
                        <a href="#">By Flavour</a>
                        <ul className="dropdown">
                          <li>
                            <a href="#">Chocolate Cakes</a>
                          </li>
                          <li>
                            <a href="#">Eggless Cakes</a>
                          </li>
                          <li>
                            <a href="#">Black Forest Cakes</a>
                          </li>
                          <li>
                            <a href="#">Butterscotch Cakes</a>
                          </li>
                          <li>
                            <a href="#">Strawberry Cakes</a>
                          </li>
                          <li>
                            <a href="#">Red Velvet Cakes</a>
                          </li>
                          <li>
                            <a href="#">Vanilla Cakes</a>
                          </li>
                          <li>
                            <a href="#">Mango Cakes</a>
                          </li>
                          <li>
                            <a href="#">Pineapple Cakes</a>
                          </li>
                          <li>
                            <a href="#">Fruit Cakes</a>
                          </li>
                          <li>
                            <a href="#">Blueberry Cakes</a>
                          </li>
                          <li>
                            <a href="#">Kit Kat Cakes</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">By Type</a>
                        <ul className="dropdown">
                          <li>
                            <a href="#">Photo Cakes</a>
                          </li>
                          <li>
                            <a href="#">Vegan Cakes</a>
                          </li>
                          <li>
                            <a href="#">Heart Shaped Cakes</a>
                          </li>
                          <li>
                            <a href="#">Pinata Cakes</a>
                          </li>
                          <li>
                            <a href="#">Party Cakes</a>
                          </li>
                          <li>
                            <a href="#">Bakery Hampers</a>
                          </li>
                          <li>
                            <a href="#">Midnight Cakes</a>
                          </li>
                          <li>
                            <a href="#">Dry Cakes</a>
                          </li>
                          <li>
                            <a href="#">Pull Me Up Cakes</a>
                          </li>
                          <li>
                            <a href="#">All Cakes </a>
                          </li>
                          <li>
                            <a href="#">Half Cakes</a>
                          </li>
                          <li>
                            <a href="#">Bomb Cakes</a>
                          </li>
                          <li>
                            <a href="#">Surprise Cake Box</a>
                          </li>
                          <li>
                            <a href="#">Rose Cakes</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Special Days</a>
                        <ul className="dropdown">
                          <li className="menu-item-has-children">
                            <a href="#">Anniversary</a>
                            <ul className="dropdown">
                              <li>
                                <a href="shop.html">All Anniversary Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">Anniversary Photo Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">1st Anniversary Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">5th Anniversary Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">10th Anniversary Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">25th Anniversary Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">50th Anniversary Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">
                                  Anniversary Cakes For Parents
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a href="#">Birthday</a>
                            <ul className="dropdown">
                              <li>
                                <a href="shop.html">All Birthday Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">1st Birthday Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">Cakes for Her</a>
                              </li>
                              <li>
                                <a href="shop.html">Cakes for Kids</a>
                              </li>
                              <li>
                                <a href="shop.html">Cakes for Him</a>
                              </li>
                              <li>
                                <a href="shop.html">Cakes for Husband</a>
                              </li>
                              <li>
                                <a href="shop.html">Cakes for Wife</a>
                              </li>
                              <li>
                                <a href="shop.html">Cakes for Father</a>
                              </li>
                            </ul>
                          </li>
                          <li className="menu-item-has-children">
                            <a href="#">Gift Hampers</a>
                            <ul className="dropdown">
                              <li>
                                <a href="shop.html">All Designer Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">Baby shower Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">Barbie Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">Cartoon Cakes</a>
                              </li>
                              <li>
                                <a href="shop.html">Cricket Theme Cakes</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li className="menu-item-has-children">
                        <a href="#">Desserts</a>
                        <ul className="dropdown">
                          <li>
                            <a href="#">Cup Cakes</a>
                          </li>
                          <li>
                            <a href="#">Personalised Cupcakes</a>
                          </li>
                          <li>
                            <a href="#">Jar Cakes</a>
                          </li>
                          <li>
                            <a href="#">Personalised Jar Cakes</a>
                          </li>
                          <li>
                            <a href="#">Pastries</a>
                          </li>
                          <li>
                            <a href="#">Brownies</a>
                          </li>
                          <li>
                            <a href="#">All Desserts</a>
                          </li>
                        </ul>
                      </li>

                      <li className="menu-item-has-children">
                        <a href="#">Designer Cakes</a>
                        <ul className="dropdown">
                          <li>
                            <a href="#">All Designer Cakes</a>
                          </li>
                          <li>
                            <a href="#">Minion Cakes</a>
                          </li>
                          <li>
                            <a href="#">Baby shower Cakes</a>
                          </li>
                          <li>
                            <a href="#">Princess Cakes</a>
                          </li>
                          <li>
                            <a href="#">Barbie Cakes</a>
                          </li>
                          <li>
                            <a href="#">PUBG Cakes</a>
                          </li>
                          <li>
                            <a href="#">Rainbow Cakes</a>
                          </li>
                          <li>
                            <a href="#">Mickey Mouse Cakes</a>
                          </li>
                          <li>
                            <a href="#">Car Cakes</a>
                          </li>
                          <li>
                            <a href="#">Chota Bheem Cakes</a>
                          </li>
                          <li>
                            <a href="#">Spiderman Cakes</a>
                          </li>
                          <li>
                            <a href="#">Jungle Theme Cakes</a>
                          </li>
                          <li>
                            <a href="#">Cartoon Cakes</a>
                          </li>
                          <li>
                            <a href="#">Alphabet Cakes</a>
                          </li>
                          <li>
                            <a href="#">Number Cakes</a>
                          </li>
                          <li>
                            <a href="#">Cricket Theme Cakes</a>
                          </li>
                          <li>
                            <a href="#">Super Hero Cakes</a>
                          </li>
                        </ul>
                      </li>

                      <li className="menu-item-has-children">
                        <a href="blog-category-fullwidth.html">Blog</a>
                      </li>

                      <li className="menu-item-has-children">
                        <a href="#">Language</a>
                        <ul className="dropdown">
                          <li>
                            <a href="#">English</a>
                          </li>
                          <li>
                            <a href="#">French</a>
                          </li>
                          <li>
                            <a href="#">German</a>
                          </li>
                          <li>
                            <a href="#">Spanish</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                  {/* mobile menu end */}
                </div>
                <div className="mobile-header-info-wrap">
                  <div className="single-mobile-header-info">
                    <a href="page-contact.html">
                      <i className="fi-rs-marker"></i> Our location
                    </a>
                  </div>
                  <div className="single-mobile-header-info">
                    <a href="page-login.html">
                      <i className="fi-rs-user"></i>Log In / Sign Up
                    </a>
                  </div>
                  <div className="single-mobile-header-info">
                    <a href="#">
                      <i className="fi-rs-headphones"></i>(+01) - 2345 - 6789
                    </a>
                  </div>
                </div>
                <div className="mobile-social-icon mb-50">
                  <h6 className="mb-15">Follow Us</h6>
                  <a href="#">
                    <img
                      src="assets/imgs/theme/icons/icon-facebook-white.svg"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/imgs/theme/icons/icon-twitter-white.svg"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/imgs/theme/icons/icon-instagram-white.svg"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/imgs/theme/icons/icon-pinterest-white.svg"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/imgs/theme/icons/icon-youtube-white.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="site-copyright">
                  Copyright 2022 © Cake Shop. All rights reserved.
                </div>
              </div>
            </div>
          </div>
          {/*End header*/}
          <main className="main">
            <section className="home-slider style-2 position-relative mb-50">
              <div className="container">
                <div className="row">
                  <div className="col-xl-8 col-lg-12">
                    <div className="home-slide-cover">
                      <div className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
                        <div
                          className="single-hero-slider single-animation-wrap"
                          style={{
                            backgroundImage:
                              "url(assets/imgs/slider/slider-3.png)",
                          }}
                        >
                          <div className="slider-content">
                            <h1 className="display-2 mb-40">
                              Pure Coffe
                              <br />
                              Big discount
                            </h1>
                            <p className="mb-65">
                              Save up to 50% off on your first order
                            </p>
                            <form className="form-subcriber d-flex">
                              <input
                                type="email"
                                placeholder="Your emaill address"
                              />
                              <button className="btn" type="submit">
                                Subscribe
                              </button>
                            </form>
                          </div>
                        </div>
                        <div
                          className="single-hero-slider single-animation-wrap"
                          style={{
                            backgroundImage:
                              "url(assets/imgs/slider/slider-4.png)",
                          }}
                        >
                          <div className="slider-content">
                            <h1 className="display-2 mb-40">
                              Snacks box
                              <br />
                              daily save
                            </h1>
                            <p className="mb-65">
                              Sign up for the daily newsletter
                            </p>
                            <form className="form-subcriber d-flex">
                              <input
                                type="email"
                                placeholder="Your emaill address"
                              />
                              <button className="btn" type="submit">
                                Subscribe
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="slider-arrow hero-slider-1-arrow"></div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-none d-xl-block">
                    <div className="banner-img style-3 animated animated">
                      <div className="banner-text mt-50">
                        <h2 className="mb-50">
                          Delivered <br />
                          to
                          <span className="text-brand">
                            your
                            <br />
                            home
                          </span>
                        </h2>
                        <a href="shop-grid-right.html" className="btn btn-xs">
                          Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*End hero slider*/}
            <section className="banners mb-25">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="banner-img">
                      <img src="assets/imgs/banner/banner-1.png" alt="" />
                      <div className="banner-text">
                        <h4>
                          Everyday Fresh & <br />
                          Clean with Our
                          <br />
                          Products
                        </h4>
                        <a href="shop-grid-right.html" className="btn btn-xs">
                          Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="banner-img">
                      <img src="assets/imgs/banner/banner-2.png" alt="" />
                      <div className="banner-text">
                        <h4>
                          Make your Breakfast
                          <br />
                          Healthy and Easy
                        </h4>
                        <a href="shop-grid-right.html" className="btn btn-xs">
                          Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-md-none d-lg-flex">
                    <div className="banner-img mb-sm-0">
                      <img src="assets/imgs/banner/banner-3.png" alt="" />
                      <div className="banner-text">
                        <h4>
                          The best Organic <br />
                          Products Online
                        </h4>
                        <a href="shop-grid-right.html" className="btn btn-xs">
                          Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*End banners*/}
            <section className="product-tabs section-padding position-relative">
              <div className="container">
                <div className="section-title style-2">
                  <h3>Popular Products</h3>
                  <ul className="nav nav-tabs links" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="nav-tab-one"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-one"
                        type="button"
                        role="tab"
                        aria-controls="tab-one"
                        aria-selected="true"
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-two"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-two"
                        type="button"
                        role="tab"
                        aria-controls="tab-two"
                        aria-selected="false"
                      >
                        Milks & Dairies
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-three"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-three"
                        type="button"
                        role="tab"
                        aria-controls="tab-three"
                        aria-selected="false"
                      >
                        Coffes & Teas
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-four"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-four"
                        type="button"
                        role="tab"
                        aria-controls="tab-four"
                        aria-selected="false"
                      >
                        Pet Foods
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-five"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-five"
                        type="button"
                        role="tab"
                        aria-controls="tab-five"
                        aria-selected="false"
                      >
                        Meats
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-six"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-six"
                        type="button"
                        role="tab"
                        aria-controls="tab-six"
                        aria-selected="false"
                      >
                        Vegetables
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-seven"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-seven"
                        type="button"
                        role="tab"
                        aria-controls="tab-seven"
                        aria-selected="false"
                      >
                        Fruits
                      </button>
                    </li>
                  </ul>
                </div>
                {/*End nav-tabs*/}
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="tab-one"
                    role="tabpanel"
                    aria-labelledby="tab-one"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-1-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-1-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-2-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-2-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-3-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-3-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-4-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-4-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-5-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-5-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-6-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-6-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab one*/}
                  <div
                    className="tab-pane fade"
                    id="tab-two"
                    role="tabpanel"
                    aria-labelledby="tab-two"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-12-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-12-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-13-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-13-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-14-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-14-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-15-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-15-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-16-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-16-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab two*/}
                  <div
                    className="tab-pane fade"
                    id="tab-three"
                    role="tabpanel"
                    aria-labelledby="tab-three"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-6-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-6-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-5-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-5-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-4-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-4-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-3-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-3-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-2-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-2-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-1-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-1-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab three*/}
                  <div
                    className="tab-pane fade"
                    id="tab-four"
                    role="tabpanel"
                    aria-labelledby="tab-four"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-6-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-6-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-4-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-4-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-3-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-3-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-2-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-2-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-1-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-1-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-11-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-11-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-12-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-12-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab four*/}
                  <div
                    className="tab-pane fade"
                    id="tab-five"
                    role="tabpanel"
                    aria-labelledby="tab-five"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-12-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-12-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-13-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-13-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-14-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-14-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-15-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-15-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-16-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-16-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-5-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-5-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab five*/}
                  <div
                    className="tab-pane fade"
                    id="tab-six"
                    role="tabpanel"
                    aria-labelledby="tab-six"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-4-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-4-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-6-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-6-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-5-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-5-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-6-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-6-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab six*/}
                  <div
                    className="tab-pane fade"
                    id="tab-seven"
                    role="tabpanel"
                    aria-labelledby="tab-seven"
                  >
                    <div className="row product-grid-4">
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-5-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-5-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Seeds of Change Organic Quinoa, Brown, & Red
                                Rice
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$28.85</span>
                                <span className="old-price">$32.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-3-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-3-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                All Natural Italian-Style Chicken Meatballs
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (3.5)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Stouffer</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$52.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="new">New</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Angie’s Boomchickapop Sweet & Salty Kettle Corn
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">StarKist</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$48.85</span>
                                <span className="old-price">$52.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Vegetables</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Foster Farms Takeout Crispy Classic Buffalo
                                Wings
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$17.85</span>
                                <span className="old-price">$19.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap mb-30">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="best">-14%</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Pet Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Blue Diamond Almonds Lightly Salted Vegetables
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-16-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-16-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Hodo Foods</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Chobani Complete Vanilla Greek Yogurt
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$54.85</span>
                                <span className="old-price">$55.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-7-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-7-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Meats</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Canada Dry Ginger Ale – 2 L Bottle - 200ml -
                                400g
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$32.85</span>
                                <span className="old-price">$33.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-8-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-8-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="sale">Sale</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Snack</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Encore Seafoods Stuffed Alaskan Salmon
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">NestFood</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$35.85</span>
                                <span className="old-price">$37.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-9-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-9-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                            <div className="product-badges product-badges-position product-badges-mrg">
                              <span className="hot">Hot</span>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Coffes</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Gorton’s Beer Battered Fish Fillets with soft
                                paper
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By
                                <a href="vendor-details-1.html">Old El Paso</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$23.85</span>
                                <span className="old-price">$25.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-none d-xl-block">
                        <div className="product-cart-wrap">
                          <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">
                              <a href="shop-product-right.html">
                                <img
                                  className="default-img"
                                  src="assets/imgs/shop/product-10-1.jpg"
                                  alt=""
                                />
                                <img
                                  className="hover-img"
                                  src="assets/imgs/shop/product-10-2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="product-action-1">
                              <a
                                aria-label="Add To Wishlist"
                                className="action-btn"
                                href="shop-wishlist.html"
                              >
                                <i className="fi-rs-heart"></i>
                              </a>
                              <a
                                aria-label="Compare"
                                className="action-btn"
                                href="shop-compare.html"
                              >
                                <i className="fi-rs-shuffle"></i>
                              </a>
                              <a
                                aria-label="Quick view"
                                className="action-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                              >
                                <i className="fi-rs-eye"></i>
                              </a>
                            </div>
                          </div>
                          <div className="product-content-wrap">
                            <div className="product-category">
                              <a href="shop-grid-right.html">Cream</a>
                            </div>
                            <h2>
                              <a href="shop-product-right.html">
                                Haagen-Dazs Caramel Cone Ice Cream Ketchup
                              </a>
                            </h2>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (2.0)
                              </span>
                            </div>
                            <div>
                              <span className="font-small text-muted">
                                By <a href="vendor-details-1.html">Tyson</a>
                              </span>
                            </div>
                            <div className="product-card-bottom">
                              <div className="product-price">
                                <span>$22.85</span>
                                <span className="old-price">$24.8</span>
                              </div>
                              <div className="add-cart">
                                <a className="add" href="shop-cart.html">
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end product card*/}
                    </div>
                    {/*End product-grid-4*/}
                  </div>
                  {/*En tab seven*/}
                </div>
                {/*End tab-content*/}
              </div>
            </section>
            {/*Products Tabs*/}
            <section className="section-padding pb-5">
              <div className="container">
                <div className="section-title">
                  <h3 className="">Daily Best Sells</h3>
                  <ul
                    className="nav nav-tabs links"
                    id="myTab-2"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="nav-tab-one-1"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-one-1"
                        type="button"
                        role="tab"
                        aria-controls="tab-one"
                        aria-selected="true"
                      >
                        Featured
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-two-1"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-two-1"
                        type="button"
                        role="tab"
                        aria-controls="tab-two"
                        aria-selected="false"
                      >
                        Popular
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="nav-tab-three-1"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-three-1"
                        type="button"
                        role="tab"
                        aria-controls="tab-three"
                        aria-selected="false"
                      >
                        New added
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col-lg-3 d-none d-lg-flex">
                    <div className="banner-img style-2">
                      <div className="banner-text">
                        <h2 className="mb-100">Bring nature into your home</h2>
                        <a href="shop-grid-right.html" className="btn btn-xs">
                          Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-12">
                    <div className="tab-content" id="myTabContent-1">
                      <div
                        className="tab-pane fade show active"
                        id="tab-one-1"
                        role="tabpanel"
                        aria-labelledby="tab-one-1"
                      >
                        <div className="carausel-4-columns-cover arrow-center position-relative">
                          <div
                            className="slider-arrow slider-arrow-2 carausel-4-columns-arrow"
                            id="carausel-4-columns-arrows"
                          ></div>
                          <div
                            className="carausel-4-columns carausel-arrow-center"
                            id="carausel-4-columns"
                          >
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-1-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-1-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="hot">Save 15%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Seeds of Change Organic Quinoa, Brown
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-5-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-5-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="new">Save 35%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    All Natural Italian-Style Chicken Meatballs
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-2-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-2-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="sale">Sale</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Angie’s Boomchickapop Sweet and womnies
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-3-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-3-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="best">Best sale</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Foster Farms Takeout Crispy Classic
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-4-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-4-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="hot">Save 15%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Blue Diamond Almonds Lightly Salted
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                          </div>
                        </div>
                      </div>
                      {/*End tab-pane*/}
                      <div
                        className="tab-pane fade"
                        id="tab-two-1"
                        role="tabpanel"
                        aria-labelledby="tab-two-1"
                      >
                        <div className="carausel-4-columns-cover arrow-center position-relative">
                          <div
                            className="slider-arrow slider-arrow-2 carausel-4-columns-arrow"
                            id="carausel-4-columns-2-arrows"
                          ></div>
                          <div
                            className="carausel-4-columns carausel-arrow-center"
                            id="carausel-4-columns-2"
                          >
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-10-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-10-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="hot">Save 15%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Canada Dry Ginger Ale – 2 L Bottle
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-15-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-15-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="new">Save 35%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Encore Seafoods Stuffed Alaskan
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-12-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-12-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="sale">Sale</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Gorton’s Beer Battered Fish
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-13-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-13-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="best">Best sale</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Haagen-Dazs Caramel Cone Ice
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-14-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-14-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="hot">Save 15%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Italian-Style Chicken Meatball
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="tab-three-1"
                        role="tabpanel"
                        aria-labelledby="tab-three-1"
                      >
                        <div className="carausel-4-columns-cover arrow-center position-relative">
                          <div
                            className="slider-arrow slider-arrow-2 carausel-4-columns-arrow"
                            id="carausel-4-columns-3-arrows"
                          ></div>
                          <div
                            className="carausel-4-columns carausel-arrow-center"
                            id="carausel-4-columns-3"
                          >
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-7-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-7-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="hot">Save 15%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Perdue Simply Smart Organics Gluten Free
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-8-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-8-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="new">Save 35%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Seeds of Change Organic Quinoa
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-9-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-9-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="sale">Sale</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Signature Wood-Fired Mushroom
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-13-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-13-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="best">Best sale</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Simply Lemonade with Raspberry Juice
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                            <div className="product-cart-wrap">
                              <div className="product-img-action-wrap">
                                <div className="product-img product-img-zoom">
                                  <a href="shop-product-right.html">
                                    <img
                                      className="default-img"
                                      src="assets/imgs/shop/product-14-1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-img"
                                      src="assets/imgs/shop/product-14-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="product-action-1">
                                  <a
                                    aria-label="Quick view"
                                    className="action-btn small hover-up"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i className="fi-rs-eye"></i>
                                  </a>
                                  <a
                                    aria-label="Add To Wishlist"
                                    className="action-btn small hover-up"
                                    href="shop-wishlist.html"
                                  >
                                    <i className="fi-rs-heart"></i>
                                  </a>
                                  <a
                                    aria-label="Compare"
                                    className="action-btn small hover-up"
                                    href="shop-compare.html"
                                  >
                                    <i className="fi-rs-shuffle"></i>
                                  </a>
                                </div>
                                <div className="product-badges product-badges-position product-badges-mrg">
                                  <span className="hot">Save 15%</span>
                                </div>
                              </div>
                              <div className="product-content-wrap">
                                <div className="product-category">
                                  <a href="shop-grid-right.html">Hodo Foods</a>
                                </div>
                                <h2>
                                  <a href="shop-product-right.html">
                                    Organic Quinoa, Brown, & Red Rice
                                  </a>
                                </h2>
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "80%" }}
                                  ></div>
                                </div>
                                <div className="product-price mt-10">
                                  <span>$238.85 </span>
                                  <span className="old-price">$245.8</span>
                                </div>
                                <div className="sold mt-15 mb-15">
                                  <div className="progress mb-5">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "50%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="font-xs text-heading">
                                    Sold: 90/120
                                  </span>
                                </div>
                                <a
                                  href="shop-cart.html"
                                  className="btn w-100 hover-up"
                                >
                                  <i className="fi-rs-shopping-cart mr-5"></i>
                                  Add To Cart
                                </a>
                              </div>
                            </div>
                            {/*End product Wrap*/}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*End tab-content*/}
                  </div>
                  {/*End Col-lg-9*/}
                </div>
              </div>
            </section>
            {/*End Best Sales*/}
            <section className="section-padding pb-5">
              <div className="container">
                <div className="section-title">
                  <h3 className="">Deals Of The Day</h3>
                  <a className="show-all" href="shop-grid-right.html">
                    All Deals
                    <i className="fi-rs-angle-right"></i>
                  </a>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-cart-wrap style-2">
                      <div className="product-img-action-wrap">
                        <div className="product-img">
                          <a href="shop-product-right.html">
                            <img src="assets/imgs/banner/banner-5.png" alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="product-content-wrap">
                        <div className="deals-countdown-wrap">
                          <div
                            className="deals-countdown"
                            data-countdown="2025/03/25 00:00:00"
                          ></div>
                        </div>
                        <div className="deals-content">
                          <h2>
                            <a href="shop-product-right.html">
                              Seeds of Change Organic Quinoa, Brown, & Red Rice
                            </a>
                          </h2>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div>
                            <span className="font-small text-muted">
                              By <a href="vendor-details-1.html">NestFood</a>
                            </span>
                          </div>
                          <div className="product-card-bottom">
                            <div className="product-price">
                              <span>$32.85</span>
                              <span className="old-price">$33.8</span>
                            </div>
                            <div className="add-cart">
                              <a className="add" href="shop-cart.html">
                                <i className="fi-rs-shopping-cart mr-5"></i>Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-cart-wrap style-2">
                      <div className="product-img-action-wrap">
                        <div className="product-img">
                          <a href="shop-product-right.html">
                            <img src="assets/imgs/banner/banner-6.png" alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="product-content-wrap">
                        <div className="deals-countdown-wrap">
                          <div
                            className="deals-countdown"
                            data-countdown="2026/04/25 00:00:00"
                          ></div>
                        </div>
                        <div className="deals-content">
                          <h2>
                            <a href="shop-product-right.html">
                              Perdue Simply Smart Organics Gluten Free
                            </a>
                          </h2>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div>
                            <span className="font-small text-muted">
                              By
                              <a href="vendor-details-1.html">Old El Paso</a>
                            </span>
                          </div>
                          <div className="product-card-bottom">
                            <div className="product-price">
                              <span>$24.85</span>
                              <span className="old-price">$26.8</span>
                            </div>
                            <div className="add-cart">
                              <a className="add" href="shop-cart.html">
                                <i className="fi-rs-shopping-cart mr-5"></i>Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 d-none d-lg-block">
                    <div className="product-cart-wrap style-2">
                      <div className="product-img-action-wrap">
                        <div className="product-img">
                          <a href="shop-product-right.html">
                            <img src="assets/imgs/banner/banner-7.png" alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="product-content-wrap">
                        <div className="deals-countdown-wrap">
                          <div
                            className="deals-countdown"
                            data-countdown="2027/03/25 00:00:00"
                          ></div>
                        </div>
                        <div className="deals-content">
                          <h2>
                            <a href="shop-product-right.html">
                              Signature Wood-Fired Mushroom and Caramelized
                            </a>
                          </h2>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "80%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (3.0)
                            </span>
                          </div>
                          <div>
                            <span className="font-small text-muted">
                              By <a href="vendor-details-1.html">Progresso</a>
                            </span>
                          </div>
                          <div className="product-card-bottom">
                            <div className="product-price">
                              <span>$12.85</span>
                              <span className="old-price">$13.8</span>
                            </div>
                            <div className="add-cart">
                              <a className="add" href="shop-cart.html">
                                <i className="fi-rs-shopping-cart mr-5"></i>Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 d-none d-xl-block">
                    <div className="product-cart-wrap style-2">
                      <div className="product-img-action-wrap">
                        <div className="product-img">
                          <a href="shop-product-right.html">
                            <img src="assets/imgs/banner/banner-8.png" alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="product-content-wrap">
                        <div className="deals-countdown-wrap">
                          <div
                            className="deals-countdown"
                            data-countdown="2025/02/25 00:00:00"
                          ></div>
                        </div>
                        <div className="deals-content">
                          <h2>
                            <a href="shop-product-right.html">
                              Simply Lemonade with Raspberry Juice
                            </a>
                          </h2>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "80%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (3.0)
                            </span>
                          </div>
                          <div>
                            <span className="font-small text-muted">
                              By <a href="vendor-details-1.html">Yoplait</a>
                            </span>
                          </div>
                          <div className="product-card-bottom">
                            <div className="product-price">
                              <span>$15.85</span>
                              <span className="old-price">$16.8</span>
                            </div>
                            <div className="add-cart">
                              <a className="add" href="shop-cart.html">
                                <i className="fi-rs-shopping-cart mr-5"></i>Add
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*End Deals*/}
            <section className="section-padding mb-30">
              <div className="container">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0">
                    <h4 className="section-title style-1 mb-30 animated animated">
                      Top Selling
                    </h4>
                    <div className="product-list-small animated animated">
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-1.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Nestle Original Coffee-Mate Coffee Creamer
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-2.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Nestle Original Coffee-Mate Coffee Creamer
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-3.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Nestle Original Coffee-Mate Coffee Creamer
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-md-0">
                    <h4 className="section-title style-1 mb-30 animated animated">
                      Trending Products
                    </h4>
                    <div className="product-list-small animated animated">
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-4.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Organic Cage-Free Grade A Large Brown Eggs
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-5.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Seeds of Change Organic Quinoa, Brown, & Red Rice
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-6.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Naturally Flavored Cinnamon Vanilla Light Roast
                              Coffee
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-lg-block">
                    <h4 className="section-title style-1 mb-30 animated animated">
                      Recently added
                    </h4>
                    <div className="product-list-small animated animated">
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-7.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Pepperidge Farm Farmhouse Hearty White Bread
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-8.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Organic Frozen Triple Berry Blend
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-9.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Oroweat Country Buttermilk Bread
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-xl-block">
                    <h4 className="section-title style-1 mb-30 animated animated">
                      Top Rated
                    </h4>
                    <div className="product-list-small animated animated">
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-10.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Foster Farms Takeout Crispy Classic Buffalo Wings
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-11.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              Angie’s Boomchickapop Sweet & Salty Kettle Corn
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                      <article className="row align-items-center hover-up">
                        <figure className="col-md-4 mb-0">
                          <a href="shop-product-right.html">
                            <img
                              src="assets/imgs/shop/thumbnail-12.jpg"
                              alt=""
                            />
                          </a>
                        </figure>
                        <div className="col-md-8 mb-0">
                          <h6>
                            <a href="shop-product-right.html">
                              All Natural Italian-Style Chicken Meatballs
                            </a>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                          <div className="product-price">
                            <span>$32.85</span>
                            <span className="old-price">$33.8</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*End 4 columns*/}
            <section className="popular-categories section-padding">
              <div className="container">
                <div className="section-title">
                  <div className="title">
                    <h3>Shop by Categories</h3>
                    <a className="show-all" href="shop-grid-right.html">
                      All Categories
                      <i className="fi-rs-angle-right"></i>
                    </a>
                  </div>
                  <div
                    className="slider-arrow slider-arrow-2 flex-right carausel-8-columns-arrow"
                    id="carausel-8-columns-arrows"
                  ></div>
                </div>
                <div className="carausel-8-columns-cover position-relative">
                  <div className="carausel-8-columns" id="carausel-8-columns">
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-1.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Milks and <br />
                          Dairies
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-2.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Wines & <br />
                          Alcohol
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-3.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Clothing & <br />
                          Beauty
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-4.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Pet Foods <br />& Toy
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-5.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Packaged <br />
                          fast food
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-6.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Baking <br />
                          material
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-7.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Vegetables <br />& tubers
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-8.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Fresh <br />
                          Seafood
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-9.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">
                          Noodles <br />
                          Rice
                        </a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-10.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">Fastfood</a>
                      </h6>
                    </div>
                    <div className="card-1">
                      <figure className="img-hover-scale overflow-hidden">
                        <a href="shop-grid-right.html">
                          <img
                            src="assets/imgs/theme/icons/category-11.svg"
                            alt=""
                          />
                        </a>
                      </figure>
                      <h6>
                        <a href="shop-grid-right.html">Ice cream</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*End category slider*/}
          </main>
          <footer className="main">
            <section className="newsletter mb-15">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="position-relative newsletter-inner">
                      <div className="newsletter-content">
                        <h2 className="mb-20">
                          Stay home & get your daily <br />
                          needs from our shop
                        </h2>
                        <p className="mb-45">
                          Start You'r Daily Shopping with
                          <span className="text-brand">Cake Shop </span>
                        </p>
                        <form className="form-subcriber d-flex">
                          <input
                            type="email"
                            placeholder="Your emaill address"
                          />
                          <button className="btn" type="submit">
                            Subscribe
                          </button>
                        </form>
                      </div>
                      {/* <img src="assets/imgs/banner/banner-9.png" alt="newsletter" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="featured section-padding">
              <div className="container">
                <div className="row">
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
                    <div className="banner-left-icon d-flex align-items-center wow fadeIn animated">
                      <div className="banner-icon">
                        <img src="assets/imgs/theme/icons/icon-1.svg" alt="" />
                      </div>
                      <div className="banner-text">
                        <h3 className="icon-box-title">Best prices & offers</h3>
                        <p>Orders $50 or more</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                    <div className="banner-left-icon d-flex align-items-center wow fadeIn animated">
                      <div className="banner-icon">
                        <img src="assets/imgs/theme/icons/icon-2.svg" alt="" />
                      </div>
                      <div className="banner-text">
                        <h3 className="icon-box-title">Free delivery</h3>
                        <p>24/7 amazing services</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                    <div className="banner-left-icon d-flex align-items-center wow fadeIn animated">
                      <div className="banner-icon">
                        <img src="assets/imgs/theme/icons/icon-3.svg" alt="" />
                      </div>
                      <div className="banner-text">
                        <h3 className="icon-box-title">Great daily deal</h3>
                        <p>When you sign up</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                    <div className="banner-left-icon d-flex align-items-center wow fadeIn animated">
                      <div className="banner-icon">
                        <img src="assets/imgs/theme/icons/icon-4.svg" alt="" />
                      </div>
                      <div className="banner-text">
                        <h3 className="icon-box-title">Wide assortment</h3>
                        <p>Mega Discounts</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                    <div className="banner-left-icon d-flex align-items-center wow fadeIn animated">
                      <div className="banner-icon">
                        <img src="assets/imgs/theme/icons/icon-5.svg" alt="" />
                      </div>
                      <div className="banner-text">
                        <h3 className="icon-box-title">Easy returns</h3>
                        <p>Within 30 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
                    <div className="banner-left-icon d-flex align-items-center wow fadeIn animated">
                      <div className="banner-icon">
                        <img src="assets/imgs/theme/icons/icon-6.svg" alt="" />
                      </div>
                      <div className="banner-text">
                        <h3 className="icon-box-title">Safe delivery</h3>
                        <p>Within 30 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section-padding footer-mid">
              <div className="container pt-15 pb-20">
                <div className="row">
                  <div className="col">
                    <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0">
                      <div className="logo mb-30">
                        <a href="index.html" className="mb-15">
                          <img src="assets/imgs/theme/logo.png" alt="logo" />
                        </a>
                        <p className="font-lg text-heading">
                          Awesome grocery store website template
                        </p>
                      </div>
                      <ul className="contact-infor">
                        <li>
                          <img
                            src="assets/imgs/theme/icons/icon-location.svg"
                            alt=""
                          />
                          <strong>Address: </strong>
                          <span>
                            5171 W Campbell Ave undefined Kent, Utah 53127
                            United States
                          </span>
                        </li>
                        <li>
                          <img
                            src="assets/imgs/theme/icons/icon-contact.svg"
                            alt=""
                          />
                          <strong>Call Us:</strong>
                          <span>(+91) - 540-025-124553</span>
                        </li>
                        <li>
                          <img
                            src="assets/imgs/theme/icons/icon-email-2.svg"
                            alt=""
                          />
                          <strong>Email:</strong>
                          <span>
                            <a
                              href="/cdn-cgi/l/email-protection"
                              className="__cf_email__"
                              data-cfemail="4536242920050b2036316b262a28"
                            >
                              [email&#160;protected]
                            </a>
                          </span>
                        </li>
                        <li>
                          <img
                            src="assets/imgs/theme/icons/icon-clock.svg"
                            alt=""
                          />
                          <strong>Hours:</strong>
                          <span>10:00 - 18:00, Mon - Sat</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="footer-link-widget col">
                    <h4 className="widget-title">Company</h4>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Delivery Information</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms &amp; Conditions</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                      <li>
                        <a href="#">Support Center</a>
                      </li>
                      <li>
                        <a href="#">Careers</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-link-widget col">
                    <h4 className="widget-title">Account</h4>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <a href="#">Sign In</a>
                      </li>
                      <li>
                        <a href="#">View Cart</a>
                      </li>
                      <li>
                        <a href="#">My Wishlist</a>
                      </li>
                      <li>
                        <a href="#">Track My Order</a>
                      </li>
                      <li>
                        <a href="#">Help Ticket</a>
                      </li>
                      <li>
                        <a href="#">Shipping Details</a>
                      </li>
                      <li>
                        <a href="#">Compare products</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-link-widget col">
                    <h4 className="widget-title">Corporate</h4>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <a href="#">Become a Vendor</a>
                      </li>
                      <li>
                        <a href="#">Affiliate Program</a>
                      </li>
                      <li>
                        <a href="#">Farm Business</a>
                      </li>
                      <li>
                        <a href="#">Farm Careers</a>
                      </li>
                      <li>
                        <a href="#">Our Suppliers</a>
                      </li>
                      <li>
                        <a href="#">Accessibility</a>
                      </li>
                      <li>
                        <a href="#">Promotions</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-link-widget col">
                    <h4 className="widget-title">Popular</h4>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <a href="#">Milk & Flavoured Milk</a>
                      </li>
                      <li>
                        <a href="#">Butter and Margarine</a>
                      </li>
                      <li>
                        <a href="#">Eggs Substitutes</a>
                      </li>
                      <li>
                        <a href="#">Marmalades</a>
                      </li>
                      <li>
                        <a href="#">Sour Cream and Dips</a>
                      </li>
                      <li>
                        <a href="#">Tea & Kombucha</a>
                      </li>
                      <li>
                        <a href="#">Cheese</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-link-widget widget-install-app col">
                    <h4 className="widget-title">Install App</h4>
                    <p className="wow fadeIn animated">
                      From App Store or Google Play
                    </p>
                    <div className="download-app">
                      <a href="#" className="hover-up mb-sm-2 mb-lg-0">
                        <img
                          className="active"
                          src="assets/imgs/theme/app-store.jpg"
                          alt=""
                        />
                      </a>
                      <a href="#" className="hover-up mb-sm-2">
                        <img src="assets/imgs/theme/google-play.jpg" alt="" />
                      </a>
                    </div>
                    <p className="mb-20">Secured Payment Gateways</p>
                    <img
                      className="wow fadeIn animated"
                      src="assets/imgs/theme/payment-method.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
            <div className="container pb-30">
              <div className="row align-items-center">
                <div className="col-12 mb-30">
                  <div className="footer-bottom"></div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <p className="font-sm mb-0">
                    &copy; 2022,{" "}
                    <strong className="text-brand">Cake Shop</strong>
                    <br />
                    All rights reserved
                  </p>
                </div>
                <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
                  <div className="hotline d-lg-inline-flex mr-30">
                    <img
                      src="assets/imgs/theme/icons/phone-call.svg"
                      alt="hotline"
                    />
                    <p>
                      1900 - 6666<span>Working 8:00 - 22:00</span>
                    </p>
                  </div>
                  <div className="hotline d-lg-inline-flex">
                    <img
                      src="assets/imgs/theme/icons/phone-call.svg"
                      alt="hotline"
                    />
                    <p>
                      1900 - 8888<span>24/7 Support Center</span>
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
                  <div className="mobile-social-icon">
                    <h6>Follow Us</h6>
                    <a href="#">
                      <img
                        src="assets/imgs/theme/icons/icon-facebook-white.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="assets/imgs/theme/icons/icon-twitter-white.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="assets/imgs/theme/icons/icon-instagram-white.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="assets/imgs/theme/icons/icon-pinterest-white.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="assets/imgs/theme/icons/icon-youtube-white.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <p className="font-sm">
                    Up to 15% discount on your first subscribe
                  </p>
                </div>
              </div>
            </div>
          </footer>
          {/* Preloader Start */}
          {/*     <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="text-center">
                        <img src="assets/imgs/theme/loading.gif" alt="" />
                    </div>
                </div>
            </div>
        </div> */}
          {/* Vendor JS*/}

          <script src="assets/js/vendor/modernizr-3.6.0.min.js"></script>
          <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
          <script src="assets/js/vendor/jquery-migrate-3.3.0.min.js"></script>
          <script src="assets/js/vendor/bootstrap.bundle.min.js"></script>
          <script src="assets/js/plugins/slick.js"></script>
          <script src="assets/js/plugins/jquery.syotimer.min.js"></script>
          <script src="assets/js/plugins/wow.js"></script>
          <script src="assets/js/plugins/perfect-scrollbar.js"></script>
          <script src="assets/js/plugins/magnific-popup.js"></script>
          <script src="assets/js/plugins/select2.min.js"></script>
          <script src="assets/js/plugins/waypoints.js"></script>
          <script src="assets/js/plugins/counterup.js"></script>
          <script src="assets/js/plugins/jquery.countdown.min.js"></script>
          <script src="assets/js/plugins/images-loaded.js"></script>
          <script src="assets/js/plugins/isotope.js"></script>
          <script src="assets/js/plugins/scrollup.js"></script>
          <script src="assets/js/plugins/jquery.vticker-min.js"></script>
          <script src="assets/js/plugins/jquery.theia.sticky.js"></script>
          <script src="assets/js/plugins/jquery.elevatezoom.js"></script>
          {/* Template  JS */}
          {/*  */}
          <script src="assets/js/main.js"></script>
          <script src="assets/js/shop.js"></script>
        </body>
      </html>
    </>
  );
};

export default Index;
