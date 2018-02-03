import React from 'react';
import classnames from 'classnames';

const FontAwesome = ({ name, className, ...rest }) => (
  <i {...rest} className={classnames([className, 'fa', `fa-${name}`])} />
);

export default FontAwesome;
