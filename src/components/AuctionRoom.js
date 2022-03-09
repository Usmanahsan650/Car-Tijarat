import { useEffect, useState } from "react";
import { Container, Row, Col, ButtonGroup, Button, Form, Card, ListGroup } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

const getSellerInfo = (AuctionID, setSellerInfo) => {
    // fetching seller information with respect to the AuctionID
    fetch('http://localhost:5000/api/seller/seller_info/' + AuctionID)
    .then(response => {
        if(!response.ok){ 
            throw Error('Could not fetch the seller info.');
        }
        return response.json();
    })
    .then(result => { setSellerInfo(result); })
    .catch(err => console.log(err));
};

const AuctionRoom = () => {
    const location = useLocation();
    const { data } = location.state;

    const { AuctionID } = useParams();
    const [sellerInfo, setSellerInfo] = useState(null);

    useEffect(() => {
        getSellerInfo(AuctionID, setSellerInfo);
    }, []);

    return ( 
        <Container>

            <Row>
                <p>Auction ID: <span className="badge bg-dark">{ data.id }</span></p>
                <p>Vehicle: <span className="fw-bold">{ data.RegNo + " " + data.name}</span></p>
                <p>Vehicle Owner: <span className="fw-bold">{ (sellerInfo && sellerInfo[0].full_name) || <span>Loading...</span> }</span></p>
            </Row>

            <Row>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>Manufacturer: <span className="fw-bold">{ data.manufacturer }</span></ListGroup.Item>
                        <ListGroup.Item>Model: <span className="fw-bold">{ data.modelNo }</span></ListGroup.Item>
                        <ListGroup.Item>Seats: <span className="fw-bold">{ data.no_of_seats }</span></ListGroup.Item>
                        <ListGroup.Item>Body Type: <span className="fw-bold">{ data.body_type }</span></ListGroup.Item>
                        <ListGroup.Item>Engine Type: <span className="fw-bold">{ data.engine_type }</span></ListGroup.Item>
                        <ListGroup.Item>Fuel Type: <span className="fw-bold">{ data.fuel_type }</span></ListGroup.Item>
                        <ListGroup.Item>Km  Driven: <span className="fw-bold">{ data.km_driven }</span></ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col>
                    <Card className="text-center">
                        <Card.Img variant="top" src={ 'http://localhost:5000'+data.Image } className="rounded img-fluid" />
                        <Card.Header><span className="fst-italic">{ data.description }</span></Card.Header>
                    </Card>
                </Col>

                <Col>
                    <p>Highest Bid: <span className="fw-bold">{  }</span></p>
                    <p>Highest Bidder: <span className="fw-bold">{  }</span></p>

                    <p>Bidder's Id: <span className="fw-bold">{  }</span></p>
                    <p>Bidder's Name: <span className="fw-bold">{  }</span></p>

                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" className="me-2">+</Button>
                        <Form>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Enter bid" />
                                <Form.Text className="text-muted">
                                    Bids remaining: {  }
                                </Form.Text>
                            </Form.Group>
                        </Form>
                        <Button variant="secondary" className="ms-2">-</Button>
                    </ButtonGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <p></p>
                </Col>

                <Col>
                    
                </Col>
            </Row>

        </Container>
     );
}
 
export default AuctionRoom;