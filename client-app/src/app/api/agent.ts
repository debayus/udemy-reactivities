import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const spleep = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(async response => {
    await spleep(1000);
    return response;
}, (error : AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status){
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if (data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            toast.error('bad request');
            break;
        case 401:
            toast.error('unathorised');
            break;
        case 403:
            toast.error('forbiden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const requests ={
    get:<T>(url: string) => axios.get<T>(url).then(responseBody),
    post:<T>(url: string, body : {}) => axios.post<T>(url, body).then(responseBody),
    put:<T>(url: string, body : {}) => axios.put<T>(url, body).then(responseBody),
    del:<T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list : () => requests.get<Activity[]>('/activities'),
    details : (id : string) => requests.get<Activity>(`/activities/${id}`),
    create : (activity : Activity) => requests.post<void>('/activities', activity),
    update : (activity : Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete : (id : string) => requests.del<void>(`/activities/${id}`),
}

const Account = {
    current: () => requests.get<User>('account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

// const Profiles = {
//     get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
//     uploadPhoto: (file: any) => {
//         let formData = new FormData();
//         formData.append('File', file);
//         return axios.post<Photo>('photos', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         })
//     },
//     setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
//     deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
//     updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
//     updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
//     listFollowings: (username: string, predicate: string) => requests
//         .get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
//     listActivities: (username: string, predicate: string) =>
//         requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
// }

const agent = {
    Activities,
    Account,
    // Profiles
}

export default agent;