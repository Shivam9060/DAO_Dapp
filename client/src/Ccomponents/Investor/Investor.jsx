import React from 'react'
import ListProposal from './ListProposal'
import TransferShare from './TransferShare'
import InvestorList from './InvestorList'
import Contribution from './Contribution'
import ReedemShare from './ReedemShare'
import VotePropossal from './VotePropossal'

function Investor({account,state}) {
  return (
    <>
    <TransferShare state={state} account={account}/>
    <Contribution state={state} account={account}/>
    <ReedemShare state={state} account={account} />
    <VotePropossal state={state} account={account} />
    <ListProposal state={state}/>
    <InvestorList state={state}/>
    </> 
  )
}

export default Investor
