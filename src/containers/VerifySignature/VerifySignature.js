import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon, Upload } from 'antd';

// Material UI
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

// Icons
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';

import { verifySignature } from './../../actions';

class VerifySignature extends Component {
  handleUpload = (event => {
    const { dispatch, verifyPending } = this.props;
    if (verifyPending) {
      console.log('verify pending: ', verifyPending);
      return;
    }

    const path = event.file.originFileObj.path;
    dispatch(verifySignature(path));
  });

  render() {
    return (
      <div style={{ paddingLeft: '10px' }}>
        <Card>
          <CardHeader
            action={
              <IconButton>
                <HelpIcon />
              </IconButton>
            }
            title="Verify a signature"
          // subheader="Signature requests are shared via email. Fill in the information below to create a signature request email."
          />
          <Divider />

          <CardContent style={{ paddingLeft: '30px' }}>
            <div className="dropbox">
              <Upload.Dragger
                accept=".irma"
                name="files"
                beforeUpload={(() => false)}
                onChange={this.handleUpload}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Signed messages are shared as email attachments. Click or drag the signed message to this area.</p>
                <p className="ant-upload-hint"></p>
              </Upload.Dragger>
            </div>
          </CardContent>
        </Card>
        <br />
        <br />
        RESULT: {JSON.stringify(this.props.verifyResult)}
      </div>
    );
  }
}

VerifySignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { signatureVerify } = state;
  return {
    ...signatureVerify,
  };
}

export default connect(mapStateToProps)(VerifySignature);
