import { Method } from 'axios';
import { BasicResponseModel } from '@/api/system/user';
import { http } from './axios/index'
export async function Request<T>(
    method: Method, url: string, params?: any): Promise<BasicResponseModel<T>> {
    return http.request<BasicResponseModel<T>>(
        {
            url: url,
            method: method,
            params: params
        },
        {
            isTransformResponse: true,
        });
}