import React from 'react';
import PropTypes from 'prop-types';

const NavbarContent = (navbar_title, navbar_header) => (
    <div>
        <div>
            <span><a href="#"> {navbar_title} </a></span>
        </div>
        {/* Map a list of navbar links here... */}
    </div>
);

NavbarContent.propTypes = {
    navbar_title : PropTypes.string,
};

export default NavbarContent;