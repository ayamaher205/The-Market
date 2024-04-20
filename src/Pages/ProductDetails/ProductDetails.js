import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProductsByCategories,
  getProductDetails,
  getProductImages,
  rateProducts,
} from "../../APIs/products";
import RatingComponent from "../../Shared/Rating/Rating";
import Card from "../../Shared/Card/Card";
import LikedProduct from "../../Shared/LikedProduct/LikedProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import "./ProductDetails.css";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const ProductDetails = () => {
  const base_URL = "http://127.0.0.1:8000";
  const [productCategory, setproductCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [rating, setRating] = useState(0);
  const params = useParams();

  const handleRating = (event, newRating) => {
    console.log("newRating " + newRating);
    setRating(newRating);
    rateProducts(product.id, newRating)
      .then((res) => console.log(res.data.value))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductDetails(params.id)
      .then((res) => {
        setProduct(res.data);
        ProductsByCategories(res.data.category_id)
          .then((res) => {
            setproductCategory(res.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }, [rating]);

  useEffect(() => {
    getProductImages(params.id)
      .then((res) => {
        setProductImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  if (!product) {
    return null;
  }

  return (
    <div>
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div class="col-xl-5 col-lg-5 col-md-6">
              <div
                id="carousel-example-1"
                class="single-product-slider carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active">
                    {" "}
                    <img class="d-block w-100" alt="First slide" />{" "}
                    {product.thumbnail ? (
                      <img
                        class="d-block w-100 img-fluid"
                        src={`${product.thumbnail
                          .split("/media/")
                          .pop()
                          .split("%3A")
                          .join(":")
                          .replace(":/", "://")}`}
                        alt=""
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                  <div class="carousel-item">
                    {" "}
                    {productImages.length > 0 &&
                    productImages[0] &&
                    productImages[0].image ? (
                      <img
                        class="d-block w-100 img-fluid"
                        src={`${productImages[0].image
                          .split("/media/")
                          .pop()
                          .split("%3A")
                          .join(":")
                          .replace(":/", "://")}`}
                        alt=""
                      />
                    ) : (
                      <div>Loading...</div>
                    )}{" "}
                  </div>
                  <div class="carousel-item">
                    {" "}
                    {productImages.length > 0 &&
                    productImages[1] &&
                    productImages[1].image ? (
                      <img
                        class="d-block w-100 img-fluid"
                        src={`${productImages[1].image
                          .split("/media/")
                          .pop()
                          .split("%3A")
                          .join(":")
                          .replace(":/", "://")}`}
                        alt=""
                      />
                    ) : (
                      <div>Loading...</div>
                    )}{" "}
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carousel-example-1"
                  role="button"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carousel-example-1"
                  role="button"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                  <span class="sr-only">Next</span>
                </a>
                <ol class="carousel-indicators">
                  <li
                    data-target="#carousel-example-1"
                    data-slide-to="0"
                    class="active"
                  >
                    {product.thumbnail ? (
                      <img
                        class="d-block w-100 img-fluid"
                        src={`${product.thumbnail
                          .split("/media/")
                          .pop()
                          .split("%3A")
                          .join(":")
                          .replace(":/", "://")}`}
                        alt=""
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </li>
                  <li data-target="#carousel-example-1" data-slide-to="1">
                    {productImages.length > 0 &&
                    productImages[0] &&
                    productImages[0].image ? (
                      <img
                        class="d-block w-100 img-fluid"
                        src={`${productImages[0].image
                          .split("/media/")
                          .pop()
                          .split("%3A")
                          .join(":")
                          .replace(":/", "://")}`}
                        alt=""
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </li>
                  <li data-target="#carousel-example-1" data-slide-to="2">
                    {productImages.length > 0 &&
                    productImages[1] &&
                    productImages[1].image ? (
                      <img
                        class="d-block w-100 img-fluid"
                        src={`${productImages[1].image
                          .split("/media/")
                          .pop()
                          .split("%3A")
                          .join(":")
                          .replace(":/", "://")}`}
                        alt=""
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </li>
                </ol>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <h3>{product.name}</h3>
                <h5>Category: {product.category && product.category}</h5>
                <span>Avg Rate: </span>
                <span>{product.avg_rate}</span>{" "}
                <span>
                  <RatingComponent value={product.avg_rate} />
                </span>
                <div className="product__details__price">$ {product.price}</div>
                <p>{product.description}</p>
                <div className="product__details__button">
                  <ul>
                    <li>
                      <LikedProduct product={product.id} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </li>
                  </ul>
                </div>
                <div className="product__details__widget">
                  <ul>
                    <li>
                      <span>Availability: </span>
                      <span>
                        {" "}
                        {product.quantity === 0 ? (
                          <span className="out-of-stock">Out of Stock</span>
                        ) : (
                          <span className="in-stock">In Stock</span>
                        )}
                      </span>
                    </li>
                    <li></li>
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating"
                        precision={0.5}
                        value={rating}
                        onChange={handleRating}
                      />
                    </Stack>
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
            {productCategory.slice(-4).map((productItem) => (
              <Card key={productItem.id} product={productItem} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
