import React from 'react';

import ContentWrapper from '../../components/ContentWrapper';
import JekyllContent from '../../components/JekyllContent';

class MemberLayout extends React.Component {
  render() {
    const { page } = this.props.data;
    return (
      <ContentWrapper>
        <p>This is a sample layout.</p>
        <h1>{page.title}</h1>
        <JekyllContent html={page.content} />
      </ContentWrapper>
    );
  }
}

export default MemberLayout;
