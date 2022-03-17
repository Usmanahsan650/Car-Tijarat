
import React, { useEffect, useState } from "react";
import { Container, Row, Col, ButtonGroup, Button, Form, Card, ListGroup } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { apiServer } from "./HomeComponet";
const getSellerInfo = (AuctionID, setSellerInfo) => {
    // fetching seller information with respect to the AuctionID
    fetch('http://localhost:5000/api/seller/seller_info/' + AuctionID)
        .then(response => {
            if (!response.ok) {
                throw Error('Could not fetch the seller info.');
            }
            return response.json();
        })
        .then(result => { setSellerInfo(result); })
        .catch(err => console.log(err));
};

const AuctionRoom = (props) => {
    const [ModalOpen, setModal] = useState(false);
    const location = useLocation();
    const { data } = location.state;
    const [MemberPackage, setPackage] = useState(null);
    const [BiddingID, setBiddingID] = useState(null);
    const { AuctionID } = useParams();
    const [sellerInfo, setSellerInfo] = useState(null);
    const [registered, setReg] = useState(false);
    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        getSellerInfo(AuctionID, setSellerInfo);
        if (props.loggedin && props.isBuyer && user) {
            fetch(`${apiServer}/api/auction/registered_for_bidding`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
                , body: JSON.stringify({ AuctionId: AuctionID, UserCNIC: user.cnic })
            }).then(res => res.json()).then(data => {
                if (data)
                    setBiddingID(data.ID);

            })
        }
    }, [AuctionID, props.isBuyer, props.loggedin, registered]);

    function registerClick() {
        if (props.loggedin && props.isBuyer) {
            setModal(true);
            fetchPackages(setPackage);
        }
    }
    return (
        <div>
            <Container>

                <Row>
                    <Col sm="12">
                        {
                            props.loggedin && props.isBuyer && BiddingID === null ?
                                <button id="registerAuctionButton" onClick={registerClick}>Register In Auction</button>
                                :
                                props.loggedin && props.isBuyer ?
                                    <div>
                                        <p>Your Bidding ID: <span className="badge bg-dark">{BiddingID}</span></p>
                                    </div>
                                    :
                                    <div></div>
                        }<p>Auction ID: <span className="badge bg-dark">{data.id}</span></p>
                        <p>Vehicle: <span className="fw-bold">{data.RegNo + " " + data.name}</span></p>
                        <p>Vehicle Owner: <span className="fw-bold">{(sellerInfo && sellerInfo[0].full_name) || <span>Loading...</span>}</span></p>

                    </Col>
                </Row>

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
                        <p>Highest Bid: <span className="fw-bold">{ }</span></p>
                        <p>Highest Bidder: <span className="fw-bold">{ }</span></p>

                        <p>Bidder's Id: <span className="fw-bold">{ }</span></p>
                        <p>Bidder's Name: <span className="fw-bold">{ }</span></p>

                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" className="me-2">+</Button>
                            <Form>
                                <Form.Group>
                                    <Form.Control type="number" placeholder="Enter bid" />
                                    <Form.Text className="text-muted">
                                        Bids remaining: { }
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
            <Modal className="popups" isOpen={ModalOpen} toggle={() => { setModal(!ModalOpen) }}>
                <ModalHeader>
                    <h3>Register into Auction</h3>
                </ModalHeader>
                <ModalBody>
                    <div><h5 style={{ "textDecoration": "underline" }}>Your Subscription</h5></div>
                    {MemberPackage ?
                        <div>
                            <div><span>Package: &nbsp;</span><span style={{ "fontStyle": "italic", "fontWeight": "bold" }}>{MemberPackage.type || "loading"}</span></div>
                            <div><span>Remaining Auctoins: &nbsp;</span><span style={{ "fontStyle": "italic", "fontWeight": "bold" }}>{MemberPackage.RemainingAuction || "loading..."}</span></div>
                        </div>
                        :
                        <diV style={{"color":"red"}} >You are not subscribed to our membership!</diV>
                    }
                </ModalBody>
                <ModalFooter>
                    {MemberPackage ?
                        <Button onClick={() => { confirmation(AuctionID, MemberPackage.RegID, setReg, setModal) }}>Register For Bidding</Button>
                        :
                        <Button onClick={() => { setModal(false) }}>Close</Button>
                    }

                </ModalFooter>
            </Modal>
        </div>

    );
}
function fetchPackages(setPackage) {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {

        fetch(`${apiServer}/api/subscription/getRegisteredPackages`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ UserCNIC: user.cnic })
        }).then(result => result.json()).then(data => {
            setPackage(data[0]);
        }).catch(err => {
            console.log(err);
        })
    }
}
function confirmation(AuctionID, RegID, setReg, setModal) {
    if (window.confirm("Are You Sure?\nPress \"OK\" to register for this auction\nPress \"Cancel\" to abort")) {
        fetch(`${apiServer}/api/subscription/subscribe`, {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                AuctionID: AuctionID,
                RegID: RegID
            })

        }).then(res => res.json()).then(data => {
            console.log(data)
            setReg(true)
            setModal(false)
        }).catch(e => {
            console.log(e)
        })
    }

}
export default AuctionRoom;