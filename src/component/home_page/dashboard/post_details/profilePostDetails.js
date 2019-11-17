import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Form, Carousel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import bagIcon from './bag_icon.png'
import locationIcon from './location_icon.png'
import {connect} from 'react-redux'
import {getAllImages} from "../../../../api_calls/uploadImages";

class ProfilePostDetail extends Component {
    componentDidMount(){
        this.props.getAllImages();
    }
    //get the selected announce with the neame of the city and the category
    profile =  this.props.profiles.filter(element => element.id_Profile === this.props.match.params.id);
    city = this.props.cities.filter(city => city.code_postal === this.profile[0].code_postal);
    category = this.props.categories.filter(category => category.categories_id === this.profile[0].categories_id);

    render(){
        return (
            <div className="container-fluid mr-5 PostDetails " >
                <Form>

                    <Form.Group>
                        <Form.Label><h3 >{this.profile[0].profile_title} </h3></Form.Label><br/>

                        <img src={locationIcon} className="detailsImage" alt="location icon"/>
                        <Form.Label className="smallText">{this.city[0].city_name}</Form.Label><br/>

                        <img src={bagIcon} className="detailsImage" alt="bag icon"/>
                        <Form.Label className="smallText">{this.category[0].categories_name}</Form.Label><br/>

                        <Form.Label className="smallText">full name : {this.profile[0].first_name} {this.profile[0].last_name}</Form.Label><br/>
                        {this.profile[0].age === null ? <div> </div>: <Form.Label className="smallText">age : {this.profile[0].age}</Form.Label>}<br/>
                        {this.profile[0].experience_dur === null ? null: <Form.Label className="smallText">experience : {this.profile[0].experience_dur}</Form.Label>}<br/>
                        {this.profile[0].gender === null ? <p> </p>: <Form.Label className="smallText">gender : {this.profile[0].gender}</Form.Label>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Text className="description">{this.profile[0].profile_description}</Form.Text>
                        <Form.Label> phone : {this.profile[0].phone}</Form.Label>
                    </Form.Group>

                        {this.imagesSlide()}
                </Form>
            </div>
        )
    }
    imagesSlide = ()=>{
        let images = this.props.allImages.filter(image => image.id_Profile === this.profile[0].id_Profile);
        if (images){
            return (
                <Carousel className="imagesContainer">
                    {images.map(img => {
                        return(
                            <Carousel.Item key={img.file_id}>
                                <img src={img.file_path} className="d-block w-100 imagesSlide" alt="bag icon"/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            )
        } else {
            return (<div> </div>)
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        profiles: state.profiles.profiles,
        cities: state.city.items,
        categories: state.category.items,
        allImages: state.allImages.imagesStock
    }
};
const mapDispatchToProps = {
    getAllImages: ()=> getAllImages()
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePostDetail))