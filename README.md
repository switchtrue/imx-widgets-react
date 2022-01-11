# imx-widgets-react

A collection of widgets for use with React apps for displaying data from [Immutable X](https://www.immutable.com/).

# Installation

```
npm install imx-widgets-react

// or

yarn install imx-widgets-react
```

# Widgets

## Link Wallet

Opens the window to link your wallet with IMX.

![Example of wallet linking widget](imgs/IMXLinkWallet.png?raw=true "Example of wallet linking widget")


```jsx
import { IMXLinkWallet } from 'imx-widgets-react';

<IMXLinkWallet
  // (optional) string: IMX Link URL, will default to mainnet
  imxLinkAddress=""
  // (optional) string: IMX API URL, will default to mainnet
  imxApiAddress=""
  // (optional) string: CSS class name for for the container that the button is in
  containerClassName=""
  // (optional) React.Component: Component that will be displayed when the wallet has been linked
  linkedComponent={<MyComponent />}
  // (optional) React.Component: Component that will be displayed when the wallet is not linked.
  unlinkedComponent={<MyComponent />}
/>
```

## IMX Balance

Displays the linked wallets IMX balance.

*NOTE: Requires the `IMXLinkWidget` to be used and for a wallet to have been linked before a balance will be displayed.*

![Example of balance widget](imgs/IMXBalance.png?raw=true "Example of balance widget")

```jsx
import { IMXBalance } from 'imx-widgets-react';

<IMXBalance
  imxLinkAddress="" // (optional) string: IMX Link URL, will default to mainnet
  imxApiAddress="" // (optional) string: IMX API URL, will default to mainnet
  />
```

## IMX Deposit

Displays the linked wallets IMX balance and deposit funds to IMX.

*NOTE: Requires the `IMXLinkWidget` to be used and for a wallet to have been linked before a balance will be displayed and funds can be deposited.*

![Example of deposit widget](imgs/IMXDeposit.png?raw=true "Example of deposit widget")

```jsx
import { IMXDeposit } from 'imx-widgets-react';

<IMXDeposit
  imxLinkAddress="" // (optional) string: IMX Link URL, will default to mainnet
  imxApiAddress="" // (optional) string: IMX API URL, will default to mainnet
  />
```
