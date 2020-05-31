exports.abi = [
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "x",
        "type": "string"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_driver",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "finalizeDriver",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "_driver",
        "type": "address"
      }
    ],
    "name": "addEligibleDriver",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "returnDriverArray",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_driver",
        "type": "address"
      }
    ],
    "name": "stageDriverStatus",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "returnDriverStatus",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "clearDriverStatus",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "setUserConfirmation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "setCost",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "setDriverConfimation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "finalizeTrip",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
];

exports.transferAbi = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address payable",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ];
exports.address = '0x089b14dc432439c90c2eBE079c7Bd5f5F8E1128a';
exports.transferAddress = '0x3F624fa9849C537c14A2dd210C434F04d3511DBe';