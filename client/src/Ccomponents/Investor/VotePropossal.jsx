import React from 'react'

function VotePropossal({state,account}) {
    const{contract} = state;

    const voteProposal = async (event)=>{
        event.preventDefault();
        try{
            const proposalId = document.querySelector("#proposalID").value;
            await contract.methods.voteProposal(proposalId).send({from:account,gas:480000})
        }
        catch(error){
            console.log("Vote Proposal error" , error);
        }
        window.location.reload();
    }


  return (
    <form id='myForm' onSubmit={voteProposal}>
        <div className="input-group">
            <div className="input-box">
                <label htmlFor="proposalID">Proposal ID</label>
                <input id="proposalID" type="text" placeholder="id" required/>
            </div>
        </div>
        <div className="redemption">
            <button className="button" type="submit">Vote</button>
        </div>
    </form>
  )
}

export default VotePropossal
