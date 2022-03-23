import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import { apiServer } from "./HomeComponent";
import { useParams, useLocation } from "react-router-dom";
import AuctionRoom from "./AuctionRoom";
import SocketIOContextProvider from "../contexts/SocketIOContext";
import Countdown from 'react-countdown';

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

const ConnectToRoom = (props) => {

    const [ModalOpen, setModal] = useState(false);
    const [MemberPackage, setPackage] = useState(null);
    const [BiddingID, setBiddingID] = useState(null);
    const [sellerInfo, setSellerInfo] = useState(null);
    const [registered, setReg] = useState(false);

    const { AuctionID } = useParams();
    const location = useLocation();
    const { data } = location.state;

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
                            <div>
                                <p id="timer-float">
                                    <Countdown date={ data.end_date_time } >
                                        <p>Auction Ended</p>
                                    </Countdown>
                                </p>
                                <p><button id="registerAuctionButton" onClick={registerClick}>Register In Auction</button></p>
                            </div>
                            :
                            props.loggedin && props.isBuyer ?
                                <div>
                                    <p id="bidID">Your Bidding ID: <span className="badge bg-dark">{BiddingID}</span></p>
                                    <p id="timer-right">
                                        <Countdown date={ data.end_date_time } >
                                            <p>Auction Ended</p>
                                        </Countdown>
                                    </p>
                                </div>
                                :
                                <div></div>
                    }<p>Auction ID: <span className="badge bg-dark">{data.id}</span></p>
                    <p>Vehicle: <span className="fw-bold">{data.RegNo + " " + data.name}</span></p>
                    <p>Vehicle Owner: <span className="fw-bold">{(sellerInfo && sellerInfo[0].full_name) || <span>Loading...</span>}</span></p>
                </Col>
            </Row>
            
            <SocketIOContextProvider>
                <AuctionRoom data={ data } connection={ props.loggedin && props.isBuyer && BiddingID !== null ? true : false } BiddingID = { BiddingID } />
            </SocketIOContextProvider>
            
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
                        <div><span>Remaining Auctions: &nbsp;</span><span style={{ "fontStyle": "italic", "fontWeight": "bold" }}>{MemberPackage.RemainingAuction || "loading..."}</span></div>
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
        fetch(`${apiServer}/api/auction/register_for_bidding`, {
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
 
export default ConnectToRoom;