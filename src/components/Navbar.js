import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Menu inverted>
      <Container>
        <h2 id='app-title'>Star Wars Api</h2>
        <Link to="/">
          <Menu.Item name="People" />
        </Link>
        <Link to="/favourites">
          <Menu.Item name="Favourites" />
        </Link>
      </Container>
    </Menu>
  )
}
