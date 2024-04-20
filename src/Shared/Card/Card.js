import { addProductToCart } from "../../APIs/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import RatingComponent from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import LikedProduct from "../LikedProduct/LikedProduct";

export default function Card({ product }) {
  const base_URL = "https://cartify-2.onrender.com";

  const navigate = useNavigate();

  const redirectToProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  function addToCart(e, id) {
    if (localStorage.getItem("Token")) {
      e.preventDefault();
      addProductToCart(id)
        .then(() => {
          alert("Added to cart successfully");
        })
        .catch((err) => alert("Auth Error : You must login first!"));
    }else{
      alert("You must login first!");
    }
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 mix">
        <div className="product__item">
          <div
            className="product__item__pic set-bg"
            style={{
              "background-image": `url(${product.thumbnail
                .split("/media/")
                .pop()
                .split("%3A")
                .join(":")
                .replace(":/", "://")})`,
            }}
          >
            {product.quantity === 0 ? (
              <span className="out">Out of Stock</span>
            ) : (
              <span className="in">Available</span>
            )}
            <ul className="product__hover">
              <li>
                <a>
                  <span>
                    <LikedProduct product={product.id} />
                  </span>
                </a>
              </li>
              <li>
                <a onClick={(e) => addToCart(e, product.id)}>
                  <span class="icon_bag_alt"></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="product__item__text">
            <h6>
              <p
                className="product-header"
                onClick={() => redirectToProductDetails(product.id)}
              >
                {product.name}
              </p>
            </h6>
            <div>
              <RatingComponent value={product.avg_rate} />
            </div>
            <div className="product__price">$ {product.price}</div>
          </div>
        </div>
      </div>
    </>
  );
}
