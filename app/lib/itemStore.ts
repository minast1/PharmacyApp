import create from 'zustand'


export type Item = {
    productId: string
    quantity: number
    price: string 
}
export type storeState = {
    items: Item[] 
    addItem: (item: Item) => void
    resetItems: () => void
    removeItem: (item:string) => void 
}

export const useStore=  create<storeState>((set, get) => ({
   
    items: [],
    addItem: (item) => set(state => ({ items: [...state.items, item] })),
    removeItem: (item) => set(state => ({items: [...state.items].filter(el => el.productId!== item)})),
    resetItems: () => set(state => ({items: []}))

})) 