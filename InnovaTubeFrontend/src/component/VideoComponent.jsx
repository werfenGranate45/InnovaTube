import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function VideoComponent({
  TitleVideo,
  DatePublish,
  imgVideo,
  videoId
}) {
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

      </Card.Body>
    </Card>
  );
}

export default VideoComponent;