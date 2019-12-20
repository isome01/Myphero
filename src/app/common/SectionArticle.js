import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';

const SectionArticle = ({section_category, artcile_image, article_header, article_description, article_summary}) => (
    <article id={article_header + '_article'}>
        <Img className="article_image" src={artcile_image}  alt='Image empty or NULL'/>
        <div className="article_contents">
            <h3>{article_header || 'Dummy Header'}</h3>
            <hr/>
            <h4>{article_description || 'DummyDesciption'}</h4>
            <p>{article_summary || 'Dummy Summary... Blah blah blah blah blah...'}</p>
        </div>
    </article>
);

SectionArticle.propTypes = {
    section_category : PropTypes.string.isRequired,
    artcile_image : PropTypes.string.isRequired,
    article_header : PropTypes.string,
    article_description : PropTypes.string,
    article_summary : PropTypes.string,
};

export default SectionArticle;