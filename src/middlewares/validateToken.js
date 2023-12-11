import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: 'No autorizado' })
    }
    req.user = decoded
    next()
  })
}
