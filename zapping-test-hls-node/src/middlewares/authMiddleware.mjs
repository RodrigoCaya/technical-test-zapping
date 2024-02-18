import pkg from 'jsonwebtoken'

const { verify } = pkg

const getResponse = (status, data, message) => {
  return {
    status,
    data: data != null ? data : undefined,
    message
  }
}

export const checkAccess = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token == null) return res.status(401).json(getResponse(401, null, 'No token provided'))
  verify(token, process.env.JWT_SECRET ?? 'hola_zapping', (err) => {
    if (err != null) return res.status(401).json(getResponse(401, null, 'Unauthorized'))
    next()
  })
}