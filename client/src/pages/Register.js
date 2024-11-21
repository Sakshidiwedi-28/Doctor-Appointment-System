import React from "react";
import '../styles/RegisterStyles.css';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form submission handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values); // Ensure the API URL is correct
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registration Successful!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error during registration:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Register Form</h3>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required!" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <div className="form-actions">
          <Link to="./Login.js" className="m-2">
            Already a user? Login here
          </Link>
          <button className="btn btn-primary" htmlType="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
