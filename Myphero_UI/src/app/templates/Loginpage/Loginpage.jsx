import React, { Component } from 'react';
import LoginContainer from '../../components/LoginContainer/LoginContainer.jsx';

class Loginpage extends Component {
    
    render(){
        
        return(
            <div id="login_page" className="login_page">
                <header></header>
                <main>

                    <LoginContainer />    {/*Login needs to go here */}

                </main>
                <footer></footer>
            </div>
        )
    }
};

export default Loginpage;