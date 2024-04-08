import React from "react";

const ProductDetails = () => {
  return (
    <div>
      <div id="preloder">
        <div className="loader"></div>
      </div>

      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__close">+</div>
        <ul className="offcanvas__widget">
          <li>
            <span className="icon_search search-switch"></span>
          </li>
          <li>
            <a href="#">
              <span className="icon_heart_alt"></span>
              <div className="tip">2</div>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon_bag_alt"></span>
              <div className="tip">2</div>
            </a>
          </li>
        </ul>
        <div className="offcanvas__logo">
          <a href="./index.html">
            <img src="img/logo.png" alt="" />
          </a>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__auth">
          <a href="#">Login</a>
          <a href="#">Register</a>
        </div>
      </div>

      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="./index.html">
                  <i className="fa fa-home"></i> Home
                </a>
                <a href="#">Women’s </a>
                <span>Essential structured blazer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product__details__pic">
                <div className="product__details__pic__left product__thumb nice-scroll">
                  <a className="pt active" href="#product-1">
                    <img src="img/product/details/thumb-1.jpg" alt="" />
                  </a>
                  <a className="pt" href="#product-2">
                    <img src="img/product/details/thumb-2.jpg" alt="" />
                  </a>
                  <a className="pt" href="#product-3">
                    <img src="img/product/details/thumb-3.jpg" alt="" />
                  </a>
                  <a className="pt" href="#product-4">
                    <img src="img/product/details/thumb-4.jpg" alt="" />
                  </a>
                </div>
                <div className="product__details__slider__content">
                  <div className="product__details__pic__slider owl-carousel">
                    <img
                      data-hash="product-1"
                      className="product__big__img"
                      src="img/product/details/product-1.jpg"
                      alt=""
                    />
                    <img
                      data-hash="product-2"
                      className="product__big__img"
                      src="img/product/details/product-3.jpg"
                      alt=""
                    />
                    <img
                      data-hash="product-3"
                      className="product__big__img"
                      src="img/product/details/product-2.jpg"
                      alt=""
                    />
                    <img
                      data-hash="product-4"
                      className="product__big__img"
                      src="img/product/details/product-4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <h3>
                  Essential structured blazer{" "}
                  <span>Brand: SKMEIMore Men Watches from SKMEI</span>
                </h3>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <span>( 138 reviews )</span>
                </div>
                <div className="product__details__price">
                  $ 75.0 <span>$ 83.0</span>
                </div>
                <p>
                  Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret
                  fugit, sed quia consequuntur magni lores eos qui ratione
                  voluptatem sequi nesciunt.
                </p>
                <div className="product__details__button">
                  <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qty">
                      <input type="text" value="1" />
                    </div>
                  </div>
                  <a href="#" className="cart-btn">
                    <span className="icon_bag_alt"></span> Add to cart
                  </a>
                  <ul>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_adjust-horiz"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__details__widget">
                  <ul>
                    <li>
                      <span>Availability:</span>
                      <div className="stock__checkbox">
                        <label for="stockin">
                          In Stock
                          <input type="checkbox" id="stockin" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="related__title">
                <h5>RELATED PRODUCTS</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/related/rp-1.jpg"
                >
                  <div className="label new">New</div>
                  <ul className="product__hover">
                    <li>
                      <a
                        href="img/product/related/rp-1.jpg"
                        className="image-popup"
                      >
                        <span className="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Buttons tweed blazer</a>
                  </h6>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/related/rp-2.jpg"
                >
                  <ul className="product__hover">
                    <li>
                      <a
                        href="img/product/related/rp-2.jpg"
                        className="image-popup"
                      >
                        <span className="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Flowy striped skirt</a>
                  </h6>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="product__price">$ 49.0</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/related/rp-3.jpg"
                >
                  <div className="label stockout">out of stock</div>
                  <ul className="product__hover">
                    <li>
                      <a
                        href="img/product/related/rp-3.jpg"
                        className="image-popup"
                      >
                        <span className="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Cotton T-Shirt</a>
                  </h6>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/related/rp-4.jpg"
                >
                  <ul className="product__hover">
                    <li>
                      <a
                        href="img/product/related/rp-4.jpg"
                        className="image-popup"
                      >
                        <span className="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Slim striped pocket shirt</a>
                  </h6>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
