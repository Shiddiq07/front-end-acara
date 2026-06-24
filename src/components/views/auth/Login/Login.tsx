import { Button, Card, CardBody, cn, Input, Link, Spinner } from "@nextui-org/react";
import Image from "next/image";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash} from "react-icons/fa6";
import { Controller } from "react-hook-form";

const Login = ()=>{
    const {isVisible,toggleVisibility,control,handleSubmit,handleLogin,isPendingLogin,errors}= useLogin();
   console.log(errors)
    return(
        <div className="flex w-full flex-col lg:flex-row justify-center items-center h-screen gap-10 lg:gap-20">
          <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
            <Image 
            src="/images/general/logo.svg"
            alt="logo"
            width={180}
            height={180}
            />

             <Image 
            src="/images/illustration/login.svg"
            alt="logo"
            className="w-2/3 lg:w-full"
            width={1024}
            height={1024}
            />
                
          </div>
          <div>
            <Card>
                <CardBody className=" p-8">
                    <h2 className="text-xl font-bold text-danger">
                       Login
                    </h2>

                    <p className="mb-4 mt-2 text-small">Don{"'"}t Have an account?&nbsp;
                        <Link href="/auth/register" className="font-semibold text-danger-400">Register Here</Link>
                    </p>
{errors.root && (
    <p className="mb-2 font-medium text-danger">
        {errors?.root?.message}
    </p>
)}

                    <form className={cn("flex w-80 flex-col",Object.keys(errors).length > 0 ? "gap-2" :"gap=4" )} onSubmit={handleSubmit(handleLogin)}>
                      
                         <Controller 
                        name="identifier"
                        control={control}
                        render={({field})=>(

                        <Input 
                        {...field}
                        type="text" label="Name or User Name"  variant="bordered" autoComplete="off"
                             isInvalid={errors.identifier !==undefined}
                         errorMessage={errors.identifier?.message}
                        />
                             )}
    />



                       
                        <Controller 
                        name="password"
                        control={control}
                        render={({field})=>(

                        <Input 
                        {...field}
                         type={isVisible ? "text": "password"} label="Password"  variant="bordered" endContent={<button className="focus:outline-none" onClick={toggleVisibility}type="button"
                         
                         >

{isVisible ?(<FaEye className="pointer-events-none text-xl text-default-400" /> )
: (<FaEyeSlash  className="pointer-events-none text-xl text-default-400" />)}
  
  
    </button>} autoComplete="off"   
       isInvalid={errors.password !==undefined}
                         errorMessage={errors.password?.message} />
         )}
    />
       




                
    <Button color="danger" size="lg" type="submit">
{isPendingLogin ? 
    (<Spinner color="white" size="sm" />) : "Login"
}
        
    </Button>
                    </form>
                </CardBody>
            </Card>
          </div>
            </div>
    )
}
export default Login