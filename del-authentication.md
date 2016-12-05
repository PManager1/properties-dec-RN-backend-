jp_ca
J------

sohan
J------


==========
find articles by username: 

https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

http://stackoverflow.com/questions/19254583/how-do-i-host-multiple-node-js-sites-on-the-same-ip-server-with-different-domain




exports.list_by_userID = function (req, res) {
  Article.find({ user_id: 'jp_ca'}).sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};