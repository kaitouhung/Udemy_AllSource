import React, { Component } from 'react';
import { formatCurrentcy } from '../helpers/formatCurrentcy';
import { addCart } from '../actions/carts';
import { connect } from 'react-redux';
import { URI_FETCH } from '../constants';

class ItemProduct extends Component {

    state = {
        quantity: 1
    }

    _handleChange = e => this.setState({ [e.target.name]: e.target.value })

    _handleAddCart = e => {
        e.preventDefault();
        const { quantity } = this.state;
        const { product, addCart }  = this.props;
        /**
         * TODO SERVER
         */
        /**
         * HANDLE CLIENT (REACTJS)
         */

        return addCart(product, quantity);
    }
  render() {
      const { product } = this.props;
      const { quantity } = this.state;
    return (
        <div className="col-md-6 col-lg-4" style={{ marginTop: 10 }}>
            <div className="card">
            <img className="card-img" 
                width={250}
                height={400}
                src={product ? `${URI_FETCH}/upload/${product.image}` : 'https://via.placeholder.com/250x400'}
                
                alt="Vans" />
            {/* <div className="">
                <a href="#" className="card-link text-danger like">
                    <i className="fas fa-heart" />
                </a>
            </div> */}
            <div className="card-body">
                <h4 className="card-title">{product && product.title}</h4>
                {/* <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6> */}
                <p className="card-text">
                    {
                        product && product.description
                    }
                </p>
                <div className="options d-flex flex-fill">
                <select className="custom-select ml-1" value={quantity} onChange={e => this._handleChange(e)} name='quantity'>
                    <option selected value={1}>Số Lượng</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                </div>
                    <div className="buy d-flex justify-content-between align-items-center">
                    <div className="price text-success"><h5 className="mt-4">
                        {product && product.price && formatCurrentcy(product.price)}
                    </h5></div>
                    <button href="#" className="btn btn-success mt-3" onClick={e => this._handleAddCart(e)}>
                        <i className="fas fa-shopping-cart" /> Thêm Giỏ Hàng
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
  }
}

export default connect(null, { addCart })(ItemProduct);
