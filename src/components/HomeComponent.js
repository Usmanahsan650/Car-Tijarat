import React, { useState } from "react";
import { Badge, Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import { Slider } from "./slider";
import Carousel from "react-multi-carousel";
import { FcApproval } from "react-icons/fc";
import "react-multi-carousel/lib/styles.css";
import { compareDates, timeConvert } from "../utils";
import { Link } from "react-router-dom";
export const apiServer='http://localhost:5000';

export function Home(props) {
  return (
    <React.Fragment>
      <Slider />
      <Container>
        <Row>
          <h3 className="Headings">Popular Cars</h3>
          <Col sm="12" style={{ "padding": "10px", "borderRadius": "10px", "backgroundColor": "beige" }}>
            <FeaturedCars />
          </Col>
        </Row>
      </Container>

      { !props.isSeller ? <Footer /> : null }
    </React.Fragment>
  )
}

function FeaturedCars() {
  const [carsList, SetCars] = useState([]);
  if (carsList == "") {
    fetch(`${apiServer}/api/auction/auctions_list`,{
      method:"GET",
      credentials:"include",
    }).then((resonse)=>resonse.json()).then((data)=>{
    SetCars(data);
    }).catch(err=>console.error(err))

  }
  const items = carsList.map((auction) => {
    const result = compareDates(auction.start_date_time, auction.end_date_time);

    return (
      <Col sm="9" style={{ "boxShadow": "5px 10px 5px grey" }} key={auction.regNO}>
        <Card>
          <CardImg src={apiServer+auction.Image} height={"200px"} />
          <CardBody>
            <CardTitle>
              <h4 className="Headings">{auction.name}</h4>
            </CardTitle>
            <CardSubtitle>
              <b><h6>Model:{auction.modelNo}, Seats:{auction.no_of_seats}, RegNo:{auction.RegNo}</h6></b>
            </CardSubtitle>
          </CardBody>
          <CardFooter>
            {/* <Badge color="success">{auction.status}</Badge> */}
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
          </CardFooter>
        </Card>
      </Col>
    )
  })
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (

    <Carousel responsive={responsive}>
      {items}
    </Carousel>
  )
}
function Footer(props) {
  return (

    <Container className="Footer" style={{ "marginBottom": "10px", "borderRadius": "10px", "marginTop": "5px" }}>
      <Row>
        <h2 className="Headings" style={{ "textAlign": "center", "color": "white" }}>Bidder's Membership Choices</h2>
        <Col md="4">
          <Card color="" id="Membership">
            <CardTitle ><h3>Guest</h3></CardTitle>
            <CardSubtitle ><h4 className="MembershipPrice">Free</h4></CardSubtitle>
            <hr />
            <CardBody>
              <div><FcApproval /><b>View Auctions</b></div>
              <div><FcApproval /><b> Add Vehicles To Watchlist</b></div>
            </CardBody>
            <CardFooter>
              <Button color="success" style={{ "float": "right" }} outline>Subscribe</Button>
            </CardFooter>
          </Card>
        </Col>
        <Col md="4">
          <Card color="" id="Membership">
            <CardTitle><h3>Basic</h3></CardTitle>
            <CardSubtitle><h4 className="MembershipPrice">2000 PKR</h4></CardSubtitle>
            <hr />
            <CardBody>
              <div><FcApproval /><b> View Auctions</b></div>
              <div><FcApproval /><b> Add Vehicles To Watchlist</b></div>
              <div><FcApproval /><b> Bid on upto 20 auctions</b></div>
              <div><FcApproval /><b> upto 30 bids per auction</b></div>
              <div><FcApproval /><b> Valid For 4 Days</b></div>
            </CardBody>
            <CardFooter>
              <Button color="success" style={{ "float": "right" }} outline>Subscribe</Button>
            </CardFooter>
          </Card>
        </Col>
        <Col md="4">
          <Card color="" id="Membership">
            <CardTitle><h3>Premium</h3></CardTitle>
            <CardSubtitle><h4 className="MembershipPrice">5000 PKR</h4></CardSubtitle>
            <hr />
            <CardBody>
              <div><FcApproval /><b> View Auctions</b></div>
              <div><FcApproval /><b> Add Vehicles To Watchlist</b></div>
              <div><FcApproval /><b> Bid on upto 50 auctions</b></div>
              <div><FcApproval /><b> upto 50 bids per auction</b></div>
              <div><FcApproval /><b> Valid For 15 Days</b></div>
            </CardBody>
            <CardFooter>
              <Button color="success" style={{ "float": "right" }} outline>Subscribe</Button>
            </CardFooter>
          </Card>
        </Col>

      </Row>
    </Container>

  )
}