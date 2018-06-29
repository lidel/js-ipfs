/* eslint-env mocha */
'use strict'

const tests = require('interface-ipfs-core')
const CommonFactory = require('../utils/interface-common-factory')
const isNode = require('detect-node')

describe('interface-ipfs-core tests', () => {
  const defaultCommonFactory = CommonFactory.create()

  tests.bitswap(defaultCommonFactory, { skip: !isNode })

  tests.block(defaultCommonFactory)

  tests.bootstrap(defaultCommonFactory)

  tests.config(defaultCommonFactory)

  tests.dag(defaultCommonFactory)

  tests.dht(defaultCommonFactory, {
    skip: { reason: 'TODO: DHT is not implemented in js-ipfs yet!' }
  })

  tests.files(defaultCommonFactory, {
    skip: [
      {
        name: 'cp',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'mkdir',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'stat',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'rm',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'read',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'readReadableStream',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'readPullStream',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'write',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'mv',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'flush',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      },
      {
        name: 'ls',
        reason: 'TODO: MFS is not implemented in js-ipfs yet!'
      }
    ]
  })

  tests.key(CommonFactory.create({
    spawnOptions: {
      args: ['--pass ipfs-is-awesome-software'],
      initOptions: { bits: 512 }
    }
  }))

  tests.ls(defaultCommonFactory)

  tests.miscellaneous(CommonFactory.create({
    // No need to stop, because the test suite does a 'stop' test.
    createTeardown: () => cb => cb()
  }))

  tests.object(defaultCommonFactory)

  tests.pin(defaultCommonFactory)

  tests.ping(defaultCommonFactory, {
    skip: isNode ? null : {
      reason: 'FIXME: ping implementation requires DHT'
    }
  })

  tests.pubsub(CommonFactory.create({
    spawnOptions: {
      args: ['--enable-pubsub-experiment'],
      initOptions: { bits: 512 }
    }
  }), {
    skip: isNode ? null : {
      reason: 'FIXME: disabled because no swarm addresses'
    }
  })

  tests.repo(defaultCommonFactory, {
    skip: [
      // repo.gc
      {
        name: 'gc',
        reason: 'TODO: repo.gc is not implemented in js-ipfs yet!'
      }
    ]
  })

  tests.stats(defaultCommonFactory)

  tests.swarm(CommonFactory.create({
    createSetup ({ ipfsFactory, nodes }) {
      return callback => {
        callback(null, {
          spawnNode (repoPath, config, cb) {
            if (typeof repoPath === 'function') {
              cb = repoPath
              repoPath = undefined
            }

            if (typeof config === 'function') {
              cb = config
              config = undefined
            }

            const spawnOptions = { repoPath, config, initOptions: { bits: 512 } }

            ipfsFactory.spawn(spawnOptions, (err, _ipfsd) => {
              if (err) {
                return cb(err)
              }

              nodes.push(_ipfsd)
              cb(null, _ipfsd.api)
            })
          }
        })
      }
    }
  }), { skip: !isNode })

  tests.types(defaultCommonFactory, { skip: { reason: 'FIXME: currently failing' } })

  tests.util(defaultCommonFactory, { skip: { reason: 'FIXME: currently failing' } })
})
