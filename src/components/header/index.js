import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading-bar';

import * as authUtil from 'utils/auth.util';
import * as authActions from 'redux/actions/auth';

import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from '@rmwc/top-app-bar';
import {
    Drawer,
    DrawerHeader,
    DrawerContent,
    DrawerTitle,
} from '@rmwc/drawer';
import {
    List,
    ListItem,
} from '@rmwc/list';
import { Fab } from '@rmwc/fab';
import { Button } from '@rmwc/button';


function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch),
    };
}
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollAtTop: true,
            sideMenuOpen: false
        };

        this.checkScroll = this.checkScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.checkScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkScroll);
    }

    checkScroll(){
        let supportPageOffset = window.pageXOffset !== undefined;
        let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
        let scroll = {
           x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
           y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
        };
        if(scroll.y <= 64 && !this.state.scrollAtTop) {
            this.setState({ scrollAtTop: true });
        }
        else if(scroll.y > 64 && this.state.scrollAtTop){
            this.setState({ scrollAtTop: false });
        }
    }

    render() {
        const addClass = this.props.location.pathname === "/" && this.state.scrollAtTop ? "is-lander-page" : "";

        const isLogged = authUtil.isLogged();
        let loggedUser = {};
        let TopAppBarSectionContent;
        let SideMenuContent;
        if(isLogged){
            loggedUser = authUtil.getUser();
            TopAppBarSectionContent = (
                <TopAppBarSection alignEnd>
                    <Button className="nav-button">
                        <NavLink to="/job" activeClassName="active-route">Jobs</NavLink>
                    </Button>
                    <Button className="nav-button">
                        <NavLink exact to="/dashboard" activeClassName="active-route">Dashboard</NavLink>
                    </Button>
                    <Button className="nav-button">
                        <NavLink exact to={"/user/" + loggedUser._id} activeClassName="active-route">Profile</NavLink>
                    </Button>
                </TopAppBarSection>
            )

            SideMenuContent = (
                <List>
                    <ListItem>
                        <NavLink exact to="/" activeClassName="active-route"
                            onClick={() => this.setState({sideMenuOpen: false})}>Home</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink exact to="/dashboard" activeClassName="active-route"
                            onClick={() => this.setState({sideMenuOpen: false})}>Dashboard</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink exact to={"/user/" + loggedUser._id} activeClassName="active-route"
                            onClick={() => this.setState({sideMenuOpen: false})}>Profile</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink exact to="/job" activeClassName="active-route"
                            onClick={() => this.setState({sideMenuOpen: false})}>Jobs</NavLink>
                    </ListItem>
                </List>
            );
        }
        else {
            TopAppBarSectionContent = (
                <TopAppBarSection alignEnd>
                    <Button className="nav-button">
                        <NavLink exact to="/register" activeClassName="active-route">Register</NavLink>
                    </Button>
                    <Button className="nav-button">
                        <NavLink exact to="/login" activeClassName="active-route">Login</NavLink>
                    </Button>
                </TopAppBarSection>
            );

            SideMenuContent = (
                <List>
                    <ListItem>
                        <NavLink exact to="/" activeClassName="active-route" 
                            onClick={() => this.setState({sideMenuOpen: false})}>Home</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink exact to="/register" activeClassName="active-route"
                            onClick={() => this.setState({sideMenuOpen: false})}>Register</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink exact to="/login" activeClassName="active-route"
                            onClick={() => this.setState({sideMenuOpen: false})}>Login</NavLink>
                    </ListItem>
                </List>
            );
        }

        return (
            <TopAppBar className={addClass}>
                <LoadingBar id="loading-bar" progressIncrease={13} />
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <TopAppBarTitle>
                            <NavLink id="logo" style={{"textDecoration": "none", "color": "white"}} exact to="/">
                                <img src="../images/icon.svg" alt="icon" />
                            </NavLink>
                            <Fab id="menu-icon" onClick={() => this.setState({sideMenuOpen: true})} icon="menu" />
                        </TopAppBarTitle>
                    </TopAppBarSection>
                    {TopAppBarSectionContent}
                </TopAppBarRow>


                <Drawer
                    modal
                    id="drawer"
                    open={this.state.sideMenuOpen}
                    onClose={() => this.setState({sideMenuOpen: false})}
                >
                <DrawerHeader id="drawer-header">
                    <DrawerTitle id="drawer-title">MLPipe</DrawerTitle>
                </DrawerHeader>
                <DrawerContent id="drawer-content">
                    {SideMenuContent}
                </DrawerContent>
                </Drawer>
            </TopAppBar>
        );
        
    }
}

// { pure: false } needed for NavLink to update the activeClassName
export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header))