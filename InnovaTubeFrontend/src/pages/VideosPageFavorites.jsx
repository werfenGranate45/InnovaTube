import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoComponent from '../component/VideoComponent';
import RoutesApi from '../utils/RoutesApi';
import { Pagination, Form, InputGroup, Button } from 'react-bootstrap';

function VideosPageFavorites() {
  const [videos, setVideos] = useState([]);


  const [idVideo, setIdVideo] = useState([]);
  const [find, setFind] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (pageToken = '', ids = []) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (ids.length > 0) {
        params.append('ids', ids.join(','));
      }

      if (pageToken) params.append('pageToken', pageToken);


      const url = `${RoutesApi.ShowFavoriteIdsAPI}?${params.toString()}`;



      console.log(url);

      const res = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',

        }
      });



      const data = await res.json();

      setVideos(data.items || []);
      setNextToken(data.nextPageToken || null);
      setPrevToken(data.prevPageToken || null);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log("Fetch favorites URL:", RoutesApi.ShowFavoriteAPI);
        console.log("Token:", localStorage.getItem('token'));

        const res = await fetch(RoutesApi.ShowFavoriteAPI, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',

          }
        });

        const data = await res.json();

        const idsArray = data.favoritos.map(f => f.id_video);

        setIdVideo(idsArray); // 👈 aquí se actualiza el estado
      } catch (e) {
        console.error(e);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    if (idVideo.length === 0) return;

    fetchVideos('', idVideo);
  }, [idVideo, find]);


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
              isChecked={true}
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

export default VideosPageFavorites;