import React, { Component } from 'react';
import MainItemList from './MainItemList';
import RecomendedProducts from './RecomendedProducts';
import * as firebase from "firebase";
import Video from './Video';
import RVideo from './RVideo';
import { StickyContainer, Sticky } from 'react-sticky';



var config = {
    apiKey: "AIzaSyBc67sGk43uD07ko0MYIVw4Yz0iFwGwDY4",
    authDomain: "iot-test-18feb.firebaseapp.com",
    databaseURL: "https://iot-test-18feb.firebaseio.com",
    projectId: "iot-test-18feb",
    storageBucket: "iot-test-18feb.appspot.com",
    messagingSenderId: "466723870231"
  };

firebase.initializeApp(config);
var database = firebase.database();

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            videos: []
        };
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    componentWillMount(){
        var reviewsRef = firebase.database().ref('videos/')
        var ctx = this
        reviewsRef.once('value').then(snapshot => {
            // console.log(snapshot.val())
            ctx.setState({loading: true, videos: snapshot.val()})
        })
        //ctx.setState({videos: value})
    }

    render() {
            var listVideos = () => {
                Object.keys(this.state.videos)
                var list_of_videos = []
                var list_of_videos_reviews = []
                for (var key in this.state.videos) {
                    var sum = this.state.videos[key]["reviews"]["sum"]
                    var number = this.state.videos[key]["reviews"]["number"]
                    var review = 0                
                    if(sum != 0){
                        review = number/sum
                    }
                    list_of_videos_reviews.push(review)
                    list_of_videos_reviews.sort().reverse()
                    var pos = list_of_videos_reviews.indexOf(review)
                    list_of_videos.splice(pos,0,
                        <Video video_id={key} 
                        video_name={this.state.videos[key]["name"]} 
                        review={review}
                        fb={firebase}/>)
                }
                return list_of_videos
            }
            var listRandomVideos = () => {
                var list_of_videos = []                
                Object.keys(this.state.videos)
                var i = 0
                for (var key in this.state.videos) {
                    list_of_videos.push(
                        <RVideo video_id={key} 
                        video_name={this.state.videos[key]["name"]} 
                        fb={firebase}/>)
                    i+=1
                    if(i == 2){
                        break
                    }
                }                    
                return list_of_videos
            }
            return (
                <div className="row">
                    <div className="col s12 m4 l2"></div>
                    <div className="col s12 m4 l7"><MainItemList list_of_videos={listVideos()}/></div>
                    <div className="col s12 m4 l3"><RecomendedProducts list_of_videos={listRandomVideos()}/></div>
                </div>
            );
        }
}

export default componentName;