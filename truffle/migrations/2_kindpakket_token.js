var KindpakketToken = artifacts.require("./KindpakketToken.sol");

module.exports = function(deployer) {
  deployer.deploy(KindpakketToken, 600000000);
};
