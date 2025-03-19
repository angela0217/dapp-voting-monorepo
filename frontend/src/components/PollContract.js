import { ethers } from "ethers";
import PollContractABI from "./PollContractABI.json"; // Ensure this ABI file exists

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with actual address

const getContract = () => {
  if (!window.ethereum) {
    console.error("MetaMask is not installed.");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, PollContractABI, signer);
};

export default getContract;
