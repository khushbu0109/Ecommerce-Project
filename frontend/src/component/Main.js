import React, { useEffect, useState } from "react";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import PostCard from "./PostCard";
import Card from "./card";


export const Main = () => {


  return (
    <>
      <div className="main_content">
        <div className="section small_pt pb-0">
          <div className="custom-container">
            <div className="row">
              <div className="row">
                <div className="col-12">
                  <div className="heading_tab_header">
                    <div className="heading_s2">
                      <h4>Exclusive Products</h4>
                    </div>
                    <div className="tab-style2">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#tabmenubar"
                        aria-expanded="false"
                      >
                        <span className="ion-android-menu"></span>
                      </button>
                      <ul
                        className="nav nav-tabs justify-content-center justify-content-md-end"
                        id="tabmenubar"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="arrival-tab"
                            data-bs-toggle="tab"
                            href="#arrival"
                            role="tab"
                            aria-controls="arrival"
                            aria-selected="true"
                          >
                            New Arrival
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="sellers-tab"
                            data-bs-toggle="tab"
                            href="#sellers"
                            role="tab"
                            aria-controls="sellers"
                            aria-selected="false"
                          >
                            Best Sellers
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="featured-tab"
                            data-bs-toggle="tab"
                            href="#featured"
                            role="tab"
                            aria-controls="featured"
                            aria-selected="false"
                          >
                            Featured
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="special-tab"
                            data-bs-toggle="tab"
                            href="#special"
                            role="tab"
                            aria-controls="special"
                            aria-selected="false"
                          >
                            Special Offer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-4">
              <div className="electronics_he my-4">Best Of Fasion</div>

              <PostCard cat_name={"fashion"} />
              <div className="electronics_he my-4">Best Of Furniture</div>

              <PostCard cat_name={"furniture"} />

              <div className="electronics_he my-5">Top Beauty</div>
              <PostCard cat_name={"beauty"} />
              <div className="electronics_he my-5">Top Gadgets</div>
              <PostCard cat_name={"gadgets"} />
              <div className="electronics_he my-5">Top Mobile Accessories</div>
              <PostCard cat_name={"mobile accessories"} />
              <div className="electronics_he my-5">Top Travels</div>
              <PostCard cat_name={"travel"} />
            </div>
          </div>
        </div>

        <Card />


        <div className="section pt-0 pb-0">
          <div className="custom-container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading_tab_header">
                  <div className="heading_s2">
                    <h4>Deal Of The Day</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="product_slider carousel_slider owl-carousel owl-theme nav_style3"
                  data-loop="true"
                  data-dots="false"
                  data-nav="true"
                  data-margin="30"
                  data-responsive='{"0":{"items": "1"}, "650":{"items": "2"}, "1199":{"items": "2"}}'
                >
                  <div className="item">
                    <div className="deal_wrap">
                      <div className="product_img">
                        <a href="shop-product-detail.html">
                          <img src="assets/images/el_img1.jpg" alt="el_img1" />
                        </a>
                      </div>
                      <div className="deal_content">
                        <div className="product_info">
                          <h5 className="product_title">
                            <a href="shop-product-detail.html">
                              Red &amp; Black Headphone
                            </a>
                          </h5>
                          <div className="product_price">
                            <span className="price">$45.00</span>
                            <del>$55.25</del>
                          </div>
                        </div>
                        <div className="deal_progress">
                          <span className="stock-sold">
                            Already Sold: <strong>6</strong>
                          </span>
                          <span className="stock-available">
                            Available: <strong>8</strong>
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow="46"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "46%" }}
                            >
                              {" "}
                              46%{" "}
                            </div>
                          </div>
                        </div>
                        <div
                          className="countdown_time countdown_style4 mb-4"
                          data-time="2021/10/02 12:30:15"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="deal_wrap">
                      <div className="product_img">
                        <a href="shop-product-detail.html">
                          <img src="assets/images/el_img2.jpg" alt="el_img2" />
                        </a>
                      </div>
                      <div className="deal_content">
                        <div className="product_info">
                          <h5 className="product_title">
                            <a href="shop-product-detail.html">
                              Smart Watch External
                            </a>
                          </h5>
                          <div className="product_price">
                            <span className="price">$55.00</span>
                            <del>$95.00</del>
                          </div>
                        </div>
                        <div className="deal_progress">
                          <span className="stock-sold">
                            Already Sold: <strong>4</strong>
                          </span>
                          <span className="stock-available">
                            Available: <strong>22</strong>
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow="26"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "26%" }}
                            >
                              {" "}
                              26%{" "}
                            </div>
                          </div>
                        </div>
                        <div
                          className="countdown_time countdown_style4 mb-4"
                          data-time="2021/09/02 12:30:15"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="deal_wrap">
                      <div className="product_img">
                        <a href="shop-product-detail.html">
                          <img src="assets/images/el_img3.jpg" alt="el_img3" />
                        </a>
                      </div>
                      <div className="deal_content">
                        <div className="product_info">
                          <h5 className="product_title">
                            <a href="shop-product-detail.html">
                              Nikon HD camera
                            </a>
                          </h5>
                          <div className="product_price">
                            <span className="price">$68.00</span>
                            <del>$99.25</del>
                          </div>
                        </div>
                        <div className="deal_progress">
                          <span className="stock-sold">
                            Already Sold: <strong>16</strong>
                          </span>
                          <span className="stock-available">
                            Available: <strong>20</strong>
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow="28"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "28%" }}
                            >
                              {" "}
                              28%{" "}
                            </div>
                          </div>
                        </div>
                        <div
                          className="countdown_time countdown_style4 mb-4"
                          data-time="2021/11/02 12:30:15"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="section pt-0 small_pb">
          <div className="custom-container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading_tab_header">
                  <div className="heading_s2">
                    <h4>Our Brands</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div
                  className="client_logo carousel_slider owl-carousel owl-theme nav_style3"
                  data-dots="false"
                  data-nav="true"
                  data-margin="30"
                  data-loop="true"
                  data-autoplay="true"
                  data-responsive='{"0":{"items": "2"}, "480":{"items": "3"}, "767":{"items": "4"}, "991":{"items": "5"}, "1199":{"items": "6"}}'
                >
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo1.png" alt="cl_logo" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo2.png" alt="cl_logo" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo3.png" alt="cl_logo" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo4.png" alt="cl_logo" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo5.png" alt="cl_logo" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo6.png" alt="cl_logo" />
                    </div>
                  </div>
                  <div className="item">
                    <div className="cl_logo">
                      <img src="assets/images/cl_logo7.png" alt="cl_logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section pt-0 pb_20">
          <div className="custom-container">
            <div className="row">
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-12">
                    <div className="heading_tab_header">
                      <div className="heading_s2">
                        <h4>Featured Products</h4>
                      </div>
                      <div className="view_all">
                        <a href="/" className="text_default">
                          <span>View All</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div
                      className="product_slider carousel_slider product_list owl-carousel owl-theme nav_style5"
                      data-nav="true"
                      data-dots="false"
                      data-loop="true"
                      data-margin="20"
                      data-responsive='{"0":{"items": "1"}, "380":{"items": "1"}, "640":{"items": "2"}, "991":{"items": "1"}}'
                    >
                      <div className="item">
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img2.jpg"
                                alt="el_img2"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img2.jpg"
                                alt="el_hover_img2"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Smart Watch External
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$55.00</span>
                              <del>$95.00</del>
                              <div className="on_sale">
                                <span>25% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "68%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(15)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img1.jpg"
                                alt="el_img1"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img1.jpg"
                                alt="el_hover_img1"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Red &amp; Black Headphone
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <span className="pr_flash">New</span>
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img3.jpg"
                                alt="el_img3"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img3.jpg"
                                alt="el_hover_img3"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Nikon HD camera
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$68.00</span>
                              <del>$99.00</del>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "87%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(25)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img5.jpg"
                                alt="el_img5"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img5.jpg"
                                alt="el_hover_img5"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Smart Televisions
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img9.jpg"
                                alt="el_img9"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img9.jpg"
                                alt="el_hover_img9"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                oppo Reno3 Pro
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$68.00</span>
                              <del>$99.00</del>
                              <div className="on_sale">
                                <span>20% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "87%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(25)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img7.jpg"
                                alt="el_img7"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img7.jpg"
                                alt="el_hover_img7"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Audio Theaters
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-12">
                    <div className="heading_tab_header">
                      <div className="heading_s2">
                        <h4>Top Rated Products</h4>
                      </div>
                      <div className="view_all">
                        <a href="/" className="text_default">
                          <span>View All</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div
                      className="product_slider carousel_slider product_list owl-carousel owl-theme nav_style5"
                      data-nav="true"
                      data-dots="false"
                      data-loop="true"
                      data-margin="20"
                      data-responsive='{"0":{"items": "1"}, "380":{"items": "1"}, "640":{"items": "2"}, "991":{"items": "1"}}'
                    >
                      <div className="item">
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img5.jpg"
                                alt="el_img5"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img5.jpg"
                                alt="el_hover_img5"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Smart Televisions
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img12.jpg"
                                alt="el_img12"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img12.jpg"
                                alt="el_hover_img12"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Sound Equipment for Low
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img4.jpg"
                                alt="el_img4"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img4.jpg"
                                alt="el_hover_img4"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Audio Equipment
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$69.00</span>
                              <del>$89.00</del>
                              <div className="on_sale">
                                <span>20% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "70%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(22)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="product_wrap">
                          <span className="pr_flash bg-danger">Hot</span>
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img6.jpg"
                                alt="el_img6"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img6.jpg"
                                alt="el_hover_img6"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Samsung Smart Phone
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$55.00</span>
                              <del>$95.00</del>
                              <div className="on_sale">
                                <span>25% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "68%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(15)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <span className="pr_flash bg-danger">Hot</span>
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img8.jpg"
                                alt="el_img8"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img8.jpg"
                                alt="el_hover_img8"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Surveillance camera
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$55.00</span>
                              <del>$95.00</del>
                              <div className="on_sale">
                                <span>25% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "68%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(15)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <span className="pr_flash bg-success">Sale</span>
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img10.jpg"
                                alt="el_img10"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img10.jpg"
                                alt="el_hover_img10"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                classNameical Headphone
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$68.00</span>
                              <del>$99.00</del>
                              <div className="on_sale">
                                <span>20% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "87%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(25)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-12">
                    <div className="heading_tab_header">
                      <div className="heading_s2">
                        <h4>On Sale Products</h4>
                      </div>
                      <div className="view_all">
                        <a href="/" className="text_default">
                          <span>View All</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div
                      className="product_slider carousel_slider product_list owl-carousel owl-theme nav_style5"
                      data-nav="true"
                      data-dots="false"
                      data-loop="true"
                      data-margin="20"
                      data-responsive='{"0":{"items": "1"}, "380":{"items": "1"}, "640":{"items": "2"}, "991":{"items": "1"}}'
                    >
                      <div className="item">
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img11.jpg"
                                alt="el_img11"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img11.jpg"
                                alt="el_hover_img11"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Basics High-Speed HDMI
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$69.00</span>
                              <del>$89.00</del>
                              <div className="on_sale">
                                <span>20% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "70%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(22)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img7.jpg"
                                alt="el_img7"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img7.jpg"
                                alt="el_hover_img7"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Audio Theaters
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <span className="pr_flash bg-danger">Hot</span>
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img8.jpg"
                                alt="el_img8"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img8.jpg"
                                alt="el_hover_img8"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Surveillance camera
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$55.00</span>
                              <del>$95.00</del>
                              <div className="on_sale">
                                <span>25% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "68%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(15)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img5.jpg"
                                alt="el_img5"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img5.jpg"
                                alt="el_hover_img5"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Smart Televisions
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img9.jpg"
                                alt="el_img9"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img9.jpg"
                                alt="el_hover_img9"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                oppo Reno3 Pro
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$68.00</span>
                              <del>$99.00</del>
                              <div className="on_sale">
                                <span>20% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "87%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(25)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="product_wrap">
                          <div className="product_img">
                            <a href="shop-product-detail.html">
                              <img
                                src="assets/images/el_img1.jpg"
                                alt="el_img1"
                              />
                              <img
                                className="product_hover_img"
                                src="assets/images/el_hover_img1.jpg"
                                alt="el_hover_img1"
                              />
                            </a>
                          </div>
                          <div className="product_info">
                            <h6 className="product_title">
                              <a href="shop-product-detail.html">
                                Red &amp; Black Headphone
                              </a>
                            </h6>
                            <div className="product_price">
                              <span className="price">$45.00</span>
                              <del>$55.25</del>
                              <div className="on_sale">
                                <span>35% Off</span>
                              </div>
                            </div>
                            <div className="rating_wrap">
                              <div className="rating">
                                <div
                                  className="product_rate"
                                  style={{ width: "80%" }}
                                ></div>
                              </div>
                              <span className="rating_num">(21)</span>
                            </div>
                            <div className="pr_desc">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus blandit massa enim.
                                Nullam id varius nunc id varius nunc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section bg_default small_pt small_pb">
          <div className="custom-container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="newsletter_text text_white">
                  <h3>Join Our Newsletter Now</h3>
                  <p> Register now to get updates on promotions. </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="newsletter_form2 rounded_input">
                  <form>
                    <input
                      type="text"
                      required=""
                      className="form-control"
                      placeholder="Enter Email Address"
                    />
                    <button
                      type="submit"
                      className="btn btn-dark btn-radius"
                      name="submit"
                      value="Submit"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
