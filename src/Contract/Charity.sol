// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8;

contract Charity {
    // State variables
    mapping(address => uint) public contributors;
    address public manager;
    uint public minimumContribution;
    uint public raisedAmount;
    uint public noOfContributors;

    // Structure to define a spending request
    struct Request {
        uint uniqueid;
        string description;
        address payable recipient;
        uint target;
        bool completed;
        uint noOfVoters;
        mapping(address => bool) voters;
    }

    // Event to track fund transfers
    event FundTransfer(address recipient, uint amount);

    // Fallback function to receive ETH
    receive() external payable {}

    // Mapping to store requests and counter for request numbers
    mapping(uint => Request) public requests;
    uint public numRequests;

    // Constructor to initialize manager and minimum contribution
    constructor() {
        minimumContribution = 100 wei;
        manager = msg.sender;
    }

    // Function for contributors to send ETH
    function sendEth() public payable {
        require(
            msg.value >= minimumContribution,
            "Minimum Contribution is not met"
        );

        if (contributors[msg.sender] == 0) {
            noOfContributors++;
        }

        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    // Function to get the balance of the contract
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Function to create a spending request
    function createRequest(
        string memory _description,
        address payable _recipient,
        uint _target
    ) public {
        require(msg.sender == manager, "Only manager can call this function");

        Request storage newRequest = requests[numRequests];
        newRequest.uniqueid = numRequests;
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.target = _target;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;

        numRequests++;
    }

    // Function for contributors to vote on a spending request
    function voteRequest(uint _requestNo) public {
        require(contributors[msg.sender] > 0, "You must be a contributor");

        Request storage thisRequest = requests[_requestNo];

        require(!thisRequest.voters[msg.sender], "You have already voted");

        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }

    // Function to make a payment to the recipient when request is approved
    function makePayment(uint _requestNo) public {
        require(msg.sender == manager, "Only manager can call this function");

        Request storage thisRequest = requests[_requestNo];

        require(raisedAmount >= thisRequest.target, "Not enough funds raised");
        require(
            !thisRequest.completed,
            "The request has already been completed"
        );
        require(
            thisRequest.noOfVoters > noOfContributors / 2,
            "Majority does not support this request"
        );

        thisRequest.recipient.transfer(thisRequest.target);
        thisRequest.completed = true;

        emit FundTransfer(thisRequest.recipient, thisRequest.target);
    }
}
