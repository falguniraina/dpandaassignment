import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';


export default function Navbar() {
  const { currentUser, addCurrentUser } = useCurrentUser();

  const handleLogout = () => {
    addCurrentUser(undefined);
  }

  return (
    <Menu inverted>
      <Container>
        <h2 id='app-title'>Star Wars Api</h2>
        {currentUser ? (
          <>
            <Link to="/">
              <Menu.Item name="People" />
            </Link>
            <Link to="/favourites">
              <Menu.Item name="Favourites" />
            </Link>
            <Menu.Item name="Logout" onClick={handleLogout} />

          </>

        ) :
          (
            <>

            </>

          )
        }
      </Container>
    </Menu>
  )
}
