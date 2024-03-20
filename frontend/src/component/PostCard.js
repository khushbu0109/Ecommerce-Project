import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import serverCallFuction from "../context/category/constants";

const PostCard = ({ cat_name }) => {
  const [product, setproduct] = useState([]);

  useEffect(() => {
    async function fetchDataSpo() {
      try {
        const postData = await serverCallFuction(
          "GET",
          `product/byCat/${cat_name}`
        );
        if (postData.status === "Success") {
          setproduct(postData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataSpo();
  }, []);
  return (
    <>
      <div className="row">
        {product.map((prod, ind) => {
          return (
            <div className="col-2">
            <div className="item" key={ind}>
            <div className="product_wrap">
              <div className="product_img" >
                <a href="shop-product-detail.html">
                  <img src={prod.images} alt="el_img2" className="img-fluid" />
                  <img
                    className="product_hover_img"
                    src={prod.images}
                    alt="el_hover_img2"
                  />
                </a>
                <div className="product_action_box">
                  <ul className="list_none pr_action_btn">
                    <li className="add-to-cart">
                      <a href="/">
                        <i className="icon-basket-loaded"></i>{" "}
                        Add To Cart
                      </a>
                    </li>
                    <li>
                      <a
                        href="shop-compare.html"
                        className="popup-ajax"
                      >
                        <i className="icon-shuffle"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="shop-quick-view.html"
                        className="popup-ajax"
                      >
                        <i className="icon-magnifier-add"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="icon-heart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product_info">
                <h6 className="product_title">
                  <a href="shop-product-detail.html">
                    {prod.p_name}
                  </a>
                </h6>
                <div className="product_price">
                  <span className="price">{prod.price}</span>
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
                    adipiscing elit. Phasellus blandit massa
                    enim. Nullam id varius nunc id varius nunc.
                  </p>
                </div>
              </div>
            </div>
          </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostCard;
