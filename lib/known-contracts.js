import env from './environment'

import tokenAbi from './abi/token.json'
import unipoolAbi from './abi/unipool.json'

const KNOWN_CONTRACTS_BY_ENV = new Map([
  [
    '1',
    {
      TOKEN_INSTAR: '0x8193711b2763Bc7DfD67Da0d6C8c26642eafDAF3',
      TOKEN_UNI: '0x645b2fec49bc950cbcffb37abbfe80fe1e545b5a',
      UNIPOOL: '0x0a8bdB00A21BFf8C788946Bc2e3b685E954abd05',
    },
  ],
  [
    '3',
    {
      TOKEN_UNI: '0x79A69991018DB1D09c4DcBADa1102003582dB6e7',
      TOKEN_INSTAR: '0xe6F0622c24617D8cd0874a2F5355d706D513562B',
      UNIPOOL: '0x63e8eF0a387E00F88ED3070fF71752f3049E7316',
    },
  ],
  [
    '4',
    {
      TOKEN_UNI: '0x79A69991018DB1D09c4DcBADa1102003582dB6e7',
      TOKEN_INSTAR: '0xe6F0622c24617D8cd0874a2F5355d706D513562B',
      UNIPOOL: '0x63e8eF0a387E00F88ED3070fF71752f3049E7316',
    },
  ],
  [
    '42',
    {
      TOKEN_UNI: '0xff363e2e730d64eefb760e571b2bcf9ea828e846',
      TOKEN_INSTAR: '0x6a59FcD2954791D17f07bC04cfF96Bd4a2e2853c',
      UNIPOOL: '0x869Cc33a90D7AB364f987e0BBBc8cE56161DC16D',
    },
  ],
  [
    '1337',
    {
      TOKEN_UNI: '0x79A69991018DB1D09c4DcBADa1102003582dB6e7',
      TOKEN_INSTAR: '0xe6F0622c24617D8cd0874a2F5355d706D513562B',
      UNIPOOL: '0x63e8eF0a387E00F88ED3070fF71752f3049E7316',
    },
  ],
])

const ABIS = new Map([
  ['TOKEN_INSTAR', tokenAbi],
  ['TOKEN_UNI', tokenAbi],
  ['UNIPOOL', unipoolAbi],
])

export function getKnownAbi(name) {
  return ABIS.get(name)
}

export function getKnownContract(name) {
  const knownContracts = KNOWN_CONTRACTS_BY_ENV.get(env('CHAIN_ID')) || {}
  return [knownContracts[name] || null, getKnownAbi(name) || []]
}

export default KNOWN_CONTRACTS_BY_ENV
