import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password1) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length !== 12) {
      toast.error("Password need to be at least 12 characters");
      return;
    }
    try {
      const { data } = await Axios.put("/api/users/register", {
        name,
        email,
        password,
        password1,
      });
      console.log(data);
      toast.success("User Created! Sign in now!");
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <h1 className="my-3">Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name.."
          ></Form.Control>
        </Form.Group>{" "}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email.."
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password.."
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Re-enter password.."
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Create Account</Button>
        </div>
        <div className="mb-3">
          Already have an account? {""}
          <Link to={`/signin?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterScreen;
