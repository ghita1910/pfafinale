const express = require('express');
const stripe = require('stripe')('VOTRE_CLÉ_API_SECRÈTE');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public')); // Servir les fichiers statiques
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: req.body.name },
            unit_amount: req.body.amount * 100, // Convertir en cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Serveur Stripe en cours d\'exécution sur http://localhost:4242'));
