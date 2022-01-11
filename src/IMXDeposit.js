import React, { useState } from 'react';
import { withWallet } from './utils';
import { IMXBalance } from './IMXBalance';
import styles from "./IMXDeposit.module.css";
import { ETHTokenType } from '@imtbl/imx-sdk';

function _IMXDeposit({ link, containerClassName, labelClassName, textClassName, buttonClassName, inputClassName }) {
    const [depositAmount, setDepositAmount] = useState('0.01');

    const deposit = () => {
        link.deposit({
            type: ETHTokenType.ETH,
            amount: depositAmount
        });
    }

    return (
        <div className={containerClassName || styles.Container}>
            <IMXBalance
                containerClassName={styles.BalanceContainer}
                labelClass={labelClassName}
                balanceClass={textClassName}
            />
            <div className={styles.DepositContainer}>
                <div>
                    <p className={labelClassName || styles.Label}>Deposit Amount</p>
                    <p className={textClassName || styles.Balance}>
                        Ξ <input
                            className={inputClassName || styles.Input}
                            onChange={e => setDepositAmount(e.target.value)}
                            value={depositAmount}
                        />
                    </p>
                </div>
                <div role="button" className={buttonClassName || styles.Button} onClick={deposit}>
                    <p>Deposit</p>
                </div>
            </div>


        </div>
    );
}

export const IMXDeposit = withWallet()(_IMXDeposit);
