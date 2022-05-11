import { faker } from '@faker-js/faker';
import type { Decimal } from '@prisma/client/runtime';
import { db } from '~/lib/db.server';


const drugs:string[] = ['Cephalexin','Ciprofloxacin','Citalopram','Clindamycin','Clonazepam','Cyclobenzaprine','Cymbalta',
'Doxycycline','Dupixent','Entresto','Entyvio','Farxiga','Fentanyl','Fentanyl Patch','Gabapentin','Gilenya','Humira',
'Hydrochlorothiazide','Hydroxychloroquine','Ibuprofen','Imbruvica','Invokana','Januvia','Jardiance','Kevzara','Lexapro','Lisinopril',
'Lofexidine','Loratadine','Lyrica','Melatonin','Meloxicam','Metformin','Methadone','Methotrexate','Metoprolol','Naloxone',
'Naltrexone','Naproxen','Omeprazole','Onpattro','Otezla','Ozempic','Pantoprazole','Prednisone','Probuphine','Rybelsus',
'secukinumab','Sublocade','Tramadol','Trazodone','Viagra','Wellbutrin','Xanax','Zubsolv'


]
const product = Array.from({ length: 50 }, (el) => ({
    name: faker.helpers.arrayElement(drugs),
    manufacturer: faker.company.companyName(),
    batch_no: faker.random.alphaNumeric(9).toLocaleUpperCase(),
    production_date : faker.date.past(),
    expiry_date: faker.date.future(2),
    quantity: Math.floor(Math.random() * 101),
    price: faker.commerce.price(10,999,2)
}))

async function seed() {
    await db.product.createMany({
       data: product
   })

}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
})