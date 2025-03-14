import { ethers } from "ethers";


// ✅ Load ABI dynamically from compiled Hardhat artifacts
const CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // Replace with your deployed contract address
const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "pollId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "PollCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "pollId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "optionIndex",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_options",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endTime",
          "type": "uint256"
        }
      ],
      "name": "createPoll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pollId",
          "type": "uint256"
        }
      ],
      "name": "endPoll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllPolls",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pollId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string[]",
              "name": "options",
              "type": "string[]"
            },
            {
              "internalType": "uint256[]",
              "name": "votes",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            }
          ],
          "internalType": "struct PollContract.Poll[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getMyPolls",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pollId",
          "type": "uint256"
        }
      ],
      "name": "getPoll",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pollCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "polls",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "pollId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pollId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_optionIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Correct ABI import

let contract;

export async function getContract() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask not found. Please install MetaMask.");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum); //for ethers v5
    const signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  } catch (error) {
    console.error("Error initializing contract:", error);
    throw error;
  }
  return contract;
}

// 🛠 Create a poll
export async function createPoll(title, desc, options, startTime, endTime) {
  const c = await getContract();
  const tx = await c.createPoll(title, desc, options, startTime, endTime);
  await tx.wait();
}

// 🛠 Fetch all polls
export async function getAllPolls() {
  const c = await getContract();
  return await c.getAllPolls();
}


// 🛠 Fetch a single poll by ID
export async function getPoll(pollId) {
    const c = await getContract();
    const data = await c.getPoll(pollId);
  
    // Convert the returned tuple into a readable object
    return {
      pollId: data[0].toNumber(),
      creator: data[1],
      title: data[2],
      description: data[3],
      options: data[4],
      votes: data[5].map(v => v.toNumber()), // Convert BigNumber to number
      active: data[6],
      startTime: data[7].toNumber(),
      endTime: data[8].toNumber()
    };
  }


export async function vote(pollId, optionIndex) {
  const c = await getContract();
  const tx = await c.vote(pollId, optionIndex);
  await tx.wait();
}


// 🛠 Fetch polls created by a specific user
export async function getMyPolls(address) {
  const c = await getContract();
  return await c.getMyPolls(address);
}
