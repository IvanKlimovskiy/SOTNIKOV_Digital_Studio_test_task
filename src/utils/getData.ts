import checkResponse from './checkResponse';
import { URL_API } from '../constants/constants';

const getData = async <Data>(data: string): Promise<Data> => {
  const res = await fetch(`${URL_API}${data}`);
  return await checkResponse(res);
};

export default getData;
