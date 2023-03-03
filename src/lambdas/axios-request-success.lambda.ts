

export const axiosRequestErrorLambda = (error: any) => {
  return Promise.reject(error);
}