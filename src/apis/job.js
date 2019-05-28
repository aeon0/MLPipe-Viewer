import { CONFIG } from 'config';
import * as authUtil from 'utils/auth.util';
import * as middleware from './middleware';


class JobApi {
    static getList = async (filters={}) => {
        try {
            const token = "Bearer " + authUtil.getToken();
            const res = await fetch(CONFIG.apiUrl  + 'jobs',{
                method: "GET",
                headers: new Headers({
                    'Authorization': token,
                })
            });
            await middleware.apply(res);
            return {
                status: res.status,
                json: res.jsonData,
            };
        } catch(error) {
            return {
                status: -1,
                json: error,
            }
        }
    }

    static get = async (_id) => {
        try {
            const token = "Bearer " + authUtil.getToken();
            let url = CONFIG.apiUrl  + 'job/' + _id;
            const res = await fetch(url ,{
                method: "GET",
                headers: new Headers({
                    'Authorization': token,
                })
            });
            await middleware.apply(res);
            return {
                status: res.status,
                json: res.jsonData,
            };
        } catch(error) {
            return {
                status: -1,
                json: error,
            }
        }
    }

    static getJobToken = async (_id) => {
        try {
            const token = "Bearer " + authUtil.getToken();
            let url = CONFIG.apiUrl  + 'job/' + _id + "/token";
            const res = await fetch(url ,{
                method: "GET",
                headers: new Headers({
                    'Authorization': token,
                })
            });
            await middleware.apply(res);
            return {
                status: res.status,
                json: res.jsonData,
            };
        } catch(error) {
            return {
                status: -1,
                json: error,
            }
        }
    }

    static create = async(type, data) => {
        try {
            // type can be any of: ["local", "aws"]
            const token = "Bearer " + authUtil.getToken();
            const jsonData = JSON.stringify(data);
            const res = await fetch(CONFIG.apiUrl  + 'job/' + type, {
                method: "POST",
                body: jsonData,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': token,
                })
            });
            await middleware.apply(res);
            return {
                status: res.status,
                json: res.jsonData,
            };
        } catch(error) {
            return {
                status: -1,
                json: error,
            }
        }
    }

    static delete = async(jobId) => {
        try {
            const token = "Bearer " + authUtil.getToken();
            const res = await fetch(CONFIG.apiUrl  + 'job/' + jobId, {
                method: "DELETE",
                headers: new Headers({
                    'Authorization': token,
                })
            });
            await middleware.apply(res);
            return {
                status: res.status,
                json: res.jsonData,
            };
        } catch(error) {
            return {
                status: -1,
                json: error,
            }
        }
    }
}

export default JobApi;