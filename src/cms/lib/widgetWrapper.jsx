import React from 'react';

import WithStylesContext from '../../lib/WithStylesContext';

const widgetWrapper = Component => {
  const ComponentName = Component.displayName || Component.name || 'Component';

  class HoC extends React.Component {
    static displayName = `WidgetWrapper(${ComponentName})`;

    render() {
      const props = this.props;
      return (
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
          <Component {...props} />
        </WithStylesContext>
      );
    }
  }

  return HoC;
};

export default widgetWrapper;
