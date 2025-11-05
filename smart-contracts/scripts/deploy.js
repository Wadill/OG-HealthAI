const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.parseUnits("1000000", 18); // 1,000,000 tokens with 18 decimals

  console.log("Deploying MyToken contract...");

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);

  // No need to wait for deployment explicitly with Hardhat V6 and ethers v6
  // The deploy function returns a promise that resolves once the contract is deployed.
  // However, getting the address requires the deployment transaction to be mined.
  // Use Contract.waitForDeployment() if you need the address immediately or need
  // to ensure the transaction is mined before proceeding.

  // await myToken.waitForDeployment(); // Optional: wait for deployment tx to be mined

  const contractAddress = await myToken.getAddress();
  console.log(`MyToken deployed to: ${contractAddress}`);
  console.log(`Transaction hash: ${myToken.deploymentTransaction().hash}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 