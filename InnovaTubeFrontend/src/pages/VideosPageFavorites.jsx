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



  //     setLoading(true);
  //     try {

  //       const params = new URLSearchParams();
  //       const videosFAVS = await fetch(RoutesApi.ShowFavoriteAPI, {

  //         method: 'GET',
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${localStorage.getItem('token')}`
  //         },
  //       });

  //       const data = await videosFAVS.json();

  //       console.log(data);
  //       console.log(data.favoritos);
  //     console.log(data.favoritos[0].id_video);

  //     console.log('DATA COMPLETA:', data);
  // console.log('FAVORITOS:', data.favoritos);
  // console.log('ES ARRAY?', Array.isArray(data.favoritos));
  // console.log('LENGTH:', data.favoritos?.length);

  //     const ids = data.favoritos.map(f => f.id_video);
  //     setIdVideo(ids);
  //     console.log(idVideo);
  //     if (idVideo.length > 0) {
  //   params.append('ids', idVideo.join(','));

  //   useEffect
  // }

  //     if (pageToken) params.append('pageToken', pageToken);
  //     if (find) params.append('find', find);







  //       const url = `${RoutesApi.YoutubeAPI}?${params}`;

  //       console.log(url)
  //     const res = await fetch(url);
  //       const dataV = await res.json();
  //       console.log(dataV.items);
  //       const items = dataV.items;
  //       setVideos(items);
  //       setNextToken(dataV.nextPageToken || null);
  //       setPrevToken(dataV.prevPageToken || null);









  //       // // if (pageToken) params.append('pageToken', pageToken);
  //       // // if (find) params.append('find', find);
  //       // const url = `${RoutesApi.ShowFavoriteAPI}?${params.toString()}`;
  //       // console.log(url);

  //       // const request = await fetch(url, {
  //       //   method: 'GET',
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     "Authorization": `Bearer ${localStorage.getItem('token')}`
  //       //   },
  //       // });


  //       // const data = await request.json();
  //       // console.log(data.favoritos);

  //       // const items = data.items;
  //       // setVideos(items);
  //       // setNextToken(data.nextPageToken || null);
  //       // setPrevToken(data.prevPageToken || null);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     setLoading(false);
  //   };

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
  }, [idVideo]);



  return (
    <Container fluid>
      <Row className="mb-3 justify-content-center">

        <div className="d-flex justify-content-end">
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

        </div>



      </Row>

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
              isChecked={true}
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



export default VideosPageFavorites;