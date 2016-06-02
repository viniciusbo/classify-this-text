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
      return <li key={index}><a href="#" className="btn label label-primary" onClick={this.handleTextClassification.bind(this, category)}>{category.name}</a></li>;
    }, this);
    return (
      <ul className="list-inline">
        <li><small>Pick one:</small></li>
        {categoryList}
      </ul>
    );
  }

  handleTextClassification(category, event) {
    event.preventDefault();
    this.props.onClick(category);
  }
}