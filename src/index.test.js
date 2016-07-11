import test from 'ava'
import sinon from 'sinon'
import index from './index'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiaGVsbG8gd29ybGQifQ.aJQLS3BbQ21CxWEkSWs7x8H9UkqZGlM0LtIk4kCKB7w'
const tokenWithInvalidSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiaGVsbG8gd29ybGQifQ.kLP_zFAckwG37XhLHG67_sDv6etokenSkxt2XYGk_gGH11pI'

test('.check', async (t) => {
  const spy = { pass: sinon.spy() }
  const payload = { test: 'hello world' }
  const config = { secret: 'iamasecret' }
  const request = { headers: { authorization: token } }
  t.deepEqual(await index(config).check(request, spy), payload)
  t.true(spy.pass.calledWith('jwt', payload))
  t.throws(() => index({}), Error)
  await t.throws(index(config).check({ headers: {} }))
  await t.throws(index(config).check({ headers: { authorization: '' } }))
  await t.throws(index(config).check({ headers: { authorization: 'bearer' } }))
  await t.throws(index(config).check({ headers: { authorization: 'Bearer' } }))
  await t.throws(index(config).check({ headers: { authorization: token.substring(1) } }))
  await t.throws(index(config).check({ headers: { authorization: tokenWithInvalidSecret } }))
})

test('.sign', async (t) => {
  const payload = { test: 'hello world' }
  const config = { secret: 'iamasecret' }
  t.regex(index(config).sign(payload), /^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/)
})
