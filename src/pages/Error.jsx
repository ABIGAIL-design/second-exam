import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Error.css"
const Error = () => {

    return(
        <div>
        <Navbar></Navbar>
        <section className="error-page">
            <h2>404 Error, Page not found!</h2>
            <Link to='/'>Back to Homepage</Link>
            
        </section>
       
        </div>
    )
}
export default Error