/* global gapi google */
import React from 'react';
import CMS from 'netlify-cms';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

import styles from './ImageWidget.css';
import widgetWrapper from '../lib/widgetWrapper';

/**
 * @extends {React.Component<CMS.WidgetProps, {}>}
 */
class ImageWidget extends React.Component {
  async getToken() {
    const token = await new Promise((resolve, reject) =>
      gapi.auth.authorize(
        {
          client_id: '89990117999-0sfvta2ds8mb9n6ib26m1ddfh0ubiogv.apps.googleusercontent.com',
          scope: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/photos',
            'https://www.googleapis.com/auth/youtube',
          ],
          immediate: false,
        },
        result => (!result.error ? resolve(result.access_token) : reject(new Error(result.error))),
      ),
    );
    return token;
  }

  async selectImage(token) {
    const result = await new Promise(resolve => {
      const picker = new google.picker.PickerBuilder()
        .setLocale('ja')
        .addView(google.picker.ViewId.PHOTOS)
        .addView(google.picker.ViewId.PHOTO_UPLOAD)
        .setOAuthToken(token)
        .setDeveloperKey('AIzaSyA0w7FKttXpu5rSaRHOYsPKih6EFGHf_So')
        .setCallback(data => {
          if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
            return resolve(data);
          }
        })
        .build();
      picker.setVisible(true);
    });
    return result[google.picker.Response.DOCUMENTS][0].thumbnails.pop().url;
  }

  onClickButton = () => {
    (async () => {
      const token = await this.getToken();
      const url = await this.selectImage(token);
      this.props.onChange(url);
    })().catch(err => console.error(err));
  };

  render() {
    const props = this.props;
    return (
      <div className={classnames(props.classNameWrapper, styles.wrapper)}>
        <input
          className={classnames(styles.input)}
          type="text"
          value={props.value || ''}
          onChange={e => props.onChange(e.target.value)}
          onFocus={props.setActiveStyle}
          onBlur={props.setInactiveStyle}
        />
        <button className={classnames('nc-imageControl-chooseButton')} onClick={this.onClickButton}>
          Choose an image
        </button>
      </div>
    );
  }
}

export default widgetWrapper(withStyles(styles)(ImageWidget));
