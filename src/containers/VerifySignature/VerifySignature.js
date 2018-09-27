import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon, Upload } from 'antd';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Info';

import { verifyStoredSignature, closeVerifyResult, setCommandlineDone } from './../../actions';
import { getCommandlineArgument } from './../../actions/electron';
import SignatureResult from './children/SignatureResult';
import AttributeResult from './children/AttributeResult';
import ProcessingIndicator from './children/ProcessingIndicator';

// CSS
import 'antd/lib/upload/style/css';

class VerifySignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    };
  }

  componentDidMount() {
    const { commandlineDone, dispatch, requests } = this.props;
    if (!commandlineDone) {
      dispatch(setCommandlineDone());
      const arg = getCommandlineArgument();
      if (arg)
        dispatch(verifyStoredSignature(arg, requests));
    }
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
            <p className="ant-upload-text">In order to verify a signature, click here or drag the signed message to this area.</p><p> A signed message has the filename extension <i>.irmasignature</i>.</p>
            <p className="ant-upload-hint"></p>
          </Upload.Dragger>
        </div>
      </CardContent>
    );
  }

  renderDone() {
    const { signatureResult, showVerifyResult, signature } = this.props;
    let message = '';
    let messageType = '';
    try {
      message = JSON.parse(signature).message;
      messageType = JSON.parse(signature).messageType;
    } catch (e) {
      // Ignore errors
    }
    return (
      showVerifyResult && !this.state.showHelp ? (
        <div>
          <SignatureResult
            proofStatus={signatureResult.proofStatus}
            message={message}
            messageType={messageType}
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
        On this page you can verify a digital signature. Such a
	signature must have been created first, by a signer, in
	her/his IRMA app.  This yields a file with extension <em>.irmasignature</em>.
  On the current page you can load such a file,
	either by dragging it to the designated area or by selecting
	it in a file browser. The cryptographic verification of the
	signature then starts automatically and the result is
	displayed. If it succeeds, it tells you which message was
	signed, when, and with which attributes of the signer. Such a
	successful verification gives a proof of the commitment of the
	signer to the content of the message.
        </p>
      </CardContent>
    );
  }

  renderProcessing() {
    return <ProcessingIndicator show={!this.state.showHelp && this.props.verifyPending} />;
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
        { this.renderProcessing() }
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
  commandlineDone: PropTypes.bool.isRequired,
  verifyPending: PropTypes.bool.isRequired,
  showVerifyResult: PropTypes.bool,
};

function mapStateToProps(state) {
  const verifyResult = state.signatureVerify.verifyResult;
  const verifyPending = state.signatureVerify.verifyPending;
  const showVerifyResult = state.signatureVerify.showVerifyResult;
  const commandlineDone = state.signatureVerify.commandlineDone;
  const requests = state.storage.requests;
  return {
    ...verifyResult,
    verifyPending,
    showVerifyResult,
    requests,
    commandlineDone,
  };
}

export default connect(mapStateToProps)(VerifySignature);
