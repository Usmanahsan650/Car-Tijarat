import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Breadcrumb,BreadcrumbItem } from "reactstrap";
export function SellerOptions(){
    return(
        <Breadcrumb className="breadCrumbs">
        <BreadcrumbItem >
        <Link className="BreadCrumbItem " to="/registeredCars" >View your cars</Link>
        </BreadcrumbItem >
        <BreadcrumbItem >
        <Link className="BreadCrumbItem " to="/yourAuctions" >View your auctions</Link>
        </BreadcrumbItem >
        <BreadcrumbItem>
        <Link className="BreadCrumbItem " to="/SellYourCar">Sell Your Car</Link>
        </BreadcrumbItem>
        </Breadcrumb>
    )
}