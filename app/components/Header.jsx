import React from 'react'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    query: React.PropTypes.string
  }

  render() {
    return (
      <header>
        <div className="container">
          <h1><span className="fa fa-search"></span> {this.props.query}</h1>
        </div>
      </header>
    );
  }
}