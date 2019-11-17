import React from 'react';
import './auth.css';
import {FormControl, FormGroup, FormLabel, Button} from 'react-bootstrap'
import {signup} from "../../../api_calls";
import {connect} from 'react-redux'

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            submitted: false,
            picture: null,
        };

    }
    handleChange = (e)=>{

        e.target.name === 'picture' ? this.setState({[e.target.name]: e.target.files[0]}) : this.setState({[e.target.name]: e.target.value});
    };
    handleSubmit = (e)=>{

        const { username, password, repeatPassword,picture } = this.state;
        e.preventDefault();
        this.setState({submitted: true});

        // break if the user or password is null
        if (!(username && password) || username.length<7 || password.length<7 || !repeatPassword || (password !== repeatPassword) || !!username.match(/\d/g) || !!username.match(/\s/g) || username.match(/[|\\/~^:,;?!&%$@*+]/) ) {return;}
        if (picture &&  !(new RegExp('gif').test(picture.name.toLowerCase()) || new RegExp('png').test(picture.name.toLowerCase()) || new RegExp('jpeg').test(picture.name.toLowerCase()) || new RegExp('jpg').test(picture.name.toLowerCase()))) {return;}
        if (picture !== null){if (picture.size >1024 * 1024 * 2){return;}}

        // gather the data as a single form data then send the request
        const formData = new FormData();
        formData.append('user_image',this.state.picture);
        formData.append('user_name',this.state.username);
        formData.append('password',this.state.password);

        this.props.signup(formData)
    };

    render() {
        const { username, submitted, password, repeatPassword,picture } = this.state;
        return (
            <div className="Login">
                <div className="space"> </div>

                <form name="form" onSubmit={this.handleSubmit}>
                    <h2>Register</h2><br/>
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
                        {
                            submitted && !username &&
                            <div className="help-block alert-danger">Username is required</div> }
                        {
                            submitted && username.length<7  && username.length>0 &&
                            <div className="help-block alert-danger">Username should have at least 7 character</div>
                        }
                        {
                            submitted && username.length>=7 && username.length>0
                            && (!!username.match(/\d/g) || !!username.match(/\s/g) || username.match(/[|\\/~^:,;?!&%$@*+]/))
                            && <div className="help-block alert-danger">Username should not have special character or numbers</div>
                        }
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel><h5>Password</h5></FormLabel>
                        <FormControl
                            autoFocus
                            name = 'password'
                            value={password}
                            onChange={this.handleChange}
                            type="password"
                            className={'' + (submitted && !password ? 'is-invalid' : '')}
                        />
                        {submitted && !password &&
                        <div className="help-block alert-danger">password is required</div>
                        }
                        {submitted && password &&  password.length<7  && password.length>0 &&
                        <div className="help-block alert-danger">password should have at least 7 character</div>
                        }
                    </FormGroup>
                    <FormGroup controlId="repeatedPassword" >
                        <FormLabel><h5>Repeat Password</h5></FormLabel>
                        <FormControl
                            autoFocus
                            name = 'repeatPassword'
                            value={repeatPassword}
                            onChange={this.handleChange}
                            type="password"
                            className={'' + (submitted && !repeatPassword ? 'is-invalid' : '')}
                        />
                        {submitted && !repeatPassword &&
                        <div className="help-block alert-danger">repeating password is required</div>
                        }
                        {submitted && !!repeatPassword && (password !== repeatPassword) &&
                        <div className="help-block alert-danger">password does not match</div>
                        }
                    </FormGroup>
                    <FormGroup controlId="password" >

                        <input type="file" name='picture' onChange={this.handleChange} />
                        {console.log(picture)}
                        {
                            submitted && picture && !(new RegExp('gif').test(picture.name.toLowerCase()) || new RegExp('jpg').test(picture.name.toLowerCase()) || new RegExp('png').test(picture.name.toLowerCase()) || new RegExp('jpeg').test(picture.name.toLowerCase())) &&
                            <div className="help-block alert-danger">only image type allowed</div>
                        }
                        {
                            submitted && picture && picture.size >1024 * 1024 * 2 /* set the limit size to 2MB*/ &&
                            <div className="help-block alert-danger">2MB is the maximum size</div>
                        }
                    </FormGroup>
                    <Button block type="submit" disabled={this.props.loginLoading} >
                        {this.props.loginLoading &&
                        <img alt='...' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } Register</Button>
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
    signup : (username, password)=> signup(username, password)
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);