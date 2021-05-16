import React, {useState} from 'react';
import styles from './grid-cell.module.scss';
import {Cell} from "../../types/types";
import classnames from 'classnames';
import {useActions} from "../../store/actions";

type GridCellProps = {
    cell: Cell
}

export const GridCell = ({cell}: GridCellProps) => {
    const {row, column, numberOfNeighborMines, isMine} = cell;
    const [revealed, setRevealed] = useState<boolean>(false);
    const [flagged, setFlagged] = useState<boolean>(false);
    const {setCellFlag} = useActions();

    const revealCell = () => {
        if (flagged) return;
        setRevealed(true);
    };

    const toggleCellFlag = (event: React.MouseEvent) => {
        event.preventDefault();
        if (revealed) return;
        setCellFlag(row, column, !flagged);
        setFlagged(!flagged);
    };

    return <div onClick={revealCell}
                onContextMenu={toggleCellFlag}
                className={classnames(styles.gridCell, {
                    [styles.revealed]: revealed,
                    [styles.flagged]: flagged,
                    [styles.mine]: isMine
                })}>
        {
            revealed && numberOfNeighborMines > 0 &&
            <span className={`text-${numberOfNeighborMines}`}>{numberOfNeighborMines}</span>
        }
    </div>
};