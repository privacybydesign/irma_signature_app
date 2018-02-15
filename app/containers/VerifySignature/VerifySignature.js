import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import { verify } from './../../actions';
import AttributeResultTable from './../../components/AttributeResultTable/AttributeResultTable';

class VerifySignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: '',
      signatureRequest: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps:', nextProps);
    if (!nextProps.verifyPending) {
      this.setState({
        verifyResult: nextProps.verifyResult,
      });
    }
  }

  handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    return this.setState({
      [id]: value,
    });
  };

  handleSubmit = () => {
    const { dispatch, verifyPending } = this.props;
    if (!verifyPending) {
      dispatch(verify(this.state.signature, this.state.signatureRequest));
    }
  }

  render() {
    const { attributes, proofStatus, error } = this.props.verifyResult;
    console.log(this.props.verifyResult);
    return (
      <div style={{ padding: '20px' }}>
        <h2>Verify an IRMA signature</h2>

        <h3>Enter information:</h3>
        <TextField
          id="signature"
          hintText="Enter the IRMA signature here"
          onChange={this.handleTextFieldChange}
          multiLine
          fullWidth
          value={this.state.signature}
        />
        <Divider />
        <TextField
          id="signatureRequest"
          hintText="Enter the original signature request here"
          onChange={this.handleTextFieldChange}
          multiLine
          fullWidth
          value={this.state.signatureRequest}
        />
        <RaisedButton
          label="Verify"
          onClick={this.handleSubmit}
        />

        <h3>Result:</h3>
        {error
          ?
            (
              <div>
              Error: {error}
              </div>
            )
          :
            (
              <div>
                Status: {proofStatus}
                <AttributeResultTable
                  attributes={attributes}
                />
              </div>
            )
        }
      </div>
    );
  }
}

VerifySignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  verifyPending: PropTypes.bool.isRequired,
  verifyResult: PropTypes.shape({
    attributes: PropTypes.array,
    error: PropTypes.string,
    proofStatus: PropTypes.string,
  }),
};

VerifySignature.defaultProps = {
  verifyResult: {
    attributes: [],
    error: '',
    proofStatus: '',
  },
};

function mapStateToProps(state) {
  return {
    verifyResult: state.verify.verifyResult,
    verifyPending: state.verify.verifyPending,
  };
}

export default connect(mapStateToProps)(VerifySignature);
