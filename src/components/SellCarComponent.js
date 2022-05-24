import React from "react";
import { Container, Row, Col, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FormFeedback } from "reactstrap";
import { useEffect } from "react";

function valid(target) {
    target.setAttribute("aria-invalid", "false");
    target.setAttribute("aria-valid", "true");
    target.classList.remove("is-invalid");
    target.classList.add("is-valid")
}
function invalid(target) {
    target.setAttribute("aria-invalid", "true");
    target.setAttribute("aria-valid", "false");
    target.classList.remove("is-valid");
    target.classList.add("is-invalid")
}
function Validate(e) {
    const target = e.target;
    const value = target.value;
    if (value === "") {
        target.classList.remove("is-invalid");
        target.classList.remove("is-valid");
        return;
    }
    switch (target.name) {
        case "name": {
            if (value.match(/(\d+)/)) {
                invalid(target)

            } else if (value.length > 3) {
                valid(target);
            }
            else
                target.classList.remove("is-valid");


            break;
        }
        case "manufacturer": {
            if (value.match(/(\d+)/)) {
                invalid(target)

            } else if (value.length > 3) {
                valid(target);
            }
            else
                target.classList.remove("is-valid");
            break;
        }
        case "RegNo":{
            console.log(value.match("^[A-Z]{3}-[0-9]{3}"))
            if(!value.match("^[A-Z]{3}-[0-9]{3}"))
                invalid(target);
            else{
                valid(target);
            }
                break;
        }
        case "Image":{
            const ext=value.split(".")[1].toLowerCase();
            if(ext==="png"||ext==="jpg"||ext==="jpeg"){
                valid(target);
            }else{
                invalid(target);
            }

            break;
        }
        default: {
            valid(target)
        }

    }
}
export function SellCar(props) {

    const history = useHistory();
    const user = JSON.parse(window.localStorage.getItem("user"));
    const handleSubmit = (e) => {
        e.preventDefault();

        const f = new FormData(e.target)
        fetch(`${process.env.API_SERVER}/api/vehicle/vehicle/register`, {
            mode: 'cors',
            method: 'POST',

            credentials: 'include',
            body: f
        }).then((res) => res.json()).then(saved => {
            if (saved) {
                alert("Your Car is registered successfully!");
                history.replace("/registeredCars");
            }

        })
    }
    useEffect(() => {
        if (!user) {
            history.replace('/login/seller')
        }
    }, [user]);

    return (
        <Container className="SellCarContainer">
            <Row>
                <Col sm="12" md="6">

                </Col>
                <Col sm="12" md="12" className="FormContainer">
                    <h4 >Car Information</h4>
                    <hr />
                    <Form id="registerCar" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label for="name"> Name</Label>
                                    <Input type="text" valid={null} onChange={Validate} minLength={3} maxLength={25} name="name" id="name" placeholder="Car Name" />
                                    <FormFeedback  >Name should not contain a number</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="manufacturer"> Manufacturer</Label>
                                    <Input type="text" name="manufacturer" onChange={Validate} id="manufacturer" placeholder="Make**" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="modelNo">Model Year</Label>
                                    <Input type="number" min={1980} max={new Date().getFullYear()} onChange={Validate} name="modelNo" id="modelNo" placeholder="Model" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="no_of_seats">Seats Capacity</Label>
                                    <Input type="number" min={2} max={15} name="no_of_seats" id="no_of_seats" placeholder="seats" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="RegNO">Registration #</Label>
                                    <Input type="text" minLength={7} maxLength={7} onChange={Validate} placeholder="Registration ###-###" name="RegNo" />
                                    <FormFeedback  >Invalid registeration number(Format ABC-123)</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label for="body_type">Body Type</Label>
                                    <Input type="select" name="body_type" id="body_type" required>
                                        <option>SEDAN</option>
                                        <option>SPORTS CAR</option>
                                        <option>COUPE</option>
                                        <option>HATCHBACK</option>
                                        <option>CONVERTIBLE</option>
                                        <option>SPORT-UTILITY VEHICLE (SUV) </option>
                                        <option>MINIVAN</option>
                                        <option>Other</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="km_driven">Kilometers driven</Label>
                                    <Input type="number" min={0} placeholder="KM driven.." max={1000000} name="km_driven" id="km_driven" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fuel_type">Fuel Type</Label>
                                    <Input type="select" name="fuel_type" id="body_type">
                                        <option>Petrol</option>
                                        <option>Diesel</option>
                                        <option>Compressed natural gas (CNG)</option>
                                        <option>Electric Charge</option>
                                        <option>Hydrogen</option>
                                        <option>Liquefied petroleum gas (LPG)</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="engine_type">Engine Type</Label>
                                    <Input type="select" name="engine_type" id="body_type">
                                        <option>Internal combustion engines.</option>
                                        <option>Hybrid engine (Internal combustion engine + electric engine)</option>
                                        <option>Electric engine</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">
                                        Description
                                    </Label>
                                    <Input type="textarea" rows={5}  maxLength={200} name="description" id="description"  />
                                </FormGroup>

                                <Input type="hidden" name="ownerCNIC" value={user ? user.cnic : null} />
                            </Col>
                        </Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <FormGroup>
                                <Label for="Image">
                                    Image
                                </Label>
                                <Input type="file" onChange={Validate} name="Image" id="Image" />
                                <FormFeedback>The file should be of type PNG,JPG or JPEG</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="4" className="offset-md-4">
                            <Button className="m-auto expanded" color="warning" type="submit">Submit</Button>
                        </Col>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}