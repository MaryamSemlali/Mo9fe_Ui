import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AnnouncePost from './announcePost'
import ProfilePost from './profilesPost'
import {getUsers} from "../../../../api_calls"
import {connect}  from 'react-redux'
import defaultImage from './defaultImage.jpg'
import {Link} from 'react-router-dom'


class Post extends Component {

    async componentWillMount(){
         await this.props.getUsers();
    }

    render(){
        if (!this.props.isPostImageLoaded){
            if (this.props.serviceType === 'announce'){
                return (
                    <div className="card col-9  posts ">
                        <AnnouncePost postImage={this.postImage} shortTheDescription={this.shortTheDescription}/>
                    </div>
                )
            }
            else if (this.props.serviceType === 'profile'){
                return (
                    <div className="card col-9  posts ">
                        <ProfilePost postImage={this.postImage} shortTheDescription={this.shortTheDescription}/>
                    </div>
                )
            }
            else {
                return (
                    <div className="card col-9  posts ">
                        <AnnouncePost postImage={this.postImage} shortTheDescription={this.shortTheDescription}/>
                        <ProfilePost postImage={this.postImage} shortTheDescription={this.shortTheDescription}/>
                    </div>
                )
            }
        } else {
            return (
                <div className="card col-9  posts ">
                    <p>loading...</p>
                </div>
            )
        }
    }
    postImage = (ownerId)=>{

        if(ownerId === null || this.props.postImages.length === 0){
            return defaultImage
        } else {
            let owner = this.props.postImages.filter(user => user.user_id === ownerId);
            return  owner[0].picture ? owner[0].picture : defaultImage
        }
    };
    shortTheDescription = (postInfo, type)=>{
        return type === 'announce' ?
            <>
            <p>
                {postInfo.announce_description.substring(0, 130) + ' '}
                <Link to={'/post/anno/'+postInfo.announce_id } params={{id: postInfo.announce_id}}>
                    lire la suite
                </Link>
            </p>
            </>
            :
            <>
            <p>
                {postInfo.profile_description.substring(0, 130)}
            </p>
                <Link to={'/post/pro/'+postInfo.id_Profile }>
                    lire la suite
                </Link>

            </>
    };
}

const mapStateToProps = state =>{
    return {
        isPostImageLoaded: state.users.loadingUsers,
        postImages: state.users.usersInfo,
        serviceType: state.searchBy.serviceType
    }
};
const mapDispatchToProps = {
    getUsers: () => getUsers()
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)