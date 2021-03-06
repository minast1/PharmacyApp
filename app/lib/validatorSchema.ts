import { z } from 'zod';
import { withZod } from "@remix-validated-form/with-zod";


export const loginValidator = withZod(
  z.object({
    email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
    password: z.string().nonempty(" * This field is required")
  })
)

const roles= ["ADMIN", "ATTENDANT"] as const; 
export const registerValidatior = withZod(
  z.object({
    name: z.string().nonempty("* This field is required"),
    email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
    password: z.string().nonempty(" * This field is required"),
    confirm: z.string().nonempty("Please confirm the password"),
    role: z.enum(roles),
     mobile: z.string().nonempty("* This field is required")
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match", 
    path: ["confirm"]
  })
  
)

export const drugValidator = withZod(
  z.object({
    name: z.string().nonempty("* This field is required"),
    manufacturer: z.string().nonempty("* This field is required"),
    batch_no: z.string().nonempty("* This field is required"),
    price: z.string().nonempty("* This field is required"),
       quantity: z.string({required_error: "* This field is required"}).refine((val) => !Number.isNaN(parseInt(val, 10)), {
    //message: "Expected number, received a string"
  })
  })
)

export const profileValidator = withZod(
  z.object({
     name: z.string().nonempty("* This field is required"),
    email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
     mobile: z.string().nonempty("* This field is required")
  })
)
 const courts = ["HIGH_COURT", "SUPREME_COURT", "NOTASSIGNED"] as const
export const criminalValidator = withZod(
  z.object({
    name: z.string().nonempty("* Criminal Name is required"),
    email: z.string().nonempty("* Criminal Email is required").email({ message: "Please enter a valid email address" }),
    phone: z.string().nonempty("* Criminal PhoneNumber is required"),
    weight: z.string().nonempty("* Criminal Weight is required"),
    height: z.string().nonempty("* Criminal Height is required"),
    policeId: z.string().min(1, "* Please assign a person to the case"),
    crimes: z.union([z.array(z.string()).nonempty(), z.string().nonempty(' * Please select at least one crime')]), //z.string().min(1, ),
    dob: z.string().optional(),
    statement: z.string().optional(),
    court: z.enum(courts)
     
  }));

  export const sessions = ["MORNING", "AFTERNOON", "EVENING"] as const;
export const bookingValidator = withZod(
  z.object({
    session: z.enum(sessions),
    start_city: z.string({ required_error: '* This field is required' }).nonempty('* This field is required' ),
    destination: z.string({ required_error: '* This field is required' }).nonempty('* This field is required' )
    })
  )
 
