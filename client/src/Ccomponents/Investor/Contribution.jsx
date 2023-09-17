import React from 'react'

function Contribution({state,account}) {

    const{contract} = state;

    const contribute = async (event)=>{
        event.preventDefault();
        try{
            const amount = document.querySelector("#weiValue").value;
            await contract.methods.contribution().send({from:account,gas:480000,value:amount})
        }
        catch(error){
            console.log("eContribution error" , error);
        }
        window.location.reload();
    }

  return (
    <form id='myForm' onSubmit={contribute}>
        <div className="input-group">
            <div className="input-box">
                <label htmlFor="weiValue">Contribution Amount</label>
                <input id="weiValue" type="text" placeholder="amount" required/>
            </div>
        </div>
        <div className="contributton">
            <button className="button" type="submit">Contribute</button>
        </div>
    </form>
  )
}

export default Contribution
