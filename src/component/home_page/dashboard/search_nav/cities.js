import React, { Component } from 'react';
import {connect} from 'react-redux'
import {selectCity} from "../../../../store/action/cityAction"
import {getCities} from '../../../../api_calls'
import './index.css';
import { Form } from 'react-bootstrap';

class CitiesList extends Component {

    componentDidMount(){
        this.props.getCities()
    }

    render(){
        const {error, loading, cities} = this.props;

        if (loading || cities.length === 0 ){
            return (
                    <Form.Control as="select" className="SearchItems">
                        <option hidden key='cities'>Loading...</option>
                    </Form.Control>
            )
        }
        if (error || cities === undefined){
            return(
                    <Form.Control as="select" className="SearchItems">
                        <option hidden key='cities'>network error</option>
                    </Form.Control>
            )
        }
        return (
                <Form.Control as="select" className="SearchItems" name="city" onChange={this.props.handleChange}>
                    <option hidden key='cities' value={null} >cities</option>
                    <option value={null}> </option>
                    {cities.map(item => {return( <option key={item.code_postal} id={item.code_postal}>{item.city_name}</option>)})}

                </Form.Control>

        )
    }

    handleChange = (e)=>{
        this.props.selectCity(e.target.value );
        setTimeout(()=>{console.log(this.props.selectedCity)}, 1)
    };
}


const mapStateToProps = (state) =>{
    return {
        cities: state.city.items,
        loading: state.city.loading,
        error: state.city.error,
        selectedCity: state.city.selectedCity
    }
};
const mapDispatchToProps ={
    getCities: ()=> getCities(),
    selectCity: (cityName)=> selectCity(cityName)
};



export default connect(mapStateToProps, mapDispatchToProps)(CitiesList)