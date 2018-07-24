import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon, Upload } from 'antd';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';

import { verifyStoredSignature, closeVerifyResult } from './../../actions';
import SignatureResult from './children/SignatureResult';
import AttributeResultTable from './children/AttributeResultTable';

// CSS
import 'antd/lib/upload/style/css';

class VerifySignature extends Component {
  handleUpload = (event => {
    const { dispatch, verifyPending, requests } = this.props;

    if (verifyPending)
      return;

    const path = event.file.originFileObj.path;
    dispatch(verifyStoredSignature(path, requests));
  });

  closeResult = () => {
    const { dispatch } = this.props;
    dispatch(closeVerifyResult());
  }

  renderUploader() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              {/* <HelpIcon /> */}
            </IconButton>
          }
          title="Verify a signature"
        />
        <Divider />

        <CardContent style={{ paddingLeft: '30px' }}>
          <div className="dropbox">
            <Upload.Dragger
              accept=".irma"
              name="files"
              beforeUpload={(() => false)}
              onChange={this.handleUpload}
              fileList={[]}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">In order to verify a signature, click here or drag the signed message to this area.</p><p> A signed message has the filename extension <i>.irma</i>.</p>
              <p className="ant-upload-hint"></p>
            </Upload.Dragger>
          </div>
        </CardContent>
      </Card>
    );
  }

  renderDone() {
    const { signatureResult, showVerifyResult, signature } = this.props;
    let message = '';
    try {
      message = JSON.parse(signature).message;
    } catch (e) {
      // Ignore errors
    }
    return (
      showVerifyResult ? (
        <div>
          <SignatureResult
            proofStatus={signatureResult.proofStatus}
            message={message}
            matched={signatureResult.request !== undefined}
            signatureRequest={signatureResult.request}
            onClose={this.closeResult}
          />
          <Divider />
          <AttributeResultTable
            attributes={signatureResult.disjunctions
              ?
              signatureResult.disjunctions
              :
              signatureResult.credentialList}
            matched={signatureResult.request !== undefined}
            proofStatus={signatureResult.proofStatus}
          />
        </div>
      ) : null
    );
  }

  render() {
    return (
      <div>
        { this.renderUploader() }
        { this.renderDone() }
      </div>
    );
  }
}

VerifySignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signature: PropTypes.object.isRequired,
  signatureResult: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  verifyPending: PropTypes.bool,
  showVerifyResult: PropTypes.bool,
};

function mapStateToProps(state) {
  const verifyResult = state.signatureVerify.verifyResult;
  const showVerifyResult = state.signatureVerify.showVerifyResult;
  const requests = state.storage.requests;
  return {
    ...verifyResult,
    showVerifyResult,
    requests,
  };
}

export default connect(mapStateToProps)(VerifySignature);
