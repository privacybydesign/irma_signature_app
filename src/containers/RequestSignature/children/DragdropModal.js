import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Paper, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import requestImg from '../../../static/images/request.png';

class DragdropModal extends Component {
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Paper style={{position: 'fixed', bottom: '12.5vh', top: '12.5vh', left: '12.5vw', right: '12.5vw'}}>
          <IconButton style={{position: 'absolute', top: '10px', right: '10px'}} onClick={this.props.onClose}>
            <CloseIcon/>
          </IconButton>
          <div draggable={true} style={{draggable: 'true', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}} onDragStart={this.props.onDragStart}>
            <img style={{maxWidth: '40vw', maxHeight: '40vh'}}alt={'Request a signature'} src={requestImg} />
          </div>
        </Paper>
      </Modal>
    );
  }
}

DragdropModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DragdropModal;
