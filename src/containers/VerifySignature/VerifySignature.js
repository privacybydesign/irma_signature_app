import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon, Upload } from 'antd';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import { verifyStoredSignature, closeVerifyResult } from './../../actions';
import SignatureResult from './children/SignatureResult';
import AttributeResult from './children/AttributeResult';

// CSS
import 'antd/lib/upload/style/css';

class VerifySignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    };
  }

  onHelp = () => {
    this.setState(state => ({showHelp: !state.showHelp}));
  }

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
      <CardContent style={{ paddingLeft: '30px' }}>
        <div className="dropbox">
          <Upload.Dragger
            accept=".irmasignature"
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
      showVerifyResult && !this.state.showHelp ? (
        <div>
          <SignatureResult
            proofStatus={signatureResult.proofStatus}
            message={message}
            matched={signatureResult.request !== undefined}
            signatureRequest={signatureResult.request}
            onClose={this.closeResult}
          />
          <Divider />
          <AttributeResult
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

  renderHelp() {
    return (
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare magna magna, dignissim aliquet nunc interdum non. Nullam at bibendum turpis. Aenean interdum, orci ac egestas ultrices, odio eros dapibus ipsum, vel pulvinar magna enim at nulla. Nam ac pulvinar libero, nec feugiat mi. Mauris luctus neque non aliquet tempor. Mauris vulputate velit nisl, vel cursus est tempor non. In hac habitasse platea dictumst.
        </p>

        <p>
          Duis interdum venenatis nibh non suscipit. Aenean at nisi lobortis leo lobortis vehicula quis aliquet nisi. Nulla feugiat elit dapibus luctus faucibus. Suspendisse potenti. Pellentesque a lorem mattis, imperdiet arcu ullamcorper, congue elit. Praesent quis lacus nibh. Duis ac est magna. Duis ante mi, sodales et libero pellentesque, egestas pellentesque ligula. Praesent tellus tellus, hendrerit quis lacus malesuada, consectetur placerat risus. Pellentesque arcu ligula, sollicitudin eget fermentum sit amet, elementum sit amet justo. Morbi ut egestas nulla, in vulputate magna.
        </p>
      </CardContent>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={this.onHelp}>
                <HelpIcon />
              </IconButton>
            }
            title="Verify a signature"
          />
          <Divider />
          { this.state.showHelp ? this.renderHelp() : this.renderUploader() }
        </Card>
        { this.renderDone() }
      </React.Fragment>
    );
  }
}

VerifySignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signature: PropTypes.string.isRequired,
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
