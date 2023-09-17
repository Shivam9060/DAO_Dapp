import React from 'react'

function CreateProposal({state,account}) {

    const{contract} = state;

    const proposalCreation = async (event)=>{

        event.preventDefault();

        try{
            const description = document.querySelector("#description").value;
            const receipent = document.querySelector("#receipent").value;
            const amount = document.querySelector("#amount").value;
            
            await contract.methods.createProposal(description,amount,receipent).send({from:account,gas:480000});
            }
        catch(error){
            console.log("Create proposal error",error);
        }
        // window.location.reload();
    }

  return (
    <>
    <form id='myForm' onSubmit={proposalCreation} >
        <div className="input-group">
            <div className="input-box">
                <label htmlFor="description">Description</label>
                <input id="description" type="text" placeholder="description" required/>
            </div>

            <div className="input-box">
                <label htmlFor="receipent">Address</label>
                <input id="receipent" type="text" placeholder="address" required/>
            </div>

            <div className="input-box">
                <label htmlFor="amount">Amount need</label>
                <input id="amount" type="number" placeholder="wei" required/>
            </div>
        </div>
        <div className="Proposalbutton">
            <button className="button" type="submit">Create Proposal</button>
        </div>
    </form>
    </>
  )
}

export default CreateProposal
