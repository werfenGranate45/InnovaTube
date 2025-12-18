import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function VideoComponent({
  TitleVideo,
  DatePublish,
  imgVideo,
  videoId,
  onHandleChecked
}
) {
  // const [isChecked, setIsChecked] = useState();

  // useEffect(() => {

  // }, [isChecked])

  

  

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
          (isAuth && document.URL.includes('favorites')) && (
            <Form name='nigger'>
              <Form.Check // prettier-ignore
                name='check'
                type="switch"
                id="custom-switch"
                label="Marcar como favorito"
                onChange={ onHandleChecked }
              />
            </Form>
          )}


      </Card.Body>
    </Card>
  );
}

export default VideoComponent;