import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
//import Avatar from '@material-ui/core/Avatar';
//import useGlobal from "../store";
//import icon from './icon.png';
import useGlobal from "../store";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const renderContainerMenu = ({ classes }) => (
  <Menu
    anchorEl={null}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={false}
  >
    <MenuItem >Profile</MenuItem>
    <MenuItem >My account</MenuItem>
  </Menu>
)

export const ContainerMenu = withStyles(styles)(renderContainerMenu)

const renderMobileMenu = ({ classes }) => (
  <Menu
    anchorEl={null}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={false}
  >
    <MenuItem>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <p>Messages</p>
    </MenuItem>
    <MenuItem>
      <IconButton color="inherit">
        <Badge badgeContent={11} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
    <MenuItem>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  </Menu>
)

export const MobileMenu = withStyles(styles)(renderMobileMenu)

const renderHeader = ({ classes }) => {
  const [keyword, setKeyword] = useState('');
  const [globalState, globalActions] = useGlobal();

  const handleChange = event => {
    globalActions.fetchApi({
       s: event.target.value === "" ? "your" : event.target.value, 
       y: globalState.y, 
       type: globalState.type, 
       page: 1, 
       scroll: false 
    });
    setKeyword(event.target.value)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          Qupas
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            value={keyword}
            onChange={handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={'material-appbar'}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export const Header = withStyles(styles)(renderHeader)