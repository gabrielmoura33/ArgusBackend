export default interface IPaymentProvider {
  createPaymentClient(name: string, email: string): Promise<any>;
  registerCreditCard(customerId, sourceId): Promise<any>;
}
