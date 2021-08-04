const { ethers } = require('hardhat')

async function main () {
  const IFO = await ethers.getContractFactory("IFO")
  const ifo = await IFO.attach('0xf65e5E0f50B1998b43C498379D97e36bc8d86bE5')
  const owner = await ifo.owner()
  console.log(owner)
}
main()


// 0xf65e5E0f50B1998b43C498379D97e36bc8d86bE5
// 0x453D1f64611C065Ff7c99D3C457754A2e20314b8