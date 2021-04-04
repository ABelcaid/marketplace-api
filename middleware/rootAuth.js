const jwt = require('jsonwebtoken')

function verifyRootToken(req, res, next) {
  

  const token = req.cookies['jwt']

  if (!token) return res.status(401).json({
    error: 'unauthenticated'
  })
  try {

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {

      if (err) {
        res.sendStatus(403);

      }

        req.admin = admin;

      next()

    })


  } catch (error) {
    res.status(400).json({
      error: 'unauthenticated'
    })
  }
}


function verifyUserToken(req, res, next) {
  

  const token = req.cookies['jwt']

  if (!token) return res.status(401).json({
    error: 'unauthenticated'
  })
  try {

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {

      if (err) {
        res.sendStatus(403);

      }

        req.user = user;

      next()

    })


  } catch (error) {
    res.status(400).json({
      error: 'unauthenticated'
    })
  }
}







module.exports = {
  verifyRootToken,verifyUserToken
};