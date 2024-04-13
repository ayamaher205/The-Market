import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  getProductsByWishlist,
  getWishlistProductsForPage,
} from "../../APIs/wishlist";
import { removeProductsFromWishlist } from "../../APIs/wishlist";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
const Wishlist = () => {
  const navigate = useNavigate();
  const [wishitems, setWishitems] = useState([]);
  const dispatch = useDispatch();
  const next = useSelector((state) => state.pages.next);
  const previous = useSelector( ( state ) => state.pages.previous );
  
  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    } else {
      getProductsByWishlist()
        .then((res) => {
          setWishitems( res.data );
          dispatch(
            changePage({
              next: productsPromise.data.next,
              previous: productsPromise.data.previous,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  const removeItem = (productId) => {
    removeProductsFromWishlist(productId)
      .then((res) => {
        const updatedWishitems = wishitems.filter(
          (item) => item.product.id !== productId
        );

        setWishitems(updatedWishitems);

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
const goToNextPage = async () => {
  try {
    const nextProductsData = await getWishlistProductsForPage(next);
    setProducts(nextProductsData.data.results);
    dispatch(
      changePage({
        next: nextProductsData.data.next,
        previous: nextProductsData.data.previous,
      })
    );
  } catch (err) {
    console.log("there is no next products");
  }
};
const goToPreviousPage = async () => {
  try {
    const previousProductsData = await getWishlistProductsForPage(previous);
    setProducts(previousProductsData.data.results);
    dispatch(
      changePage({
        next: previousProductsData.data.next,
        previous: previousProductsData.data.previous,
      })
    );
  } catch (err) {
    console.log("there is no previous products");
  }
};
  return (
    <section className="shop-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {wishitems.map((item, id) => (
                  <tbody key={id}>
                    <tr>
                      <td className="cart__product__item">
                        <img src="img/shop-cart/cp-1.jpg" alt="" />
                        <div className="cart__product__item__title">
                          <h6>{item.product_details.name}</h6>
                          <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">
                        $ {item.product_details.price}
                      </td>
                      <td className="cart__close">
                        <button>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => {
                              removeItem(item.product);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
      <nav
        aria-label="..."
        className="col-lg-9 col-md-9 d-flex justify-content-center mt-3 w-100"
      >
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" onClick={goToPreviousPage}>
              Previous
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" onClick={goToNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
