import React from 'react';

export default class AuthenticationPage extends React.Component {
  handleLogin = e => {
    e.preventDefault();
    this.props.onLogin(this.state);
  };

  render() {
    const { inProgress } = this.props;

    return (
      <section className="nc-githubAuthenticationPage-root">
        <button
          className="nc-githubAuthenticationPage-button"
          disabled={inProgress}
          onClick={this.handleLogin}
        >
          {inProgress ? 'Logging in...' : 'Login'}
        </button>
      </section>
    );
  }
}
