import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/lib/session.server";
import { FormStrategy } from "remix-auth-form";
import { loginUser, registerNewUser } from "~/controllers/userController";
import type { User } from "@prisma/client";



export const  authenticator = new Authenticator<Omit<User, "password"|"createdAt">>(sessionStorage,
    { throwOnError: true });
    

authenticator.use(
    new FormStrategy(async ({ form }) => {   
        let email = form.get("email") as string;
        let password = form.get("password")as string;
        let name = form.get("name")as string;
        let mobile = form.get("mobile")as string
        
        const user = name ?
            await registerNewUser({ email, password, name, mobile }) : 
            await loginUser({email, password})
        return user
    }),
    "user"
);



