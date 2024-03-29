import React, { useEffect, useState, useParams } from "react";
import serverCallFuction from "../context/category/constants";
import { useNavigate,NavLink } from "react-router-dom";


export const Header = () => {
  let location = useNavigate();
  const [category, setCategory] = useState([]);
  // const sub_category_name = useParams();
  const [sub_cate, setSub_cate] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryData = await serverCallFuction(
          "GET",
          "category/getAllCat"
        );
        console.log("catdata", categoryData);
        if (categoryData.status === "Success") {
          setCategory(categoryData.data);
        }
      } catch (e) {
        console.log("Error Fetching Data :", e);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <header class="header_wrap">
        <div class="middle-header dark_skin">
          <div class="custom-container">
            <div class="nav_block">
              <a class="navbar-brand" href="index.html">
                <img
                  class="logo_light"
                  src="assets/images/logo_light.png"
                  alt="logo"
                />
                <img
                  class="logo_dark"
                  src="assets/images/logo_dark.png"
                  alt="logo"
                />
              </a>
              <div class="product_search_form rounded_input">
                <form>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="custom_select">
                        <select class="first_null">
                          <option value="">All Category</option>
                          <option value="Dresses">Dresses</option>
                          <option value="Shirt-Tops">Shirt &amp; Tops</option>
                          <option value="T-Shirt">T-Shirt</option>
                          <option value="Pents">Pents</option>
                          <option value="Jeans">Jeans</option>
                        </select>
                      </div>
                    </div>
                    <input
                      class="form-control"
                      placeholder="Search Product..."
                      required=""
                      type="text"
                    />
                    <button type="submit" class="search_btn2">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <ul class="navbar-nav attr-nav align-items-center">
                <li>
                  <a href="/" class="nav-link">
                    <i class="linearicons-user"></i>
                  </a>
                </li>
                <li>
                  <a href="/" class="nav-link">
                    <i class="linearicons-heart"></i>
                    <span class="wishlist_count">0</span>
                  </a>
                </li>
                <li class="dropdown cart_dropdown">
                  <a
                    class="nav-link cart_trigger"
                    href="/"
                    data-bs-toggle="dropdown"
                  >
                    <i class="linearicons-bag2"></i>
                    <span class="cart_count">2</span>
                    <span class="amount">
                      <span class="currency_symbol">$</span>159.00
                    </span>
                  </a>
                  <div class="cart_box cart_right dropdown-menu dropdown-menu-right">
                    <ul class="cart_list">
                      <li>
                        <a href="/" class="item_remove">
                          <i class="ion-close"></i>
                        </a>
                        <a href="/">
                          <img
                            src="assets/images/cart_thamb1.jpg"
                            alt="cart_thumb1"
                          />
                          Variable product 001
                        </a>
                        <span class="cart_quantity">
                          {" "}
                          1 x{" "}
                          <span class="cart_amount">
                            {" "}
                            <span class="price_symbole">$</span>
                          </span>
                          78.00
                        </span>
                      </li>
                      <li>
                        <a href="/" class="item_remove">
                          <i class="ion-close"></i>
                        </a>
                        <a href="/">
                          <img
                            src="assets/images/cart_thamb2.jpg"
                            alt="cart_thumb2"
                          />
                          Ornare sed consequat
                        </a>
                        <span class="cart_quantity">
                          {" "}
                          1 x{" "}
                          <span class="cart_amount">
                            {" "}
                            <span class="price_symbole">$</span>
                          </span>
                          81.00
                        </span>
                      </li>
                    </ul>
                    <div class="cart_footer">
                      <p class="cart_total">
                        <strong>Subtotal:</strong>{" "}
                        <span class="cart_price">
                          {" "}
                          <span class="price_symbole">$</span>
                        </span>
                        159.00
                      </p>
                      <p class="cart_buttons">
                        <a href="/" class="btn btn-fill-line view-cart">
                          View Cart
                        </a>
                        <a href="/" class="btn btn-fill-out checkout">
                          Checkout
                        </a>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bottom_header dark_skin main_menu_uppercase border-top border-bottom">
          <div class="custom-container">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-6 col-3">
                <div class="categories_wrap">
                  <button
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="/navCatContent"
                    aria-expanded="false"
                    class="categories_btn"
                  >
                    <i class="linearicons-menu"></i>
                    <span>All Categories </span>
                  </button>
                  <div id="navCatContent" class="nav_cat navbar nav collapse">
                    {category.map((cat, ind) => {
                      return (
                        <ul>
                          <li class="dropdown dropdown-mega-menu">
                            <a
                              class="dropdown-item nav-link dropdown-toggler"
                              href="/"
                              data-bs-toggle="dropdown"
                            >
                              <i class="flaticon-tv"></i>{" "}
                              <span>{cat.name}</span>
                            </a>
                            <div class="dropdown-menu">
                              <ul class="mega-menu d-lg-flex">
                                <li class="mega-menu-col col-lg-7">
                                  <ul class="d-lg-flex">
                                    <li class="mega-menu-col col-lg-6">
                                      <ul>
                                        <li class="dropdown-header">
                                          Sub category
                                        </li>

                                        {cat.sub_cat.map((sub, ind) => {
                                          return (
                                            <li class="dropdown-header">
                                            {sub.name}
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </li>
                                    <li class="mega-menu-col col-lg-6">

                                    </li>
                                  </ul>
                                </li>
                                <li class="mega-menu-col col-lg-5">
                                  <div class="header-banner2">
                                    <a href="/">
                                      <img
                                        src="assets/images/menu_banner6.jpg"
                                        alt="menu_banner"
                                      />
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      );
                    })}
                    <div class="more_categories">More Categories</div>
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-md-8 col-sm-6 col-9">
                <nav class="navbar navbar-expand-lg">
                  <button
                    class="navbar-toggler side_navbar_toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="/navbarSidetoggle"
                    aria-expanded="false"
                  >
                    <span class="ion-android-menu"></span>
                  </button>
                  <div class="pr_search_icon">
                    <a href="javascript" class="nav-link pr_search_trigger">
                      <i class="linearicons-magnifier"></i>
                    </a>
                  </div>
                  <div
                    class="collapse navbar-collapse mobile_side_menu"
                    id="navbarSidetoggle"
                  >
                    <ul class="navbar-nav">
                      <li class="dropdown">
                        <a
                          data-bs-toggle="dropdown"
                          class="nav-link dropdown-toggle active"
                          href="/"
                        >
                          Home
                        </a>
                        <div class="dropdown-menu">
                          <ul>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="index.html"
                              >
                                Fashion 1
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="index-2.html"
                              >
                                Fashion 2
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="index-3.html"
                              >
                                Furniture 1
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="index-4.html"
                              >
                                Furniture 2
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item active"
                                href="index-5.html"
                              >
                                Electronics 1
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="index-6.html"
                              >
                                Electronics 2
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="dropdown">
                        <a
                          class="dropdown-toggle nav-link"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          Pages
                        </a>
                        <div class="dropdown-menu">
                          <ul>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="about.html"
                              >
                                About Us
                              </a>
                            </li>


                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="faq.html"
                              >
                                Faq
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="404.html"
                              >
                                404 Error Page
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="login.html"
                              >
                                Login
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="signup.html"
                              >
                                Register
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item nav-link nav_item"
                                href="term-condition.html"
                              >
                                Terms and Conditions
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="dropdown dropdown-mega-menu">
                        <a
                          class="dropdown-toggle nav-link"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          Products
                        </a>
                        <div class="dropdown-menu">
                          <ul class="mega-menu d-lg-flex">
                            <li class="mega-menu-col col-lg-3">
                              <ul>
                                <li class="dropdown-header">Woman's</li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-list-left-sidebar.html"
                                  >
                                    Vestibulum sed
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-left-sidebar.html"
                                  >
                                    Donec porttitor
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-right-sidebar.html"
                                  >
                                    Donec vitae facilisis
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-list.html"
                                  >
                                    Curabitur tempus
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-load-more.html"
                                  >
                                    Vivamus in tortor
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li class="mega-menu-col col-lg-3">
                              <ul>
                                <li class="dropdown-header">Men's</li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-cart.html"
                                  >
                                    Donec vitae ante ante
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="checkout.html"
                                  >
                                    Etiam ac rutrum
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="wishlist.html"
                                  >
                                    Quisque condimentum
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="compare.html"
                                  >
                                    Curabitur laoreet
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="order-completed.html"
                                  >
                                    Vivamus in tortor
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li class="mega-menu-col col-lg-3">
                              <ul>
                                <li class="dropdown-header">Kid's</li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail.html"
                                  >
                                    Donec vitae facilisis
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-left-sidebar.html"
                                  >
                                    Quisque condimentum
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-right-sidebar.html"
                                  >
                                    Etiam ac rutrum
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-thumbnails-left.html"
                                  >
                                    Donec vitae ante ante
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-thumbnails-left.html"
                                  >
                                    Donec porttitor
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li class="mega-menu-col col-lg-3">
                              <ul>
                                <li class="dropdown-header">Accessories</li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail.html"
                                  >
                                    Donec vitae facilisis
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-left-sidebar.html"
                                  >
                                    Quisque condimentum
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-right-sidebar.html"
                                  >
                                    Etiam ac rutrum
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-thumbnails-left.html"
                                  >
                                    Donec vitae ante ante
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item nav-link nav_item"
                                    href="shop-product-detail-thumbnails-left.html"
                                  >
                                    Donec porttitor
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <div class="d-lg-flex menu_banners row g-3 px-3">
                            <div class="col-lg-6">
                              <div class="header-banner">
                                <div class="sale-banner">
                                  <a class="hover_effect1" href="/">
                                    <img
                                      src="assets/images/shop_banner_img7.jpg"
                                      alt="shop_banner_img7"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="header-banner">
                                <div class="sale-banner">
                                  <a class="hover_effect1" href="/">
                                    <img
                                      src="assets/images/shop_banner_img8.jpg"
                                      alt="shop_banner_img8"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="dropdown">
                        <a
                          class="dropdown-toggle nav-link"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          Blog
                        </a>
                        <div class="dropdown-menu dropdown-reverse">
                          <ul>
                            <li>
                              <a
                                class="dropdown-item menu-link dropdown-toggler"
                                href="/"
                              >
                                Grids
                              </a>
                              <div class="dropdown-menu">
                                <ul>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-three-columns.html"
                                    >
                                      3 columns
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-four-columns.html"
                                    >
                                      4 columns
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-left-sidebar.html"
                                    >
                                      Left Sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-right-sidebar.html"
                                    >
                                      right Sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-standard-left-sidebar.html"
                                    >
                                      Standard Left Sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-standard-right-sidebar.html"
                                    >
                                      Standard right Sidebar
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <a
                                class="dropdown-item menu-link dropdown-toggler"
                                href="/"
                              >
                                Masonry
                              </a>
                              <div class="dropdown-menu">
                                <ul>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-masonry-three-columns.html"
                                    >
                                      3 columns
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-masonry-four-columns.html"
                                    >
                                      4 columns
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-masonry-left-sidebar.html"
                                    >
                                      Left Sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-masonry-right-sidebar.html"
                                    >
                                      right Sidebar
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <a
                                class="dropdown-item menu-link dropdown-toggler"
                                href="/"
                              >
                                Single Post
                              </a>
                              <div class="dropdown-menu">
                                <ul>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-single.html"
                                    >
                                      Default
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-single-left-sidebar.html"
                                    >
                                      left sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-single-slider.html"
                                    >
                                      slider post
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-single-video.html"
                                    >
                                      video post
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-single-audio.html"
                                    >
                                      audio post
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <a
                                class="dropdown-item menu-link dropdown-toggler"
                                href="/"
                              >
                                List
                              </a>
                              <div class="dropdown-menu">
                                <ul>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-list-left-sidebar.html"
                                    >
                                      left sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item nav-link nav_item"
                                      href="blog-list-right-sidebar.html"
                                    >
                                      right sidebar
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="dropdown dropdown-mega-menu">
                        <a
                          class="dropdown-toggle nav-link"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          Shop
                        </a>
                        <div class="dropdown-menu">
                          <ul class="mega-menu d-lg-flex">
                            <li class="mega-menu-col col-lg-9">
                              <ul class="d-lg-flex">
                                <li class="mega-menu-col col-lg-4">
                                  <ul>
                                    <li class="dropdown-header">
                                      Shop Page Layout
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-list.html"
                                      >
                                        shop List view
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-list-left-sidebar.html"
                                      >
                                        shop List Left Sidebar
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-list-right-sidebar.html"
                                      >
                                        shop List Right Sidebar
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-left-sidebar.html"
                                      >
                                        Left Sidebar
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-right-sidebar.html"
                                      >
                                        Right Sidebar
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-load-more.html"
                                      >
                                        Shop Load More
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li class="mega-menu-col col-lg-4">
                                  <ul>
                                    <li class="dropdown-header">Other Pages</li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-cart.html"
                                      >
                                        Cart
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="checkout.html"
                                      >
                                        Checkout
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="my-account.html"
                                      >
                                        My Account
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="wishlist.html"
                                      >
                                        Wishlist
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="compare.html"
                                      >
                                        compare
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="order-completed.html"
                                      >
                                        Order Completed
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li class="mega-menu-col col-lg-4">
                                  <ul>
                                    <li class="dropdown-header">
                                      Product Pages
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-product-detail.html"
                                      >
                                        Default
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-product-detail-left-sidebar.html"
                                      >
                                        Left Sidebar
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-product-detail-right-sidebar.html"
                                      >
                                        Right Sidebar
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item nav-link nav_item"
                                        href="shop-product-detail-thumbnails-left.html"
                                      >
                                        Thumbnails Left
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li class="mega-menu-col col-lg-3">
                              <div class="header_banner">
                                <div class="header_banner_content">
                                  <div class="shop_banner">
                                    <div class="banner_img overlay_bg_40">
                                      <img
                                        src="assets/images/shop_banner3.jpg"
                                        alt="shop_banner"
                                      />
                                    </div>
                                    <div class="shop_bn_content">
                                      <h5 class="text-uppercase shop_subtitle">
                                        New Collection
                                      </h5>
                                      <h3 class="text-uppercase shop_title">
                                        Sale 30% Off
                                      </h3>
                                      <a
                                        href="/"
                                        class="btn btn-white rounded-0 btn-sm text-uppercase"
                                      >
                                        Shop Now
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <NavLink
                            to="/contact"
                            className={`menu-item ${location.pathname === "/contact" ? "active" : ""}`}
                          >
                            <li className="menu-link">
                              <i className="menu-icon tf-icons bx bx-home-circle"></i>
                              <div data-i18n="Analytics">Contact us</div>
                            </li>
                          </NavLink>

                    </ul>
                  </div>
                  <div class="contact_phone contact_support">
                    <i class="linearicons-phone-wave"></i>
                    <span>123-456-7689</span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
