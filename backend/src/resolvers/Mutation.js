const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(_parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },
  updateItem(_parent, args, ctx, info) {
    // takes a copy of the updates
    const updates = { ...args };
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(_parent, args, ctx, info) {
    const where = { id: args.id };
    const item = await ctx.db.query.item({ where }, `{ id, title }`);

    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(_parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      { data: { ...args, password, permissions: { set: ['USER'] } } },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  async signin(_parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error('Invalid Email or Password!');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid Email or Password!');

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  }
};

module.exports = Mutations;
