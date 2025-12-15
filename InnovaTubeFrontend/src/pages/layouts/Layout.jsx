import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaDollarSign, FaCog } from 'react-icons/fa';
import Logo from '../../assets/logo.png';
import './Layout.css';
import RoutesApi from '../../utils/RoutesApi';
import RoutesPath from '../../utils/ConstRoute'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ AQUÍ
  const [isAuth, setIsAuth] = useState(
  !!localStorage.getItem('token')
  );

  async function handleLogout() {
  try {
    const request = await fetch(RoutesApi.LogoutAPI, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      }
    });

    if (!request.ok) {
      throw new Error("Error al cerrar sesión");
    }

    // Quita el token de forma local el token 
    //Usas un logout para que se pueda rederigir
    localStorage.removeItem("token");
    navigate('/login')

  } catch (error) {
    console.error("Logout error:", error);
  }
}
  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? '' : 'closed'} bg-light`}>
        
        <Nav className="flex-column p-2">
          <Nav.Link href="#panel" className="text-center">
            <img src={Logo}  className="El logo" alt="Logo"/>
          </Nav.Link>
          <hr color='white'/>
          <Nav.Link  className="text-dark">
            <FaHome  to={'/'}/> <span className="text">Inicio</span>
          </Nav.Link>
          {/* En esta parte identifica si Auth que significa el token no esta nullo pues se renderiza */}
          {isAuth && (
          <Nav.Link
            className="text-dark"
            onClick={handleLogout}>
          <FaCog /> <span className="text">Logout</span>
          </Nav.Link>
          )}
        </Nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1">
        <Navbar bg="light" variant="light" sticky="top" className="navbar-white">
           <Container fluid className="px-0 d-flex align-items-center">
             {/* Botón hamburguesa pegado al sidebar */}
             <Button 
               variant="outline-black" 
               onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`hamburger-btn ${sidebarOpen ? 'open' : 'closed'}`}>
               ☰
             </Button>
           
             {/* Otros botones */}
            <div className="ms-auto d-flex gap-2">

              {!(isAuth) && (
                 <Button
                  as={Link}
                  to={RoutesPath.LOGIN}
                  variant="outline-dark">
                  Login
                </Button> 
              )}

              {(isAuth) && (
                 <Button
                  as={Link}
                  to={RoutesPath.FAVORITES}
                  variant="outline-dark">
                  Favoritos
                </Button> 
              )}
               
                <Button
                  as={Link}
                  to={RoutesPath.REGISTER}
                  variant="outline-dark">
                  Registro de usuario
                </Button>
             </div>
           </Container>
        </Navbar>

        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
