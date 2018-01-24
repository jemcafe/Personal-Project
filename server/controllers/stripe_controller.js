require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const postStripeCharge = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({ error: stripeErr });
//   } else {
//     res.status(200).send({ success: stripeRes });
//   }
// }

// const paymentApi = app => {
//   app.get('/', (req, res) => {
//     res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
//   });

//   app.post('/', (req, res) => {
//     stripe.charges.create(req.body, res => (stripeErr, stripeRes) => {
//         if (stripeErr) {
//           res.status(500).send({ error: stripeErr });
//         } else {
//           res.status(200).send({ success: stripeRes });
//         }
//       });
//   });

//   return app;
// };

module.exports = {
    paymentApi ( req, res ) {
        stripe.charges.create(req.body, res => (stripeErr, stripeRes) => {
            if (stripeErr) {
              res.status(500).send({ error: stripeErr });
            } else {
              res.status(200).send({ success: stripeRes });
            }
        });
    }
};