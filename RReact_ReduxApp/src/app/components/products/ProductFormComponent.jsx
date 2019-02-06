import React from 'react';
import TextInput from '../common/TextInput';

const ProductFormComponent = ({ pageText, product, onSave, onChange }) => (
    <form className="form-horizontal" onSubmit={onSave}>
        <h1>{pageText}</h1>
        <TextInput name="id" label="Id" value={product.id} readOnly={true} />
        <TextInput name="name" label="Name" value={product.name} onChange={onChange} />
        <TextInput name="description" label="Description" value={product.description} onChange={onChange} />
        <TextInput name="status" label="Status" value={product.status} onChange={onChange} />

        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-3">
                <button type="submit" className="btn btn-primary btn-block">Save</button>
            </div>
        </div>
    </form>
);

export default ProductFormComponent;