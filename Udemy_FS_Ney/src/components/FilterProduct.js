import React, { Component } from 'react';

class Filter extends Component {
    state = {
        sort: '', textKey: ''
    }

    __handleChangeSort = e => {
        const { _handleChangeSort } = this.props;
        this.setState({
            sort: e.target.value
        });
         _handleChangeSort(e.target.value)
    }

    __hanldeChangeFilter = e => {
        const {_hanldeChangeFilter } = this.props;
        this.setState({
            textKey: e.target.value
        });
        _hanldeChangeFilter(e.target.value)
    }
  render() {
    const { sort, textKey } = this.state;
    return (
        <> 
            <div className="row">
                <div className="col-md-6">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nhập Tên Sản Phẩm" 
                        name='textKey'
                        value={textKey}
                        onChange={e =>this.__hanldeChangeFilter(e)}
                    />
                </div>
                <div className="col-md-6">
                    <select
                        className="form-control"
                        name="sort"
                        onChange={e => this.__handleChangeSort(e)}
                        value={sort}
                    >
                        <option value="">Bộ Lọc</option>
                        <option value="lowest">Giá Từ Thấp Đến Cao</option>
                        <option value="hightest">Giá Từ Cao Đến Thấp</option>
                    </select>
                </div>
            </div>
        </>
    );
  }
}

export default Filter;
