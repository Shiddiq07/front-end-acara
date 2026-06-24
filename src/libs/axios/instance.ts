import environment from "@/config/environment";
import axios from "axios";
import { getSession } from 'next-auth/react';
import { Session } from "next-auth";
import { SessionExtended } from "@/types/Auth";

const headers={
    'Content-Type': 'application/json'
}

const instance =axios.create({
    baseURL:environment.API_URL,
    headers,
    timeout:60 * 10000,
})

instance.interceptors.request.use(
async(request)=>{
    const session : SessionExtended | null= await getSession()
    if(session && session.accessToken){
        request.headers.Authorization= `Berarer ${session.accessToken}`;
    }
    return request;
},
(error)=>Promise.reject(error),
)

instance.interceptors.response.use(
    (response)=>response,
    (error)=>Promise.reject(error)
)

export default instance