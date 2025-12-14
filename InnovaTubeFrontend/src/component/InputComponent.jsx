import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaHome, FaDollarSign, FaCog, FaMedal, FaLock} from 'react-icons/fa';

function InputComponent({
  placeholder,
  name,
  type = 'text',
  value,
  onChange
}) {
  
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text></InputGroup.Text>
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
}

export default InputComponent;
