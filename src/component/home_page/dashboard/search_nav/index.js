import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form } from 'react-bootstrap';
import './index.css';
import CitiesList from './cities'
import CategoriesList from './categories'
import {connect} from 'react-redux'
import {SelectedService, SelectedCategory, SelectedCity} from "../../../../store/action/SearchAction"

class Searching extends Component {

    render() {
        return (
            <div className="container-fluid pt-5 ">
                <Navbar className="searchNav">

                    <Navbar.Brand className="brandItems" >
                    <CitiesList  handleChange = {(e)=>{this.handleChange(e)}}/>
                    </Navbar.Brand>

                    <Navbar.Brand className="brandItems">
                    <CategoriesList handleChange = {(e)=>{this.handleChange(e)}}/>
                    </Navbar.Brand>

                    <Navbar.Brand className="brandItems">
                        <Form.Control as="select" name='service' className="SearchItems" onChange={(e)=>{this.handleChange(e)}}>
                            <option hidden key='service' value={null}>type service</option>
                            <option key='both'> </option>
                            <option key='announce' value='announce' >les demandes service</option>
                            <option key='profile' value='profile'>les offers service</option>
                        </Form.Control>
                    </Navbar.Brand>

                </Navbar>
            </div>
        )
    }

    holder = {service: null,category: null, city: null};

    handleChange = (e) =>{
        const {name, value} = e.target;

        // if name is service, store the value
        if(name==='service'){
            (this.holder[name] = value);
            this.props.selectedService(this.holder.service);
        }

        // if name is city or category store the id
        else {
            //  get the id from the html attribute
            let getId = Array.from(e.target.children).map(
                opt =>  opt.value === e.target.value ? opt.getAttribute('id'): null
            );
            // git the id from the returned array
            this.holder[name] = getId.filter(element => element!== null)[0];

            // in case of no id is found in filter, return null instead of undefined
            if (this.holder[name] === undefined){this.holder[name] = null}
            name === 'category' ? this.props.selectedCategory(this.holder.category)
                                : this.props.selectedCity(this.holder.city);
        }

    };

}

const mapDispatchToProps = {
    selectedService: service => SelectedService(service),
    selectedCategory : category => SelectedCategory(category),
    selectedCity: city => SelectedCity(city),
};

export default connect(null,mapDispatchToProps)(Searching);
