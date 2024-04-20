import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOrdersItems } from "../../APIs/orders";
import { getProductDetails } from "../../APIs/products";

export default function OrderItemsPage() {
  const [orderItems, setOrderItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await getAllOrdersItems(orderId);
        setOrderItems(response.data);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  useEffect(() => {
    const fetchProductDetailsForOrderItems = async () => {
      try {
        const productIds = orderItems.map((item) => item.product);
        const productDetailsPromises = productIds.map((productId) =>
          getProductDetails(productId)
        );
        const productDetailsData = await Promise.all(productDetailsPromises);
        const productDetailsMap = {};
        productDetailsData.forEach((data, index) => {
          productDetailsMap[productIds[index]] = data.data;
        });
        setProductDetails(productDetailsMap);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetailsForOrderItems();
  }, [orderItems]);
  
  const base_URL = "http://127.0.0.1:8000";

  return (
    <>
      <h2>Order Items for Order Number: {orderId}</h2>

      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {productDetails[item.product] ? (
                            <img
                              // src={productDetails[item.product].thumbnail}
                              src={`${productDetails[item.product].thumbnail
                                .split("/media/")
                                .pop()
                                .split("%3A")
                                .join(":")
                                .replace(":/", "://")}`}
                              width={"140px"}
                              style={{ "border-radius": "15px" }}
                              alt="Product Thumbnail"
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>
                          {productDetails[item.product]
                            ? productDetails[item.product].name
                            : "N/A"}
                        </td>
                        <td>
                          {productDetails[item.product]
                            ? `${productDetails[item.product].price}$`
                            : "N/A"}
                        </td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
