import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRouters} from "../router/router";

const AppRouter: FC = () => {
    return (
        <Routes>
            {publicRouters.map(route =>
                <Route key={route.path} path={route.path} element={<route.element/>}/>
            )}
            <Route path='*' element={<Navigate to='/' replace/>} />
        </Routes>
    );
};

export default AppRouter;