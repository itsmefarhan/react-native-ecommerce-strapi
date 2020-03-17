"use strict";
const config = require("../../../../client/myconfig");
const stripe = require("stripe")(config.SECRET_KEY);
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    const { address, postalCode, city, products, amount } = ctx.request.body;

    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: "tok_visa"
    });
    const order = await strapi.services.orders.create({
      user: ctx.state.user._id,
      address,
      postalCode,
      city,
      products,
      amount
    });
    return order;
  }
};
