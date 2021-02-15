import tokenAbi from './abi/token.json'
import unipoolAbi from './abi/unipool.json'

const KNOWN_CONTRACTS_BY_TOKEN = new Map([
  [
    'ETH',
    {
      TOKEN_INSTAR: '0x8193711b2763Bc7DfD67Da0d6C8c26642eafDAF3',
      TOKEN_UNI: '0x645b2fec49bc950cbcffb37abbfe80fe1e545b5a',
      UNIPOOL: '0x645b2fec49bc950cbcffb37abbfe80fe1e545b5a',
    }
  ],
  [
    'WBTC',
    {
      TOKEN_INSTAR: '0x8193711b2763Bc7DfD67Da0d6C8c26642eafDAF3',
      TOKEN_UNI: '0x7530f10fb1d50f597c1c16731b0ce4b0a57e58d6',
      UNIPOOL: '0x7530f10fb1d50f597c1c16731b0ce4b0a57e58d6',
    }
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
  const knownContracts = KNOWN_CONTRACTS_BY_TOKEN.get(pair) || {}
  return [knownContracts[name] || null, getKnownAbi(name) || []]
}

export default KNOWN_CONTRACTS_BY_TOKEN
