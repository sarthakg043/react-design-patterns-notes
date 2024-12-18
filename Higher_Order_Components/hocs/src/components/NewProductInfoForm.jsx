import React from 'react'
import withEditableResource from './withEditableResource'

const NewProductInfoForm = withEditableResource(({product, onChangeProduct, onSaveProduct, onResetProduct}) =>{
    const {name, price, description, rating} = product || {}

    return product ? (
        <>
            <h2>New Product Info Form</h2>
            <form>
                <label>Name: 
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => onChangeProduct({name: e.target.value})} 
                    />
                </label>
                <label>Price: 
                    <input 
                        type="text" 
                        value={price} 
                        onChange={e => onChangeProduct({price: e.target.value})} 
                    />
                </label>
                <label>Description: 
                    <textarea
                        type="text" 
                        value={description} 
                        onChange={e => onChangeProduct({description: e.target.value})} 
                    ></textarea>
                </label>
                <label>Rating: 
                    <input 
                        type="number" 
                        value={rating} 
                        onChange={e => onChangeProduct({rating: e.target.value})} 
                    />
                </label>
                <br />
                <button type="button" onClick={onSaveProduct}>Save</button>
                <button type="button" onClick={onResetProduct}>Reset</button>
            </form>
        </>
    ): <p>Loading...</p>
}, `/products`, "product");

export default NewProductInfoForm