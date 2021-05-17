import React from 'react';
import styles from './grid-cell.module.scss';
import {Cell} from "../../types/types";
import classnames from 'classnames';
import {useActions} from "../../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBomb, faFlag} from "@fortawesome/free-solid-svg-icons";

type GridCellProps = {
    cell: Cell
    onCellReveal: (cell: Cell) => void;
}

export const GridCell = ({cell, onCellReveal}: GridCellProps) => {
    const {row, column, revealed, flagged, numberOfNeighborMines, isMine} = cell;
    const {revealCell, setCellFlag} = useActions();

    const onCellClick = () => {
        if (flagged) return;
        revealCell(row, column);
        onCellReveal(cell);
    };

    const toggleCellFlag = (event: React.MouseEvent) => {
        event.preventDefault();
        if (revealed) return;
        setCellFlag(row, column, !flagged);
    };

    return <div onClick={onCellClick}
                onContextMenu={toggleCellFlag}
                className={classnames(styles.gridCell, {
                    [styles.revealed]: revealed,
                    [styles.flagged]: flagged,
                    [styles.mine]: isMine && revealed,
                })}>
        {
            !revealed && flagged &&
            <FontAwesomeIcon icon={faFlag} className={styles.flagIcon} size="lg" />
        }
        {
            !isMine && revealed && numberOfNeighborMines > 0 &&
            <span className={`text-${numberOfNeighborMines}`}>{numberOfNeighborMines}</span>
        }
        {
            isMine && revealed &&
            <FontAwesomeIcon icon={faBomb} className={styles.bombIcon} size="lg" />
        }

    </div>
};