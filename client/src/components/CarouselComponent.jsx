import Carousel from 'react-bootstrap/Carousel';
function CarouselComponent() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/id/1015/1200/400"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Crackers Shop</h3>
          <p>Celebrate your moments with our colorful collection!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/id/1016/1200/400"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Best Deals</h3>
          <p>Grab your favorite crackers at best prices!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/id/1018/1200/400"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Safe & Colorful</h3>
          <p>Enjoy safe celebrations with eco-friendly crackers.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
