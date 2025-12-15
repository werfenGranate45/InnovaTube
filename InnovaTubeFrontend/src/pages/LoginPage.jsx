import FormComponent from "../component/FormComponent";
import { useState } from "react";
import RoutesApi from "../utils/RoutesApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //E es el componente al que le pasamos como argumento y contiene todos los valores que son necesarios
  function onChangeEmail(e) {
    setEmail(e.target.value.trim())
  }

  function onChangePassword(e) {
    setPassword(e.target.value.trim())
  }

  async function onSubmit(e) {
    //Esto quita el comportamiento por default del navegador
    e.preventDefault()
    try {
      //Aqui consumo la api de login mandano los datos de email y password, los mando en formato JSON
      const request = await fetch(RoutesApi.LoginAPI, {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      navigate('/')
      
      const response = await request.json()

      localStorage.setItem('token', response.token);
    } catch (error) {
      console.log(error)
    }
  }

  const inputs = [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      onChange: onChangeEmail
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      onChange: onChangePassword
    }
  ];

  return (
    <div>
      <FormComponent onSubmit={onSubmit} inputs={inputs} submitText="login" />
    </div>
  );
}

