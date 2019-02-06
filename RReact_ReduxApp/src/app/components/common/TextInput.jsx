import React from 'react';

const TextInput = ({ name, label, onChange, placeholder, value, readOnly }) => (
    <div className="form-group">
        <label htmlFor={name} className="control-label col-sm-2">{label}</label>
        <div className="col-sm-6">
            <input type="text"
                name={name}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly} />
        </div>
    </div>
);

export default TextInput;