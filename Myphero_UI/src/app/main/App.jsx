import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/*import our page templates*/
import Homepage from '../templates/Homepage/Homepage.jsx';
import Loginpage from '../templates/Loginpage/Loginpage.jsx'
import Errorpage from '../templates/Errorpage/Errorpage.jsx';

import './App.css';

class App extends Component {


    constructor(props){
        super(props);
        this.props.bkgd_url = 'https://www.xmple.com/wallpaper/grey-white-checkered-squares-1920x1080-c2-a9a9a9-ffffff-l-70-a-0-f-2.svg';
    }

    componentDidMount(){

        let SCREEN_WIDTH = window.screen.width;
        let SCREEN_HEIGHT = window.screen.height;

        let body_bkgd = document.body;

        //styling the background
        body_bkgd.style.height = SCREEN_HEIGHT;
        body_bkgd.style.maxHeight = SCREEN_HEIGHT;

        body_bkgd.style.width = SCREEN_WIDTH;
        body_bkgd.style.maxWidth = SCREEN_WIDTH;

        body_bkgd.style.background = `url(${this.props.bkgd_url}) no-repeat center center fixed`;
        body_bkgd.style.backgroundSize = 'cover';
    }
    
    render(){
        return(
            <BrowserRouter>
                <div id="app-root" className={'main'}>
                    <Switch>
                        <Route path="/" component={Homepage} exact />
                        <Route path="/Login" component={Loginpage}/>
                        <Route component={Errorpage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};

export default App;