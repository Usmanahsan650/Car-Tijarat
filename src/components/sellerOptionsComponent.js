import react from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Breadcrumb,BreadcrumbItem } from "reactstrap";
export function SellerOptions(){
    return(
        <Breadcrumb className="breadCrumbs">
        <BreadcrumbItem >
        <Link className="BreadCrumbItem " >View your listings</Link>
        </BreadcrumbItem >
        <BreadcrumbItem>
        <Link className="BreadCrumbItem " to="/SellYourCar">Sell Your Car</Link>
        </BreadcrumbItem>
        </Breadcrumb>
    )
}