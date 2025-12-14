import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import InputComponent from './InputComponent';
import Logo from '../assets/logo.png'
import RoutesPath from '../utils/ConstRoute';
import { Link } from 'react-router-dom';


function FormComponent({ inputs, onSubmit, submitText = 'Submit' }) {
  return (
    // Usa un map para traer todo el arreglo de inputs, el index es indice se crea el div y adentro todo el componente
    <Container>
        <Card>
          <Card.Body className='text-center'>
           <img src={Logo}  className="El logo" alt="Lofo" width={160} height={70}/>
          </Card.Body>
        </Card>

        <hr color='red'/>

        <Form onSubmit={onSubmit}>
          {inputs.map((input, index) => (
          <InputComponent
            key={index}
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
            value={input.value}
            onChange={input.onChange}
          />
        ))}

          <Button variant="primary" type="submit" className="mt-3 w-100">
            {submitText}
          </Button>
          

          <Button 
            variant="danger" 
            type="button" 
            className="mt-3 w-100"
            as={Link}
            to={RoutesPath.HOME}
            >
            Cancelar
          </Button>
        </Form>
    </Container>
  );
}

export default FormComponent;
