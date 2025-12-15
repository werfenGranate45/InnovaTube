import { BrowserRouter as Router, useRoutes } from "react-router-dom"
import './App.css'
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoutesPath from './utils/ConstRoute';
import MainPageFav from "./pages/MainPageFav";



function App() {
    function AppRouter(){
        const routes = useRoutes([
        {
          path: RoutesPath.HOME, 
          element: <MainPage/>
        },
        {
          path: RoutesPath.LOGIN,
          element: <LoginPage />,
        },
        {
          path: RoutesPath.REGISTER,
          element: <RegisterPage />
        },
        {
          path: RoutesPath.FAVORITES,
          element: <MainPageFav /> 
            
        }
      ]);

     return routes;
  }


  return (
    <Router>
      <AppRouter/>
    </Router>
  );
}

export default App
