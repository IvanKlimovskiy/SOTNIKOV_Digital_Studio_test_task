import AppHeader from '../AppHeader/AppHeader';
import { Container } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchData } from '../../services/slices/Posts/Posts';
import AppRouter from '../AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import ModalFC from '../Modal/Modal';
const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <BrowserRouter>
      <Container>
        <AppHeader />
        <AppRouter />
      </Container>
      <ModalFC />
    </BrowserRouter>
  );
};

export default App;
