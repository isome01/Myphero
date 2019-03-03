import React, { Component } from 'react';
import {Router, BrowserRouter, Navlink } from 'react-router';

import NavbarContainer from '../../components/NavbarContainer/NavbarContainer.jsx';
import SectionContainer from '../../components/SectionContainer/SectionContainer.jsx';

import './Homepage.css';

/* this template will be in charge of all of the lastest/hottest news for each topic. */
/* A topic will be displayed by "section-containers". */
/* It's our goal to make these sections display as circular sliders/arrays. They 
   comprise:

     - Shipping
     - Who vs Who
     - Manga/Comicbook Content Creations

     ( ... probably in that order)
*/

class Homepage extends Component {

    constructor(props){
        super(props);

        this.state = {

        };
    }

    componentWillMount(){
        
    }

    render(){

        let navbar_logo = 'Myphero'
        let navbar_content = [
            {text : 'Home',},
            {text : 'Services'},
            {text : 'Communities'},
            {text : 'About'},
        ];

        return(
            <div id="myphero-home" className="homepage-content">

                <header id="home_header">
                    <NavbarContainer navbar_logo={navbar_logo} navbar_content={navbar_content}/>
                    
                    <h1> Myphero Home </h1>
                    {/* Breadcrumb Component needs to go here -> */}
                    
                </header>

                <main id="home_main">
                    <SectionContainer 
                        section_header={'Top 10 Ships: You won\'t believe what we have in store for you...'}
                        section_category={'shipping'}
                    />
                </main>

                <footer id="home_footer">

                </footer>
            </div>
        );
    }
};

export default Homepage;