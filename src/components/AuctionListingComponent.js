import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Pagination, PaginationItem, Container, Row, Col, Card, CardHeader, CardImg, CardBody, CardFooter, CardSubtitle, Badge, CardTitle, List, Breadcrumb, BreadcrumbItem, Input, Label, Button, PaginationLink, Util } from "reactstrap";
import { compareDates, timeConvert } from '../utils';

function Fetchdata(setList, options) {

  if (!options) {
    fetch(process.env.REACT_APP_API_URL+'/api/auction/auctions_list', {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json()).then((data) => {
       console.log(data)
      setList(data);
    }).catch(err => console.error(err));

  }
  else {
    const query = document.getElementById("query").value.trim();
    fetch(process.env.REACT_APP_API_URL+`/api/auction/auctions_list?search=${query}`, {
      method: "GET",
      credentials: "include",
    }).then((resonse) => resonse.json()).then((data) => {
      if (data != "No auctions found")
        setList(data);
      else {
        alert("No auctions found try searching other cars")
      }
    }).catch(err => console.error(err));

  }

}

function CreateCards(List, gridView, indexes) {

  if (!List) {
    return (<div></div>)
  }
  List = List.filter((item, i) => {

    return indexes.indexOf(i) != -1;
  })
  const ret = List.map((auction) => {
    const result = compareDates(auction.start_date_time, auction.end_date_time);

    if (!gridView)
      return (
        <Col sm="12" md="12" lg="12" className="Listing ">

          <Card>
            <Row className="no-gutters">
              <Col lg="4">
                <CardImg src={process.env.REACT_APP_API_URL + auction.Image} height={"200px"} />
              </Col>
              <Col lg="5">
                <CardBody>
                  <CardTitle>
                    <h4 className="Headings">{auction.name}</h4>
                  </CardTitle>
                  <CardSubtitle >
                    <b><h6>Model:{auction.modelNo}, Seats:{auction.no_of_seats}, RegNo:{auction.RegNo}</h6></b>
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
    else {
      return (
        <Col sm="12" md="6" lg="3" style={{ "boxShadow": "5px 10px 5px grey" }} key={auction.regNO}>
          <Card>
            {
              auction.featured?
            <CardHeader className="featureHead">Featured</CardHeader>
            :
            <div></div>
            }<CardImg src={process.env.REACT_APP_API_URL + auction.Image} height={"200px"} />
            <CardBody>
              <CardTitle>
                <h4 className="Headings">{auction.name}</h4>
              </CardTitle>
              <CardSubtitle>
              <b><h6>Model:{auction.modelNo}, Seats:{auction.no_of_seats}, RegNo:{auction.RegNo}</h6></b>
              </CardSubtitle>
            </CardBody>
            <CardFooter>
              {/* <Badge color="secondary">{auction.status}</Badge> */}
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
    }
  })
  return ret;

}
export function AuctionsList(options) {
  const [list, setList] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [page, setPage] = useState(0);
  const location = useLocation();
  function displaylist() {
    setGridView(false);
  }
  function displayGrid() {
    setGridView(true)
  }
  function Paginate({ pageid }) {
    if (location.hash == null)
      pageid = 1;
    if (isNaN(location.hash.split("#")[1]) && !pageid)
      return (
        <div>
          Invalid hash value
        </div>
      )
    if (pageid == null)
      pageid = location.hash.split("#")[1];
    let indexes = [];
    for (let i = pageid * 10 - 10; i < pageid * 10; i++)
      indexes.push(i);
    return CreateCards(list, gridView, indexes)
  }
  const history = useHistory();

  useEffect(() => {
    Fetchdata(setList, false);

    const id = setInterval(() => {
      Fetchdata(setList, false);
      console.log('real-time data update');
    }, 60000); // after every 1 min

    return () => clearInterval(id);
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12">
          <h3 className="Headings">Cars For Auction</h3>
        </Col>
      </Row>
      <Row >
        <Container>
          <Row>
            <Col sm="12" id="search">
              <Label Class="Label">Sort&nbsp;By&nbsp;</Label>
              <select className="searchInput">
                <option>starting date descending</option>
              </select>
              <Label for="query" Class="Label">&nbsp;Search:&nbsp; </Label>

              <input name="query" id="query" className="searchInput" placeholder="name|model|manufacturer" type="texts" />
              <button style={{ "borderRadius": "5px" }} onClick={() => Fetchdata(setList, true)}>Search</button>

            </Col>
            <Breadcrumb>
              <BreadcrumbItem>
                <button className="displayButton" onClick={displayGrid} >
                  <span className="fa solid fa-table-cells-large">&nbsp;</span>
                  <span style={{ "fontFamily": "monospace", "fontSize": "8pt", "borderRadius": "5px" }}>
                    GRID
                  </span>
                </button>

              </BreadcrumbItem>
              <BreadcrumbItem>
                <button className="displayButton" onClick={displaylist} >
                  <span className="fa-solid fa-list">&nbsp;</span>
                  <span style={{ "fontFamily": "monospace", "fontSize": "8pt", "borderRadius": "5px" }}>
                    List
                  </span>
                </button>

              </BreadcrumbItem>
            </Breadcrumb>
          </Row>
          <Row>
            <Paginate pageid={1} />
          </Row>
        </Container>

      </Row>
      <Pagination>
        <PaginationItem>
          <PaginationLink previous href="#1">

          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous>
            1
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Container>
  )
}