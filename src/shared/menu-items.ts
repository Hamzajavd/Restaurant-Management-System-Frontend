import { inject, Injectable } from "@angular/core";

export interface Menu{
    state: string,
    name:string,
    icon:string,
    role:string
}

const MENUITEMS = [
    {state: 'dashboard', name:'Dashboard', icon:'fa-solid fa-gauge', role:''},
    {state: 'category', name:'Manage Category', icon:'fa-solid fa-list', role:'admin'},
    {state: 'product', name:'Manage Products', icon:'fa-solid fa-bars-progress', role:'admin'},
    {state: 'order', name:'Manage order', icon:'fa-brands fa-first-order-alt', role:'admin'},
     {state: 'bill', name:'Veiw Bill', icon:'fa-solid fa-money-bills', role:''},
     {state: 'user', name:'Veiw User', icon:'fa-solid fa-user', role:'admin'},
];


@Injectable()
export class MenuItems{
    getMenuItems(): Menu[]{
        return MENUITEMS;
    }
}