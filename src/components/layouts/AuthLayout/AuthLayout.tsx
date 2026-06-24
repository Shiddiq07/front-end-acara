import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes{
     children?:ReactNode
    title?:string;
   
}
const AuthLayout= (props:PropTypes)=>{
    const {children,title}=props;
    return(
        <div>
        <PageHead title={title} />

        <section className="max-w-screen-3xl 3xl:container p-6">
            {children}
        </section>
        </div>
    )
}
export default AuthLayout