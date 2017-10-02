import React from 'react';
import { Link } from 'found';

class MemberLayout extends React.Component {
  render() {
    const { page } = this.props.data;
    return (
      <div>
        <p>This is a sample layout.</p>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    );
  }
}

export default MemberLayout;
