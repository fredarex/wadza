import Web3 from './web3'
import { contracts } from './../config'
import { IContractInstances } from '../types/types'

class Contracts {
  private static _instances: IContractInstances

  public static get instances() {
    if (Contracts._instances) return Contracts._instances

    const web3 = Web3.instance
    const ContractInstances: any = {}
    contracts.forEach((contract) => {
      ContractInstances[contract.name] = new web3.eth.Contract(
        contract.abi as any,
        contract.address,
      )
    })
    Contracts._instances = ContractInstances
    return Contracts._instances
  }
}

export default Contracts
