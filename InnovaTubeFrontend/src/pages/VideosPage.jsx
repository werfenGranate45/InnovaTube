import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoComponent from './../component/VideoComponent';
import RoutesApi from '../utils/RoutesApi';
import { Pagination } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';



function VideosPage() {
  const [videos, setVideos] = useState([])
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);
  const [loading, setLoading] = useState(false);


   const inputs = [
    {
      name: 'find',
      placeholder: 'Busqueda',
    },
  ]
  
  // Cuando haces fetch de un metodo get, simplememte obtienes los datos
  // Y los guardas en una variable para poder renderizarlo
  const fetchVideos = async (pageToken = '') => {
    setLoading(true);
    try {
      const url = pageToken
        ? `${RoutesApi.YoutubeAPI}?pageToken=${pageToken}`
        : RoutesApi.YoutubeAPI;

      const res = await fetch(url);
      const data = await res.json();
      
      setVideos(data.items);
      setNextToken(data.nextPageToken || null);
      setPrevToken(data.prevPageToken || null);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  
  useEffect(() => {    
    fetchVideos();
  }, []);


  return (
    <Container fluid>
      {/* <FormCheckInput>

      </FormCheckInput> */}
      
      <Row className="g-3">
        {videos.map((video) => (
          <Col
            key={video.id}        
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
          >
            <VideoComponent
              TitleVideo={video.snippet.title}
              DatePublish={video.snippet.publishedAt}
              imgVideo={video.snippet.thumbnails.medium.url}
              videoId={video.id}
            />
          </Col>
        ))}
      </Row>

     {/* PAGINACION */}
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          disabled={!prevToken || loading}
          onClick={() => fetchVideos(prevToken)}
        >
          &lt; Prev
        </Pagination.Prev>

        <Pagination.Next
          disabled={!nextToken || loading}
          onClick={() => fetchVideos(nextToken)}
        >
          Next &gt;
        </Pagination.Next>
      </Pagination>
    </Container>
  );
}

export default VideosPage;