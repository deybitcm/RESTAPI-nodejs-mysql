import jwt from 'jsonwebtoken'

export function createAccessToken (payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
      (error, token) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(token)
      }
    )
  })
}
