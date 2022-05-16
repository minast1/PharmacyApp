import type  { Prisma } from "@prisma/client"
import { db } from "~/lib/db.server"



type saleInfoType =  {
    productId: string
    quantity: number
    price: string 
}

export const createTransaction = async (params: saleInfoType[]) => {
    
    const Total = (quantity: number , price:string):number =>  ((quantity * Number(price)))
    const saleInfo = params.map(({ productId, quantity, price }) => ({ productId: productId, quantity: quantity, total:Total(quantity, price)  }));
   const data =  await db.transaction.create({
        data: {
            products: {
               create: saleInfo
            }
        }
   });
    
     //update the quantities of the products 
    for (const item of params) {
         
           await db.product.update({
            where: { id: item.productId },
            data: {
                quantity: {
                    decrement: item.quantity
                }
            }
        });
     }
       
    return data;
}

 
export type transactionType = Prisma.PromiseReturnType<typeof getLatestTransactionDetails>
export const getLatestTransactionDetails = async () => {
 
     const trans =  await db.transaction.findMany({
        orderBy: { id: 'desc' },
        take: 1
     });
    
    const transId = trans[0].id
    
    
    const data = await db.productTransactions.findMany({
        where: {
            transactionId :  transId
        },
        include: {
            product : true
        }
    
    })
    return data 
}