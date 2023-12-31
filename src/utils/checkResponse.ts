const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка${response.status}`);
  }
};

export default checkResponse;
