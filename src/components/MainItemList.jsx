import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Video from './Video';

class MainItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            message: '',
        }
    }



    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title="Videos"/>
                        <div>
                         { this.state.loading ?
                            this.props.list_of_videos : null
                         }
                         </div>
                    </Card>
                </div>
            );
    }
}
export default MainItemList;