import { Row, Col, ButtonGroup, Button, Form, Card, ListGroup, Alert } from "react-bootstrap";
import { useContext, useEffect, useState } from 'react';
import { SocketIOContext } from "../contexts/SocketIOContext";

const ShowModal = () => {
    return(
        <Alert variant="success">
            <Alert.Heading>Congratulations! You have won the Auction</Alert.Heading>
            <p>
                Aww yeah, you successfully read this important alert message.
            </p>
            <hr />
            <p className="mb-0">
                Go to your Profile History for further processing.
            </p>
        </Alert>
    );
};

const AuctionRoom = ({ data, connection, BiddingID, isEnded }) => {
    const [highestBid, setHighestBid] = useState(null);
    const [bidderID, setBidderID] = useState(null);
    const [bidderName, setBidderName] = useState('---');
    const [lastBid, setLastBid] = useState(null);
    const [bidCount, setBidCount] = useState(null);
    const [totalBids, setTotalBids] = useState(null);
    const [winner, setWinner] = useState(false);

    const { socket, dispatch }  = useContext(SocketIOContext);

    useEffect(() => {
        if(!isEnded){
            dispatch({type: 'JOIN_ROOM', RoomID: data.id, BiddingID});

            socket.on('auction:updateBid', updateBid);

            if(connection){
                socket.on('auction:updateLastBid', updateLastBid);
            
                console.log('Join Room with Bidding Access');
            }
            else{
                console.log('View only Auction Room');
            }
        }

        else if(isEnded && connection){
            console.log('firing auction ended event');
            dispatch({type:'END_AUCTION', RoomID: data.id, BiddingID});

            if(bidderID === BiddingID){
                setWinner(true);
            }
        }
    }, [connection, isEnded]);

    const updateBid = ({ bid, bidderID, bidCount}) => {
        setHighestBid(bid);
        setBidderID(bidderID);
        setTotalBids(bidCount);
    };

    const updateLastBid = ({ lastBid, bidCount }) => {
        setLastBid(lastBid);
        setBidCount(bidCount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isEnded){
            alert('Auction has ended. You cant place any more bid');
        }

        else{
            if(parseInt(document.getElementById('bid').value) > highestBid){
                dispatch({type: 'BID_PLACED', RoomID: data.id, bid: document.getElementById('bid').value, bidderID: BiddingID });
            }
            
            else{
                alert('Your bid should be higher than the highest bid');
            }
        }
    }

    return (
        <div>
            { winner && <ShowModal /> }

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
                                            Total Bids placed: <span className="fw-bold">{ totalBids }</span>
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
                                <p>Your Bid Count: <span className="fw-bold">{ bidCount }</span></p>
                            </div>

                        </div>
                        :
                        <div>
                            <p>Total Bids placed: <span className="fw-bold">{ totalBids }</span></p>
                        </div>
                    }
                </Col>
            </Row>

        </div>
    );
}

export default AuctionRoom;