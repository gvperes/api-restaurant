const User = require('../models/User');

module.exports = {
  async index (req, res) {
    const users = await User.find().sort('-createdAt');
    console.log('users', users);

    return res.json(users);
  },
  async store (req, res) {
    const { userName, password } = req.body;

    const users = await User.create({
      userName,
      password
    });
    return res.json(users);
  },
  async login (req, res) {
    const { userName, password } = req.body;
    const users = await User.find();
    let index = -1;
    let response = {};

    for (let i = 0; i < users.length; i++) {
      if (users[i].userName === userName) {
        index = i;
      }
    }
    console.log(index);
    const userSend = index !== -1 ? users[index] : false;
    console.log(userSend && userSend.userName === userName && userSend.password === password);
    if (userSend && userSend.userName === userName && userSend.password === password) {
      response.status = 'success';
      response.token = '5646504sdfdfasdf560adsf';
      console.log('entrou');
    } else {
      response.status = 'error';
      response.message = 'Usuário e senha incorretos';
    }

    return res.json(response);
  },

  async delete (req, res) {
    const user = await User.findById(req.params.id);
    await user.delete();
    return res.json(user);
  }
};
