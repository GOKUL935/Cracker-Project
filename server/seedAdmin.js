require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
mongoose.connect(process.env.MONGO_URI).then(async ()=>{
  const hashed = await bcrypt.hash('admin123', 10);
  const admin = new User({ name:'Admin', email:'admin@vendor.com', password:hashed, role:'admin', mobileNo:'0000000000'});
  await admin.save();
  console.log('Admin created'); process.exit();
}).catch(err=>console.error(err));
