import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';

import SideMenu from '../../containers/SideMenu/SideMenu';
import Home from '../../containers/Home/Home';
import CreateSigrequest from '../../containers/CreateSigrequest/CreateSigrequest';
import VerifySignature from '../../containers/VerifySignature/VerifySignature';

import { detectMailClients } from '../../actions';

import './App.css';

const styles = {
  main: {
    minHeight: 200,
    margin: 20,
    padding: 20,
  },
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: true
    };
  }

  componentWillMount() {
    const { mailClientsDetected, dispatch } = this.props;
    if (!mailClientsDetected) {
      dispatch(detectMailClients());
    }
  }

  toggleMenu() {
    this.setState(previousState => {
      const showMenu = !previousState.showMenu;
      return {
        showMenu,
      };
    });
  }

  render() {
    return (
      <Router>
        <div>
          <AppBar
            title="IRMA Signature App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={() => this.toggleMenu()}
          />
          <Row>
            {
              this.state.showMenu &&
              <Col xs={12} sm={3}>
                <SideMenu />
              </Col>
            }

            <Col xs>
              <Paper style={styles.main}>
                <Route exact path="/" component={Home} />
                <Route path="/create-sigrequest" component={CreateSigrequest} />
                <Route path="/verify-signature" component={VerifySignature} />
              </Paper>
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClientsDetected: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClientsDetected: mail.mailClientsDetected,
  };
}

export default connect(mapStateToProps)(App);
