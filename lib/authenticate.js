var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  var decoded;
  try {
    // header from Authorization: token myToken
    console.log(req.headers);
    var token = req.headers.authorization.split(' ');
    decoded = jwt.verify(token, process.env.SECRET || 'change me');
    req.decodedToken = decodedToken;
    next();
  };
  catch (e) {
    console.log(e);
    return res.status(418).json({msg: 'authentication failed'});
  };

};
