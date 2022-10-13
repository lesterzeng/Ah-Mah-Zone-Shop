import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ErrorBox from "../components/ErrorBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const UsersListScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, usersName }, dispatch] = useReducer(reducer, {
    usersName: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        const url = "/api/users/userslist";
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + userInfo.access,
          },
        };
        const result = await axios.get(url, config);
        console.log(result.data);
        setData(result.data);

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  const handleRemoveItem = (itemId) => {
    console.log(itemId);
    const deleteData = async (itemId) => {
      try {
        const url = "/api/users/delete/" + itemId;
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + userInfo.access,
          },
        };

        const result = await axios.delete(url, config);
      } catch (err) {
        console.log(err);
      }
    };
    deleteData(itemId);
  };

  return (
    <div>
      <Helmet>
        <title>Users List</title>
      </Helmet>
      <h1>Users List</h1>
      <Row>
        <Col>
          <ListGroup>
            {data &&
              data.map((item) => (
                <ListGroup.Item>
                  <Row className="align-items-end">
                    <Col>{item.name}</Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default UsersListScreen;
