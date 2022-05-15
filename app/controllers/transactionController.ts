import { Prisma } from "@prisma/client"
import { db } from "~/lib/db.server"



type saleInfoType =  {
    productId: string
    quantity: number
    price: string 
}

export const createTransaction = async (params: saleInfoType[]) => {
    
    const convertTotalToDecimal = (quantity: number , price:string):number => { return ((quantity * parseInt(price)))}
    const saleInfo = params.map(({ productId, quantity, price }) => ({ productId: productId, quantity: quantity, total:convertTotalToDecimal(quantity, price)  }));
   const data =  await db.transaction.create({
        data: {
            products: {
               create: saleInfo
            }
        }
   });
    
    //update the quantities of the products 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decreaseSaleProductQuantities = await Promise.all(params.map(async (el) => {
        return await db.product.update({
            where: { id: el.productId },
            data: {
                quantity: {
                    decrement: el.quantity
                }
            }
        });
        })
    )
        
       
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