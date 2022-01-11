import React, { useEffect, useState } from 'react';
import { withWallet } from './utils';

function _IMXCollectionGallery({ walletAddress, getIMXClient, collectionAddress, imageBaseURI, containerClassName, imageClass }) {
    const [assets, setAssets] = useState([]);

    useEffect(async () => {
        if (walletAddress) {
            let assetCursor;
            const imxClient = await getIMXClient();
            let nextAssets = [];
            do {
                let assetRequest = await imxClient.getAssets({ user: walletAddress, cursor: assetCursor, collection: collectionAddress });
                nextAssets = nextAssets.concat(...assetRequest.result)
                assetCursor = assetRequest.cursor;
            } while (assetCursor);
            setAssets(nextAssets);
        }
    }, [walletAddress]);

    return (
        <div className={containerClassName}>
            {assets.map((asset) => {
                return (
                    <div className={imageClass}>
                        <img width="100%" height="100%" src={`${imageBaseURI}${asset.token_id}`} />
                    </div>
                );
            })}
        </div>
    )
}

export const IMXCollectionGallery = withWallet()(_IMXCollectionGallery);
