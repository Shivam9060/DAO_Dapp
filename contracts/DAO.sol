// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DAO {
    struct Proposal {
        uint256 id;
        string description;
        uint256 amount;
        address payable receipient;
        uint256 votes;
        uint256 end;
        bool isExecuted;
    }

    mapping(address => bool) private isInvestor;
    mapping(address => uint256) public numOfshares;
    mapping(address => mapping(uint256 => bool)) public isVoted;
    address[] public investorsList;
    mapping(uint256 => Proposal) public proposals;
    uint256 public totalShares;
    uint256 public availableFunds;
    uint256 public contributionTimeEnd;
    uint256 public nextProposalId;
    uint256 public voteTime;
    uint256 public quorum;
    address public manager;

    //value passed using truffle migration file
    constructor(
        uint256 _contributionTimeEnd,
        uint256 _voteTime,
        uint256 _quorum
    ) {
        require(_quorum > 0 && _quorum < 100, "Not valid values");
        contributionTimeEnd = block.timestamp + _contributionTimeEnd; //16342343342 + 2*3600
        voteTime = _voteTime;
        quorum = _quorum;
        manager = msg.sender;
    }

    modifier onlyInvestor() {
        require(isInvestor[msg.sender] == true, "You are not an investor");
        _;
    }
    modifier onlyManager() {
        require(manager == msg.sender, "You are not a manager");
        _;
    }

    function contribution() public payable {
        require(
            contributionTimeEnd >= block.timestamp,
            "Contribution Time Ended"
        ); //5 PM , //16342343342 + 2*3600 > 16342340000
        require(msg.value > 0, "Send more than 0 ether");
        isInvestor[msg.sender] = true;
        numOfshares[msg.sender] = numOfshares[msg.sender] + msg.value;
        totalShares += msg.value; //totaltShares=totalShares+msg.value
        availableFunds += msg.value;
        investorsList.push(msg.sender);
    }

    function reedemShare(uint256 amount) public onlyInvestor {
        require(
            numOfshares[msg.sender] >= amount,
            "You don't have enough shares"
        );
        require(availableFunds >= amount, "Not enough funds");
        numOfshares[msg.sender] -= amount;
        if (numOfshares[msg.sender] == 0) {
            isInvestor[msg.sender] = false;
        }
        availableFunds -= amount;
        payable(msg.sender).transfer(amount); //transferring of ether
    }

    //investor's address share will get transfered "to" address

    function transferShare(uint256 amount, address to) public onlyInvestor {
        require(availableFunds >= amount, "Not enough funds");
        require(
            numOfshares[msg.sender] >= amount,
            "You don't have enough shares"
        );
        numOfshares[msg.sender] -= amount;
        if (numOfshares[msg.sender] == 0) {
            isInvestor[msg.sender] = false;
        }
        numOfshares[to] += amount;
        isInvestor[to] = true;
        investorsList.push(to);
    }

    function createProposal(
        string calldata description,
        uint256 amount,
        address payable receipient
    ) public onlyManager {
        require(availableFunds >= amount, "Not enough funds");
        proposals[nextProposalId] = Proposal(
            nextProposalId,
            description,
            amount,
            receipient,
            0,
            block.timestamp + voteTime,
            false
        );
        nextProposalId++;
    }

    function voteProposal(uint256 proposalId) public onlyInvestor {
        Proposal storage proposal = proposals[proposalId];
        require(
            isVoted[msg.sender][proposalId] == false,
            "You have already voted for this proposal"
        );
        require(proposal.end >= block.timestamp, "Voting Time Ended");
        require(proposal.isExecuted == false, "It is already executed");
        isVoted[msg.sender][proposalId] = true;
        proposal.votes += numOfshares[msg.sender]; //proposal.votes=proposal.votes+numOfshares[msg.sender]
    }

    function executeProposal(uint256 proposalId) public onlyManager {
        Proposal storage proposal = proposals[proposalId];
        require(
            ((proposal.votes * 100) / totalShares) >= quorum,
            "Majority does not support"
        );
        proposal.isExecuted = true;
        availableFunds -= proposal.amount;
        _transfer(proposal.amount, proposal.receipient);
    }

    function _transfer(uint256 amount, address payable receipient) private {
        receipient.transfer(amount);
    }

    function ProposalList() public view returns (Proposal[] memory) {
        Proposal[] memory arr = new Proposal[](nextProposalId); //empty array of length=nextProposalId-1
        for (uint256 i = 0; i < nextProposalId; i++) {
            arr[i] = proposals[i];
        }
        return arr;
    }

    function InvestorList() public view returns (address[] memory) {
        return investorsList;
    }
}
