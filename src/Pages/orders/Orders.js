import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllOrders,
  getAllOrdersItems,
  getOrdersForPage,
} from "../../APIs/orders";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/slices/Pagination";
import { useNavigate } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

import "./Orders.css";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const next = useSelector((state) => state.pages.next);
  const previous = useSelector((state) => state.pages.previous);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(true);


  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const ordersData = await getAllOrders();
          const ordersWithTotalItems = await Promise.all(
            ordersData.data.results.map(async (order) => ({
              ...order,
              totalItems: await fetchTotalItems(order.id),
            }))
          );
          setOrders( ordersWithTotalItems );
          setLoading(false)
          dispatch(
            changePage({
              next: ordersData.data.next,
              previous: ordersData.data.previous,
            })
          );
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchData();
    }
  }, [navigate]);

  const fetchTotalItems = async (orderId) => {
    try {
      const response = await getAllOrdersItems(orderId);
      return response.data.length;
    } catch (error) {
      console.error(`Error fetching items for order ${orderId}:`, error);
      return 0;
    }
  };

  const goToNextPage = async () => {
    try {
      const nextOrdersData = await getOrdersForPage(next);
      setOrders( nextOrdersData.data.results );
      setLoading(false)
      dispatch(
        changePage({
          next: nextOrdersData.data.next,
          previous: nextOrdersData.data.previous,
        })
      );
    } catch (err) {
      console.log("there is no next products");
    }
  };

  const goToPreviousPage = async () => {
    try {
      const previousOrdersData = await getOrdersForPage(previous);
      setOrders( previousOrdersData.data.results );
      setLoading(false)
      dispatch(
        changePage({
          next: previousOrdersData.data.next,
          previous: previousOrdersData.data.previous,
        })
      );
    } catch (err) {
      console.log("there is no previous products");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      {isloading ?
      (
            <div className="text-center w-100">
              <Loader />
            </div>
        ) :
      (<div className="orders-container">
        {orders.map((order) => (
          <div className="order" key={order.id}>
            <h6 style={{ alignSelf: "flex-start" }}>
              Order Number: {order.id}
            </h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ul>
                <li>
                  Total Items: <span>{order.totalItems}</span>
                </li>
                <li>
                  Total Price: <span>{order.total_price} $</span>
                </li>
                <li>
                  Status:{" "}
                  <span className={getStatusClassName(order.status)}>
                    {order.status}
                  </span>
                </li>
                <li>
                  Created At: <span>{formatDate(order.created_at)}</span>
                </li>
              </ul>
              <Link className="button" to={`/order-details/${order.id}`}>
                Show Items
              </Link>
            </div>
          </div>
        ))}
        <nav
          aria-label="..."
          className="col-lg-9 col-md-9 d-flex justify-content-center mt-3 w-100"
        >
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={goToPreviousPage}>
                Previous
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={goToNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>)}
    </div>
  );
}

function getStatusClassName(status) {
  switch (status) {
    case "delivered":
      return "delivered";
    case "pending":
      return "pending";
    case "shipped":
      return "shipped";
    default:
      return "";
  }
}
