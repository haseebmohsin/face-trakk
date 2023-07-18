import axios from 'axios';
import Router from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const makeRequest = async ({ method = 'GET', path, params, data }) => {
  const url = `${baseUrl}/${path}`;

  const headers = {};

  const options = {
    method,
    url,
    headers,
    params, // Pass the params for GET requests
    data,
  };

  if (method === 'POST' && !data) {
    return Promise.reject({ status: 400, error: 'Data is missing' });
  }

  if (method === 'PUT' && !data) {
    return Promise.reject({ status: 400, error: 'Data is missing' });
  }

  if (method === 'DELETE' && data) {
    return Promise.reject({ status: 400, error: 'Data should not be sent for DELETE requests' });
  }

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    const { status, data } = error?.response;

    if (status === 404 || status === 500) {
      Router.push({
        pathname: '/errorPage',
        query: { status },
      });
    }

    return Promise.reject({ status, message: data?.error?.message });
  }
};

export default makeRequest;
