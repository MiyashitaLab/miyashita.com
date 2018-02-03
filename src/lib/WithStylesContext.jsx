import React from 'react';
import PropTypes from 'prop-types';

/**
 * @extends {React.Component<{ onInsertCss?: Function },{}>}
 */
class WithStylesContext extends React.Component {
  static propTypes = {
    onInsertCss: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return { insertCss: this.props.onInsertCss };
  }

  render() {
    const { children } = this.props;
    if (React.Children.count(children) !== 1) {
      return <div>{children}</div>;
    } else {
      return React.Children.only(children);
    }
  }
}

export default WithStylesContext;
