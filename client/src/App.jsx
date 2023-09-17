import { useEffect, useState } from 'react'
import Web3 from 'web3'
import './App.css'
import DAO from './contracts/DAO.json'
import Manager from './Ccomponents/Manager/Manager'
import Investor from './Ccomponents/Investor/Investor'

function App() {

  const[state,setState] = useState({web3:null,contract:null});

  const[account,setAccount] = useState("Not Connected");

  const[balance,setBalance] = useState(0);
  
  useEffect(()=>{
    const init = async ()=>{
      const web3 = new Web3("HTTP://127.0.0.1:7545");
      const networkId = await web3.eth.net.getId();
      const deplyedNetwork = DAO.networks[networkId];
      const contract = new web3.eth.Contract(DAO.abi,deplyedNetwork.address);
      // console.log(contract);
      // console.log(web3);
      setState({web3:web3,contract:contract});
    }
    init();
  },[])

  useEffect(()=>{

    const {web3} = state;

    const allAccounts = async ()=>{
      const select = document.getElementById("selectNumber");
      const options = await web3.eth.getAccounts();

      for(var i=0;i<options.length;i++){
        var opt = options[i];
        var element = document.createElement("option");
        element.textContent =opt;
        element.value = opt;
        select.appendChild(element);
      }
    }
    web3 && allAccounts();
  },[state])

  const selectAccount = async ()=>{
    const{web3} = state;
    const selectedAccount = document.querySelector("#selectNumber").value;
    if(selectedAccount && selectedAccount!== "Choose an Account"){
        const accountBalance = await web3.eth.getBalance(selectedAccount);
        const etherBalance = web3.utils.fromWei(accountBalance,"ether");
        setBalance(etherBalance);
        setAccount(selectedAccount);
    }
}

  return (
    <>
      <h1>Decentralized Autonomous Organisation</h1>
      <p>Connected Account : {account} </p>
      <p>Available Funds : {balance} ETH</p>
      <form id='myForm'>
        <label htmlFor="selectNumber">Select an Account  </label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option align="center">Choose an Account</option>
        </select>
      </form>
      <Manager account={account} state={state}/>
      <Investor account={account} state={state}/>
    </>
  )
}

export default App
