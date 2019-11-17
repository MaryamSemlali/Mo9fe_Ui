import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logoutlinks from './logOutLinks';
import UserLogInLinks from './userLogInLinks';
import './index.css';
import {connect} from 'react-redux';
import homePageIcon from './home_page_icon.png'

class NavBar extends React.Component {
    render(){
        return(
            <div id="TheNav">
                <Navbar className="navbar navbar-light bg-light ">
                    <Link to='/' className=" btn mr-auto homeIcon"><img src={homePageIcon}  width='50px' height='50px' alt="home page"/></Link>
                    {this.props.loggedIn !== null ? (<div><UserLogInLinks/><Redirect push to="/"/></div>): <Logoutlinks/>}
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        loggedIn : state.users.loggedUser
    }
};

export default connect(mapStateToProps)(NavBar)