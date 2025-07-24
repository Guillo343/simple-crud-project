import type  { Item } from "../types/item";

let items : Item[] = [
    {id: 1, title: 'First Task', description: 'Do the thing'},
    {id: 2, title: 'Second Task', description: 'Do the other thing'}
];

let idCounter = items.length + 1;

export const itemService = {
    getAll: (): Promise<Item[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...items]), 500);
        });
    },

    create: (item: Omit<Item, 'id'>): Promise<Item> => {
        return new Promise((resolve) => {
            const newItem: Item = { id:idCounter++, ...item};
            items.push(newItem);
            setTimeout(() => resolve(newItem), 500);
        });
    },

    update: (id: number, updateItem: Omit<Item, 'id'>): Promise<Item | null> => {
        return new Promise((resolve) => {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) return resolve(null);
            items[index] = {id, ...updateItem} ;
            setTimeout(() => resolve(items[index]), 500);
        });
    }, 

    delete: (id: number): Promise<boolean> => {
        return new Promise((resolve) => {
            const initialLength = items.length;
            items = items.filter((item) => item.id !== id);
            setTimeout(() => resolve(items.length < initialLength), 500)
        });
    }
};