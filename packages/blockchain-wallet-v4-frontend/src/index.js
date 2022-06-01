// eslint-disable-next-line simple-import-sort/imports
import './create-nonce' // 👋 create-nonce needs to be imported first or it breaks styled-components
import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import { FontGlobalStyles, IconGlobalStyles } from 'blockchain-info-components'

import App from './scenes/app.tsx'
import configureStore from './store'
import AppError from './scenes/AppError'

configureStore()
  .then((root) => {
    ReactDOM.render(
      <>
        <BrowserRouter>
          <App store={root.store} history={root.history} persistor={root.persistor} />
        </BrowserRouter>
        <FontGlobalStyles />
        <IconGlobalStyles />
      </>,
      document.getElementById('app')
    )
  })
  .catch((e) => {
    ReactDOM.render(<AppError error={e.message} />, document.getElementById('app'))
  })
