import React, { useEffect } from 'react'

const Loader = () => {
  useEffect(() => {
    // @ts-ignore
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      // eslint-disable-next-line no-console
      console.log('inside')
      localStorage.setItem('random', 'value')
    })
  }, [])

  return (
    <div>
      <p>success</p>
    </div>
  )
}

export default Loader
