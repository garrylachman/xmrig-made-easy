export type NetworkConfig = {
  retries: number;
  retryPause: number;
  userAgent: string | null;
  donateLevel: number;
  donateOverProxy: number;
  tls: boolean;
};

export type PoolConfig = {
  algo: string | null;
  coin: string | null;
  url: string;
  user: string;
  pass: string;
  rigId: string | null;
  nicehash: boolean;
  keepalive: boolean;
  enabled: boolean;
  tls: boolean;
  tlsFingerprint: string | null;
  daemon: boolean;
  daemonPollInterval: number;
  socks5: number | string | null;
  selfSelect: string | null;
  submitToOrigin: boolean;
};

export type ApiConfig = {
  id: string | null;
  workerId: string | null;
};

export type HttpConfig = {
  enabled: boolean;
  host: string;
  port: number;
  accessToken: string | null;
  restricted: boolean;
};

export type LoggingConfig = {
  syslog: boolean;
  logFile: string | null;
  printTime: number;
  healthPrintTime: number;
  colors: boolean;
  verbose: number;
};

export type BenchmarkConfig = {
  size: string | null;
  algo: 'rx/0' | 'rx/wow';
  submit: boolean;
  verify: string | null;
  seed: string | null;
  hash: string | null;
};

export type MiscConfig = {
  autosave: boolean;
  background: boolean;
  title: string | boolean;
  dmi: boolean;
  watch: boolean;
  pauseOnBattery: boolean;
  pauseOnActive: boolean;
  _pauseOnActive: number;
};

export type RandomXConfig = {
  init: number;
  initAvx2: number;
  mode: 'auto' | 'fast' | 'light';
  oneGbPages: boolean;
  rdmsr: boolean;
  wrmsr: boolean;
  cache_qos: boolean;
  numa: boolean;
  scratchpad_prefetch_mode: number;
};

export type CudaConfig = {
  enabled: boolean;
  loader: string | null;
  nvml: boolean;
} & Record<string, unknown>;

export type OpenCLConfig = {
  enabled: boolean;
  loader: string | null;
  platform: 'AMD' | null | number;
  adl: boolean;
  cache: boolean;
} & Record<string, unknown>;

export type CpuConfig = {
  enabled: boolean;
  hugePages: boolean;
  _hugePages: number;
  hugePagesJit: boolean;
  hwAes: boolean | null;
  priority: number | null;
  memoryPool: boolean;
  yield: boolean;
  maxThreadsHint: number;
  asm: boolean | string;
  argon2Impl: 'x86_64' | 'SSE2' | 'SSSE3' | 'XOP' | 'AVX2' | 'AVX-512F' | null;
  astrobwtMaxSize: number;
  astrobwtAvx2: boolean;
};

export const Algos: string[] = [
  'argon2',
  'astrobwt',
  'cn',
  'cn-heavy',
  'cn-lite',
  'cn-pico',
  'cn/gpu',
  'cn/upx2',
  'panthera',
  'rx',
  'rx/wow',
  'cn-lite/0',
  'cn/0',
  'rx/arq',
  'rx/keva',
];

export type ProfileValue = Array<unknown> | boolean | null | string;

export type ProfilesConfig = Record<string, ProfileValue>;
export type CpuProfilesConfig = ProfilesConfig;

export type XMRigConfig = {
  pools: PoolConfig[];
  api: ApiConfig;
  http: HttpConfig;
  benchmark?: BenchmarkConfig;
  randomx?: RandomXConfig;
  cpu?: CpuConfig & CpuProfilesConfig;
  cuda?: CudaConfig;
  opencl?: OpenCLConfig;
} & NetworkConfig &
  LoggingConfig &
  MiscConfig;
