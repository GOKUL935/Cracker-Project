const Cracker = require('../models/Cracker');

exports.addCracker = async (req, res) => {
  try {
    const c = new Cracker(req.body);
    await c.save();
    res.json(c);
  } catch (err) { res.status(500).send('Server error'); }
};

exports.getCrackers = async (req, res) => {
  try { const list = await Cracker.find(); res.json(list); } catch (err) { res.status(500).send('Server error'); }
};

exports.getCracker = async (req, res) => {
  try { const c = await Cracker.findById(req.params.id); res.json(c); } catch (err) { res.status(500).send('Server error'); }
};

exports.updateCracker = async (req, res) => {
  try { const updated = await Cracker.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(updated); } catch (err) { res.status(500).send('Server error'); }
};

exports.deleteCracker = async (req, res) => {
  try { await Cracker.findByIdAndDelete(req.params.id); res.json({ msg: 'Deleted' }); } catch (err) { res.status(500).send('Server error'); }
};
