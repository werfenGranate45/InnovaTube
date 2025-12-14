import { useState } from 'react'
// import { Button } from 'antd'
import Button from 'react-bootstrap/Button';
import Layout from './layouts/Layout';

// // or less ideally
// import { Button } from 'react-bootstrap';


function MainPage() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <Layout children={
        <section id="home">
        <Button variant="primary">Click me</Button>
        <h1>Welcome to My React App</h1>
      </section>
      }>

      </Layout>
      
      {/* <Slidebar isOpen={true}/> */}
    </div>
  );
}

export default MainPage
