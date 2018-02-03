import React from 'react';
import { Set } from 'immutable';

import WithStylesContext from '../../lib/WithStylesContext';

const previewWrapper = Component => {
  const ComponentName = Component.displayName || Component.name || 'Component';

  class HoC extends React.Component {
    static displayName = `PreviewWrapper(${ComponentName})`;

    state = {
      css: new Set(),
    };

    insertCss = styles => {
      this.setState(({ css }) => {
        return { css: css.add(styles._getCss()) };
      });
    };

    render() {
      const props = this.props;
      return (
        <WithStylesContext onInsertCss={this.insertCss}>
          <style
            dangerouslySetInnerHTML={{
              __html: this.state.css.toArray().join('\n'),
            }}
          />
          <Component {...props} />
        </WithStylesContext>
      );
    }
  }

  return HoC;
};

export default previewWrapper;
