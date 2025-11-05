const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", (await deployer.getBalance()).toString());

  const HealthAI = await hre.ethers.getContractFactory("HealthAI");
  const healthAI = await HealthAI.deploy();

  await healthAI.waitForDeployment();
  console.log("HealthAI deployed to:", healthAI.target);

  // Verify on 0G Explorer
  console.log("Run: npx hardhat verify --network og_testnet", healthAI.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});