import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';
import ReactStars from 'react-stars'
import * as firebase from "firebase";

// Get a reference to the database service


class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_item_open: false,
            review: null,
            reviwed: false
        }
    }


_onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

writeReviewData = (event) => {
    this.setState({ new_item_open: false })
    var number = null
    var sum = null
    var n = this.state.review
    var reviewsRef = this.props.fb.database().ref('videos/' + this.props.video_id + "/reviews")
    this.setState({reviwed:true})
    reviewsRef.once('value').then(function(snapshot) {
        if(snapshot.val() != null){
            number = snapshot.val()["number"];
            sum = snapshot.val()["sum"];
            console.log(snapshot.val()["number"])
            console.log(snapshot.val()["sum"])
            number += n
            sum += 1
            console.log(n)
            reviewsRef.set({
                number : number,
                sum    : sum
            });
        }
    });
}

handleOpenNewItem = () => {
    this.setState({ new_item_open: true });
};

handleCloseNewItem = () => {
    this.setState({ new_item_open: false });
};

render() {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 0
        }
      };
      const ratingChanged = (newRating) => {
        console.log(newRating)
        // this.setState({ review : newRating })
        this.state.review = newRating
      }
      const ratingChanged2 = (newRating) => {
        newRating = this.props.review
        alert("Clique no 'Review Video' para enviar sua opnião")
        this.forceUpdate()
      }
      
      const actionsItem = [
        <FlatButton
            label="REVIEW"
            primary={true}
            keyboardFocused={true}
            onClick={this.writeReviewData}
        />,
        ];
        return (
            <div>
                    <Dialog
                    title="Rate this Video"
                    actions={actionsItem}
                    modal={false}
                    open={this.state.new_item_open}
                    onRequestClose={this.handleCloseNewItem}>
                    <div className='dialogContainer'>
                        <ReactStars
                            count={5}
                            value={0}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'} />
                    </div>
                </Dialog>
                <Card>
                    <CardTitle title={this.props.video_name}/>
                    <div style={{paddingLeft:"40px"}}>
                        <YouTube
                        videoId={this.props.video_id}
                        opts={opts}
                        onReady={this._onReady}
                        />
                         <ReactStars
                            count={5}
                            value={this.props.review}
                            onChange={ratingChanged2}                            
                            size={24}
                            color2={'#ffd700'} />
                        {this.props.number}
                        { !this.state.reviwed ? 
                            <FlatButton
                            label="REVIEW VIDEO"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleOpenNewItem}
                        /> :
                        null
                        }
                        
                        </div>
                </Card>
            </div>
        );
}
}
export default Video;