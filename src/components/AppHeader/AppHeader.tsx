import { Nav, Navbar, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PATH_PHOTOS, PATH_POSTS, PATH_TASKS, PATH_FAVOURITES } from '../../constants/constants';
import { useAppSelector } from '../../hooks';

const AppHeader = () => {
  const favouritesPosts = useAppSelector((state) => state.favourites.posts);

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">SOTNIKOV - Digital Studio</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink className={'nav-link'} to={PATH_POSTS}>
            Посты
          </NavLink>
          <NavLink className={'nav-link'} to={PATH_PHOTOS}>
            Фото
          </NavLink>
          <NavLink className={'nav-link'} to={PATH_TASKS}>
            Задачи
          </NavLink>
        </Nav>
        <Nav>
          <NavLink className={'nav-link'} to={PATH_FAVOURITES}>
            Избранное
            {favouritesPosts.length === 0 ? null : (
              <Badge className={'mx-2'} pill bg="danger">
                {favouritesPosts.length}
              </Badge>
            )}
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
