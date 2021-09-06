const Migrations = artifacts.require("Migrations");
const DaiToken = artifacts.require("DaiToken");


module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiToken,"1000000000000000000000");
  
  // const daitoken = await DaiToken.at(DaiToken.address);
  // await daitoken.mint(
  //   '0xb1468770d3363F3Ea5F2e759908B7053879636CC',
  //   '1000000000000000000000'
  // )

};
