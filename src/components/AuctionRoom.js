import { Row, Col, ButtonGroup, Button, Form, Card, ListGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from 'react';
import { SocketIOContext } from "../contexts/SocketIOContext";

const AuctionRoom = ({ data, connection, BiddingID }) => {
    const [highestBid, setHighestBid] = useState(null);
    const [bidderID, setBidderID] = useState(null);
    const [bidderName, setBidderName] = useState('---');
    const [lastBid, setLastBid] = useState(null);

    const { socket, dispatch }  = useContext(SocketIOContext);

    useEffect(() => {
        dispatch({type: 'JOIN_ROOM', RoomID: data.id, BiddingID});
        socket.on('auction:updateBid', updateBid);

        if(connection){
            socket.on('auction:updateLastBid', updateLastBid);
        
            console.log('Join Room with Bidding Access');
        }
        else{
            console.log('View only Auction Room');
        }
    }, []);

    const updateBid = ({ bid, bidderID}) => {
        setHighestBid(bid);
        setBidderID(bidderID);
    };

    const updateLastBid = ({ lastBid }) => {
        setLastBid(lastBid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(parseInt(document.getElementById('bid').value) > highestBid){
            dispatch({type: 'BID_PLACED', RoomID: data.id, bid: document.getElementById('bid').value, bidderID: BiddingID });
        }
        else{
            alert('Your bid should be higher than the highest bid');
        }
    }

    return (
        <div>

            <Row>

                <Col>
                    <ListGroup>
                        <ListGroup.Item>Manufacturer: <span className="fw-bold">{data.manufacturer}</span></ListGroup.Item>
                        <ListGroup.Item>Model: <span className="fw-bold">{data.modelNo}</span></ListGroup.Item>
                        <ListGroup.Item>Seats: <span className="fw-bold">{data.no_of_seats}</span></ListGroup.Item>
                        <ListGroup.Item>Body Type: <span className="fw-bold">{data.body_type}</span></ListGroup.Item>
                        <ListGroup.Item>Engine Type: <span className="fw-bold">{data.engine_type}</span></ListGroup.Item>
                        <ListGroup.Item>Fuel Type: <span className="fw-bold">{data.fuel_type}</span></ListGroup.Item>
                        <ListGroup.Item>Km  Driven: <span className="fw-bold">{data.km_driven}</span></ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col>
                    <Card className="text-center">
                        <Card.Img variant="top" src={'http://localhost:5000' + data.Image} className="rounded img-fluid" />
                        <Card.Header><span className="fst-italic">{data.description}</span></Card.Header>
                    </Card>
                </Col>

                <Col>
                    <p>Highest Bid: <span className="fw-bold">{ highestBid }</span></p>

                    <p>Bidder's Id: <span className="fw-bold">{ bidderID }</span></p>
                    <p>Bidder's Name: <span className="fw-bold">{ bidderName }</span></p>
                    
                    { connection ?
                        <div>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" 
                                        className="me-2"
                                        onClick={ () => { document.getElementById('bid').value++; } }
                                >+</Button>
                                <Form onSubmit={ handleSubmit } >
                                    <Form.Group>
                                        <Form.Control type="number" placeholder="Enter bid" name="bid" id="bid" />
                                        <Form.Text className="text-muted">
                                            Bids remaining: <span className="fw-bold">{ }</span>
                                        </Form.Text>
                                    </Form.Group>
                                </Form>
                                <Button variant="secondary" 
                                        className="ms-2"
                                        onClick={ () => { document.getElementById('bid').value--; } }
                                >-</Button>
                            </ButtonGroup>

                            <div style={ { "marginTop": "15px" } }>
                                <p>Your Last Bid: <span className="fw-bold">{ lastBid }</span></p>
                                <p>Bid Count: <span className="fw-bold">{  }</span></p>
                            </div>

                        </div>
                        :
                        null
                    }
                </Col>
            </Row>

        </div>
    );
}

export default AuctionRoom;