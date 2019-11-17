import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Button, Form, ModalTitle} from 'react-bootstrap';
import {connect} from 'react-redux';
import CitiesList from '../../home_page/dashboard/search_nav/cities'
import CatigoriesList from '../../home_page/dashboard/search_nav/categories'
import {getUserProfile, updateProfile} from "../../../api_calls";
import { Redirect } from 'react-router-dom';
import {CreateAnnounceStop} from "../../../store/action/announceAction";

class UpdateProfile extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            phone: typeof this.props.profileData.phone === undefined ? '' : 'sdfjk',
            price: typeof this.props.profileData !== 'object' ? 0 : this.props.profileData.price,
            profileTitle: this.props.profileData.User_id,
            profileDescription: '',
            pictures: null,
            submitted: false,
            category: null,
            city: null,
            check: false,
            firstName: '',
            lastName: '',
            gender: null,
            age: null,
            experience: 0,
        };
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    handleSubmit = (e)=>{
        const {category, city, phone,lastName, experience, age, gender, firstName, profileTitle, profileDescription, check, pictures} = this.state;
        const formData = new FormData();
        e.preventDefault();
        this.setState({submitted: true});

        // break if the password is null
        if (!category || !city || firstName.length<3 || lastName.length<3 || !phone || profileDescription.length<250 || profileTitle.match(/[|\\/~^:,;?!&%$@*+]/) || profileTitle.length<10 || !phone.match(/\d/g)){return;}
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
        formData.append('first_name', firstName);
        formData.append('last_name', firstName);
        formData.append('phone', phone);
        formData.append('profile_title', profileTitle);
        formData.append('profile_description', profileDescription);
        formData.append('is_searching', check);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('experience_dur', experience);

        // send the request
        this.props.updateProfile(formData)
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
            const val = e.target.value;
            e.target.name === 'pictures' ? (this.setState({[e.target.name]:  e.target.files})) : this.setState({[e.target.name]: e.target.value});
            if (e.target.name === 'phone') {val.match(/\d/g) ? e.target.value = val : e.target.value = ''}
        }

    };

    handleCheck = () => {
        this.setState({check: !this.state.check});
    };

    render() {
        const { submitted, profileTitle, experience, phone, firstName,age, lastName, profileDescription, pictures, city, category} = this.state;
        return (
            <div className="mean">
                <div className="space"> </div>
                <Form className="createForm">
                    <ModalTitle>offre de service</ModalTitle>
                    <input type="checkbox" id="switch" onChange={(e)=>this.handleCheck(e)}/>
                    <label id="toggleLabel" htmlFor="switch"> </label>
                    <Form.Group controlId="title">
                        <Form.Label>Titre</Form.Label>

                        <Form.Control
                            type="text"
                            value={profileTitle}
                            name="profileTitle"
                            onChange={this.handleChange}
                            placeholder="un titre qui resume se que vous chercher"
                            className={'' + (submitted && (profileTitle.length === 0 || profileTitle.length<10 || profileTitle.match(/[|\\/~^:,;?!&%$@*+]/) ? 'is-invalid' : ''))}
                        />
                        {submitted && profileTitle.length === 0 &&
                        <div className="help-block alert-danger">titre est obligatoire</div>
                        }
                        {console.log(this.state.phone)}
                        {
                            submitted && profileTitle.length<10  && profileTitle.length>0 &&
                            <div className="help-block alert-danger">titre il foudrai avoir au minimum 10 character</div>
                        }
                        {
                            submitted && profileTitle.length>=10
                            && (profileTitle.match(/[|\\/~^:,;?!&%$@*+]/))
                            && <div className="help-block alert-danger"> special characters est interdit</div>
                        }

                    </Form.Group>

                    <Form.Group controlId="firstName">
                        <Form.Label>
                            <label htmlFor="firstName">nom</label>
                            <Form.Control
                                type="text"
                                value={firstName.replace(/([0-9]|[|\\/~^:,;?!&%$@*'_(")])/g, '')}
                                name="firstName"
                                onChange={this.handleChange}
                                placeholder="un titre qui resume se que vous chercher"
                                className={'' + (submitted && (!firstName || firstName.length<3 ? 'is-invalid' : ''))}
                            />
                        </Form.Label>
                        <Form.Label className="ml-2">
                            <label htmlFor="lastName">prenome</label>
                            <Form.Control
                                type="text"
                                value={lastName.replace(/([0-9]|[|\\/~^:,;?!&%$@*'_(")])/g, '')}
                                name="lastName"
                                onChange={this.handleChange}
                                placeholder="un titre qui resume se que vous chercher"
                                className={'' + (submitted && (!lastName || lastName.length<3 || lastName.match(/[|\\/~^:,;?!&%$@*+]/) ? 'is-invalid' : ''))}
                            />
                        </Form.Label>

                        {submitted && (firstName.length === 0 || lastName.length === 0) && <div className="help-block alert-danger">nom et prenom est obligatoire</div>}
                        {submitted && (firstName.length<3 || lastName.length<3) && <div className="help-block alert-danger">nom et prenom elle foudrai avoir au minimum 3 character</div>}

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

                    <Form.Group >
                        <Form.Label >gender</Form.Label>
                        <Form.Control as="select" name="gender" className="SearchItems" onChange={this.handleChange}>
                            <option value={null}> </option>
                            <option value='Male'> homme</option>
                            <option value='Female'>femme</option>
                        </Form.Control>
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>age</Form.Label>
                        <Form.Control
                            type="number"
                            min="15"
                            max="60"
                            value={age<15 || age>60 ? '': age}
                            name="age"
                            onChange={this.handleChange}
                            placeholder="votre age"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>experience</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            max="45"
                            value={experience>45 ? '': experience}
                            name="experience"
                            onChange={this.handleChange}
                            placeholder="votre age d'expériance"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>telephone</Form.Label>
                        <Form.Control as="input"
                                      type="tel"
                                      value={phone !== undefined ? phone.replace(/([a-z]|[|\\/~^:,;?!&%$@*éàçè)])/g, '') : ''}
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
                            name="profileDescription"
                            placeholder="description de besion"
                            id="profileDescription"
                            onChange={this.handleChange}
                            value={profileDescription}
                            className={'' + (submitted && profileDescription.length<250 ? 'is-invalid' : '')}
                        />
                        {
                            submitted && profileDescription.length === 0 &&
                            <div className="help-block alert-danger">champ obligatoir</div>
                        }
                        {submitted && profileDescription && profileDescription.length<250 &&
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

                    <Button variant="primary" className="btnForPost" type="submit" onClick={this.handleSubmit}>mettre à jour</Button>

                    {this.props.createAnnounceError &&
                    <div className={'alert alert-danger'}>{this.props.createAnnounceError}</div>
                    }
                    {this.props.announceIsCreated ? (<><Redirect to="/posts" />{this.props.stopRedirection()}</>) : false
                    }

                </Form>
            </div>
        );
    }
}
// to stop the creation of the announce from keep redirecting to the announceList after creating announce
function stopRedirection(){
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
        announceIsCreated: state.announce.announceIsCreated,
        profileData : state.profiles.profiles
    }
};
const mapDispatchToProps = {
    updateProfile : data => updateProfile(data),
    stopRedirection: () => stopRedirection(),
    getUserProfile: () => getUserProfile()
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)