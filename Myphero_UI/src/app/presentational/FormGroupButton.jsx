import React from 'react';
import PropTypes from 'prop-types';

/* 
For styling:
 - [form_group_name]_form_group
 - [form_group_name]_button
*/

const FormGroupButton = ({form_group_name, form_button_type, form_button_text}) => (

    <div className={form_group_name+'_form_group'}>
        <button className={'form_button'} 
            name={form_group_name+'_input'} 
            id={form_button_text+'_button'} 
            type={form_button_type}
            placeholder={form_button_type}> {form_button_text} </button>
    </div>
);

FormGroupButton.propTypes = {
    form_button_text : PropTypes.string,
    form_button_type : PropTypes.string.isRequired, /* */
    form_group_name : PropTypes.string.isRequired, /* Specifies the type for input form-group rendering (e.g: type=email, password, etc...) */
}

export default FormGroupButton;