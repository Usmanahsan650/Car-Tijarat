import { Container,Col,Row, Form, Input, Button, Label, FormFeedback, FormGroup } from "reactstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Login(props){
    const history=useHistory();
    const [validateEmail,setEmailValidate]=useState(true);
    const [validatePw,setPwVaildate]=useState(true);

const handleSubmit=async(e)=>{
    e.preventDefault();
    setPwVaildate(true);
    setEmailValidate(true);
    const target=e.target;
     
    //console.log(props.as)
    fetch(`${process.env.REACT_APP_EBS_URL}/api/login/${props.as}`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify({email:target.email.value,password:target.password.value})
    }).then((response)=>    response.json()
    ).then((data)=>{
        if(data.status)
        {
            console.log(data)
            alert("Logged in. Token Cookie saved. ");
            window.localStorage.setItem("user",JSON.stringify(data));
            props.setlogin(true);

            if(props.as === "buyer"){
                props.setBuyer(true);
                props.setSeller(false);
                history.replace("/auctions");
            }

            else if(props.as === "seller"){
                props.setBuyer(false);
                props.setSeller(true);
                history.replace("/registeredCars");
            }
            
        }else if(data.err==="email"){
            setEmailValidate(false);
            
        }
        else if(data.err==="password"){
            setPwVaildate(false);
        }
        else if(data.status===false){
            alert(data.message)
        }
       

    })
}
    return(
        <Container>
            <Row>
            <Col sm="12 " className="d-sm-block d-md-block" md="12" lg="6">
                <div className="LoginImage">

                </div>
            </Col>
            <Col sm="12" md="12" lg="6">
                <div className="translucent">
                    <h3 style={{"color":"white","textAlign":"center"}} ><b>Sign in to Car Tijarat</b> </h3>
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                    <Label for="email">Email</Label>
                    <Input required type="email" invalid={!validateEmail} placeholder="Email:123@example.com"  name="email"/>
                    <FormFeedback >Invalid Email!No such email found</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">Password</Label>
                    <Input required type="password" placeholder="password" invalid={!validatePw}  name="password"/>
                    <FormFeedback>Invalid Password</FormFeedback>
                    </FormGroup>
                    <Button type="submit"  color="primary" className=" expanded mt-2 ">Login</Button>
                </Form>
                </div>
            </Col>
            </Row>
        </Container>
    )
}