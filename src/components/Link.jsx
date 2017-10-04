import React from 'react';
import { Link } from 'found';

const LinkWrapper = props => {
  const Component = props.to ? Link : 'a';
  return <Component {...props}>{props.children}</Component>;
};

export default LinkWrapper;
