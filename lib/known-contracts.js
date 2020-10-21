import env from './environment'

import tokenAbi from './abi/token.json'
import unipoolAbi from './abi/unipool.json'

const KNOWN_CONTRACTS_BY_ENV = new Map([
  [
    '1',
    {
      TOKEN_INSTAR: '0x8193711b2763Bc7DfD67Da0d6C8c26642eafDAF3',
      TOKEN_UNI: '0x645b2fec49bc950cbcffb37abbfe80fe1e545b5a',
      UNIPOOL: '0x072644a36f9fd668dc6cc68fcaf26edd399a19fd',
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
