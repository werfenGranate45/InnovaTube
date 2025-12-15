import Layout from './layouts/Layout';
import VideosPageFavorites from './VideosPageFavorites';

// // or less ideally
// import { Button } from 'react-bootstrap';


function MainPageFav() {
  
  return (
    <div>
      <Layout>
        <VideosPageFavorites></VideosPageFavorites>
      </Layout>
    </div>
  );
}

export default MainPageFav
