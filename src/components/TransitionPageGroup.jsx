import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

const TransitionPageGroup = props => (
  <TransitionGroup component={FirstChild} {...props}>
    {props.children}
  </TransitionGroup>
);

export default TransitionPageGroup;
