import { useState } from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";


const loginSchema=yup.object().shape({
    identifier:yup.string().required("please input your email or username"),
    password:yup.string().required("password is required"),
})

const useLogin =()=> {
    const router=useRouter();
    const [isVisible,setIsVisible]=useState(false);
    const toggleVisibility=()=>{
        setIsVisible(!isVisible);
    }

    const callbackUrl:string=(router.query.callbackUrl as string) || "/";



 

const {control,handleSubmit,formState:{errors},reset,setError,}=useForm({
    resolver:yupResolver(loginSchema),
})

const LoginService=async(payload:ILogin)=>{
    const result=await signIn("credentials",{
        ...payload,
        redirect:false,
        callbackUrl
    })
   if(result?.error&& result?.status=== 401){
    throw new Error("Email or username not match with your password");
   }
}

const {mutate:mutateLogin,isPending:isPendingLogin}=useMutation({
    mutationFn:LoginService,
    onError:(error:Error)=>{
        setError("root",{
            message:error.message
        })
        console.log(error);
    },
    onSuccess:()=>{
  router.push(callbackUrl);
  reset();

    }
})
const handleLogin=(data:ILogin)=>mutateLogin(data);

return {
    isVisible,
    toggleVisibility,
    control,
    isPendingLogin,
    handleSubmit,
    handleLogin,
    errors,

}
 }
 export default useLogin