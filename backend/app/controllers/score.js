const UserInfo = require('../models/userInfo');

const recordNewScore = function(req, res) {
  const user = req.session.user;
  const { score, hitRate } = req.body

  UserInfo.findById(user._id, function(err, user) {
    if (err) return err;

    user.scores.push({
      score,
      hitRate,
      date: new Date(),
    });

    user.save(function(err, updatedUser) {
      if (err) return err;

      res.json({
        message: '分数上传成功',
      });
    });
  });
};

const getScoreList = function(req, res) {
  const user = req.session.user;

  UserInfo.findOne({ name: user.name }, function(err, user) {
    if (err) return err;

    res.json({
      scores: user.scores
    });
  });
};

module.exports = {
  recordNewScore,
  getScoreList,
};