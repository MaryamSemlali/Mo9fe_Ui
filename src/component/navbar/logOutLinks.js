import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Logoutlink = () => {
    let style = {
        fontSize:'20px'
    };
    return(
        <div className=" form-check-inline " >
            <NavItem inverse="true" fluid ="true"><Link to='/signin' style={style} className="btn text-info mr-2 navBtn "><b>signin</b></Link></NavItem>
            <NavItem><Link to='/signup' style={style} className="btn text-info navBtn "><b>signup</b></Link></NavItem>
        </div>
    )
};

export default Logoutlink