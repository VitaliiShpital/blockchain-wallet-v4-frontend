import React, { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, compose, Dispatch } from 'redux'

import { ExtractSuccess, SwapOrderType } from '@core/types'
import Flyout, { duration, FlyoutChild } from 'components/Flyout'
import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'
import { Analytics, ModalName } from 'data/types'
import ModalEnhancer from 'providers/ModalEnhancer'

import { ModalPropsType } from '../types'
import CoinSelection from './CoinSelection'
import EnterAmount from './EnterAmount'
import InitSwapForm from './InitSwapForm'
import NoHoldings from './NoHoldings'
import OrderDetails from './OrderDetails'
import PreviewSwap from './PreviewSwap'
import { getData } from './selectors'
import SuccessfulSwap from './SuccessfulSwap'
import Unsupported from './template.unsupported'
import UpgradePrompt from './UpgradePrompt'

class Swap extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { show: false }
  }

  componentDidMount() {
    /* eslint-disable */
    this.setState({ show: true })
    /* eslint-enable */
    this.props.swapActions.fetchCustodialEligibility()
    this.props.custodialActions.fetchProductEligibilityForUser()
  }

  componentWillUnmount() {
    this.props.swapActions.stopPollQuote()
  }

  handleClose = () => {
    this.setState({ show: false })
    setTimeout(() => {
      this.props.close()
    }, duration)
  }

  handleCloseOrPromoteUpgrade = () => {
    this.props.showUpgradeModal()
  }

  render() {
    return this.props.data.cata({
      Failure: () => (
        <Flyout
          {...this.props}
          onClose={this.handleClose}
          isOpen={this.state.show}
          data-e2e='swapModal'
        >
          <Unsupported handleClose={this.handleClose} />
        </Flyout>
      ),
      Loading: () => null,
      NotAsked: () => null,
      Success: (val) => {
        const currentTier = val.userData?.tiers?.current
        return (
          <Flyout {...this.props} isOpen={this.state.show} onClose={this.handleClose}>
            {this.props.step === 'INIT_SWAP' && (
              <FlyoutChild>
                <InitSwapForm {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'COIN_SELECTION' && (
              <FlyoutChild>
                <CoinSelection {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'NO_HOLDINGS' && (
              <FlyoutChild>
                <NoHoldings {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'ENTER_AMOUNT' && (
              <FlyoutChild>
                <EnterAmount {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'UPGRADE_PROMPT' && (
              <FlyoutChild>
                <UpgradePrompt {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'PREVIEW_SWAP' && (
              <FlyoutChild>
                <PreviewSwap {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'ORDER_DETAILS' && (
              <FlyoutChild>
                <OrderDetails {...this.props} handleClose={this.handleClose} {...val} />
              </FlyoutChild>
            )}
            {this.props.step === 'SUCCESSFUL_SWAP' && (
              <FlyoutChild>
                <SuccessfulSwap
                  {...this.props}
                  handleClose={
                    currentTier === 2 ? this.handleClose : this.handleCloseOrPromoteUpgrade
                  }
                  {...val}
                />
              </FlyoutChild>
            )}
          </Flyout>
        )
      }
    })
  }
}

const mapStateToProps = (
  state: RootState
): { data: ReturnType<typeof getData> } & (
  | {
      step: 'INIT_SWAP'
    }
  | {
      side: 'BASE' | 'COUNTER'
      step: 'COIN_SELECTION'
    }
  | {
      step: 'ENTER_AMOUNT'
    }
  | {
      step: 'UPGRADE_PROMPT'
    }
  | {
      step: 'PREVIEW_SWAP'
    }
  | {
      order?: SwapOrderType
      step: 'ORDER_DETAILS'
    }
  | {
      order?: SwapOrderType
      step: 'SUCCESSFUL_SWAP'
    }
  | {
      step: 'NO_HOLDINGS'
    }
) => ({
  data: getData(state),
  order: selectors.components.swap.getOrder(state),
  side: selectors.components.swap.getSide(state),
  step: selectors.components.swap.getStep(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  custodialActions: bindActionCreators(actions.custodial, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  idvActions: bindActionCreators(actions.components.identityVerification, dispatch),
  modalActions: bindActionCreators(actions.modals, dispatch),
  showUpgradeModal: () => {
    dispatch(actions.modals.closeModal(ModalName.SWAP_MODAL))
    dispatch(
      actions.modals.showModal(ModalName.UPGRADE_NOW_SILVER_MODAL, {
        origin: 'Swap'
      })
    )
    dispatch(
      actions.analytics.trackEvent({
        key: Analytics.ONBOARDING_GET_MORE_ACCESS_WHEN_YOU_VERIFY,
        properties: {
          flow_step: 'SWAP'
        }
      })
    )
  },
  swapActions: bindActionCreators(actions.components.swap, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(ModalEnhancer(ModalName.SWAP_MODAL, { transition: duration }), connector)

export type SuccessStateType = ExtractSuccess<ReturnType<typeof getData>>
export type Props = ModalPropsType & ConnectedProps<typeof connector>
type State = { show: boolean }

export default enhance(Swap)
