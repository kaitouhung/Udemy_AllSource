import React, { Component } from 'react';
import { URI_FETCH } from '../constants';
import { connect } from 'react-redux';
import { removeCart } from '../actions/carts';
import { formatCurrentcy } from '../helpers/formatCurrentcy';

class Cart extends Component {

    _handleRemoveItem = e => {
        e.preventDefault();
        const { item: { product: { _id: productID } }, removeCart } = this.props;
        removeCart(productID);
    }

  render() {
      const { item } = this.props;
    return (
      <> 
        <li className="list-group-item">
            <img 
                src={item.product ? `${URI_FETCH}/upload/${item.product.image}` : 'https://via.placeholder.com/300x300'}
                width={100}
                height={100}
                style={{borderRadius: 50}}
                />  
                {item.product && item.product.title} 
                <span style={{marginLeft: 10}}>{item.product.price && !Number.isNaN(Number(item.product.price)) && formatCurrentcy(item.product.price)}</span>
                <strong style={{marginLeft: 10}}>x {item.quantity}</strong>

                <button className="btn btn-danger btn-sm" style={{marginLeft: 10}} onClick={e => this._handleRemoveItem(e)}>Xoá</button>
            </li>
        </>
    );
  }
}

export default connect(null, { removeCart })(Cart);
