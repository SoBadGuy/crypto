import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {RouteNames} from "../router/router";
import {IoMenu} from "react-icons/io5";
import {IoMdClose} from "react-icons/io";

const Navbar = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false)
    const switchMenu = () => setIsOpenBurgerMenu(!isOpenBurgerMenu)
    return (
        <header className="header"> 
            <div className="container">
                <div className="header__box">
                    <div className="header__logo">
                        CryptoTracking
                    </div>
                    <div className={isOpenBurgerMenu ? "navbar__box navbar__box_mini" : "navbar__box"}>
                        <IoMdClose  size="40px" className="header__close-burgerMenu" onClick={switchMenu}/>
                        <nav className="navbar">
                            <ul className="navbar__list">
                                <li className="navbar__item">
                                    <Link
                                        onClick={switchMenu}
                                        className={currentLocation === RouteNames.MAIN ? "navbar__link navbar__link_active" : "navbar__link"}
                                        to={RouteNames.MAIN}
                                    >
                                        Главная
                                    </Link>
                                </li>
                                <li className="navbar__item">
                                    <Link
                                        onClick={switchMenu}
                                        className={currentLocation === RouteNames.DENSITY ? "navbar__link navbar__link_active" : "navbar__link"}
                                        to={RouteNames.DENSITY}
                                    >
                                        Плотности
                                    </Link>
                                </li>
                                <li className="navbar__item">
                                    <Link
                                        onClick={switchMenu}
                                        className={currentLocation === RouteNames.DOCUMENTATION ? "navbar__link navbar__link_active" : "navbar__link"}
                                        to={RouteNames.DOCUMENTATION}
                                    >
                                        Документация
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__group-buttons">
                            <Link to={RouteNames.REGISTRATION}  className="header__btn header__btn_reg" onClick={switchMenu}>Регистрация</Link>
                            <Link to={RouteNames.LOGIN} className="header__btn header__btn_auth" onClick={switchMenu}>Вход</Link>
                        </div>
                    </div>
                    <IoMenu size="30px" className="burger-menu" onClick={switchMenu}/>
                </div>
            </div>
        </header>
    );
};

export default Navbar;