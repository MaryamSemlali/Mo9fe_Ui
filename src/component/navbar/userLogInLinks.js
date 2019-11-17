import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {logout} from "../../api_calls/users";
import DeleteAccount from '../user/account/deleteAccount';


const userSignInLink = () => {

    return(
        <div className=" form-check-inline items" >


            <Link to='/demand' style={{ textDecoration: 'none' }} className="navBtn mr-1 ml-5 bg-light" > <b>offer de service</b></Link>

            <NavDropdown className="navBtn mr-1 ml-5 bg-light" title={<b>mais demandes</b>} >
                <Link  className="btn btn-outline-light navBtn text-primary" to="/post/anno" >
                    <b>créer une demande</b>
                </Link>

                <Link  className="btn navBtn  btn-outline-light text-primary" to="/posts" >
                    <b>lister mais demandes</b>
                </Link>
            </NavDropdown>

            <NavDropdown className="navBtn mr-5 ml-5  bg-light " title={<b>account</b>} >

                <Dropdown.Item style={{ textDecoration: 'none' }} className="btn navBtn text-primary" >
                     <b>update account</b>
                </Dropdown.Item>

                <Dropdown.Item style={{ textDecoration: 'none' }} className="btn navBtn text-primary"  >
                    <DeleteAccount/>
                </Dropdown.Item>

                <NavDropdown.Divider />

                <Dropdown.Item style={{ textDecoration: 'none' }} onClick={()=>logout()} className="btn navBtn text-primary">
                    <b>logout</b>
                </Dropdown.Item>
            </NavDropdown>


        </div>
    )
};

export default userSignInLink