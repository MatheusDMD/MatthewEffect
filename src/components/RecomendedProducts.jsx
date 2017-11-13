import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RVideo from './RVideo';



class RecomendedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
        }
    }


    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title="Recomended Videos" subtitle={this.state.message} />
                        <div className='recipesItems'>
                            {this.props.list_of_videos}
                        </div>
                    </Card>
                </div>
            );
    }
}
export default RecomendedProducts;