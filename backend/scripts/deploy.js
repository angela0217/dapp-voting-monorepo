const hre = require("hardhat");

async function main() {
  const PollContract = await hre.ethers.getContractFactory("PollContract");
  const pollContract = await PollContract.deploy();

  await pollContract.waitForDeployment();  // ✅ Correct deployment
  const contractAddress = await pollContract.getAddress();  // ✅ Retrieve address

  console.log("PollContract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
