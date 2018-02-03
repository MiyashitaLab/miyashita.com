import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import { Link, prefetch } from 'react-static';
import { withRouter } from 'react-router';

class LinkWrapper extends React.Component {
  onVisibleChange = ({ isIntersecting }) => {
    return isIntersecting && prefetch(this.href);
  };

  onClick = ev => {
    this.props.history.push(this.props.href);
    ev.preventDefault();
    return false;
  };

  render() {
    const { href, children, ...rest } = this.props;

    if (/^\w+:\/\//.test(href)) {
      return (
        <a target="_blank" {...this.props} rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Observer onChange={this.onVisibleChange}>
        <span {...rest} style={{ ...rest.style, cursor: 'pointer' }}>
          <Link to={href} onClick={this.onClick}>
            {children}
          </Link>
        </span>
      </Observer>
    );
  }
}

export default withRouter(LinkWrapper);
