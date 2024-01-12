import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {RouteNames} from "../router/router";
import {IoMenu} from "react-icons/io5";
import {MdOutlineRestaurantMenu} from "react-icons/md";

const Navbar = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false)
    return (
        <header className="header">
            <div className="container">
                <div className="header__box">
                    <div className="header__logo">
                        CryptoTracking
                    </div>
                    <div className={isOpenBurgerMenu ? 'navbar__box navbar__box_mini' : 'navbar__box'}>
                        <MdOutlineRestaurantMenu className="header__close-burgerMenu" onClick={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)}/>
                        <nav className="navbar">
                            <ul className="navbar__list">
                                <li className="navbar__item">
                                    <Link
                                        className={currentLocation === RouteNames.MAIN ? 'navbar__link navbar__link_active' : 'navbar__link'}
                                        to={RouteNames.MAIN}
                                    >
                                        Главная
                                    </Link>
                                </li>
                                <li className="navbar__item">
                                    <Link
                                        className={currentLocation === RouteNames.DENSITY ? 'navbar__link navbar__link_active' : 'navbar__link'}
                                        to={RouteNames.DENSITY}
                                    >
                                        Плотности
                                    </Link>
                                </li>
                                <li className="navbar__item">
                                    <Link
                                        className={currentLocation === RouteNames.DOCUMENTATION ? 'navbar__link navbar__link_active' : 'navbar__link'}
                                        to={RouteNames.DOCUMENTATION}
                                    >
                                        Документация
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__group-buttons">
                            <Link to={RouteNames.REGISTRATION} className="header__btn header__btn_reg">Регистрация</Link>
                            <Link to={RouteNames.LOGIN} className="header__btn header__btn_auth">Вход</Link>
                        </div>
                    </div>
                    <IoMenu className="burger-menu" onClick={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)}/>
                </div>
            </div>
        </header>
    );
};

export default Navbar;