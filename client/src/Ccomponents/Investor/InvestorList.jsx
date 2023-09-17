import React,{useEffect,useState} from 'react'

function InvestorList({state}) {

    const{contract} = state;
    const [list,setList]=useState([]);

    /*Using useEffect because we want to display it automatically not on any click or something */
    useEffect(()=>{
        const investors = async ()=>{
            try{
                const arrayInvestors = await  contract.methods.InvestorList().call();
                // console.log(arrayInvestors);
                setList(arrayInvestors);
            }
            catch(error){
                console.error("Error calling Investors List:", error.message);
            }
        }
        contract && investors();
    },[state])
  return (
    <div className="list">
    <h3>Investor's List</h3>
      {list.map((investorAddress)=>{
          return <p key={investorAddress}>{investorAddress}</p>
      })}
    </div>
  )
}

export default InvestorList
