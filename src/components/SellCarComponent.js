import React from "react";
import { Container,Row,Col, Form, Input, Label, FormGroup, Button } from "reactstrap";
function handleSubmit(e){
    e.preventDefault();
    const target=e.target;
    console.log(target.name.value)
}
export function SellCar(props){
    return(
        <Container className="SellCarContainer">
            <Row>
                <Col sm="12" md="6">

                </Col>
                <Col sm="12" md="12" className="FormContainer">
                    <h4 >Car Information</h4>
                    <hr/>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                        <Col md="6">
                        <FormGroup>
                        <Label for="name"> Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Car Name"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="manufacturer"> Manufacturer</Label>
                        <Input type="text" name="manufacturer" id="manufacturer" placeholder="Make**"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="manufacturer">Model Year</Label>
                        <Input type="number" min={1980} max={2022} name="modelNo" id="modelNo" placeholder="Model"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="no_of_seats">Seats</Label>
                        <Input type="number" min={2} max={15} name="no_of_seats" id="no_of_seats" placeholder="seats"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="RegNO">Registration #</Label>
                        <Input type="text" minLength={7} maxLength={7} name="RegNo"/>
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                        <Label for="body_type">Body Type</Label>
                        <Input type="select" name="body_type" id="body_type">
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
                        <Input type="number" placeholder="KM driven.." name="km_driven" id="km_driven" />
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
                            <Input type="textarea" maxLength={200} name="description" id="description"/>
                        </FormGroup>
                        </Col>
                        </Row>
                        <FormGroup >
                            <Button className="m-auto" outline dark type="submit">Submit</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}