const Order = require('../models/Order');
const Cracker = require('../models/Cracker');

exports.placeOrder = async (req, res) => {
  try {
    const { crackersList, customerAddress, customerMobileNo } = req.body;
    let totalPrice = 0;
    const items = [];
    for(const it of crackersList) {
      const cracker = await Cracker.findById(it.cracker);
      if(!cracker) return res.status(400).json({ msg: 'Cracker missing' });
      if(cracker.stock < it.qty) return res.status(400).json({ msg: `Insufficient stock for ${cracker.name}` });
      cracker.stock -= it.qty;
      await cracker.save();
      const price = cracker.price * it.qty;
      totalPrice += price;
      items.push({ cracker: cracker._id, name: cracker.name, qty: it.qty, price: cracker.price });
    }

    const order = new Order({
      customerId: req.user._id,
      customerName: req.user.name,
      crackersList: items,
      customerAddress,
      customerMobileNo,
      totalPrice
    });
    await order.save();
    res.json(order);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id }).populate('crackersList.cracker');
    res.json(orders);
  } catch (err) { res.status(500).send('Server error'); }
};

exports.getOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).send('Server error'); }
};
