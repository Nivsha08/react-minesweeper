import React from 'react';
import styles from './game-grid.module.scss';
import {GridCell} from "../grid-cell/grid-cell";
import {useGameConfiguration, useGameGrid} from "../../hooks/game-state";
import {initGridStyle} from "../../utils/game-creator";
import {getAllZeroNeighborsCells} from "../../utils/game-utils";
import {Cell} from "../../types/types";
import {useActions} from "../../store/actions";

export const GameGrid = () => {
    const {rows, columns} = useGameConfiguration();
    const gameGrid = useGameGrid();
    const gridStyle = initGridStyle(rows, columns);
    const {revealCell, setGameIsOver} = useActions();

    const onCellReveal = (cell: Cell) => {
        if (cell.isMine) {
            setGameIsOver();
        }
        else if (cell.numberOfNeighborMines === 0) {
            const zeroNeighborsCells = getAllZeroNeighborsCells(gameGrid, cell);
            zeroNeighborsCells.forEach(({row, column}) => revealCell(row, column));
        }
    };

    return <div className={styles.gameGrid} style={gridStyle}>
        {gameGrid.map((gridRow, i) =>
            gridRow.map((cell, j) =>
                <GridCell cell={cell} onCellReveal={onCellReveal} key={`(${i},${j})`}/>))
        }
    </div>
};