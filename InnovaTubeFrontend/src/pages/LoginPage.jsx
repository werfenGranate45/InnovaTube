import FormComponent from "../component/FormComponent";
import { useState } from "react";
import RoutesApi from "../utils/RoutesApi";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function LoginPage() {
  const navigate = useNavigate(); 
  const [isWrong, setIsWrong] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value.trim());
  }

  function onChangePassword(e) {
    setPassword(e.target.value.trim());
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const request = await fetch(RoutesApi.LoginAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await request.json();

      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setIsWrong(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const inputs = [
    { name: "email", placeholder: "Email", type: "email", onChange: onChangeEmail },
    { name: "password", placeholder: "Password", type: "password", onChange: onChangePassword },
  ];

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card style={{ minWidth: "300px", padding: "20px" }}>
            <h3 className="text-center mb-3">Login</h3>
            <FormComponent onSubmit={onSubmit} inputs={inputs} submitText="Login" />
            {isWrong && <p className="text-danger text-center mt-2">Email o contraseña incorrectos</p>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
