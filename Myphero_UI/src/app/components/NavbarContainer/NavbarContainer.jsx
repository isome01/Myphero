import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import the navbar presentation
import './NavbarContainer.css'

class NavbarContainer extends Component {

    constructor(props){

        super(props);

        this.state = {
            navb_cont_title : ''
        };
    }

    componentWillMount(){
        const default_title = '[Default]';
        //this.setState({th})
    }

    render(){
        return(
            <div id='myphero_navbar' className={'navbar-container'}>
                <div className={'nav-header'}>
                    <span className={'nav-logo'}><a href="#">{this.props.navbar_logo}</a></span>
                </div>
                <ul className={'nav-list-container'}>
                    {this.props.navbar_content.map( $_ =>{
                        return <li key={$_.text} className={'nav-list-item'}><a href="#">{$_.text}</a></li>
                    })}
                </ul>
            </div>
        );
    }

};

NavbarContainer.propTypes = {
    navbar_logo : PropTypes.string.isRequired,
    navbar_content : PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NavbarContainer;