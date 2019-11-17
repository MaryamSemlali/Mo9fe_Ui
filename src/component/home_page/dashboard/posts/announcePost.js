import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Media } from 'react-bootstrap'
import './index.css'
import {connect}  from 'react-redux'
import {getAnnounces} from "../../../../api_calls"

class AnnouncePost extends Component {
    componentDidMount(){
        this.props.getAnnounces();
    }

    render() {
        const {error, loading, announces} = this.props;
        if (loading || announces.length === 0 ){
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>no announces...</div>
            )
        }
        if (error || announces === undefined){
            return(
                <div style={{display: 'flex', justifyContent: 'center'}}>network error</div>
            )
        }
        else {
            return (
                <div >
                    {
                        this.props.announces.map( announce =>{
                            return (
                                <div className="card-content " key={announce.announce_id}>
                                    <Media >
                                        <Media.Body>
                                            <h3  className="text-primary">
                                            <img src={this.props.postImage(announce.user_id)} className="postListImage" alt="this will show if there is not showing "/>
                                            {announce.announce_title}</h3>
                                            <div className="description">
                                                {this.props.shortTheDescription(announce, 'announce')}
                                                <span className="createdDate">posted at : {announce.createdAt}</span>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

const mapStateToProps = state =>{

    let announceCondition = {};
    if(state.searchBy.categoryName === null && state.searchBy.cityName === null ){
        announceCondition.value = state.announce.announces;
    }
    else {
        if(state.searchBy.categoryName !== null && state.searchBy.cityName !== null){
            announceCondition.value = state.announce.announces.filter(announce => announce.categories_id === state.searchBy.categoryName && announce.code_postal === parseInt(state.searchBy.cityName))
        }
        else if(state.searchBy.cityName !== null){
            announceCondition.value = state.announce.announces.filter(announce => announce.code_postal === parseInt(state.searchBy.cityName))
        }
        else{
            announceCondition.value = state.announce.announces.filter(announce => announce.categories_id === state.searchBy.categoryName)
        }
    }
    return {
        announces:announceCondition.value,
        loading: state.announce.loading,
        error: state.announce.error,
    }
};

const mapDispatchToProps = {
    getAnnounces: () => getAnnounces(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncePost)