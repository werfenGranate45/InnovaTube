import Layout from './layouts/Layout';
import VideosPage from './VideosPage';


// // or less ideally
// import { Button } from 'react-bootstrap';


function MainPage() {
  
  return (
    <div>
      <Layout children={ <VideosPage/> } />
    </div>
  );
}

export default MainPage
