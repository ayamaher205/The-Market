import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { getProducts } from "../../APIs/products";
import { getAllCategories } from "../../APIs/categories";
import { ProductsByCategories } from "../../APIs/products";
import Loader from "../Loader/Loader";

export default function ProductsList({ product }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isloading, setLoading] = useState(true);
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
  const getAllProducts = () => {
    getProducts()
      .then((data) => {
        setProducts(data.data.latest_products);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleCategoryFilter = (categoryId) => {
    console.log(categoryId);
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
    <>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="section-title">
                <h4>Our product</h4>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <ul className="filter__controls">
                <li
                  className="active"
                  data-filter="*"
                  onClick={() => {
                    getAllProducts();
                    setLoading(true);
                  }}
                >
                  All
                </li>
                {categories.slice(0, 6).map((category) => (
                  <li
                    className="active"
                    data-filter=".women"
                    key={category.id}
                    onClick={() => {
                      handleCategoryFilter(category.id);
                      setLoading(true);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {isloading ? (
            <div className="text-center w-100">
              <Loader />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center w-100">No products available in This Section</p>
          ) : (
            <div className="row property__gallery">
              {products?.map((product) => (
                <Card product={product}></Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
