// this file is used to make http requests

import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken,getType } from './common-services.js';


const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:20000,//delay of 10sec
    headers:{
        "content-type":"application/json"
    }
});
axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE?.params) {
            config.params = config.TYPE.params;
        } else if(config.TYPE?.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
)

// if success : return {isSuccess: true, data: Object}
// if fail : return {isFailure: true, data: Object,status: string,msg: string , code:int}

const processResponse = (response) => {
    if(response?.status === 200) {
        return {isSuccess:true,data: response.data};
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}
const processError = (error) => {
    if(error?.response) {
        // request is made but server responded with status other than the range of 2.x.x
        console.log("ERROR IN RESPONSE:",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    } else if(error.request) { 
        // request is made but no response is received | that means connectivity issue
        console.log("ERROR IN REQUEST:",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:"503"
        }
    } else {
        //proper frontend mistake
        // something happened in setting up request that triggers error 
        console.log("ERROR IN NETWORK:",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}
                        
const API={};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => (
        axiosInstance({
            method: value.method,
            url: value.url,
            data: (value.method === 'DELETE' ? {} : body),
            responseType: value.responseType,
            headers: {
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress: (progressEvent) => {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: (progressEvent) => {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    )
}
export { API };