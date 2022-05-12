import { db } from '~/lib/db.server';
import type { Product } from '@prisma/client';


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