import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Remote } from '@core'
import { RemoteDataType } from '@core/remote/types'

import { AccountType, CardActionType, DebitCardState, DebitCardType, ProductType } from './types'

const initialState: DebitCardState = {
  cardCreationData: Remote.NotAsked,
  cardToken: '',
  cards: Remote.NotAsked,
  currentCardAccount: Remote.NotAsked,
  currentCardSelected: undefined,
  eligibleAccounts: [],
  lockHandler: Remote.NotAsked,
  products: [],
  terminateHandler: Remote.NotAsked
}

const debitCardSlice = createSlice({
  initialState,
  name: 'debitCard',
  reducers: {
    cleanCardData: (state) => {
      state.cards = Remote.NotAsked
      state.cardToken = ''
      state.currentCardSelected = undefined
      state.currentCardAccount = Remote.NotAsked
      state.lockHandler = Remote.NotAsked
    },
    cleanTerminateHandler: (state) => {
      state.terminateHandler = Remote.NotAsked
    },
    createCard: (state, action: PayloadAction<string>) => {},
    createCardFailure: (state, action: PayloadAction<string>) => {
      state.cardCreationData = Remote.Failure(action.payload)
    },
    createCardLoading: (state) => {
      state.cardCreationData = Remote.Loading
    },
    createCardSuccess: (state, action: PayloadAction<DebitCardType>) => {
      state.cardCreationData = Remote.Success(action.payload)
    },
    getCards: () => {},
    getCardsFailure: (state) => {
      state.cards = Remote.Failure()
    },
    getCardsLoading: (state) => {
      state.cards = Remote.Loading
    },
    getCardsSuccess: (state, action: PayloadAction<Array<DebitCardType>>) => {
      state.cards = Remote.Success(action.payload)
    },
    getCurrentCardAccount: (state, action: PayloadAction<string>) => {},
    getCurrentCardAccountFailure: (state, action: PayloadAction<string>) => {
      state.currentCardAccount = Remote.Failure(action.payload)
    },
    getCurrentCardAccountLoading: (state) => {
      state.currentCardAccount = Remote.Loading
    },
    getCurrentCardAccountSuccess: (state, action: PayloadAction<AccountType>) => {
      state.currentCardAccount = Remote.Success(action.payload)
    },
    getProducts: () => {},
    getProductsFailure: (state) => {
      state.products = []
    },
    getProductsSuccess: (state, action: PayloadAction<Array<ProductType>>) => {
      state.products = action.payload
    },
    handleCardLock: (state, action: PayloadAction<CardActionType>) => {},
    handleCardLockFailure: (state, action: PayloadAction<string>) => {
      state.lockHandler = Remote.Failure(action.payload)
    },
    handleCardLockLoading: (state) => {
      state.lockHandler = Remote.Loading
    },
    handleCardLockSuccess: (state, action: PayloadAction<boolean>) => {
      state.lockHandler = Remote.Success(action.payload)
    },
    resetCreateCardState: (state) => {
      state.cardCreationData = Remote.NotAsked
    },
    setCardToken: (state, action: PayloadAction<string>) => {
      state.cardToken = action.payload
    },
    setCurrentCardSelected: (state, action: PayloadAction<DebitCardType>) => {
      state.currentCardSelected = action.payload
    },
    setEligibleAccounts: (state, action: PayloadAction<Array<AccountType>>) => {
      state.eligibleAccounts = action.payload
    },
    terminateCard: (state, action: PayloadAction<string>) => {},
    terminateCardFailure: (state) => {
      state.terminateHandler = Remote.Failure(null)
    },
    terminateCardLoading: (state) => {
      state.terminateHandler = Remote.Loading
    },
    terminateCardSuccess: (state) => {
      state.terminateHandler = Remote.Success(null)
    },
    updateCurrentCard: (
      state,
      action: PayloadAction<{
        updatedCard: DebitCardType
        updatedCardsR: RemoteDataType<string, Array<DebitCardType>>
      }>
    ) => {
      state.currentCardSelected = action.payload.updatedCard
      state.cards = action.payload.updatedCardsR
    }
  }
})

const { actions } = debitCardSlice
const debitCardReducer = debitCardSlice.reducer
export { actions, debitCardReducer }
