import React from "react";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;

    return <div>total comments: {comments.length}</div>;
  }
}