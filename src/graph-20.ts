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
    let owner = loadOrCreateUser(event.params.owner.toHex());
  
    // Load or create the user entity for the spender (who is approved)
    let spender = loadOrCreateUser(event.params.spender.toHex());
  
    // Create a new balance entity for the owner
    let ownerBalance = new Balance(owner.id + "-" + event.block.timestamp.toString());
    ownerBalance.user = owner.id;
    ownerBalance.timestamp = event.block.timestamp;
    ownerBalance.transactionHash = event.transaction.hash;
    ownerBalance.save();
  
    // Create a new balance entity for the spender
    let spenderBalance = new Balance(spender.id + "-" + event.block.timestamp.toString());
    spenderBalance.user = spender.id;
    spenderBalance.timestamp = event.block.timestamp;
    spenderBalance.transactionHash = event.transaction.hash;
    spenderBalance.save();
  }

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}

//This Subgraph code listens for events emitted by the Graph20 contract 
//and processes them to track user and balance entities. 
//It saves this information in a decentralized storage for later querying via The Graph. 
//You can modify the handlers to suit your specific needs, such as logging additional metadata or handling other events.






