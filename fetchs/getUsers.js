import { factoryRequest } from "./../modules/requestGenerator.js";

const FETCH_USER_URL = "datas.json";

export const getUsers = async () => {
  const fetchUser = factoryRequest();
  let users = null;
  await fetch(FETCH_USER_URL)
    .then((response) => response.json())
    .then((json) => {
      if (!Array.isArray(json)) {
        throw new Error("Data is not an array");
      }
      fetchUser.data = json;
      fetchUser.isSuccess = true;
    })
    .catch((error) => {
      console.log(error);
      fetchUser.isError = true;
      fetchUser.error = error;
    })
    .finally(() => {
      fetchUser.hasFetched = true;
      fetchUser.isLoading = false;
      users = fetchUser;
    });
  return users;
};
