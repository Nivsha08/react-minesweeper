import React from 'react';
import styles from './App.module.scss';
import {GameWrapper} from "./components/game-wrapper/game-wrapper";

function App() {
    return (
        <div className={styles.App}>
            <h1 className={styles.header}>React Minesweeper</h1>
            <GameWrapper />
        </div>
    );
}

export default App;
