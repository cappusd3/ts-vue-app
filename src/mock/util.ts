const responseBody = {
  message: '',
  timestamp: 0,
  data: null,
  code: 0,
  headers: {},
  status: 0
}

export const builder = (data: any, message: string = '', status: number = 0, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (status !== undefined && status !== 0) {
    responseBody.code = status
    responseBody.status = status
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody.headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const getQueryParameters = (options: any) => {
  const { url } = options;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  // type=1&hell0=1 => type=1","hell0=1 => type":"1","hell0":"1
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options: any) => {
  return options.body && JSON.parse(options.body)
}


