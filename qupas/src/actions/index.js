import axios from "axios"

export const fetchApi = async (store, data, request = axios) => {
  const { s, y, type, page, scroll } = data
  const status = "LOADING";
  store.setState({ status });
  try {
    const response = await request.get(
      `https://www.omdbapi.com/`, {
        params: {
          apikey: '13630481',
          page,
          type,
          s,
          y
        }
      }
    );
    const data = response.data;
    const isReposEmpty = data['Search'] === undefined;
    const status = isReposEmpty ? "EMPTY" : "SUCCESS";
    const search = isReposEmpty ? [] : data['Search']
    const omdb_data = scroll ? [ ...store.state.omdb_data, ...search] : search

    store.setState({ omdb_data, status, y, s, type });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    store.setState({ status });
  }
};