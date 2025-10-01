import { Container, Row, Col } from "react-bootstrap";
import { Truck, Clock } from "react-bootstrap-icons";
import { FaFire } from "react-icons/fa";
import { Star, Lightning } from "react-bootstrap-icons";


function ServicesSection() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "40px 0",
        borderTop: "5px solid #f00",
        borderBottom: "5px solid #f00",
      }}
    >
      <Container>
        <Row className="text-center">
          <Col md={6}>
            <Truck size={50} color="gold" />
            <h4>Quick Delivery</h4>
            <p>Delivery at your convenient Day.</p>
          </Col>
          <Col md={6}>
            <Clock size={50} color="gold" />
            <h4>24/7 Help Center</h4>
            <p>The Contact Center Survival Guide.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ServicesSection;
