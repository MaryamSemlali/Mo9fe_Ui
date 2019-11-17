import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Button, Form, ModalTitle} from 'react-bootstrap';
import {connect} from 'react-redux';
import CitiesList from '../../home_page/dashboard/search_nav/cities'
import CatigoriesList from '../../home_page/dashboard/search_nav/categories'
import {createAnnounce} from "../../../api_calls";
import { Redirect } from 'react-router-dom';
import {CreateAnnounceStop} from "../../../store/action/announceAction";

class CreateAnnounce extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            phone: '',
            price: 0,
            announceTitle: '',
            announceDescription: '',
            pictures: null,
            submitted: false,
            category: null,
            city: null,
        };
    }

    handleSubmit = (e)=>{
        const {category, price, city, phone, announceTitle, announceDescription, pictures} = this.state;
        const formData = new FormData();

        e.preventDefault();
        this.setState({submitted: true});

        // break if the password is null
        if (!category || !city || !phone || announceDescription.length<250 || announceTitle.match(/[|\\/~^:,;?!&%$@*+]/) || announceTitle.length<10 || !phone.match(/\d/g)){return;}
        if (pictures){
            let picturesLength = pictures.length;
            if (pictures.length !== Array.from(pictures).filter(picture=>new RegExp('gif').test(picture.name.toLowerCase()) || new RegExp('jpg').test(picture.name.toLowerCase()) || new RegExp('png').test(picture.name.toLowerCase()) || new RegExp('jpeg').test(picture.name.toLowerCase())).length)
            {return;}
            else if (pictures.length !== Array.from(pictures).filter(picture=> picture.size <= 1024 * 1024 * 2 ).length)
            {return;}

            // add images to the data form
            while(picturesLength >0){
                formData.append('upload_img', pictures[picturesLength-1]);
                picturesLength -=1;
            }
        }

        // store data  in object to send it
        formData.append('code_postal', city);
        formData.append('categories_id', category);

        // skip the price property if not selected
        if(price !== 0){formData.append('price', price)}
        formData.append('phone', phone);
        formData.append('announce_title', announceTitle);
        formData.append('announce_description', announceDescription);

        // send the request
        this.props.createAnnounce(formData)
    };

    handleChange = (e)=>{

        if (e.target.name.toString() === 'city' || e.target.name.toString() === 'category') {
            let holder = {category: null, city: null};
            const {name, value} = e.target;

            //  get the id from the html attribute
            let getId = Array.from(e.target.children).map(
                opt =>  opt.value === value ? opt.getAttribute('id'): null
            );
            // git the id from the returned array
            holder[name] = getId.filter(element => element!== null)[0];

            // in case of no id is found in filter, return null instead of undefined
            if (holder[name] === undefined){holder[name] = null}
            this.setState({[name]: holder[name]});

        } else {
            e.target.name === 'pictures' ? (this.setState({[e.target.name]:  e.target.files})) : this.setState({[e.target.name]: e.target.value});
        }

    };

    render() {
        const { submitted, announceTitle, price, phone, announceDescription, pictures, city, category} = this.state;
        return (
            <div className="mean">
                <div className="space"> </div>
                    <Form className="createForm">
                        <ModalTitle>nouvelle demande</ModalTitle>
                        <Form.Group controlId="title">
                            <Form.Label>Titre</Form.Label>

                            <Form.Control
                                type="text"
                                value={announceTitle}
                                name="announceTitle"
                                onChange={this.handleChange}
                                placeholder="un titre qui resume se que vous chercher"
                                className={'' + (submitted && (!announceTitle || announceTitle.length<10 || announceTitle.match(/[|\\/~^:,;?!&%$@*+]/) ? 'is-invalid' : ''))}
                            />
                            {submitted && !announceTitle &&
                            <div className="help-block alert-danger">titre est obligatoire</div>
                            }
                            {
                                submitted && announceTitle.length<10  && announceTitle.length>0 &&
                                <div className="help-block alert-danger">titre il foudrai avoir au minimum 10 character</div>
                            }
                            {
                                submitted && announceTitle.length>=10
                                && (announceTitle.match(/[|\\/~^:,;?!&%$@*+]/))
                                && <div className="help-block alert-danger"> special characters est interdit</div>
                            }

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>offered price</Form.Label>
                            <Form.Control
                                type="number"
                                min="50"
                                value={price}
                                name="price"
                                onChange={this.handleChange}
                                max="10000"
                                placeholder="peix offrer"
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label column sm="2">ville</Form.Label>
                            <CitiesList handleChange = {(e)=>{this.handleChange(e)}} />
                            {
                                submitted && !city &&
                                <div className="help-block alert-danger">ville est obligatoire</div>
                            }
                        </Form.Group>

                        <Form.Group >
                            <Form.Label >Categories</Form.Label>
                            <CatigoriesList handleChange = {(e)=>{this.handleChange(e)}}/>
                            {
                                submitted && !category &&
                                <div className="help-block alert-danger">category est obligatoire</div>
                            }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>telephone</Form.Label>
                            <Form.Control as="input"
                                          type="tel"
                                          value={phone.replace(/([a-z]|[|\\/~^:,;?!&%$@*éàçè)])/g, '')}
                                          name="phone"
                                          onChange={this.handleChange}
                                          placeholder="06..."
                                          className={'' + (submitted && (!phone || !phone.match(/\d/g) ? 'is-invalid' : ''))}
                            />
                            {submitted && !phone && !phone.match(/\d/g) &&
                            <div className="help-block alert-danger">telephone est obligatoire</div>
                            }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="announceDescription"
                                placeholder="description de besion"
                                id="announceDescription"
                                onChange={this.handleChange}
                                value={announceDescription}
                                className={'' + (submitted && announceDescription.length<250 ? 'is-invalid' : '')}
                            />
                            {
                                submitted && announceDescription.length === 0 &&
                                <div className="help-block alert-danger">champ obligatoir</div>
                            }
                                {submitted && announceDescription && announceDescription.length<250 &&
                                <div className="help-block alert-danger">au minimum 250 character</div>
                            }
                        </Form.Group>

                        <Form.Group>
                            <input type="file" name='pictures' onChange={this.handleChange} multiple/>
                            {
                                 (!pictures ? false : pictures.length !== Array.from(pictures).filter(picture=>new RegExp('gif').test(picture.name.toLowerCase()) || new RegExp('jpg').test(picture.name.toLowerCase()) || new RegExp('png').test(picture.name.toLowerCase()) || new RegExp('jpeg').test(picture.name.toLowerCase())).length) &&
                                <div className="help-block alert-danger">only image type allowed</div>
                            }
                            {/* set the limit size to 2MB*/
                                pictures && (!pictures ? false : pictures.length !== Array.from(pictures).filter(picture=> picture.size <= 1024 * 1024 * 2 ).length) &&
                                <div className="help-block alert-danger">2MB is the maximum size</div>
                            }
                            {/* set the limit size to 2MB*/
                                pictures && (!pictures ? false : (pictures.length > 3) ) &&
                                <div className="help-block alert-danger">la limit c'est 3 images </div>
                            }
                        </Form.Group>

                        <Button variant="primary" className="btnForPost" type="submit" onClick={this.handleSubmit}>créer</Button>
                        {this.props.creationBegging &&
                        <img alt='...' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        {this.props.createAnnounceError &&
                        <div className={'alert alert-danger'}>{this.props.createAnnounceError}</div>
                        }
                        {this.props.announceIsCreated ? (<><Redirect to="/posts" />{this.props.stopIt()}</>) : false
                        }

                    </Form>
            </div>
        );
    }
}
function stopIt(){
    return dispatch=>{
        dispatch(CreateAnnounceStop());
    }
}

const mapStateToProps = state =>{
    return {
        cities : state.city.items,
        categories : state.category.items,
        creationBegging: state.announce.creationBegging,
        createAnnounceError: state.announce.createAnnounceError,
        announceIsCreated: state.announce.announceIsCreated
    }
};
const mapDispatchToProps = {
    createAnnounce : data => createAnnounce(data),
    stopIt: () => stopIt(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnnounce)