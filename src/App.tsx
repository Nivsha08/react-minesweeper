import React from 'react';
import {Provider} from 'react-redux';
import styles from './App.module.scss';
import {store} from "./store/slice";
import {GameWrapper} from "./components/game-wrapper/game-wrapper";

function App() {
    return (
        <Provider store={store}>
            <div className={styles.App}>
                <h1 className={styles.header}>React Minesweeper</h1>
                <GameWrapper/>
            </div>
        </Provider>
    );
}

export default App;
