import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { WalletProvider } from '@djuno/wallet-hook'

const clientConfigs = {
  endpointUrl: 'https://wallets.djuno.cloud',
  accessKey: process.env.REACT_APP_DJUNO_WALLET_ACCESS_KEY,
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <WalletProvider clientConfigs={clientConfigs}>
      <RouterProvider router={router} />
    </WalletProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
