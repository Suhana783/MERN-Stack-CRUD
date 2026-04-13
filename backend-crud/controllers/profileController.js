const Profile = require('../models/profileModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerProfile = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and Password are required');
    }
     
     if (!email.includes('@')) {
        return res.status(400).send("Invalid email format");
     }

     if (password.length < 6) {
        return res.status(400).send("Password must be atleast 6 characters");
     }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = new Profile({
        name,
        email,
        password: hashedPassword
    });

    await profile.save();
    res.send('Profile Registered');
};

exports.loginProfile = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and Password are required");
  }

  const profile = await Profile.findOne({ email });

  if (!profile) return res.send('Profile not found');

  const isMatch = await bcrypt.compare(password, profile.password);

  if (!isMatch) return res.send('Invalid password');

  const token = jwt.sign({ id: profile._id }, 'secretkey');

  res.json({ token });
};

exports.getCurrentProfile = async (req, res) => {
        const profile = await Profile.findById(req.profile.id).select('-password');

        if (!profile) {
            return res.status(404).send('Profile not found');
        }

        res.json(profile);
};

exports.updateProfile = async (req, res) => {
    await Profile.findByIdAndUpdate(req.params.id, req.body);
    res.send('Profile Updated');
};

exports.deleteProfile = async (req, res) => {
    await Profile.findByIdAndDelete(req.params.id);
    res.send('Profile Deleted');
};