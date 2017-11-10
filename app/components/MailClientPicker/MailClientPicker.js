import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const radioButtonStyle = {
  marginBottom: 16,
};

const defaultSelected = 'save';

export default class MailClientPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: defaultSelected,
    }
  }

  handleRadioButtonSelect = (event, selected) => {
    this.setState({
      ...this.state,
      selected,
    });
  };

  handleSubmit = () => {
    this.props.handleSelect(this.state.selected)
  }

  getRadioButtons = () => {
    const mailClients = this.props.mailClients;
    return Array.from(mailClients.keys()).map((el) => (
        <RadioButton
          key={el}
          value={el}
          label={mailClients.get(el).description}
          style={radioButtonStyle}
        />
      )
    );
  }

  render() {
    const { handleClose, openState } = this.props;
    const radioButtons = this.getRadioButtons();
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <FlatButton
        label="Select"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Select your favorite mail client:"
          actions={actions}
          modal={false}
          open={openState}
          onRequestClose={handleClose}
        >
          <RadioButtonGroup name="mailClientSelect" defaultSelected={defaultSelected} onChange={this.handleRadioButtonSelect}>
            <RadioButton
              value="save"
              label="Save to disk"
              style={radioButtonStyle}
            />
            {radioButtons}
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}
