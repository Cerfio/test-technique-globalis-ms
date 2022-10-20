export const factoryRequest = () => {
  const objectRequest = {
    data: [],
    hasFetched: false,
    isSuccess: false,
    isError: false,
    isLoading: true,
    error: null,
  };
  return objectRequest;
};
