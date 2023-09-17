import React from 'react'
import CreateProposal from './CreateProposal'
import ExecuteProposal from './ExecuteProposal'

function Manager({state,account}) {
  return (
    <>
      <CreateProposal account={account} state={state}></CreateProposal>
      <ExecuteProposal account={account} state={state}></ExecuteProposal>
    </>
  )
}

export default Manager
