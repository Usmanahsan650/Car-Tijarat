import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Container,Row,Col, Card, CardImg,CardBody,CardFooter,Badge,CardSubtitle, CardTitle, Button} from "reactstrap";
import { compareDates, timeConvert } from '../utils';

function Fetchdata(setList,options,id){
    
    if(!options){
        fetch(`${process.env.REACT_APP_API_URL}/api/auction/sellerslisting?sellerID=${id}`,{
            method:"GET",
            credentials:"include",
          }).then((response)=>response.json()).then((data)=>{
          setList(data); //console.log(data);
          }).catch(err=>console.error(err));
    }
}

function CreateCards({List,gridView}){
    if(List === "No auctions found"){
        return(<div>Currently you don't have any registered cars on Car Tijarat</div>);
    }
    //console.log(List)
    const ret= List.map((auction)=>{
      const result = compareDates(auction.start_date_time, auction.end_date_time);
      console.log(result);

        if(!gridView)
        return(
        <Col sm="12" md="12" lg="12"  className="Listing Auccards ">
 
         <Card >
             <Row className="no-gutters">
            <Col lg="4">
          <CardImg  src={process.env.REACT_APP_API_URL+auction.Image} height={"200px"} />
          </Col>
          <Col lg="5">
          <CardBody>
            <CardTitle>
              <h4 className="Headings">{auction.name}</h4>
            </CardTitle>
            <CardSubtitle >
              <b><h6>Model:{auction.modelNo}, Seats:{auction.no_of_seats}, RegNO:{auction.RegNo}</h6></b>
            </CardSubtitle>
          </CardBody>
          </Col>
          <Col sm="3">
            {/* <Badge className="statusBadge" color="success">{auction.status}</Badge> */}
            { 
              result === -1 ? <Button className="gridButton" color="primary">On: {timeConvert(auction.start_date_time)}</Button> :
                result === 1 ? <Button className="gridButton" color="danger" disabled>Auction Ended</Button> : 
                <Link
                  to={{
                    pathname: `/auction-room/${auction.id}`,
                    state: {
                      data: auction
                    },
                  }}
                >
                <Button className="gridButton" color="success">In Progress</Button>
                </Link>
            }
          </Col>
          </Row>
        </Card>
        </Col>
        )
        else{
            return(
                <Col sm="12" md="6" lg="3" style={{ "boxShadow": "5px 10px 5px grey" }} key={auction.regNO}>
                <Card>
                  <CardImg src={process.env.REACT_APP_API_URL+auction.Image} height={"200px"} />
                  <CardBody>
                    <CardTitle>
                      <h4 className="Headings">{auction.name}</h4>
                    </CardTitle>
                    <CardSubtitle>
                      <b><h6>Model:{auction.modelNo}, Seats:{auction.no_of_seats}, Brand:{auction.manufacturer}</h6></b>
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Badge className="statusBadge" color="success">{auction.status==="undefined"?"Unsold":"Sold"}</Badge>
                    { 
                    
                      result === -1 ?<div> <Button className="gridButton" color="primary">On: {timeConvert(auction.start_date_time)}</Button> 
                      <Button className="gridButton" style={{"float":"left"}} color="primary">Feature</Button>
                      </div>
                      :
                        result === 1 ? <Button className="gridButton" color="danger" disabled>Auction Ended</Button> : 
                        <div>
                        
                        <Link
                          to={{
                            pathname: `/auction-room/${auction.id}`,
                            state: {
                              data: auction
                            },
                          }}
                        >
                        <Button className="gridButton" color="success">In Progress</Button>
                        </Link>
                        <Button className="gridButton" style={{"float":"left"}} color="primary">Feature</Button>
                        </div>
                        
                    }
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
   
    useEffect(()=>{
      if(!props.sellerID){
        history.replace('/login/seller')
      }
      else{
        Fetchdata(setList,false,props.sellerID);

          var id = setInterval(() => {
            Fetchdata(setList,false,props.sellerID);
            console.log('real-time data update');
          }, 60000); // after every 1 min
      }

      return () => props.sellerID && clearInterval(id);
  },[props.sellerID])
    
    return(
        <Container>
            <Row>
                <Col sm="12">
                    <h3 className="Headings">Your auctions</h3>
                </Col>
            </Row>
            <Row id="paddedBox">
            <CreateCards List={list} gridView={true} />
            </Row>
        </Container>
    )
}