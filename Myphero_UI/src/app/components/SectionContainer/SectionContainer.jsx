import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SectionArticle from '../../presentational/SectionArticle.jsx';

import './SectionContainer.css';


class SectionContainer extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }

    render(){
        
        let article_image = 'https://pm1.narvii.com/5791/6fd38e0e9de954c80231b51aa758500f4c6bdf25_hq.jpg'; 
        let articles = ['Sokka', 'Korah', 'Rainbow', 'Foo'];

        return(

            <div className="section-container">
                <h1 class="section-title">
                    {this.props.section_header || '[DEFAULT HEADER: Either no header was passed in or the header is empty]'}</h1>
                <section id={this.props.section_category + '_section'}>{
                    articles.map( $_ => <SectionArticle 
                        article_header={'Toph and Sokka'} 
                        artcile_image={article_image}
                        article_description={'Korrah and Sokka shipped by multitudes'}
                        article_summary={'Whoever thought such a comedic couple was ironically hard to guess. Korrah and Sokka dating might as well be canon, as the two are shipped by millions.'} 
                    />)
                }</section>
            </div>
        );
    }
}

SectionContainer.PropTypes = {
    section_header : PropTypes.string.isRequired,
    section_category : PropTypes.string.isRequired,
}

export default SectionContainer;