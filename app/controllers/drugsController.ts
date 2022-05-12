import { db } from '~/lib/db.server';



export const getAllDrugs = async () => {
    const data = await db.product.findMany({
        orderBy: { id: 'desc' }
        
    });
    
    return data;
}