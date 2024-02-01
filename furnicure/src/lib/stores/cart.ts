import { writable, get, derived } from "svelte/store";

export const items = writable([]);

export const total = derived(items, $items => $items.reduce((total, item) => total + item.price * item.qiantity, 0));

export const clear = items.set([]);

// type item = {
//     name: string,
//     id: number,
//     price: number,
//     img: string,
//     quantity: number,
// }
// function cartStore() {
//     const { subscribe, set, update } = writable<item[]>([]);

//     return {
//         subscribe,
//         add: (item: item) => update((items) => [...items, item]),
//         remove: (id: number) => update((items) => items.filter((item) => item.id !== id)),
//         clear: () => set([]),
//         get count() {
//             const items = get(this);
//             return items.length;
//         },
//         get total() {
//             const items = get(this);
//             return items.reduce((total, item) => total + item.price * item.quantity, 0);
//         }
//     }

// }
// export const cart = cartStore();

// const createStore = () => {
//     const { update, subscribe } = writable([]);

//     return {
//         subscribe,
//         count: () => this.count(),
//         add: (name: string, id: number, price: number, img: string) => update(val => {
//             val.push({
//                 name: name,
//                 id: id,
//                 price: price,
//                 img: img,
//             });
//         })
//     }

// }

// export const cart = createStore();