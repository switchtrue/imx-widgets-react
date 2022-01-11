import React, { useEffect, useState } from 'react';
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

const DEFAULT_LINK_ADDRESS = 'https://link.x.immutable.com';
const DEFAULT_API_ADDRESS = 'https://api.x.immutable.com/v1';
const LS_WALLET_ADDRESS = 'IMX_WALLET_ADDRESS';
const LS_STARK_PUBLIC_KEY = 'IMX_STARK_PUBLIC_KEY';

const linkAddress = process.env.NEXT_PUBLIC_IMX_LINK_URL;
const apiAddress = process.env.NEXT_PUBLIC_IMX_API_URL;

// withWallet is a React higher order component (HOC) that can automatically inject the wallet
// props into any wrapped component.
// Usage:
//     withWallet()(MyComponent)
// Props injected:
//      - isWalletConnected: a boolean, true if the wallet has been successfully connected, false otherwise.
//      - walletAddress: the wallet address of the user
//      - starkPublicKey: the public key of the user's wallet
//      - onSetupWallet: a function to invoke the IMX wallet setup flow
//      - link: a fully instantiated IMX link client
//      - getIMXClient: get a fully instantiated IMX client
export const withWallet = () => WrappedComponent => {
    const WalletHoc = (props) => {
        let { imxLinkAddress, imxApiAddress } = props;
        if (!imxLinkAddress) imxLinkAddress = DEFAULT_LINK_ADDRESS;
        if (!imxApiAddress) imxApiAddress = DEFAULT_API_ADDRESS;

        const link = new Link(linkAddress);

        const [walletAddress, setWalletAddress] = useState(undefined);
        const [starkPublicKey, setStarkPublicKey] = useState(undefined);

        useEffect(() => {
            const lsWalletAddress = localStorage.getItem(LS_WALLET_ADDRESS);
            setWalletAddress(lsWalletAddress);
            const lsStarkPublicKey = localStorage.getItem(LS_STARK_PUBLIC_KEY);
            setStarkPublicKey(lsStarkPublicKey);
        });

        const linkWallet = async () => {
            const { address, starkPublicKey } = await link.setup({});
            localStorage.setItem(LS_WALLET_ADDRESS, address);
            localStorage.setItem(LS_STARK_PUBLIC_KEY, starkPublicKey);
            setWalletAddress(address);
            setStarkPublicKey(starkPublicKey);
        };

        const unlinkWallet = async () => {
            localStorage.removeItem(LS_WALLET_ADDRESS);
            localStorage.removeItem(LS_STARK_PUBLIC_KEY);
            setWalletAddress(null);
            setStarkPublicKey(null);
        }

        const getIMXClient = async () => {
            return await ImmutableXClient.build({ publicApiUrl: apiAddress });
        }

        const getIMXLink = async () => {
            return link;
        }

        return (
            <WrappedComponent
                isWalletLinked={!!walletAddress && !!starkPublicKey}
                walletAddress={walletAddress}
                starkPublicKey={starkPublicKey}
                getIMXClient={getIMXLink}
                getIMXClient={getIMXClient}
                onLinkWallet={linkWallet}
                onUnlinkWallet={unlinkWallet}
                {...props}
            />
        );
    }

    return WalletHoc;
}
