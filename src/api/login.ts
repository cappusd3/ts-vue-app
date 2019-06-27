import service from '@/utils/request';

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter: any) {
  return service({
    url: '/auth/login',
    method: 'post',
    data: parameter,
  })
}

export function logout() {
  return service({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
