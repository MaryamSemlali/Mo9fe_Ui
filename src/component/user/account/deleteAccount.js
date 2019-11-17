import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import {deleteLoggedAccount, logout} from "../../../api_calls/users";

class DeleteAccount extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            submitted: false,
            password: '',
        };
    }

    handleSubmit = (e)=>{

        e.preventDefault();
        this.setState({submitted: true});

        // break if the password is null
        if (this.state.password.length === 0){return;}

        //  send the request
        this.props.deleteLoggedAccount(this.state.password)
    };

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    };

    handleClose() {
        this.setState({ show: false });
        document.getElementById('TheNav').style.display = 'block';
    }

    handleShow() {
        this.setState({ show: true });
        document.getElementById('TheNav').style.display = 'none';
    }

    render() {
        const {show, submitted, password} = this.state;
        return (
            <>
            <div onClick={this.handleShow}>
                <b >delete account</b>
            </div>

            <Modal show={show} onHide={this.handleClose} centered>

                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label ><b>Password</b></label><br/>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="thePassword"
                        value={password}
                        onChange={this.handleChange}
                        required
                    />
                    {submitted && password.length === 0 && <div className="help-block alert-danger">password required</div>}
                    {submitted && this.props.errorMsg && <div className="help-block alert-danger">{this.props.errorMsg}</div>}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>Close</Button>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>delete  account</Button>
                </Modal.Footer>

            </Modal>
            </>
        );
    }
}

const mapStateToProps = state =>{
    if(state.users.deleteMe){logout()}
    return {
        errorMsg: state.users.deleteMeError,
    }
};
const mapDispatchToProps = {
    deleteLoggedAccount : (password)=> deleteLoggedAccount(password),
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount)