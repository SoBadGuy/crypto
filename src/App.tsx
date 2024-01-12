import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "./store/hooks";
import {fetchTradingPairs} from "./store/feauters/AddTradingPairSlice";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

const App: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTradingPairs())
    }, []);

  return (
    <div className="App">
        <div className='wrapper'>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
