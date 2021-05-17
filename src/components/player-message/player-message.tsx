import React from 'react';
import styles from './player-message.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";

type MessageType = 'success' | 'failure';

type Message = {
    title: string;
    description: string;
    actionText: string;
}

type PlayerMessageProps = {
    type: MessageType;
    onActionClick: () => void;
}

const messages: Record<MessageType, Message> = {
    success: {
        title: 'Congratulations!',
        description: 'All mines were diffused',
        actionText: 'Play Again',
    },
    failure: {
        title: 'Game over',
        description: 'You hit a mine!',
        actionText: 'Try Again?',
    }
}

export const PlayerMessage = ({type, onActionClick}: PlayerMessageProps) => {
    const {title, description, actionText} = messages[type];
    return <div className={styles.playerMessageWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
        <button className={styles.actionButton} onClick={onActionClick}>
            <FontAwesomeIcon icon={faSyncAlt} className={styles.syncIcon} />
            {actionText}
        </button>
    </div>
};