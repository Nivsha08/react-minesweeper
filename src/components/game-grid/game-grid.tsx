import React from 'react';
import styles from './game-grid.module.scss';
import {GridCell} from "../grid-cell/grid-cell";
import {
    useGameConfiguration,
    useGameGrid,
    useMinesPositions
} from "../../hooks/game-state";
import {initGridStyle} from "../../utils/game-creator";
import {getAllZeroNeighborsCells, getBoundaryNeighbors} from "../../utils/game-utils";
import {Cell} from "../../types/types";
import {useActions} from "../../store/actions";
import classnames from "classnames";

type GameGridProps = {
    disable: boolean;
}

export const GameGrid = ({disable}: GameGridProps) => {
    const {rows, columns} = useGameConfiguration();
    const gameGrid = useGameGrid();
    const minesPositions = useMinesPositions();
    const gridStyle = initGridStyle(rows, columns);
    const {revealCell, setGameIsOver} = useActions();

    const revealGroup = (rootCell: Cell) => {
        const zeroNeighborsCells = getAllZeroNeighborsCells(gameGrid, rootCell);
        const boundaryNeighbors = getBoundaryNeighbors(gameGrid, zeroNeighborsCells);

        [...zeroNeighborsCells, ...boundaryNeighbors]
            .forEach(({row, column}) => revealCell(row, column));
    };

    const revealAllMines = () => {
        minesPositions.forEach(({row, column}) => revealCell(row, column));
    };

    const onCellReveal = (cell: Cell) => {
        if (cell.isMine) {
            revealAllMines();
            setGameIsOver();
        }
        else if (cell.numberOfNeighborMines === 0) {
            revealGroup(cell);
        }
    };

    return <div className={classnames(styles.gameGrid, {
        [styles.disabled]: disable
    })} style={gridStyle}>
        {gameGrid.map((gridRow, i) =>
            gridRow.map((cell, j) =>
                <GridCell cell={cell} onCellReveal={onCellReveal} key={`(${i},${j})`}/>))
        }
    </div>
};