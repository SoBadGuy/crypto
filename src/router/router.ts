import Home from "../page/Home";
import Density from "../page/Density";
import Registration from "../page/Registration";
import Login from "../page/Login";
import Documentation from "../page/Documentation";
import {ComponentType} from "react";

export interface IRoute {
    path: string,
    element: ComponentType;
}
export enum RouteNames {
    LOGIN = '/login',
    MAIN = '/',
    DENSITY = '/density',
    REGISTRATION = '/registration',
    DOCUMENTATION = '/documentation'
}
export const publicRouters: IRoute[] = [
    { path: RouteNames.MAIN, element: Home},
    { path: RouteNames.DENSITY, element: Density},
    { path: RouteNames.LOGIN, element: Login},
    { path: RouteNames.REGISTRATION, element: Registration},
    { path: RouteNames.DOCUMENTATION, element: Documentation},
]

export const privateRouter: IRoute[] = []