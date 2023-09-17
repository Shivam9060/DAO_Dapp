import React from 'react'

function TransferShare({state,account}) {

    const{contract} = state;

    const shareTransfer = async (event)=>{
        event.preventDefault();

        try{
            const amount = document.querySelector("#amount");
            const to = document.querySelector("#to");
            await contract.methods.transferShare(amount,to).send({from:account,gas:480000});
        }
        catch(error){
            console.log("Transfer Share error",error);
        }
    }
  return (
    <form id='myForm' onSubmit={shareTransfer}>
        <div className="input-group">
            <div className="input-box">
                <label htmlFor="amount">Amount</label>
                <input id="amount" type="number" placeholder="amount" required/>
            </div>
            <div className="input-box">
                <label htmlFor="to">To</label>
                <input id="to" type="text" placeholder="to" required/>
            </div>
        </div>
        <div className="transferbutton">
            <button className="button" type="submit">Transfer Share</button>
        </div>
    </form>
  )
}

export default TransferShare
