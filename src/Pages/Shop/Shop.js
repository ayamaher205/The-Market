import React, { useEffect, useState } from "react";
import {
  searchProducts,
  getAllProducts,
  ProductsByCategories,
  nextProducts,
} from "../../APIs/products";
import { getAllCategories } from "../../APIs/categories";
import Card from "../../Shared/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/slices/Pagination";
import Loader from "../../Shared/Loader/Loader";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isloading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const next = useSelector((state) => state.pages.next);
  const previous = useSelector((state) => state.pages.previous);
  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let productsPromise;
      try {
        if (searchTerm === "") {
          productsPromise = await getAllProducts();
          console.log(productsPromise.data);

          setProducts(productsPromise.data.results);
          setLoading(false);
          dispatch(
            changePage({
              next: productsPromise.data.next,
              previous: productsPromise.data.previous,
            })
          );
        } else {
          productsPromise = await searchProducts(searchTerm);
          var arr = productsPromise.data.results;
          for (var key in productsPromise.data.results) {
            if (arr.hasOwnProperty(key)) {
              arr[key].thumbnail = arr[key].thumbnail.replace(
                "http://localhost:8000",
                ""
              );
            }
          }
          // console.log("arr============"+arr);
          setProducts( arr );
          setLoading( false );
        }
      } catch (err) {
        console.error("Error fetching products by category:", err);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const goToNextPage = async () => {
    try {
      const nextProductsData = await nextProducts(next);
      setProducts(nextProductsData.data.results);
      setLoading(false);
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
      const previousProductsData = await nextProducts(previous);
      setProducts(previousProductsData.data.results);
      setLoading(false);

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
  const handleCategoryFilter = (categoryId) => {
    ProductsByCategories(categoryId)
      .then((response) => {
        setProducts(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  };

  return (
    <div className="row">
      <div className="col-lg-3 col-md-3">
        <div className="shop__sidebar">
          <div className="sidebar__categories">
            <div className="section-title m-5">
              <h4>Categories</h4>
            </div>
            <div className="categories__accordion">
              <div className="accordion" id="accordionExample">
                {categories.map((category) => (
                  <div className="card" key={category.id}>
                    <div
                      className="card-heading active"
                      onClick={() => {
                        handleCategoryFilter(category.id);
                        setLoading(true);
                      }}
                    >
                      <h4
                        style={{
                          textTransform: "capitalize",
                          textAlign: "center",
                        }}
                      >
                        <b>{category.name}</b>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-9 col-md-9">
        <input
          type="text"
          placeholder=" Search...... "
          value={searchTerm}
          onChange={(event) => {
            handleSearchInputChange(event);
            setLoading(true);
          }}
          className="form-control ml-0 my-5 w-25"
        />
        {isloading ? (
          <div className="text-center w-100">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center w-100">No products available</p>
        ) : (
          <div className="row property__gallery">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <nav
        aria-label="..."
        className="col-lg-9 col-md-9 d-flex justify-content-center mt-3 w-100"
      >
        <ul class="pagination">
          <li class="page-item">
            <button
              class="page-link"
              onClick={() => {
                goToPreviousPage();
                setLoading(true);
              }}
            >
              Previous
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              onClick={() => {
                goToNextPage();
                setLoading(true);
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
