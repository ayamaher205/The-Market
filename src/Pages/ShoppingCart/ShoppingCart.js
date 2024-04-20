import { getCartData } from "../../APIs/cart";
import { useState, useEffect } from "react";
import CartItem from "../../Shared/CartItem/CartItem";
import { stripeCheckout, orderCheckout } from "../../APIs/payment";
import { useNavigate } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState([]);

  const [totalPrice, setTotalprice] = useState(null);
  const [isloading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    } else {
      getCartData()
        .then((data) => {
          setCartProducts( data.data );
          setLoading(false)
          prepareTotalPrice();
        })
        .catch((err) => console.log(err.message));
    }
  }, [navigate, totalPrice]);

  const prepareTotalPrice = () => {
    let tp = 0;
    if (cartProducts !== null) {
      for (let i = 0; i < cartProducts.length; i++) {
        tp += cartProducts[i].quantity * cartProducts[i].product.price;
      }
      setTotalprice(tp);
    }
  };

  // const forwardToStripe = (e) => {
  //   e.preventDefault();
  //   stripeCheckout(totalPrice)
  //     .then((response) => {
  //       // redirect to stripe checkout page.
  //       orderCheckout(totalPrice)
  //       .then((response) => {
  //         window.location.href = response.data.payload;
  //       })
  //     })
  //     .catch((err) => alert("error: something wrong happened"));
  // };

  const forwardToStripe = (e) => {
    e.preventDefault();
    stripeCheckout(totalPrice)
      .then((stripeResponse) => {
        // Call your backend to prepare the checkout
        window.location.href = stripeResponse.data.payload;
        orderCheckout(totalPrice)
          .then((response) => {
            // Redirect to Stripe checkout page after successful preparation
            alert("added");
          })
          .catch((orderError) => {
            // Handle errors from the orderCheckout endpoint
            console.error("Error preparing order:", orderError);
            alert("Error preparing order. Please try again.");
          });
      })
      .catch((stripeError) => {
        // Handle errors from the stripeCheckout endpoint
        console.error("Error with Stripe:", stripeError);
        alert("Error with Stripe. Please try again.");
      });
  };

  return (
    <>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="./index.html">
                  <i className="fa fa-home"></i> Home
                </a>
                <span>Shopping cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {isloading ? (
              <div className="text-center w-100">
                <Loader />
              </div>
              ) :
              (<div className="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>C-Q</th>
                      <th>Apply</th>
                      <th>Q</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts?.map((oneElement) => (
                      <CartItem
                        cartData={oneElement}
                        chg={setCartProducts}
                        data={cartProducts}
                        cart_total={totalPrice}
                        chg_cart_total={setTotalprice}
                      />
                    ))}
                  </tbody>
                </table>
              </div>)
              }
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn">
                <a href="#">Continue Shopping</a>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn update__btn">
                {/* <a href="#"> */}
                {/* <span class="icon_loading"></span>   */}
                {/* </a> */}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="discount__content">
                <h6> </h6>
                <form action="#">
                  {/* <input type="text" placeholder="Enter your coupon code" /> */}
                  {/* <button type="submit" class="site-btn">
                     
                  </button> */}
                </form>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-2">
              <div className="cart__total__procced">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Total <span>$ {totalPrice}</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="primary-btn"
                  onClick={(e) => forwardToStripe(e)}
                >
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
