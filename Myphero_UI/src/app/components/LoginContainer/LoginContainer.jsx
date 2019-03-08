import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormGroupInput from '../../presentational/FormGroupInput.jsx';
import FormGroupButton from '../../presentational/FormGroupButton.jsx';

import './LoginContainer.css';

class LoginContainer extends Component {

    constructor(props){
        super(props);

        this.SubmitForm = this.SubmitForm.bind(this);
    }

    componentWillMount = () => {

        this.props.form_content = this.props.form_content ||  {
            username : <FormGroupInput 
                form_group_name={'login'}
                form_input_type={'text'}
                form_group_label={'Username'}/>,
                
            password : <FormGroupInput 
                form_group_name={'login'}
                form_input_type={'password'}
                form_group_label={'Password'}/>,
            
            button : <FormGroupButton 
                form_group_name={'login_button'}
                form_button_type={'button'}
                form_button_text={'Login'}/>
        };
    }

    componentDidMount(){

    }

    render(){

        return(
            <div className="login_container">
                <form id="login_form" onSubmit={false} autoComplete='on'>
                    <h2 className="login_header"> Login </h2>
                    
                    <hr/>
                    { this.props.form_content.username }
                    { this.props.form_content.password }
                    <hr/>

                    { this.props.form_content.button }

                </form>
            </div>
        );
    }
};

export default LoginContainer;