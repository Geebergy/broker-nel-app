const mongoose = require('mongoose');
      
const schema = new mongoose.Schema({
    avatar: String,
    number: String,
    role: String,
    accountLimit : Number,
    reserveAccountLimit: Number,
    balance: Number,
    deposit: Number,
    referralsBalance : Number,
    dailyDropBalance : Number,
    isUserActive: Boolean,
    referralsCount : Number,
    totalReferrals : Number,
    referralCode : String,
    referredBy: String,
    taskCounter: Number,
    hasPaid: Boolean,
    referralRedeemed: Boolean,
    referredUsers : Number,
    weeklyReferrals: Number,
    adRevenue: Number,
    name: String,
    email: String,
    lastLogin: Date,
    userId: { type: String, required: true, unique: true },
    completedTasks: [{ type: String }], // Array of task IDs
    firstLogin: { type: Boolean, default: true },
    amountToAdd: Number,
    adsClicked: Number,
    weeklyEarnings: Number,
    isAnonymous: Boolean,
    currencySymbol: String,
    country: String,
    slots: Number,
    previousReferralsBalance: { type: Number, default: 0 },
  });

 
  const User = mongoose.model('peoples', schema);
  module.exports = User;
