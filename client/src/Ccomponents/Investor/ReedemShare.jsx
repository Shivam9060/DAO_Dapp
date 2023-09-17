import React from 'react'

function ReedemShare({state,account}) {

    const{contract} = state;

    const reedemShare = async (event)=>{
        event.preventDefault();
        try{
            const amount = document.querySelector("#shares").value;
            await contract.methods.reedemShare(amount).send({from:account,gas:480000})
        }
        catch(error){
            console.log("Reedemption error" , error);
        }
        window.location.reload();
    }


  return (
    <form id='myForm'onSubmit={reedemShare}>
        <div className="input-group">
            <div className="input-box">
                <label htmlFor="shares">Number of Shares</label>
                <input id="shares" type="text" placeholder="amount" required/>
            </div>
        </div>
        <div className="redemption">
            <button className="button" type="submit">Reedem</button>
        </div>
    </form>
  )
}

export default ReedemShare
