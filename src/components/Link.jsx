import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import { prefetch } from 'react-static';
import { Link, withRouter } from 'react-router-dom';

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
    const { href, children, innerClassName, staticContext, ...rest } = this.props;

    if (/^\w+:\/\//.test(href)) {
      return (
        <a target="_blank" href={href} {...rest} rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Observer onChange={this.onVisibleChange}>
        <span {...rest} style={{ ...rest.style, cursor: 'pointer' }}>
          <Link to={href} className={innerClassName} onClick={this.onClick}>
            {children}
          </Link>
        </span>
      </Observer>
    );
  }
}

export default withRouter(LinkWrapper);
