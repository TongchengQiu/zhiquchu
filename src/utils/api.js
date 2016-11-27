import 'whatwg-fetch';
import { message } from 'antd';

export const BASE_URL = '/operapp';

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

const buildResult = (data) => {
  const newData = Object.assign(data || {});
  delete newData.retcode;
  delete newData.retmsg;
  const result = {};
  if (!newData.data && !newData.page) {
    result.data = {
      ...newData
    };
  } else {
    result.data = {
      ...newData.data
    };
    if (newData.data && newData.data.page) {
      result.page = {
        count: newData.data.page.count,
        hasNext: newData.data.page.has_next,
        hasPrevious: newData.data.page.has_previous,
        pageSize: newData.data.page.page_size,
        pageNumber: newData.data.page.page_number,
      };
      result.data = newData.data.data;
    }
  }
  return result;
};

const request = (qurl, config) => {
  const url = qurl[0] !== '/' ? `/${qurl}` : qurl;
  const newConf = config;
  newConf.credentials = 'include';
  return fetch(`${BASE_URL}${url}`, newConf)
    .then(response => response.json())
    .then((json) => {
      if (+json.retcode === 0) {
        return buildResult(json);
      }
      message.error(json.retmsg || '出现错误！');
      return Promise.reject({
        ...json,
        error: json.retmsg
      });
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
