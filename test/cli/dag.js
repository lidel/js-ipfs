/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const runOnAndOff = require('../utils/on-and-off')
const path = require('path')

describe('dag', () => runOnAndOff.off((thing) => {
  let ipfs

  before(() => {
    ipfs = thing.ipfs
  })

  it('get', function () {
    this.timeout(20 * 1000)

    // put test eth-block
    return ipfs(`block put --format eth-block --mhtype keccak-256 ${path.resolve(path.join(__dirname, '..'))}/fixtures/test-data/eth-block`).then((out) => {
      expect(out).to.eql('bagiacgzarkhijr4xmbp345ovwwxra7kcecrnwcwtl7lg3g7d2ogyprdswjwq\n')
      // lookup path on eth-block
      return ipfs('dag get bagiacgzarkhijr4xmbp345ovwwxra7kcecrnwcwtl7lg3g7d2ogyprdswjwq/parentHash')
    }).then((out) => {
      const expectHash = Buffer.from('c8c0a17305adea9bbb4b98a52d44f0c1478f5c48fc4b64739ee805242501b256', 'hex')
      expect(out).to.be.eql('0x' + expectHash.toString('hex') + '\n')
    })
  })
}))
