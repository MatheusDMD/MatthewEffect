import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import Subheader from 'material-ui/Subheader';

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">SPORTS RATING</a>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;