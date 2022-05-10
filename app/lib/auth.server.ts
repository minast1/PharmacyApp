import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/lib/session.server";
import { FormStrategy } from "remix-auth-form";
import { loginUser, registerNewUser } from "~/controllers/userController";
import type { Role, User } from "@prisma/client";


export const  authenticator = new Authenticator<Omit<User , "password">>(sessionStorage,
    { throwOnError: true });
    

authenticator.use(
    new FormStrategy(async ({ form }) => {   
        let email = form.get("email") as string;
        let password = form.get("password")as string;
        let name = form.get("name")as string;
        let mobile = form.get("mobile") as string
        let role = form.get("role") as Role
        
        const user = name ?
            await registerNewUser({ email, password, name, mobile , role}) : 
            await loginUser({email, password})
        return user
    }),
    "user"
);





