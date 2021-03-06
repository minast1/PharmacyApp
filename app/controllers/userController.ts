import type {  User } from '@prisma/client';
import bcrypt from 'bcrypt'
import { db } from '~/lib/db.server';
//import { getSession } from '~/lib/session.server';

type Credentials = {
    email: string
    password: string
}


export const loginUser = async (credentials: Credentials) => {
    
    const user = await db.user.findFirst({
        where: { email: credentials.email }
    });

    if (!user) {
        throw new Error("Invalid Credentials")
    }
    const crosscheckPassword = await bcrypt.compareSync(credentials.password, user.password);

    if (crosscheckPassword) {
        const { password, ...rest } = user;
        return rest
    } else {
        throw new Error("Password is Invalid")
    }
};

const getUserWithEmail =async (email:string) => {
     const user = await db.user.findFirst({
        where: { email: email }
     });
    return user
}

type UserFormData =  Omit<User, "id">
export const registerNewUser =async (formData: UserFormData) => {
       const emailExists = await getUserWithEmail(formData.email)
    if (emailExists) {
        throw new Error("This email already exists")
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(formData.password, salt);
    const newUser  = await db.user.create({
        data: {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            role: formData.role, 
            password: hash,
           

        }, 
        select: {
            id: true,
            email: true,
            name: true,
            mobile: true ,
            role:true 
        }
    });
    
    return newUser
}

type updateType = {
    Id: string
    name: string
    email: string,
    mobile: string 
}
export const updateUser = async (formData: updateType) => {
    const { Id, name, email, mobile } = formData; 
    const user = await db.user.update({
        where: {
            id: Id
        },
        data: {
            email: email,
            name: name,
            mobile: mobile
        }
    });
    return user;
}

