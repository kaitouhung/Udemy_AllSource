import React, { Component } from 'react';
import { addProduct } from '../actions/products';
import { connect } from 'react-redux';
import { updateInfoProduct } from '../actions/products';
import { URI_FETCH } from '../constants';

class Product extends Component {
  state = {
    title: '', description: '', price: '', image: null,
    isUpdate: false, productID: '', nameImage: ''
  }

  _handleChangeText = e => {
    const { name, value } = e.target;
    console.log({ name, value })
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _handleChangeFile = e => {
    return this.setState({
      image: e.target.files[0]  
    })
  }

  _handleSubmitAdd = e => {
    e.preventDefault();

    const { title, description, price, image } = this.state;
    console.log(`...add request`)
    addProduct(title, description, price, image);
  }

  _handleSubmitUpdate = e => {
    e.preventDefault();
    const { title, description, price, productID, image } = this.state;
    updateInfoProduct(productID, title, description, price, image);
  }

  componentDidUpdate(prevProps, prevState) {
    const { productID } = prevState;
    const { infoProductPrepareUpdate } = this.props.products;

    if (infoProductPrepareUpdate && productID !== infoProductPrepareUpdate._id) {
      const { title, description, price, _id, image } = infoProductPrepareUpdate;
      this.setState({
        title, description, price, isUpdate: true, productID: _id,
        nameImage: image
      });
    }
  }

  render() {
    const { title, description, price, isUpdate, nameImage } = this.state;
    let { updatingInfo } = this.props.products;
    return (  
      <>
        <div className="bootstrap-iso">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                <form method="post">
                    <div className="form-group ">
                    <label className="control-label " htmlFor="name">
                        Title
                    </label>
                    <input className="form-control" name="title" type="text" 
                      value={title}
                      onChange={e => this._handleChangeText(e)}
                    />
                    </div>
                    <div className="form-group ">
                    <label className="control-label " htmlFor="textarea">
                        Description
                    </label>
                    <textarea className="form-control" cols={40} name="description" rows={10} defaultValue={""} 
                      onChange={e => this._handleChangeText(e)}
                      value={description}
                    />
                    </div>
                    <div className="form-group ">
                    <label className="control-label " htmlFor="number">
                        Price
                    </label>
                    <input className="form-control" name="price" type="text" 
                      onChange={e => this._handleChangeText(e)}
                      value={price}
                    />
                    </div>
                    <div className="form-group ">
                      <div className="row">
                        <div className="col-md-6">
                            <label className="control-label " htmlFor="name1">
                              Image
                          </label>
                          <input className="form-control" id="name1" name="image" type="file" 
                            onChange={e => this._handleChangeFile(e)}
                          />
                        </div>
                        <div className="col-md-6">
                          <img 
                            src={!isUpdate ? "https://via.placeholder.com/200" : 
                              (nameImage.length > 0  ? `${URI_FETCH}/upload/${nameImage}` : "https://via.placeholder.com/200")
                            }
                            alt=""
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                    <div>
                        {!isUpdate ? 
                          <button className="btn btn-primary " name="submit" type="submit" onClick={e => this._handleSubmitAdd(e)}>
                            @Thêm
                          </button>  : 
                          <button className="btn btn-success " name="submit" type="submit" onClick={e => this._handleSubmitUpdate(e)}>
                            {updatingInfo ? '...': '@Cập Nhật'}
                          </button>
                        }
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, null)(Product);
