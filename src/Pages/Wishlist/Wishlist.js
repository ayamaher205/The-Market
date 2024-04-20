import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  getProductsByWishlist,
  getWishlistProductsForPage,
} from "../../APIs/wishlist";
import { removeProductsFromWishlist } from "../../APIs/wishlist";
import RatingComponent from "../../Shared/Rating/Rating";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Shared/Loader/Loader";

const Wishlist = () => {
  const navigate = useNavigate();
  const [ wishitems, setWishitems ] = useState( [] );
  const dispatch = useDispatch();
  const next = useSelector( ( state ) => state.pages.next );
  const previous = useSelector( ( state ) => state.pages.previous );
  const [ isloading, setLoading ] = useState( true );

  useEffect( () => {
    if ( !localStorage.getItem( "Token" ) ) {
      navigate( "/login" );
    } else {
      getProductsByWishlist()
        .then( ( res ) => {
          setWishitems( res.data.results );
          setLoading( false );
          dispatch(
            changePage( {
              next: productsPromise.data.next,
              previous: productsPromise.data.previous,
            } )
          );
        } )
        .catch( ( err ) => console.log( err ) );
    }
  }, [ navigate ] );

  const removeItem = ( productId ) => {
    removeProductsFromWishlist( productId )
      .then( ( res ) => {
        getProductsByWishlist()
          .then( ( res ) => {
            setWishitems( res.data.results );
            setLoading(false)
          } )
          .catch( ( err ) => console.log( err ) );
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
  };
  const goToNextPage = async () => {
    try {
      const nextProductsData = await getWishlistProductsForPage( next );
      setProducts( nextProductsData.data.results );
      setLoading(false)
      dispatch(
        changePage( {
          next: nextProductsData.data.next,
          previous: nextProductsData.data.previous,
        } )
      );
    } catch ( err ) {
      console.log( "there is no next products" );
    }
  };
  const goToPreviousPage = async () => {
    try {
      const previousProductsData = await getWishlistProductsForPage( previous );
      setProducts( previousProductsData.data.results );
      setLoading( false );
      dispatch(
        changePage( {
          next: previousProductsData.data.next,
          previous: previousProductsData.data.previous,
        } )
      );
    } catch ( err ) {
      console.log( "there is no previous products" );
    }
  };


  return (
    <section className="shop-cart spad">
      <div className="container">
        {isloading ? (
          <div className="text-center w-100">
            <Loader />
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              {wishitems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    marginTop: "50px",
                    color: "#ca1515",
                  }}
                >
                  Wishlist is empty
                </div>
              ) : (
                <div className="shop__cart__table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    {wishitems.map((item, id) => (
                      <tbody key={id}>
                        <tr>
                          <td className="cart__product__item">
                            <img
                              src={`${item.product_details.thumbnail
                                .split("/media/")
                                .pop()
                                .split("%3A")
                                .join(":")
                                .replace(":/", "://")}`}
                              alt=""
                            />
                            <div className="cart__product__item__title">
                              <h6>{item.product_details.name}</h6>
                              <div>
                                <RatingComponent
                                  value={item.product_details.avg_rate}
                                />
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
              )}
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
        )}
      </div>
    </section>
  );
};

export default Wishlist;
