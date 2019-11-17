import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Form, Carousel, Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import bagIcon from './bag_icon.png'
import locationIcon from './location_icon.png'
import {connect} from 'react-redux'
import {getAllImages} from "../../../../api_calls/uploadImages";

class AnnouncePostDetail extends Component {
    componentWillMount(){
        this.forceUpdate();
    }
    componentDidMount(){
        this.props.getAllImages();
    }

    render(){
        //get the selected announce with the name of the city and the category
        const announce =  this.props.announces.filter(element =>{ return element.announce_id === this.props.match.params.id});
        const city = this.props.cities.filter(city => city.code_postal === announce[0].code_postal);
        const category = this.props.categories.filter(category => category.categories_id === announce[0].categories_id);
        return (
            <div className="container-fluid mr-5 PostDetails" >
                <Form>
                    {this.props.isUserList &&
                        <Form.Group>
                            <Button className="btn btn-danger mr-2 " onClick={this.props.handleDelete}> delete Post </Button>
                            <Button> Update Post </Button>
                        </Form.Group>
                        }

                    <Form.Group>
                        <Form.Label><h3 >{announce[0].announce_title} </h3></Form.Label><br/>

                        <img src={locationIcon} className="detailsImage" alt="location icon"/>

                        <Form.Label className="smallText">{city[0].city_name}</Form.Label><br/>

                        <img src={bagIcon} className="detailsImage" alt="bag icon"/>

                        <Form.Label className="smallText">{category[0].categories_name}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Text className="description">{announce[0].announce_description}</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> phone : {announce[0].phone}</Form.Label>
                    </Form.Group>

                    {this.imagesSlide(announce[0].announce_id)}
                </Form>
            </div>
        )
    }
    imagesSlide = (id)=>{
        let images = this.props.allImages.filter(image => image.announce_id === id);
        if (images.length >0){
            return (
                <Carousel className="imagesContainer" >
                    {images.map(img =>  {
                        return(
                            <Carousel.Item key={img.file_id}>
                                <img src={img.file_path} className="d-block w-100 imagesSlide" alt="there is nothing to show"/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            )
        } else {
            return (<div className="replaceImageSpace"> </div>)
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        announces: state.announce.announces,
        cities: state.city.items,
        categories: state.category.items,
        allImages: state.allImages.imagesStock
    }
};
const mapDispatchToProps = {
    getAllImages: ()=> getAllImages()
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncePostDetail))