import React from 'react'

function ExecuteProposal({state,account}) {

    const{contract} = state;

    const executeProposol = async (event)=>{
        event.preventDefault();
        try{
            const id = document.querySelector("#id").value;
            await contract.methods.executeProposal(id).send({from:account,gas:480000})
        }
        catch(error){
            console.log("error")
        }
        window.location.reload();
    }

  return (
    <form id='myForm' onSubmit={executeProposol}>
        <div className="input-group">
            <div className="input-box">
                <label htmlFor="id">Proposal Id</label>
                <input id="id" type="number" placeholder="Id" required/>
            </div>
        </div>
        <div className="exebutton">
            <button className="button" type="submit">Execute Proposal</button>
        </div>
    </form>
  )
}

export default ExecuteProposal
