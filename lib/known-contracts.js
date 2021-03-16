import env from './environment'

import tokenAbi from './abi/token.json'
import unipoolAbi from './abi/unipool.json'

const KNOWN_CONTRACTS_BY_ENV = new Map([
  [
    '1',
    new Map([
        [
          'WBTC',
          {
              TOKEN_INSTAR: '0x8193711b2763bc7dfd67da0d6c8c26642eafdaf3',
              TOKEN_UNI: '0xfa309661aa46a5ed9fa6556fff07f9a74a4894c6',
              UNIPOOL: '0x4Fb74fBC6DFE171cb1f8AFc269b8c380147874c7',
          }
        ],
        [
          'ETH',
          {
              TOKEN_INSTAR: '0x8193711b2763bc7dfd67da0d6c8c26642eafdaf3',
              TOKEN_UNI: '0x645b2fec49bc950cbcffb37abbfe80fe1e545b5a',
              UNIPOOL: '0x0a8bdB00A21BFf8C788946Bc2e3b685E954abd05',
          }
        ]
    ])
  ],
  [
    '42',
    new Map([
      [
        'WBTC',
        {
            TOKEN_INSTAR: '0x149eE47d4d4eeb9C0a3FBe38750aa0b13e1E2f08',
            TOKEN_UNI: '0xFaBEEc863682A5913a20E9C752B3DADBB17677ef',
            UNIPOOL: '0x0A4cEE73d44aFA5EA3C8cf38B421b150A09012C9',
        }
      ],
      [
        'ETH',
        {
            TOKEN_INSTAR: '0x149eE47d4d4eeb9C0a3FBe38750aa0b13e1E2f08',
            TOKEN_UNI: '0xFaBEEc863682A5913a20E9C752B3DADBB17677ef',
            UNIPOOL: '0x7ec433eB8a2B930FD36315C1e52136af9bd75494',
        }
      ]
  ])
  ]
])

const ABIS = new Map([
  ['TOKEN_INSTAR', tokenAbi],
  ['TOKEN_UNI', tokenAbi],
  ['UNIPOOL', unipoolAbi],
])

export function getKnownAbi(name) {
  return ABIS.get(name)
}

export function getKnownContract(pair, name) {
  const knownContracts = KNOWN_CONTRACTS_BY_ENV.get(env('CHAIN_ID')).get(pair) || {}
  return [knownContracts[name] || null, getKnownAbi(name) || []]
}

export default KNOWN_CONTRACTS_BY_ENV
