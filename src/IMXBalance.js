import React, { useEffect, useState } from 'react';
import { withWallet } from './utils';
import { ethers } from 'ethers';
import styles from './IMXBalance.module.css';

const asEther = (balance) => {
    if (balance) {
        return ethers.utils.formatEther(balance);
    };
}

let BALANCE_TIMEOUT = null;

function _IMXBalance({ walletAddress, getIMXClient, containerClassName, labelClass, balanceClass }) {
    const [balances, setBalances] = useState({});

    useEffect(async () => {
        if (BALANCE_TIMEOUT) {
            clearTimeout(BALANCE_TIMEOUT);
        }
        const getBalance = async () => {
            if (walletAddress) {
                const client = await getIMXClient();
                const fetchedBalances = await client.getBalances({ user: walletAddress });
                setBalances(fetchedBalances);
                BALANCE_TIMEOUT = setTimeout(getBalance, 30000);
            }
        }
        getBalance();
    }, [walletAddress]);

    return (
        <div className={containerClassName || styles.Container}>
            <p className={labelClass || styles.Label}>IMX Balance</p>
            <p className={balanceClass || styles.Balance}>Ξ {asEther(balances.imx)}</p>
        </div>
    );
}

export const IMXBalance = withWallet()(_IMXBalance);
