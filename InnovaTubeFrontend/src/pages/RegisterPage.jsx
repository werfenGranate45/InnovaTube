import FormComponent from "../component/FormComponent";
import { useEffect, useState } from "react";
import RoutasApi from "../utils/RoutesApi";
import { Container, Row, Col, Card } from "react-bootstrap";


/**
 * 
 * Nombre 
 * Apellido
 * Nombre usuario
 * Correo electronico
 * Contraseña
 * Confirmacion contraseña
 * Captcha
 */


export default function RegisterPage(){
  const [isWrong, setIsWrong] = useState(false);
    const [name, setName]          = useState("")
    const [last_name, setLastName] = useState("")
    const [username, setUsername]  = useState("")
    const [email, setEmail]        = useState("")
    const [password, setPassword]  = useState("")
    

    //E es el componente al que le pasamos como argumento y contiene todos los valores que son necesarios
    function onChangeName(e) {
        setName(e.target.value.trim())
    }

    function onChangeLastName(e) {
        setLastName(e.target.value.trim())
    }

    function onChangeUsername(e){
        setUsername(e.target.value.trim())
    }
    
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
      const request = await fetch(RoutasApi.RegisterAPI, {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          last_name,
          username,
          email,
          password,
        })
      })

      //En caso de que la peticion sea correcta entra esta parte, 
      //Hago obtengo el token del request que se manda desde la API, y la guardo en la session de cookies
      //Para que me permita consumir rutas como la de logout
      const response = await request.json()
      if(!response.ok){
        setIsWrong(true);
      }
      console.log(response);

    } catch (error) {
      console.log(error)
    }
  }

    const inputs = [
    {
        name: 'name',
        placeholder: 'Nombre',
        type: 'text',
        onChange: onChangeName
    },
    {
        name: 'last_name',
        placeholder: 'Apellido',
        type: 'text',
        onChange: onChangeLastName
    },
     {
        name: 'username',
        placeholder: 'Username',
        type: 'text',
        onChange: onChangeUsername
    },
    {
        name: 'email',
        placeholder: 'correo@ejemplo.com',
        type: 'email',
        onChange: onChangeEmail 
    },
    {
        name: 'password',
        placeholder: 'Contraseña',
        type: 'password',
        onChange: onChangePassword

    },
    // {
    //     name: 'passwordDos',
    //     placeholder: 'Confirma su contraseña',
    //     type: 'password',
    //     onChange: onChangePassword
    // }
  ];

    return(
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card style={{ minWidth: "300px", padding: "20px" }}>
            <h3 className="text-center mb-3">Login</h3>
            <FormComponent onSubmit={onSubmit} inputs={inputs} submitText="Registrarse"/>
            {isWrong && <p className="text-danger text-center mt-2">Datos incorrectos</p>}
          </Card>
        </Col>
      </Row>
    </Container>
      
    );
}
