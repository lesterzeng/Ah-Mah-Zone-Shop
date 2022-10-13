import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [postal, setPostal] = useState(shippingAddress.postal || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        postal,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        postal,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Infomation</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Information</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="postal">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue to Payment
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingScreen;
