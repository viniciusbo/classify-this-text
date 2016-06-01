import React from 'react'
import { List } from 'immutable'

import CategoryList from './CategoryList'

export default class TextItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    categories: React.PropTypes.instanceOf(List).isRequired,
    onClassificate: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">{this.props.data.text}</div>
        <div className="panel-footer">
          {this.renderCategoryListOrLoading()}
        </div>
      </div>
    );
  }

  renderCategoryListOrLoading() {
    if (this.props.data.sending === true)
      return <span className="fa fa-spin fa-spinner"></span>;

    return <CategoryList categories={this.props.categories} onClick={this.handleCategoryClick.bind(this)} />;
  }

  handleCategoryClick(category) {
    this.props.onClassificate(this.props.data, category);
  }
}