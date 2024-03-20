import React from 'react';
import './cat.css'

export const CatBan = () => {
    return (
        <>
          <div className="row my-5">
            <div className="col-2 card-con">
              <div className="card align-items-center p-2 card-effect ">
                <div className="image_wrapper">
                  <img
                    src="./assets/images/cloth.png"
                    alt=""
                    className="img-fluid round_image"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title">Fasion</div>
                </div>
              </div>
            </div>
            <div className="col-2 card-con">
              <div className="card align-items-center p-2 card-effect">
                <div className="image_wrapper">
                  <img
                    src="./assets/images/mak.png"
                    alt=""
                    className="img-fluid round_image"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title">Beauty , More</div>
                </div>
              </div>
            </div>
            <div className="col-2 card-con">
              <div className="card align-items-center p-2 card-effect">
                <div className="image_wrapper">
                  <img
                    src="./assets/images/tr.png"
                    alt=""
                    className="img-fluid round_image"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title">Travel</div>
                </div>
              </div>
            </div>
            <div className="col-2 card-con">
              <div className="card align-items-center p-2 card-effect">
                <div className="image_wrapper">
                  <img
                    src="./assets/images/gadgets.png"
                    alt=""
                    className="img-fluid round_image"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title">Gadgets</div>
                </div>
              </div>
            </div>
            <div className="col-2 card-con">
              <div className="card align-items-center p-2 card-effect">
                <div className="image_wrapper">
                  <img
                    src="./assets/images/furniture.png"
                    alt=""
                    className="img-fluid round_image"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title">Furniture</div>
                </div>
              </div>
            </div>
            <div className="col-2 card-con">
              <div className="card align-items-center p-2 card-effect">
                <div className="image_wrapper">
                  <img
                    src="./assets/images/phn.png"
                    alt=""
                    className="img-fluid round_image"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title">Mob Acceseries</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}
