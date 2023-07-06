import { Button, ListGroup } from 'react-bootstrap';
import styles from './Posts.module.css';
import { Pagination } from 'react-bootstrap';
import PostPage from '../../components/PostPage/PostPage';
import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { showModal } from '../../services/slices/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import { addCheckedEntitiesToState } from '../../services/slices/Favourites/Favourites';
import { clearCheckedPosts } from '../../services/slices/Posts/Posts';

function Posts() {
  const paginationItems = [];
  const duration = 500;
  const nodeRef = useRef(null);
  const defaultStyle = {
    position: 'absolute',
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };
  const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  const [postsElement, setPostsElement] = useState<React.JSX.Element>(<></>);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const currentPostIds = useAppSelector((state) => state.posts.checkedPosts);
  const loading = useAppSelector((state) => state.posts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    setPostsElement(<PostPage startIndex={(currentPage - 1) * 10} endIndex={currentPage * 10} />);
  }, [currentPage]);

  function generatePage(pageNumber: number) {
    setPostsElement(<PostPage startIndex={(pageNumber - 1) * 10} endIndex={pageNumber * 10} />);
  }

  function onClickButtonHandler() {
    dispatch(
      showModal({
        modalTitle: `Вы действительно хотите удалить выбранные посты в количестве ${currentPostIds.length} шт.`,
        postId: null,
        isSinglePostSelected: false,
      })
    );
  }

  function addCheckedPostsToFavourites() {
    setIsDisabledButton(true);
    dispatch(addCheckedEntitiesToState());
    dispatch(clearCheckedPosts());
    setTimeout(() => {
      setIsDisabledButton(false);
    }, 1000);
  }

  for (let i = 1; i <= 10; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={currentPage === i}
        onClick={() => {
          generatePage(i);
          setCurrentPage(i);
        }}>
        {i}
      </Pagination.Item>
    );
  }

  return loading ? (
    <Spinner height={'calc(100vh - 56px)'} />
  ) : (
    <>
      <Transition nodeRef={nodeRef} in={currentPostIds.length > 1} timeout={duration} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className={'d-flex'}>
            <Button onClick={onClickButtonHandler} className={'btn-danger mt-5'}>
              Удалить выбранные x{currentPostIds.length}
            </Button>
            <Button disabled={isDisabledButton} onClick={addCheckedPostsToFavourites} className={'mt-5 mx-5'}>
              {isDisabledButton ? 'Добавлено' : `Добавить в избранное x${currentPostIds.length}`}
            </Button>
          </div>
        )}
      </Transition>
      <ListGroup className={styles.postsList} as="ul">
        {postsElement}
      </ListGroup>
      <Pagination size={'lg'} className={'mt-5'}>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(1);
          }}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        />
        {paginationItems}
        <Pagination.Next
          disabled={currentPage === 10}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        />
        <Pagination.Last
          disabled={currentPage === 10}
          onClick={() => {
            setCurrentPage(10);
          }}
        />
      </Pagination>
    </>
  );
}

export default Posts;
