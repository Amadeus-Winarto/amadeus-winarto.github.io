import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Collapse, Jumbotron, NavbarToggler} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen : false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({isNavOpen : !this.state.isNavOpen});
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                        Amadeus
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/about">
                                        <span className="fa fa-address-card fa-lg"></span> About Me
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/posts">
                                        <span className="fa fa-sticky-note fa-lg"></span> Blog Posts
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron className="jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">AHOI, PEEPS!</h1>
                        <h2 className="lead">Welcome to My Personal Website!</h2>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;