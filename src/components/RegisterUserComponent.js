
import { Container, Col, Row, Form, Input, Button, Label, FormFeedback, FormGroup } from "reactstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Register(props) {
    const history = useHistory();
    
    const [validateEmail, setEmailValidate] = useState(true);
    const [validatePw, setPwVaildate] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPwVaildate(true);
        setEmailValidate(true);
        const target = e.target;
        if(!target.isSeller.checked&&!target.isBuyer.checked)
           { alert("check atleast one option")
             return false;    
            }
        const f={
            CNIC:target.CNIC.value, 
            full_name:target.full_name.value,
            email:target.email.value,
            password:target.password.value, 
            contact_no:target.contact_no.value,
            location:target.location.value, 
            isSeller:target.isSeller.checked?1:0,
            isBuyer:target.isBuyer.checked?1:0
        }
        console.log(f)
        fetch(`${process.env.REACT_APP_EBS_URL}/api/user/signup`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(f)
        }).then((response) => response.json()
        ).then((data) => {
            if (data.status) {
                alert(data.message)
                if(f.isSeller.checked)
                history.replace("/login/seller");
                else
                history.replace("/login/buyer");


            } else if (data.err === "email") {
                setEmailValidate(false);

            }
            else {
                setPwVaildate(false);
            }


        })



        console.log(target.email.value)
    }
    return (
        <Container>
            <Row>
                <Col className="offset-md-2 " sm="12" md="8" lg="8">
                    <div className="translucent">
                        <h3 style={{ "color": "white", "textAlign": "center" }} ><b>Get Registered In To Car Tijarat</b> </h3>
                        <Form onSubmit={handleSubmit} style={{"width":"60%"}} >
                            <Row>
                            <FormGroup className="col-md-6">
                                <Label for="CNIC">CNIC</Label>
                                <Input required type="text" invalid={!validatePw} minLength={15} maxLength={15} placeholder="42101-xxxxxx-x" name="CNIC" />
                                <FormFeedback >Your Cnic is alrady registered</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="full_name">Full Name</Label>
                                <Input required type="text" placeholder="John Doe" name="full_name" />
                                <FormFeedback >Invalid name</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-md-6">

                                <Label for="email">Email</Label>
                                <Input required type="email" invalid={!validateEmail} placeholder="Email:123@example.com" name="email" />
                                <FormFeedback >Already registered</FormFeedback>
                            </FormGroup >
                            <FormGroup className="col-md-6">
                                <Label for="password">Password</Label>
                                <Input required type="password" placeholder="password"  name="password" />
                                <FormFeedback>Invalid Password</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="contact_no">Contact No</Label>
                                <Input required type="texts" minLength={11} maxLength={11} placeholder="0333xxxxxxx(11 digits)" name="contact_no" />
                                <FormFeedback >Invalid Phone</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="location">Address</Label>
                                <Input required type="text" placeholder="House # xx sector/block Y karachi" name="location" />
                                <FormFeedback >Invalid Email!No such email found</FormFeedback>
                            </FormGroup>
                            </Row>
                            <Row>
                            <FormGroup className="col-6">
                                <Label for="isSeller">Wanna Be seller?</Label>
                                <Input type="checkbox"  name="isSeller" />
                                <FormFeedback >error</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="isBuyer">Wanna Be Buyer?</Label>
                                <Input type="checkbox" name="isBuyer" />
                                <FormFeedback >error</FormFeedback>
                            </FormGroup>
                            </Row>
                            <Button type="submit"  color="primary" className="mt-2 expanded float-right">Login</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}