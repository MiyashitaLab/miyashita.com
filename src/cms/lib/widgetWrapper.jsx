import React from 'react';

import StyleContext from 'isomorphic-style-loader/StyleContext';

const widgetWrapper = Component => {
  const ComponentName = Component.displayName || Component.name || 'Component';

  class HoC extends React.Component {
    static displayName = `WidgetWrapper(${ComponentName})`;

    render() {
      const props = this.props;
      return (
        <StyleContext.Provider value={{ insertCss: styles => styles.forEach(s => s._insertCss()) }}>
          <Component {...props} />
        </StyleContext.Provider>
      );
    }
  }

  return HoC;
};

export default widgetWrapper;
