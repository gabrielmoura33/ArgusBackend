import Stripe from 'stripe';
import IPaymentProvider from '../model/IPaymentProvider';

export default class StripePaymentProvider implements IPaymentProvider {
  async registerCreditCard(customerId: any, sourceId: any): Promise<any> {
    const paymentClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2020-08-27',
    });
    const card = await paymentClient.customers.createSource(customerId, {
      source: sourceId,
    });

    return card;
  }

  public async createPaymentClient(name: string, email: string): Promise<any> {
    const paymentClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2020-08-27',
    });
    const customer = await paymentClient.customers.create({
      name,
      email,
    });

    return customer;
  }
}
