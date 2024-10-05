import { BigInt } from "@graphprotocol/graph-ts"
import {
  Graph20,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/Graph20/Graph20"
import {User, Balance } from "../generated/schema"
import { loadOrCreateUser } from "./utils";

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from)

  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from)

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner
  // entity.spender = event.params.spender

  // // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.decimals(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
    // Load or create the user entity for the owner (who gives approval)
}
    
    export function handleTransfer(event: Transfer): void {
      
      let sender = loadOrCreateUser(event.params.from.toHex())
      let receiver = loadOrCreateUser(event.params.to.toHex())
      
      // Loading sender's balance
      let senderBalance = Balance.load(sender.id + "-" + event.address.toHex())
      if (senderBalance == null) {
        senderBalance = new Balance(sender.id + "-" + event.address.toHex())
        senderBalance.user = sender.id
        senderBalance.token = event.address.toHex()
        senderBalance.amount = BigInt.fromI32(0)
      }
    
      // Loading receiver's balance
      let receiverBalance = Balance.load(receiver.id + "-" + event.address.toHex())
      if (receiverBalance == null) {
        receiverBalance = new Balance(receiver.id + "-" + event.address.toHex())
        receiverBalance.user = receiver.id
        receiverBalance.token = event.address.toHex()
        receiverBalance.amount = BigInt.fromI32(0)
      }
    
      // Updating balances
      senderBalance.amount = senderBalance.amount.minus(event.params.value)
      receiverBalance.amount = receiverBalance.amount.plus(event.params.value)
    
      senderBalance.save()
      receiverBalance.save()
    }
  

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}








