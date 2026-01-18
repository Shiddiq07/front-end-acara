import { useState } from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";


const registerSchema=yup.object().shape({
    fullName:yup.string().required("full name is required"),
    username:yup.string().required("userName is required"),
    email:yup
    .string()
    .email("must be a valid email")
    .required("please enter your email"),
    password:yup.string().min(8,"password must be at least 8 characters").required("password is required"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),""],"password not match").required("password Conformation is required")
})

const useRegister =()=>{
    const router=useRouter();
const [VisiblePassword, setVisiblePassword] = useState({
    password:false,
    confirmPassword:false
})
const handleVisiblePassword=(
    key:"password" | "confirmPassword"
) =>{
    setVisiblePassword({
        ...VisiblePassword,
        [key]:!VisiblePassword[key],
    })
}

const {control,handleSubmit,formState:{errors},reset,setError,}=useForm({
    resolver:yupResolver(registerSchema),
})

const registerService=async(payload:IRegister)=>{
    const result=await authServices.register(payload);
    return result;
}

const {mutate:mutateRegister,isPending:isPendingRegister}=useMutation({
    mutationFn:registerService,
    onError:(error:any)=>{
        setError("root",{
            message:error.message
        })
    },
    onSuccess:()=>{
  router.push("/auth/register/success");
  reset();

    }
})
const handleRegister=(data:IRegister)=>mutateRegister(data);

return {
    VisiblePassword,
    handleVisiblePassword,
    control,
    isPendingRegister,
    handleSubmit,
    handleRegister,
    errors,

}
 }
 export default useRegister