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
import SignatureResult from './SignatureResult';

class VerifySignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      verifyDone: false,
    };
  }

  handleUpload = (event => {
    const { dispatch, verifyPending } = this.props;

    this.setState({
      message: '',
      verifyDone: false,
    });

    if (verifyPending) {
      return;
    }

    const path = event.file.originFileObj.path;
    dispatch(verifySignature(path));
  });

  componentWillReceiveProps(nextProps) {
    const { signature, signatureResult } = nextProps;
    if (signatureResult === undefined || Object.keys(signatureResult).length === 0) {
      // No verified response received yet, do nothing
      return;
    }

    try {
      const { message } = JSON.parse(signature)
      this.setState({
        message,
        verifyDone: true,
      });
    } catch (e) {
      this.setState({
        verifyDone: true,
      });
    }
  }

  render() {
    const { signatureResult } = this.props;

    const { verifyDone } = this.state;
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

        {verifyDone ? (
          <SignatureResult
            proofStatus={signatureResult.proofStatus}
            message={this.state.message}
            matched={signatureResult.disjunctions !== undefined}
          />
        ) : ''}
        <br />
        <br />
        RESULT: {JSON.stringify(signatureResult)}
      </div>
    );
  }
}

VerifySignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signature: PropTypes.string.isRequired,
  signatureResult: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const verifyResult = state.signatureVerify.verifyResult;
  return {
    ...verifyResult,
  };
}

export default connect(mapStateToProps)(VerifySignature);
