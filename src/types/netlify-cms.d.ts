declare module 'netlify-cms' {
  import React from 'react';
  import Immutable from 'immutable';

  namespace CMS {
    interface WidgetProps {
      classNameWidget: string;
      classNameLabel: string;
      classNameLabelActive: string;
      classNameWidget: string;
      classNameWidgetActive: string;
      classNameWrapper: string;
      editorControl: () => any;
      field: Immutable.Map<any, any>;
      forID: string;
      getAsset: (asset: any) => string;
      hasActiveStyle?: boolean;
      mediaPaths: Immutable.List<any>;
      metadata?: Immutable.Map<any, any>;
      onAddAsset: () => void;
      onChange: (value: any, metadata?: any) => void;
      onChangeObject: (
        fieldName: string,
        newValue: any,
        newMetadata?: any,
      ) => void;
      onOpenMediaLibrary: () => void;
      onRemoveInsertedMedia: () => void;
      setActiveStyle: () => void;
      setInactiveStyle: () => void;
      value: any;
    }

    interface PreviewProps {
      collection: Immutable.Map<any, any>;
      entry: Immutable.Map<any, any>;
      fields: Immutable.Map<any, any>;
      fieldsMetaData: Immutable.Map<any, any>;
      getAsset: (asset: any) => string;
      widgetFor: (widget: string) => any;
      widgetsFor: (widget: string) => any;
    }

    function registerWidget(
      name: string,
      control: React.ComponentClass<any, any> | string,
      preview?: React.ComponentClass<any, any>,
    ): void;

    function registerPreviewTemplate(
      collection: string,
      component: React.ComponentClass<any, any>,
    ): void;
  }

  export default CMS;
}
