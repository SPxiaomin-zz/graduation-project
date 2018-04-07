const UserInfo = require('../models/userInfo');

const signIn = function(req, res) {
  const name = req.body.name;
  const password = req.body.password;

  UserInfo.findOne({ name: name }, function(err, user) {
    if (err) return err

    if (!user) {
      res.json({
        error: '用户不存在',
      });

      return;
    }

    if (user.password === password) {
      req.session.user = user;
      res.json({
        error: null,
        message: '登录成功',
        user,
      });
    } else {
      res.json({
        error: '密码错误',
      });
    }
  });
};

const signUp = function(req, res) {
  const name = req.body.name;
  const password = req.body.password;

  UserInfo.findOne({ name: name }, function(err, user) {
    if (err) return err;

    if (user) {
      res.json({
        error: '用户已存在',
      })

      return;
    }

    UserInfo.create({
      name,
      password,
    }, function(err, user) {
      if (err) {
        console.log(err);
      }

      res.json({
        error: null,
        message: '注册成功',
        user,
      })
    });

  });

};

const authentication = function(req, res, next) {
  // TODO: 还要再验证一下这样写可行么？如果没有登录req.session是怎样的？登录了之后是怎样的？
  if (req.session.user) {
    next()
  } else {
    res.json({
      error: '未登录',
    })
  }
};

module.exports = {
  signIn,
  signUp,
  authentication,
}