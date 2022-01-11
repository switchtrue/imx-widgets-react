import React from 'react';
import { withWallet } from './utils';
import styles from './IMXLinkWallet.module.css';

const Linked = () => {
    return (
        <div className={styles.Button}>
            Unlink Wallet
        </div>
    );
}

const Unlinked = () => {
    return (
        <div className={styles.Button}>
            Link Wallet
        </div>
    );
}

function _IMXLinkWallet({ isWalletLinked, onLinkWallet, onUnlinkWallet, unlinkedComponent, linkedComponent, containerClassName }) {
    if (isWalletLinked) {
        return (
            <div role="button" className={containerClassName} onClick={onUnlinkWallet}>
                {linkedComponent || <Linked />}
            </div>
        );
    } else {
        return (
            <div role="button" className={containerClassName} onClick={onLinkWallet}>
                {unlinkedComponent || <Unlinked />}
            </div>
        );
    }
}

export const IMXLinkWallet = withWallet()(_IMXLinkWallet);
