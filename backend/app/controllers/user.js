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
      });

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
      });
    });

  });

};

const getAllUsers = function(req, res, next) {
  UserInfo.find({}, function(err, users) {
    if (err) return err;

    res.json({
      users: users,
    });
  });
};

const deleteUserByName = function(req, res, next) {
  const name = req.params.name;

  UserInfo.deleteOne({ name: name }, function(err) {
    if (err) return err;

    res.json({
      message: `删除${name}成功`
    });
  });
};

const updateUserPassword = function(req, res, next) {
  const name = req.params.name;
  const password = req.body.password;

  UserInfo.findOne({ name: name }, function(err, user) {
    if (err) return err;

    user.password = password;

    user.save(function(err, updatedUser) {
      if (err) return err;

      res.json({
        message: `更改${name}的密码成功`,
      });
    });
  });
};

const authentication = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.json({
      error: '未登录',
    })
  }
};

const adminAuthentication = function(req, res, next) {
  if (req.session.user && req.session.user.name == 'admin') {
    next()
  } else if (req.session.user) {
    res.json({
      error: '非管理员',
    })
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
  adminAuthentication,

  getAllUsers,
  deleteUserByName,
  updateUserPassword,
}