import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import UpdateProfileSchema from "../../schemas/UpdateProfile";
import axiosInstance from "../../APIs/Axios";
import userImg from "../../assets/user.png";
import "./UpdateProfile.css";
const UpdateProfile = () => {
  const user = useSelector((state) => state.profile.userData);
  const [registrationMessage, setUpdatedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigator = useNavigate();
  const onSubmit = (values) => {
    axiosInstance
      .put("/account/update", values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        setUpdatedMessage("Registered successfully!");
        setErrorMessage("");
        navigator("/account");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage("This email already exists");
          setUpdatedMessage("");
        } else {
          setErrorMessage("An error occurred!");
          setUpdatedMessage("");
        }
      });
  };

  const { errors, values, handleChange, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: user ? user[0].first_name : "",
        last_name: user ? user[0].last_name : "",
        email: user ? user[0].email : "",
        phone: user ? user[0].phone : "",
        address: user ? user[0].address : "",
        password: "",
        confirm_password: "",
      },
      validationSchema: UpdateProfileSchema,
      onSubmit,
    });

  return (
    <div className="container">
      <div className="main-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={userImg}
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <div className="mt-3">
                    <h4>
                      {user ? `${user[0].first_name} ${user[0].last_name}` : ""}
                    </h4>
                    <p className="text-secondary mb-1">
                      {user ? user[0].email : ""}
                    </p>
                  </div>
                </div>
                <hr className="my-4" />
                <ul className="list-group list-group-flush">
                  <Link style={{ textDecoration: "none" }} to="/cart">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-shopping-cart mr-2 icon-inline text-primary"
                        >
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h8.64a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Cart
                      </h6>
                    </li>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/wishlist">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-heart mr-2 icon-inline text-danger"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        Wishlist
                      </h6>
                    </li>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/orders">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f9a0c2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-shopping-bag mr-2 icon-inline text-primary"
                        >
                          <path d="M9 2L7 6h10l-2-4H9zm7 4h3v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6h3l3 6h4l3-6zM3 6h4"></path>
                        </svg>
                        Orders
                      </h6>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <form action="#" method="post" onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                      />
                      {errors.first_name && touched.first_name ? (
                        <p className="text-danger">{errors.first_name}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values.last_name}
                      />
                      {errors.last_name && touched.last_name ? (
                        <p className="text-danger">{errors.last_name}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <p className="text-danger">{errors.email}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values.phone}
                      />
                      {errors.phone && touched.phone ? (
                        <p className="text-danger">{errors.phone}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values.address}
                      />
                      {errors.address && touched.address ? (
                        <p className="text-danger">{errors.address}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values.password}
                      ></input>
                      {errors.password && touched.password ? (
                        <p className="text-danger">{errors.password}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Confirm Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        name="confirm_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values.confirm_password}
                      />
                      {errors.confirm_password && touched.confirm_password ? (
                        <p className="text-danger">{errors.confirm_password}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="submit"
                        onSubmit={handleSubmit}
                        className="btn btn-primary px-4"
                        value="Save Changes"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
