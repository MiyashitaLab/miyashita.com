import React from 'react';
import { Set } from 'immutable';

import StyleContext from 'isomorphic-style-loader/StyleContext';

const previewWrapper = Component => {
  const ComponentName = Component.displayName || Component.name || 'Component';

  class HoC extends React.Component {
    static displayName = `PreviewWrapper(${ComponentName})`;

    state = {
      css: new Set(),
    };

    insertCss = styles => {
      styles.forEach(s =>
        this.setState(({ css }) => {
          return { css: css.add(s._getCss()) };
        }),
      );
    };

    render() {
      const props = this.props;
      return (
        <StyleContext.Provider value={{ insertCss: this.insertCss }}>
          <style
            dangerouslySetInnerHTML={{
              __html: this.state.css.toArray().join('\n'),
            }}
          />
          <Component {...props} />
        </StyleContext.Provider>
      );
    }
  }

  return HoC;
};

export default previewWrapper;
