const { hashPassword, verifyPassword } = require('../utils/password');
const jwtUtils = require('../utils/jwt');
const User = require('../models/user');

// REGISTER
async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );

    if (alreadyExistsUser) {
      return res.status(409).json({ message: 'User with email already exists!' });
    }

    const newUser = new User({ fullName, email, password: hashedPassword });
    // const savedUser = await newUser.save().catch((err) => {
    //   console.log('Error: ', err);
    //   res.status(500).json({ error: 'Cannot register user at the moment!' });
    // });

    const savedUser = await newUser.save();
    const jwtToken = jwtUtils.generateToken(savedUser)
    if(savedUser) {
      res.status(201).send({jwtToken})
    }

    // await User.create(newUser, (err, data) => {
    //   if(err) {
    //     res.status(500).send({
    //       message: err.message || 'Failed creating new user account'
    //     });
    //   } else {
    //     const jwtToken = jwtUtils.generateToken(data);
    //     res.status(201).send({ jwtToken })
    //   }
    // })

    // if (savedUser) res.status(201).json({ message: 'User account created. Thanks for registering' });
    
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong, ${err.message}` });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );
    
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or password does not match!' });
    }

    if (!isPasswordValid) throw new Error('Invalid password');

    // const jwtToken = jwt.sign(
    //   { id: user.id, email: user.email },
    //   process.env.JWT_KEY
    // );

    const jwtToken = jwtUtils.generateToken(user);

    res.status(200).json({ message: 'Welcome Back!', token: jwtToken });
  } catch(err) {
    console.log(err)
    return res.status(401).json({ message: 'Invalid credentials' });
  }

}

module.exports = {
  signup,
  login
}