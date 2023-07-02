import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH_PHOTOS, PATH_POSTS, PATH_TASKS } from '../../constants/constants';
import Photos from '../../pages/Photos/Photos';
import Tasks from '../../pages/Tasks/Tasks';
import Posts from '../../pages/Posts/Posts';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Navigate to={PATH_POSTS} />} path={'/'} />
      <Route element={<Posts />} path={PATH_POSTS} />
      <Route element={<Photos />} path={PATH_PHOTOS} />
      <Route element={<Tasks />} path={PATH_TASKS} />
    </Routes>
  );
};
export default AppRouter;
