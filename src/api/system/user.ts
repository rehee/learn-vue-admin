import { http } from '@/utils/http/axios';
import { DateItem } from 'naive-ui/lib/calendar/src/interface';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}
export interface UserTokenDTO {
  tokenString: string;
  expireUCTTime: DateItem;
  userId: string;
  userName: string;
  avatar: string;
  permissions: string[];
  roles: [];
  expireSecond: number;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/admin_info',
    method: 'get',
  });
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel<UserTokenDTO>>(
    {
      url: '/Api/Token/Login',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: true,
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params,
  });
}
