import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
import { formatCurrentcy } from '../helpers/formatCurrentcy';

class Carts extends Component {

  render() {
      const { carts, totalPrice } = this.props;
      console.log({ carts__: carts })
    return (
        <div className="container">
            <div className="row">
            <div className="col-12 col-md-6">
                <h6 className="text-muted">Danh Sách Item Cart</h6> 
                <ul className="list-group">
                      {carts && carts.length > 0 && carts.map(item => (
                          <Cart 
                            key={`${item.quantity}_${item.product && item.product._id}`}
                            item={item}
                          />
                      ))}
                      <li className="list-group-item active">
                        Tổng Tiền: {totalPrice ? formatCurrentcy(totalPrice) : formatCurrentcy(0)}
                      </li>
                </ul>
            </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts.carts,
  totalPrice: state.carts.totalPrice
});

export default connect(mapStateToProps)(Carts);
