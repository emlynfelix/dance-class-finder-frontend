import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();

  const [currentLink, setNewLink]: [string, (value: string) => void] = useState('/');

  const onNavigate = (value: string) => {
    setNewLink(value);
    navigate(value);
  };

  return (
    <Menu tabular>
      <Menu.Item
        name='Dance Classes'
        active={currentLink === '/'}
        onClick={() => onNavigate('/')}
      />
      <Menu.Item
        name='Locations'
        active={currentLink === '/read-location'}
        onClick={() => onNavigate('/read-location')}
      />
      <Menu.Item
        name='Teachers'
        active={currentLink === '/read-teacher'}
        onClick={() => onNavigate('/read-teacher')}
      />
      <Menu.Item
        name='Styles'
        active={currentLink === '/read-style'}
        onClick={() => onNavigate('/read-style')}
      />
    </Menu>
  );
}

export default Navbar;
