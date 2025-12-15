import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import RoutesApi from '../utils/RoutesApi';

function VideoComponent({
  TitleVideo,
  DatePublish,
  imgVideo,
  videoId,
  isChecked
}
) {

  async function onHandleFavorite(checked) {
    console.log(checked);
    const url = checked ? RoutesApi.CreateFavoriteAPI : RoutesApi.DeleteFavoriteAPI


    console.log(url);

    try {
      const response = await fetch(url, {
        method: checked ? 'POST' : 'DELETE',
        headers:
        {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ videoId: videoId, checked: checked },
        )
      });
    } catch (error) {
      console.error(error);
    }
  }

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgVideo}
        style={{
          height: '180px',
          objectFit: 'cover'
        }}
      />

      <Card.Body>
        <Card.Title className="videos-title">
          {TitleVideo}
        </Card.Title>

        <Card.Text>
          {new Date(DatePublish).toLocaleDateString()}
        </Card.Text>

        <Button
          variant="primary"
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver
        </Button>
        {
          (isAuth) && (
            <Form>
              <Form.Check // prettier-ignore
                name='check'
                type="switch"
                id="custom-switch"
                label="Marcar como favorito"
                checked={ isChecked }
                onChange={(e) => onHandleFavorite(e.target.checked)}
              />
            </Form>
          )}


      </Card.Body>
    </Card>
  );
}

export default VideoComponent;