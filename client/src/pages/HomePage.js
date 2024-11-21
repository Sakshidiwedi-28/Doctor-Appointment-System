import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col, Spin, Typography } from "antd"; // Added Spinner for Loading
import DoctorList from "../components/DoctorList";

const { Title } = Typography;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch all doctors
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing!");
      }

      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        console.error("Failed to fetch doctors:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="homepage-container">
        <Title level={2} className="text-center">
          Home Page
        </Title>

        {loading ? (
          <div className="spinner-container">
            <Spin size="large" />
          </div>
        ) : doctors.length > 0 ? (
          <Row gutter={[16, 16]}>
            {doctors.map((doctor) => (
              <Col key={doctor.id || doctor._id} span={8}>
                <DoctorList doctor={doctor} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-data-message">
            <Title level={4} type="secondary">
              No doctors available at the moment.
            </Title>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
