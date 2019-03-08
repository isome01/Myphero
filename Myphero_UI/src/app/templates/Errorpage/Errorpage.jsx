import React, { Component } from 'react';

import './Errorpage.css';

class Errorpage extends Component {

    render(){
        return(
            <div id="error_page" className="error-page">
                {/* Get load of this hardcoded bs of an error... xD */}
                Error (404): Sorry; Specified URL was either removed or does not exist!
                {/* We're not really sorry. */}
            </div>
        )
    }
};

export default Errorpage;