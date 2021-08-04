import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from 'uikit'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ToastListener from './components/ToastListener'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './components/Info/contexts/LocalStorage'
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from './components/Info/contexts/TokenData'
import PairDataContextProvider, { Updater as PairDataContextUpdater } from './components/Info/contexts/PairData'
import ApplicationContextProvider from './components/Info/contexts/Application'
import GlobalDataContextProvider from './components/Info/contexts/GlobalData'
import Providers from './Providers'
import 'inter-ui'
import './i18n'

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
   localStorage?.removeItem('redux_localstorage_simple_lists')
})

// window.addEventListener('resize', () => {
//   window.location.reload()
// })

const InfoProviders: React.FC = ({ children }) =>  (
<LocalStorageContextProvider>
  <ApplicationContextProvider>
    <TokenDataContextProvider>
      <GlobalDataContextProvider>
          <PairDataContextProvider>
            {children}
          </PairDataContextProvider>
      </GlobalDataContextProvider>
    </TokenDataContextProvider>
  </ApplicationContextProvider>
</LocalStorageContextProvider>
)
ReactDOM.render(
  <StrictMode>
    <Providers>
      <InfoProviders>
        <>
          <ListsUpdater />
          <ApplicationUpdater />
          <TransactionUpdater />
          <MulticallUpdater />
          <ToastListener />
          <LocalStorageContextUpdater />
          <TokenDataContextUpdater />
          <PairDataContextUpdater />
        </>
        <ResetCSS />
        <GlobalStyle />
        <App />    
      </InfoProviders>
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)
