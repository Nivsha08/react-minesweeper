import React from 'react';
import styles from './game-over-message.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";

type GameOverMessageProps = {
    onTryAgain: () => void;
}

export const GameOverMessage = ({onTryAgain}: GameOverMessageProps) => {
    return <div className={styles.gameOverWrapper}>
        Game Over
        <button className={styles.tryAgainButton} onClick={onTryAgain}>
            <FontAwesomeIcon icon={faSyncAlt} className={styles.syncIcon} />
            Try Again
        </button>
    </div>
};