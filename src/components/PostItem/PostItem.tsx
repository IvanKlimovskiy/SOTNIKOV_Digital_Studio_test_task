import { Card, Button } from 'react-bootstrap';
import styles from './PostItem.module.css';
import { PostComponent, DataCommentaries } from './PostItem.types';
import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { favourite, addedToFavourite, edit, comment } from '../../assets/images';
import getData from '../../utils/getData';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { Transition } from 'react-transition-group';
import { showModal } from '../../services/slices/Modal/Modal';
import { addCheckedPost, removeCheckedPost } from '../../services/slices/Posts/Posts';
import {
  addEntity,
  removeEntity,
  removeCheckedEntity,
  addCheckedEntity,
} from '../../services/slices/Favourites/Favourites';

const PostItem: React.FC<PostComponent> = ({ post }) => {
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { users } = useAppSelector((store) => store.posts);
  const favouritePosts = useAppSelector((state) => state.favourites.posts);
  const checkedPosts = useAppSelector((state) => state.posts.checkedPosts);

  const duration = 500;
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();
  const title = post ? capitalizeFirstLetter(post.title) : null;
  const body = post ? capitalizeFirstLetter(post.body) : null;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };
  const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  function checkIsCheckedPost() {
    return checkedPosts.some((id) => {
      return id === post.id;
    });
  }

  function checkIsAddedToFavourites() {
    return favouritePosts.some((el) => {
      return el.id === post.id;
    });
  }

  function addToFavouritesHandler() {
    setIsAddedToFavourites((prevAddedToFavourites) => !prevAddedToFavourites);
  }

  useEffect(() => {
    if (isAddedToFavourites) {
      dispatch(addEntity(post));
      setIsFirstRender(false);
    } else if (!isAddedToFavourites && !isFirstRender) {
      dispatch(removeEntity(post));
    }
  }, [isAddedToFavourites]);

  function checkHandler() {
    setIsChecked((prevChecked) => !prevChecked);
  }

  useEffect(() => {
    if (isChecked) {
      dispatch(addCheckedPost(post.id));
      dispatch(addCheckedEntity(post));
      setIsFirstRender(false);
    } else if (!isChecked && !isFirstRender) {
      dispatch(removeCheckedPost(post.id));
      dispatch(removeCheckedEntity(post));
    }
  }, [isChecked]);

  function removePostHandler() {
    dispatch(
      showModal({
        modalTitle: 'Вы действительно хотите удалить этот пост?',
        postId: post.id,
        isSinglePostSelected: true,
      })
    );
  }

  function getComm() {
    getData<DataCommentaries[][]>('comments').then((data) => {
      console.log(data);
    });
  }

  return (
    <>
      <Card className={`${styles.postItem} ${checkIsCheckedPost() ? styles.checkedPost : null}`}>
        <Card.Body className={'d-flex flex-column'}>
          <Card.Header style={{ cursor: 'pointer' }} onClick={checkHandler}>
            <Card.Title>{title}</Card.Title>
          </Card.Header>
          <Card.Text style={{ cursor: 'pointer' }} onClick={checkHandler}>
            {body}
          </Card.Text>
          <Card.Footer style={{ transition: '.5s' }} className={'mt-auto mb-2'}>
            <Card.Subtitle>{`Автор: неизвестен`}</Card.Subtitle>
            <div className={styles.imagesWrapper}>
              <Card.Img
                className={styles.image}
                onClick={addToFavouritesHandler}
                src={isAddedToFavourites || checkIsAddedToFavourites() ? addedToFavourite : favourite}
              />
              <Card.Img className={styles.image} src={edit} />
              <Card.Img onClick={getComm} className={styles.image} src={comment} />
            </div>
          </Card.Footer>
          <Transition nodeRef={nodeRef} in={checkIsCheckedPost()} timeout={duration} mountOnEnter unmountOnExit>
            {(state) => (
              <Button
                onClick={removePostHandler}
                ref={nodeRef}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                className={'btn-danger'}>
                Удалить
              </Button>
            )}
          </Transition>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostItem;
