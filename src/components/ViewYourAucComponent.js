import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Container,Row,Col, Card, CardImg,CardBody,CardFooter,CardSubtitle,Badge, CardTitle, Button} from "reactstrap";
import {apiServer} from './HomeComponet';
function Fetchdata(setList,options,id){
    //console.log(apiServer)
    if(!options){
        fetch(`${apiServer}/api/auction/sellerslisting?sellerID=${id}`,{
            method:"GET",
            credentials:"include",
          }).then((resonse)=>resonse.json()).then((data)=>{
          setList(data);
          }).catch(err=>console.error(err));
    }
}

function CreateCards({List,gridView}){
    if(List.length==0){
        return(<div></div>)
    }
    //console.log(List)
    const ret= List.map((auction)=>{
        if(!gridView)
        return(
        <Col sm="12" md="12" lg="12"  className="Listing Auccards ">
 
         <Card >
             <Row className="no-gutters">
            <Col lg="4">
          <CardImg  src={apiServer+auction.Image} height={"200px"} />
          </Col>
          <Col lg="5">
          <CardBody>
            <CardTitle>
              <h4 className="Headings">{auction.name}</h4>
            </CardTitle>
            <CardSubtitle >
              <b><h6>Model:{auction.modelNo}|Seats:{auction.no_of_seats}|RegNO:{auction.RegNo}</h6></b>
            </CardSubtitle>
          </CardBody>
          </Col>
          <Col sm="3">
            <Badge className="statusBadge" color="success">{auction.status}</Badge>
            <Link 
              to={{ 
                pathname: `/auction-room/${auction.id}`,
                state: {
                  data: auction
                },
                }}
            >
              <Button className="bottomRight" outline color="primary">Go to Auction Room</Button>
            </Link>
          </Col>
          </Row>
        </Card>
        </Col>
        )
        else{
            return(
                <Col sm="12" md="6" lg="3" style={{ "box-shadow": "5px 10px 5px grey" }} key={auction.regNO}>
                <Card>
                  <CardImg src={apiServer+auction.Image} height={"200px"} />
                  <CardBody>
                    <CardTitle>
                      <h4 className="Headings">{auction.name}</h4>
                    </CardTitle>
                    <CardSubtitle>
                      <b><h6>Model:{auction.modelNo}, Seats:{auction.no_of_seats},Brand:{auction.manufacturer}</h6></b>
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Badge className="statusBadge" color="success">{auction.status}</Badge>
                    <Link 
                        to={{ 
                          pathname: `/auction-room/${auction.id}`,
                          state: {
                            data: auction
                          },
                         }}
                    >
                        <Button className="gridButton" outline color="primary">Go to Auction Room</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </Col>
            )
        }
    })
    return ret;

}
export function  ViewAuctionsList(props){
    const [list,setList]=useState([]);
    const [gridView,setGridView]=useState(true);
    const [page,setPage]=useState(0);
    const location=useLocation();
    function displaylist(){
        setGridView(false);
    }
    function displayGrid(){
        setGridView(true)
    }

    const history = useHistory();
     
    useEffect(() => {
      Fetchdata(setList,false,props.sellerID);
    }, []);
    
    return(
        <Container>
            <Row>
                <Col sm="12">
                    <h3 className="Headings" >Your auctions</h3>
                </Col>
            </Row>
            <Row id="paddedBox">
            <CreateCards List={list} gridView={true} />
            </Row>
        </Container>
    )
}