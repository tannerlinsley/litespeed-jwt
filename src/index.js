import jwt from 'jsonwebtoken'
import { Errors } from 'litespeed'

export default function (config) {
  if (!config.secret) {
    throw new Error('jwt secret key required')
  }

  return {
    check: (request, response) => {
      const authError = new Errors().unauthorized()

      const auth = request.headers.authorization
      if (!auth) throw authError

      const token = auth.replace(/^bearer /i, '')
      if (!token) throw authError

      const decoded = jwt.verify(token, config.secret)
      if (!decoded) throw authError

      response.pass('jwt', decoded)
      return decoded
    },
    sign: (payload) => {
      const configNoSecret = Object.assign({}, config)
      delete configNoSecret.secret
      return jwt.sign(payload, config.secret, configNoSecret)
    }
  }
}
