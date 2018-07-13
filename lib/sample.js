/**
 * Sample transaction processor function.
 * @param {org.acme.empty.kycTransaction} tx The sample transaction instance.
 * @transaction
 */
async function kycTransaction(tx) {  // eslint-disable-line no-unused-vars
   
    let customer = tx.kycdoc.customer;
    var status=customer.kycStatus;
     customer.kycStatus=tx.status;
    // Get the asset registry for the asset.
    const participant = await getParticipantRegistry('org.acme.empty.Customer');
    // Update the asset in the asset registry.
    await participant.update(customer);
      // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.acme.empty', 'kycEvent');
    event.customer = customer;
    event.oldStatus = status;
    event.newStatus = tx.status;
    emit(event);
  
}
