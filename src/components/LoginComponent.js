import { Container,Col,Row, Form, Input, Button, Label, FormFeedback, FormGroup } from "reactstrap";
import React, { useState } from "react";
export function Login(props){
    const [email,setEmail]=useState("");
    const [password,setPw]=useState("");
    const [validateEmail,setEmailValidate]=useState(true);
    const [validatePw,setPwVaildate]=useState(true);
const handleSubmit=async(e)=>{
    e.preventDefault();
    setPwVaildate(true);
    setEmailValidate(true);
    const target=e.target;
     
    console.log(props.as)
    fetch(`http://localhost:5000/api/login/${props.as}`,{
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
            alert("Logged in .Token Cookie saved ")
            
        }else if(data.err==="email"){
            setEmailValidate(false);
            
        }
        else{
            setPwVaildate(false);
        }
       

    })

    setEmail(target.email.value);
    setPw(target.password.value);


    setTimeout(()=>{
        fetch(`http://localhost:5000/api/login/${props.as}/check`,{
        method:"GET",
        credentials:"include",
        mode:'cors'
    })
    },5000)
    
    console.log(target.email.value)
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
                    <Button type="submit" outline color="dark" className="mt-2 float-right">Login</Button>
                </Form>
                </div>
            </Col>
            </Row>
        </Container>
    )
}