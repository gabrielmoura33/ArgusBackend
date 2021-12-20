import { Router } from 'express';
import Stripe from 'stripe';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import AppError from '@shared/errors/AppError';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const stripe = new Stripe(
  'sk_test_51K0yhXCuchXickzYNmpXuwxdcK9PKDwVib6D1wRMxU17jglEkghRuh7fD342R7crlMnmlyAEp7O0xnEN6WCx97xU00ziAejlyr',
  {
    apiVersion: '2020-08-27',
  },
);
// import { celebrate, Segments, Joi } from 'celebrate';

const paymentsRoutes = Router();

paymentsRoutes.post('/save-card', async (req, res) => {
  try {
    const { name, email, cardDetails } = req.body;

    // const customer = await stripe.customers.create();
    const card = await stripe.customers.createSource('cus_KoCvVQkb8MbtjB', {
      source: `tok_${cardDetails.brand.toLowercase()}`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
paymentsRoutes.post('/checkout', ensureAuthenticated, async (req, res) => {
  const { id } = req.user;
  const { appointment_id } = req.body;

  const appointmentsRepository = new AppointmentsRepository();
  const usersRepository = new UsersRepository();

  const logged_user = await usersRepository.findById(id);
  const appointment = await appointmentsRepository.findById(appointment_id);

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }
  if (!logged_user) {
    throw new AppError('User not found', 404);
  }

  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create({
    name: logged_user.name,
    email: logged_user.email,
  });
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' },
  );
  const amount = appointment.final_price;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'brl',
    customer: customer.id,
    payment_method_types: ['card'],
    transfer_data: {
      destination: 'acct_1K5zkJ2RpJaKcdHE',
    },
    application_fee_amount: amount * 0.2,
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51K0yhXCuchXickzYuxs6GY4qztkcCwv4UffS29AdfzbMy8M7ZlB4QwoMjxxhjMO7Cp8kv72fuAcV0oLy74ksY44c00jXci85qQ',
  });
});

paymentsRoutes.get('/account-link', async (req, res) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: 'acct_1K5zkJ2RpJaKcdHE',
      refresh_url: 'https://stripe.com/',
      return_url: 'http://google.com',
      type: 'account_onboarding',
    });

    // await fs.writeFileSync(account, "./account.json");
    // console.log(account);

    return res.json(accountLink);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

export default paymentsRoutes;
