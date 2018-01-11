import React from 'react'
import { FormattedMessage } from 'react-intl'

import { FlatLoader } from 'blockchain-info-components'
import { SettingComponent, SettingContainer, SettingDescription, SettingHeader, SettingSummary } from 'components/Setting'

const LocalCurrency = (props) => {
  return (
    <SettingContainer>
      <SettingSummary>
        <SettingHeader>
          <FormattedMessage id='scenes.preferences.currency.title' defaultMessage='Local currency' />
        </SettingHeader>
        <SettingDescription>
          <FormattedMessage id='scenes.preferences.currency.description' defaultMessage='Select your local currency.' />
        </SettingDescription>
      </SettingSummary>
      <SettingComponent>
        <FlatLoader width='50px' height='14px' />
      </SettingComponent>
    </SettingContainer>
  )
}

export default LocalCurrency
