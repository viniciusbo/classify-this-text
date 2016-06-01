import React from 'react'
import { List } from 'immutable'

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    categories: React.PropTypes.instanceOf(List).isRequired,
    onClick: React.PropTypes.func.isRequired
  }

  render() {
    const categoryList = this.props.categories.map((category, index) => {
      return <a href="#" className="btn" key={index} onClick={this.handleTextClassification.bind(this, category)}>{category.name}</a>;
    }, this);
    return (
      <div>
        <small>Pick one:</small>
        {categoryList}
      </div>
    );
  }

  handleTextClassification(category) {
    this.props.onClick(category);
  }
}