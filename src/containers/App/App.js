import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { compose } from 'recompose';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

import './App.css';
import logoImg from '../../static/images/logo.png'; //relative path to image

import SideMenu from '../../containers/SideMenu/SideMenu';
import Home from '../../containers/Home/Home';
import RequestSignature from '../../containers/RequestSignature';
import VerifySignature from '../../containers/VerifySignature/VerifySignature';
import Sent from '../../containers/Sent/Sent';
import Settings from '../../containers/Settings/Settings';
import About from '../../containers/About/About';

import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';


const IrmaTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#16a085',
      error: '#E91E63'// dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});





const drawerWidth = 250;

const styles = theme => ({
  main: {
    minHeight: 200,
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 40px)',
    marginTop: 40,
    overflow: 'auto',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 250,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: -17,
    marginRight: 8,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX:'hidden',
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      open: true,
    };
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { theme, classes } = this.props;
    return (
      <Router>
        <MuiThemeProvider theme={IrmaTheme}>
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar style={{ position: 'fixed', backgroundColor: '#074487' }} className={classes.appBar}>
                <Toolbar >
                  <IconButton    
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton >
                  <Link to="/" style={{ color: 'inherit' }}>
                    <img style={{ width: '56px', padding: '4px', marginTop: '2px' }} alt={"logo"} src={logoImg} />
                  </Link>
                  <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Typography type="title" color="inherit" noWrap style={{ fontSize: '16px' }}>
                      Signature app
                    </Typography>
                  </Link>
                  <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                    <Link to="/" style={{ color: 'inherit' }}>
                      <IconButton style={{ display: 'block', align: 'right' }} color="inherit" >
                        <HomeIcon />
                      </IconButton>
                    </Link>
                  </div>
                </Toolbar>
              </AppBar>
              {/* {
                this.state.showMenu &&
                <SideMenu />
              } */}

              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }}
                open={this.state.open}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <SideMenu/>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.main}>
                   <Route exact path="/" component={Home} />
                <Route path="/request-signature" component={RequestSignature} />
                <Route path="/verify-signature" component={VerifySignature} />
                <Route path="/sent" component={Sent} />
                <Route path="/settings" component={Settings} />
                <Route path="/about" component={About} /> 
                </div>
              </main>
            </div>
          </div>
        </MuiThemeProvider>
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

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps),
)(App);
