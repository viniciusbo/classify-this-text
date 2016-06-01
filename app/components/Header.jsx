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
          <form method="get" action="">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Type keywords and/or #hashtags and press enter" name="q" defaultValue={this.props.query} />
            </div>
          </form>
        </div>
      </header>
    );
  }
}