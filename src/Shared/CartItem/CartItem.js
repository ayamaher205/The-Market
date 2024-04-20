import { removeFromCartData, updateCartProductQuantity } from "../../APIs/cart";
import { useState } from "react";

export default function CartItem({
  cartData,
  chg,
  data,
  cart_total,
  chg_cart_total,
}) {
  const base_URL = "https://imgur.com/";

  // console.log("rr" + cartData.product.price*cartData.quantity);
  const [quantity, setQuantity] = useState(cartData.quantity);
  const [citemPrice, setcitemPrice] = useState(
    cartData.product.price * cartData.quantity
  );

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const removeCartItem = (e, ci_id) => {
    e.preventDefault();
    chg(data.filter((item) => item.id !== ci_id));
    removeFromCartData(ci_id)
      .then(() => {
        alert("Removed from cart successfully");
        chg_cart_total(cart_total - cartData.product.price * quantity);
      })
      .catch((err) => alert("error: something wrong happened"));
  };

  const updateQuantity = (e, cartItemId) => {
    e.preventDefault();
    console.log(quantity);
    // chg_cart_total(cart_total - cartData.product.price*cartData.quantity)

    updateCartProductQuantity(cartItemId, quantity)
      .then(() => {
        alert("Updated to cart successfully");
        setcitemPrice(cartData.product.price * quantity);
        chg_cart_total(cart_total - cartData.product.price * quantity);
      })
      .catch((err) => alert("error: Quantity is more than available"));
  };

  return (
    <>
      <tr>
        <td className="cart__product__item">
          {product.thumbnail ? (
            <img
              class="d-block w-100 img-fluid"
              src={`${cartData.product.thumbnail}`}
              alt=""
            />
          ) : (
            <div>Loading...</div>
          )}
          <div className="cart__product__item__title">
            <h6>{cartData.product.name}</h6>
            <div className="rating">
              {/* <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i> */}
            </div>
          </div>
        </td>
        <td className="cart__price">$ {cartData.product.price}</td>
        <td className="">
          <div>
            <input
              type="number"
              style={{ width: "3em" }}
              min={1}
              max={50}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-success"
            onClick={(e) => updateQuantity(e, cartData.id)}
            style={{ margin: "8px" }}
          >
            Apply
          </button>
        </td>

        <td className="">
          <div>
            <input
              type="number"
              readOnly
              style={{ width: "4em" }}
              value={quantity}
            />
          </div>
        </td>

        <td className="cart__total">$ {citemPrice}</td>
        <td className="cart__close">
          <span
            className="icon_close"
            onClick={(e) => removeCartItem(e, cartData.id)}
          ></span>
        </td>
      </tr>
    </>
  );
}
