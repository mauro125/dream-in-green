import React, { useEffect, useState } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../states/userState';

import logoImg from '../images/dig-logo.png';
import Image from "react-bootstrap/Image";
import {Dropdown} from "react-bootstrap";

const NavBar = () => {
  const [activeKey, setActiveKey] = useState(-1);
  const location = useLocation();

  const {user, profilePic, name, logout} = useAuth();
  const redirect = useHistory();

  //the home page contact form picture col needs to be set col-lg-6 so that it wraps correctly
  useEffect(() => {
    if (location.pathname.startsWith('/questionnaire')) {
      setActiveKey(1);
    } else if (location.pathname.startsWith('/learn')) {
      setActiveKey(2);
    } else if (location.pathname.startsWith('/profile')) {
      setActiveKey(3);
    } else if (location.pathname.startsWith('/about-us')) {
      setActiveKey(4);
    } else if (location.pathname == '/') {
      setActiveKey(0);
    } else {
      setActiveKey(-1);
    }
  }, [location]);

  function handleLogOut() {
    logout();
    redirect.push('/');
  }

  return (
    <Navbar expand='lg' sticky='top'>
      <div className='container'>
        <Navbar.Brand as={Link} to='/' onClick={() => setActiveKey(0)}>
          <img
            src={logoImg}
            className='nav-bar-logo'
            alt='Dream In Green logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='nav-bar-component'/>
        <Navbar.Collapse id='nav-bar-component'>
          <Nav
            className='mr-auto ml-auto'
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            <Nav.Link as={Link} to='/' eventKey={0}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/learn' eventKey={2}>
              Learn
            </Nav.Link>
            <Nav.Link as={Link} to='/about-us' eventKey={4}>
              About Us
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to='/profile' eventKey={3}>
                Profile
              </Nav.Link>
            )}
          </Nav>
          {!user && !location.pathname.startsWith('/log-in') &&
          (<div>
            <Link
              to='/log-in'
              className={"btn btn-primary my-2 my-lg-0 py-2 px-5"}
            >
              Log In
            </Link>

          </div>)
          }
          <div className="divider-image"/>
          {!user && !location.pathname.startsWith('/sign-up') && (<Link
            to='/sign-up'
            className={"btn btn-primary my-2 my-lg-0 py-2 px-5"}
          >
            Create Account
          </Link>)}
          {user && (<Dropdown>
            <Dropdown.Toggle className={'btn btn-primary my-2 my-lg-0 py-2 px-3'}>
              <Image
                className='button-image'
                src={profilePic}
                roundedCircle
              />
              <div className="divider-image"/>
              {name}
            </Dropdown.Toggle>
            <Dropdown.Menu className={'dropdown-menu'}>
              <Dropdown.Item id='hovering' as={Link} to='/'>Home</Dropdown.Item>
              <Dropdown.Item id='hovering' as={Link} to='/questionnaire'>Take a Survey</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item id='hovering' onClick={handleLogOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>)}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
export default NavBar;
