import 'whatwg-fetch';

export const BASE_URL = '';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getDynamicHeaders = option => (
  {}
);

const buildHeaders = (headers, option) => (
  Object.assign({}, DEFAULT_HEADERS, headers, getDynamicHeaders(option))
);

const request = (qurl, config) => {
  const url = qurl[0] !== '/' ? `/${qurl}` : qurl;
  return fetch(`${BASE_URL}${url}`, config)
    .then(response => response.json())
    .then((json) => {
      if (json.success) {
        return json.result;
      }
      return Promise.reject(json);
    });
};

const buildQueries = (queries) => {
  let hasQuery = false;
  const queriesArray = [];
  /* eslint-disable */
  for (const key in queries) {
  /* eslint-enable */
    if (key && queries[key]) {
      hasQuery = true;
      const value = encodeURIComponent(queries[key]);
      queriesArray.push(`${key}=${value}`);
    }
  }

  if (hasQuery) {
    return `?${queriesArray.join('&')}`;
  }
  return '';
};

export const get = (url, queries) => (headers, option) => {
  const config = {
    method: 'GET',
    headers: buildHeaders(headers, option)
  };

  return request(`${url}${buildQueries(queries)}`, config);
};

export const post = (url, body, queries) => (headers, withoutTokenId) => {
  const config = {
    method: 'POST',
    headers: buildHeaders(headers, withoutTokenId),
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };

  return request(`${url}${buildQueries(queries)}`, config);
};

export const put = (url, body, queries) => (headers, withoutTokenId) => {
  const config = {
    method: 'PUT',
    headers: buildHeaders(headers, withoutTokenId),
    body: body ? JSON.stringify(body) : ''
  };

  return request(`${url}${buildQueries(queries)}`, config);
};

export const del = (url, body, queries) => (headers, withoutTokenId) => {
  const config = {
    method: 'DELETE',
    headers: buildHeaders(headers, withoutTokenId),
    body: body ? JSON.stringify(body) : ''
  };

  return request(`${url}${buildQueries(queries)}`, config);
};
