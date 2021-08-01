import React, { Component } from 'react';
import ItemProduct from './ItemProduct';
import { connect }  from 'react-redux';
import { getListProducts } from '../actions/products';
import Carts from './Carts';

class Home extends Component {
  componentDidMount = async () => {
    getListProducts();
  }
  render() {
    const { products } = this.props;
    return (
      <> 
        <Carts/>
        <br/>
          ----
          <div className="row">
              {products && products.length > 0 && products.map(product => (
                <ItemProduct
                  key={`${product._id}`}
                  product={product}
                />
              ))}
          </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.listProducts
});

export default connect(mapStateToProps, null)(Home);