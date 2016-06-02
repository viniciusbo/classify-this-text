import React from 'react'
import { List } from 'immutable'

import TextItem from './TextItem'

export default class TextList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: React.PropTypes.instanceOf(List).isRequired,
    categories: React.PropTypes.instanceOf(List).isRequired,
    onClassificate: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  }

  render() {
    const textList = this.props.data.map((row, index) => {
      return <TextItem
        key={row.id}
        data={row}
        categories={this.props.categories}
        onClassificate={this.onClassificate.bind(this, index)}
        onRemove={this.onRemove.bind(this, index)} />;
    });
    return <div>{textList}</div>;
  }

  onClassificate(index, data, category) {
    this.props.onClassificate(index, data, category);
  }

  onRemove(index) {
    this.props.onRemove(index);
  }
}