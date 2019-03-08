import React from 'react';
import PropTypes from 'prop-types';
import { propTypes } from 'react-image';

/* 
For styling:
 - [form_group_name]_form_group
 - [form_group_name]_label
 - [form_group_name]_input
*/

const FormGroupInput = ({form_group_name, form_input_type, form_group_label}) => (

    <div className={'form_group'}>
        <label for={form_group_label} className={'form_label'} >
            {form_group_label}
        </label>
        <input className={'form_input'} 
            name={form_group_name} 
            id={form_group_label+'_input'} 
            type={form_input_type}
            placeholder={form_input_type}/>
    </div>
);

FormGroupInput.propTypes = {
    form_input_type : PropTypes.string.isRequired, /* Specifies the type for input form-group rendering (e.g: type=email, password, etc...) */
    form_group_name : PropTypes.string.isRequired,
    form_group_label : propTypes.string //Not required but still friendly
}

export default FormGroupInput;