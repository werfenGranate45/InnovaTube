import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoComponent from './../component/VideoComponent';
import RoutesApi from '../utils/RoutesApi';
import { Pagination, Form, InputGroup, Button } from 'react-bootstrap';



function VideosPage() {
  const [videos, setVideos] = useState([]);

  const [find, setFind] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (pageToken = '') => {
    setLoading(true);
    try {

      const params = new URLSearchParams();

      if (pageToken) params.append('pageToken', pageToken);
      if (find) params.append('find', find);

      const url = `${RoutesApi.YoutubeAPI}?${params.toString()}`;
      console.log(url);

      const res = await fetch(url);
      const data = await res.json();
      console.log(data.items);
       console.log(data.items.id);
       console.log(data.items[0].id);

      setVideos(data.items);
      setNextToken(data.nextPageToken || null);
      setPrevToken(data.prevPageToken || null);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };



  useEffect(() => {
    // console.log(videos)
    fetchVideos();
  },[find]);


  return (
    <Container fluid>
      <Container className="my-3">
        <Row className="justify-content-end">
          <Col xs={12} sm={8} md={6} lg={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={() => setFind(inputValue.trim())}
              >
                Buscar
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Row className="g-3">
        {videos.map((video) => (
          <Col
            key={video.id?.videoId || video.id}
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
              videoId={video.id?.videoId || video.id}
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