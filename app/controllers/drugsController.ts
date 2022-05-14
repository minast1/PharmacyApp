import { db } from '~/lib/db.server';
import type { Product } from '@prisma/client';
import { addMonths, subMonths } from 'date-fns';


export const getAllDrugs = async () => {
    const data = await db.product.findMany({
        orderBy: { id: 'desc' }
        
    });
    
    return data;
};

type createData = Omit<Product, "id"|"transactions">
export const addNewDrug = async (formData: createData) => {
    const data = await db.product.create({
        data: formData
    });
    return data; 
}

export const deleteDrug = async (Id: string) => {
    const data = await db.product.delete({
        where: { id: Id }
    });
    return data; 
}

export const findDrugById = async (Id: string) => {
    const data = await db.product.findFirst({
        where: { id: Id }
    });
    return data;
}

export const almostFinished =async () => {
    const data = await db.product.findMany({
        where: {
            quantity: {
                lte: 10
            }
        }
    });
    return data;
}

export const outOfStock = async () => {
    const data = await db.product.findMany({
        where: {
            quantity: {
                equals: 0
            }
        }
    });
    return data; 
}

export const expiring = async () => {
    const threeMonthsFromNow = subMonths(new Date(), 3);
    console.log(threeMonthsFromNow)
    const data = await db.product.findMany({
        where: {
            expiry_date: {
                gte:threeMonthsFromNow,
                lte: addMonths(new Date(), 3)
                
            },
        
        }
    });

    return data;
}