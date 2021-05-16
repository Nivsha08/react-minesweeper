import React from 'react';
import styles from './game-grid.module.scss';
import {GridCell} from "../grid-cell/grid-cell";
import {useGameConfiguration, useGameGrid} from "../../hooks/game-state";
import {initGridStyle} from "../../hooks/game-creator";

export const GameGrid = () => {
    const {rows, columns} = useGameConfiguration();
    const gameGrid = useGameGrid();
    const gridStyle = initGridStyle(rows, columns);

    return <div className={styles.gameGrid} style={gridStyle}>
        {gameGrid.map((gridRow, i) =>
            gridRow.map((cell, j) =>
                <GridCell cell={cell} key={`(${i},${j})`}/>))
        }
    </div>
};