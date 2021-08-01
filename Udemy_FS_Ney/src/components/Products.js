import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListProducts, removeProduct, getInfoProduct } from '../actions/products';
import Product from './Product';
import ProductDetail from './ProductDetail';
import FilterProduct from './FilterProduct';

class Products extends Component {
  state = {
    listProducts: null
  }
  componentDidMount = async () => {
    getListProducts();
  }

  _handleRemoveItem = productID => {
    removeProduct(productID)
  }

  _handleGetInfoPrepareUpdate = productID => {
    getInfoProduct(productID);
  }

  componentDidUpdate(prevProps, prevState) {
    const { listProducts: listProductsPrevState } = prevState;
    const { listProducts } = this.props.products; //STORE

    if (listProducts !== listProductsPrevState) {
      this.setState({
        listProducts
      });
    }
  }

  _handleChangeSort = sort => {
    const { listProducts } = this.state;
   
    switch(sort) {
      case 'lowest': 
      {
        let newListProducts = listProducts.sort((a, b) => a.price - b.price);
        return this.setState({
          listProducts: newListProducts
        })
      };

      case 'hightest': 
      {
        let newListProducts = listProducts.sort((a, b) => b.price - a.price);
        return this.setState({
          listProducts: newListProducts
        })
      };

      default: 
      {
        let newListProducts = listProducts.sort((a, b) => a.price - b.price);
        return this.setState({
          listProducts: newListProducts
        })
      }
    }
  }

  _hanldeChangeFilter = textKey => {
    const { listProducts } = this.state;

    let regexDemo = new RegExp(textKey, 'ig');
    let newListProducts = listProducts.filter(product => {
      return product.title.search(regexDemo) !== -1;
    });
    return this.setState({
      listProducts: newListProducts
    })
  }

  render() {
    const { products: { requestingRemove, requestingGetInfo } } = this.props;
    const { listProducts, sort } = this.state;
    return (
      <>
        <strong>Bộ lọc</strong>
        <FilterProduct
            sort={sort}
            _handleChangeSort={this._handleChangeSort}
            _hanldeChangeFilter={this._hanldeChangeFilter}
        />
        <strong>Danh Sách Sản Phẩm</strong>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listProducts && listProducts.length > 0 && listProducts.map((product, index) => (
                  <ProductDetail
                  product={product}
                  index={index}
                  _handleRemoveItem={this._handleRemoveItem}
                  requestingRemove={requestingRemove}
                  requestingGetInfo={requestingGetInfo}
                  _handleGetInfoPrepareUpdate={this._handleGetInfoPrepareUpdate}
                  />
            ))} 
           
          </tbody>
        </table>

        <Product/>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { products } = state;
  return {
    products
  }
}

export default connect(mapStateToProps, null)(Products);
