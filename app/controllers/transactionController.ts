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