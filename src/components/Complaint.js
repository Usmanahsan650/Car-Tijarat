import React, { useEffect, useState } from "react";
import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";

const Complaint = () => {

    const UserCNIC = JSON.parse(window.localStorage.getItem("user"))?JSON.parse(window.localStorage.getItem("user")).cnic:null;

    const [name, setName] = useState('');
    const [auctionID, setAuctionID] = useState('');
    const [complaint, setComplaint] = useState('');
    const [auctionList, setAuctionList] = useState([]);

    //console.log(auctionID);

    const [registered, setRegistered] = useState({ done: false, payload: [] });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/auction/auctions_list`)
            .then(response => response.json())
            .then(data => setAuctionList(data.map((auction) => auction.id)));
    }, []);

    useEffect(() => {
        //console.log(registered);
        if(registered.done){
            setName('');
            setAuctionID('');
            setComplaint('');
        }
    }, [registered]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const complaintDetails = { name, complaint, UserCNIC, auctionID };

        fetch(`${process.env.REACT_APP_API_URL}/api/complaint`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(complaintDetails)
        })
        .then(response =>  response.json())
        .then(data => {
            //console.log(data.errors);
            if(data.errors) setRegistered({ done: false, payload: [...data.errors] }); 
            else setRegistered({ done: true, payload: data });
        });
    };

    return ( 
        
            <Card>
                <Card.Body>
                    <Card.Title as="h2" className="text-center text-success">We are hear to assist you!</Card.Title>
                    <Card.Text>
                        <div className="text-center"> 
                            Please complete the form below for your complaints.
                        </div>
                        <br></br>

                        { registered.done && <Alert variant="success">{ registered.payload }</Alert> }

                        { !registered.done && registered.payload.map(error => <Alert variant="danger">{ Object.values(error) }</Alert>) }

                        <Form>
                            <Row>
                                <Col></Col>
                                <Col xs={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Complaint's Name:</Form.Label>
                                        <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reference (Auctiom ID):</Form.Label>
                                        <Form.Select value={auctionID} onChange={(e) => setAuctionID(e.target.value)}>
                                            { auctionList.map((id) => <option value={id}>{id}</option>) }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>The complaint is regarding:</Form.Label>
                                        <Form.Control as="textarea" rows={3} required value={complaint} onChange={(e) => setComplaint(e.target.value)} />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        { UserCNIC && <Button variant="success" onClick={handleSubmit}>Submit</Button> }
                                    </div>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
     );
}
 
export default Complaint;