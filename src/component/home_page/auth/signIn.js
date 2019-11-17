import React from 'react';
import './auth.css';
import {FormControl, FormGroup, FormLabel, Button} from 'react-bootstrap'
import {login} from "../../../api_calls";
import {connect} from 'react-redux'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };

    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    };
    handleSubmit = (e)=>{
        const { username, password } = this.state;
        e.preventDefault();
        this.setState({submitted: true});

        // break if the user or password is null
        if (!(username && password)) {return;}
        this.props.login(username, password)
    };

    render() {
        const { username, submitted, password } = this.state;
        return (
            <div className="Login">
                <div className="space"> </div>

                <form name="form" onSubmit={this.handleSubmit}>
                    <h2>Login</h2><br/>
                    <FormGroup controlId="username" >
                        <FormLabel><h5>Username</h5></FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            name = 'username'
                            value={username}
                            onChange={this.handleChange}
                            className={'' + (submitted && !username ? 'is-invalid' : '')}
                        />
                        {submitted && !username &&
                        <div className="help-block alert-danger">Username is required</div>
                        }
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel><h5>Password</h5></FormLabel>
                        <FormControl

                            name = 'password'
                            value={password}
                            onChange={this.handleChange}
                            type="password"
                            className={'' + (submitted && !password ? 'is-invalid' : '')}
                        />
                        {submitted && !password &&
                        <div className="help-block alert-danger">password is required</div>
                        }
                    </FormGroup>
                    <Button block type="submit" disabled={this.props.loginLoading}>
                        {this.props.loginLoading &&
                        <img alt='...' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } Login</Button>
                    {this.props.loginError &&
                    <div className={'alert alert-danger'}>{this.props.loginError}</div>
                    }
                </form>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        loginLoading: state.users.loginLoading,
        loginError: state.users.loginError
    }
};
const mapDispatchToProps = {
    login : (username, password)=> login(username, password)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);