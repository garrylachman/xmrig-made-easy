/* eslint-disable import/prefer-default-export */
import {
  Algos,
  ApiConfig,
  BenchmarkConfig,
  CpuConfig,
  CpuProfilesConfig,
  CudaConfig,
  HttpConfig,
  LoggingConfig,
  MiscConfig,
  NetworkConfig,
  OpenCLConfig,
  PoolConfig,
  RandomXConfig,
} from './types';

export const networkDefaultConfig: NetworkConfig = {
  retries: 5,
  retryPause: 5,
  donateLevel: 1,
  donateOverProxy: 1,
  tls: false,
  userAgent: null,
};

export const httpDefaultConfig: HttpConfig = {
  enabled: false,
  host: '127.0.0.1',
  port: 0,
  accessToken: null,
  restricted: true,
};

export const loggingDefaultConfig: LoggingConfig = {
  syslog: false,
  logFile: null,
  printTime: 60,
  healthPrintTime: 60,
  colors: true,
  verbose: 0,
};

export const apiDefaultConfig: ApiConfig = {
  id: null,
  workerId: null,
};

export const benchmarkDefaultConfig: BenchmarkConfig = {
  size: null,
  algo: 'rx/0',
  submit: false,
  verify: null,
  seed: null,
  hash: null,
};

export const miscDefaultConfig: MiscConfig = {
  autosave: true,
  background: false,
  title: true,
  dmi: true,
  watch: true,
  pauseOnBattery: false,
  pauseOnActive: false,
  _pauseOnActive: 60,
};

export const poolDefaultConfig: PoolConfig = {
  algo: null,
  coin: null,
  url: 'donate.v2.xmrig.com:3333',
  user: 'YOUR_WALLET_ADDRESS',
  pass: 'x',
  rigId: null,
  nicehash: false,
  keepalive: false,
  enabled: true,
  tls: false,
  tlsFingerprint: null,
  daemon: false,
  daemonPollInterval: 1000,
  socks5: null,
  selfSelect: null,
  submitToOrigin: false,
};

export const randomXDefaultConfig: RandomXConfig = {
  init: -1,
  initAvx2: -1,
  mode: 'auto',
  oneGbPages: false,
  rdmsr: true,
  wrmsr: true,
  cache_qos: false,
  numa: true,
  scratchpad_prefetch_mode: 1,
};

export const cudaDefaultConfig: CudaConfig = {
  enabled: false,
  loader: null,
  nvml: true,
  [`cn/0`]: false,
  [`cn-lite/0`]: false,
};

export const openCLDefaultConfig: OpenCLConfig = {
  enabled: false,
  cache: false,
  loader: null,
  platform: 'AMD',
  adl: true,
  [`cn/0`]: false,
  [`cn-lite/0`]: false,
};

export const cpuDefaultConfig: CpuConfig = {
  enabled: true,
  hugePages: true,
  _hugePages: null,
  hugePagesJit: false,
  hwAes: null,
  priority: null,
  memoryPool: false,
  yield: true,
  maxThreadsHint: 100,
  asm: true,
  argon2Impl: null,
  astrobwtMaxSize: 550,
  astrobwtAvx2: false,
};

export const cpuProfilesDefaultConfig: CpuProfilesConfig = {
  ...Algos.reduce((acc, curr) => ({ ...acc, [curr]: null }), {}),
  ...{
    'rx/arq': 'rx/wow',
    'rx/keva': 'rx/wow',
    'cn/0': false,
    'cn-lite/0': false,
  },
};
