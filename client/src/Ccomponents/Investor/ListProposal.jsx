import React,{useEffect,useState} from 'react'


function ListProposal({state}) {

    const{contract} = state;

    const [list,setList]=useState([]);

    /*Using useEffect because we want to display it automatically not on any click or something */
    useEffect(()=>{
        const proposals = async ()=>{
            try{
                const arrayProposals = await  contract.methods.ProposalList().call();
                console.log(arrayProposals);
                setList(arrayProposals);
            }
            catch(error){
                console.error("Error calling ProposalList:", error.message);
            }
        }
        contract && proposals();
    },[state])

  return (
  <>
   <div className="list">
    <h3>Proposal List</h3>
    <table>
      <tbody>
      {list.map((proposal)=>{
         return (
                 <tr key={proposal.id}>
                 <td>{proposal.id}</td>
                 <td>{proposal.description}</td>
                 <td>{proposal.amount}</td>
                 <td>{proposal.receipient}</td>
                 <td>{proposal.votes}</td>
                 <td>{proposal.end}</td>
                 <td>{proposal.isExecuted}</td>
                 </tr>
      )})}
      </tbody>
      </table>
   </div>
  </>
  )
}

export default ListProposal
