/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { newConfig } from 'renderer/utils/file-utils';

import {
  apiDefaultConfig,
  benchmarkDefaultConfig,
  cpuDefaultConfig,
  cpuProfilesDefaultConfig,
  cudaDefaultConfig,
  httpDefaultConfig,
  loggingDefaultConfig,
  miscDefaultConfig,
  networkDefaultConfig,
  openCLDefaultConfig,
  poolDefaultConfig,
  randomXDefaultConfig,
} from './data';
import { transformKeys } from './transformer';
import {
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

export type IUseConfig<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
  toJSON: Record<string, unknown> | Record<string, unknown>[];
  fromJSON: (data: Record<string, unknown> | Record<string, unknown>[]) => void;
};

const useConfig = <T extends unknown>(initialValue: T): IUseConfig<T> => {
  const initialValueMemo = React.useMemo<T>(() => initialValue, []);
  const [state, setState] = React.useState<T>(initialValue);
  const reset = () => setState(initialValueMemo);
  const toJSON = React.useMemo(() => {
    if (Array.isArray(state)) {
      return state.map((item) => transformKeys(item));
    }
    return transformKeys(state as Record<string, unknown>);
  }, [state]);
  const fromJSON = (
    data: Record<string, unknown> | Record<string, unknown>[]
  ) => {
    if (Array.isArray(data)) {
      return setState(data as T);
    }
    if (typeof data === 'object') {
      return Object.keys(data).forEach((key) => {
        if (Object.keys(state as Record<string, unknown>).includes(key)) {
          setState((oldState: any) => ({ ...oldState, [`${key}`]: data[key] }));
        }
      });
    }
    return null;
  };

  return {
    state,
    setState,
    reset,
    toJSON,
    fromJSON,
  };
};

const useXMRigConfig = () => {
  const [uuid, setUuid] = React.useState<string>(uuidv4());
  const {
    network,
    http,
    logging,
    api,
    benchmark,
    misc,
    randomx,
    cuda,
    opencl,
    cpu,
    cpuProfiles,
    pools,
  } = {
    network: useConfig<NetworkConfig>(networkDefaultConfig),
    http: useConfig<HttpConfig>(httpDefaultConfig),
    logging: useConfig<LoggingConfig>(loggingDefaultConfig),
    api: useConfig<ApiConfig>(apiDefaultConfig),
    benchmark: useConfig<BenchmarkConfig>(benchmarkDefaultConfig),
    misc: useConfig<MiscConfig>(miscDefaultConfig),
    randomx: useConfig<RandomXConfig>(randomXDefaultConfig),
    cuda: useConfig<CudaConfig>(cudaDefaultConfig),
    opencl: useConfig<OpenCLConfig>(openCLDefaultConfig),
    cpu: useConfig<CpuConfig>(cpuDefaultConfig),
    cpuProfiles: useConfig<CpuProfilesConfig>(cpuProfilesDefaultConfig),
    pools: useConfig<PoolConfig[]>([poolDefaultConfig]),
  };

  const reset = (isNewConfig = true) => {
    network.reset();
    http.reset();
    logging.reset();
    api.reset();
    benchmark.reset();
    misc.reset();
    randomx.reset();
    cuda.reset();
    opencl.reset();
    pools.reset();
    cpu.reset();
    cpuProfiles.reset();
    setUuid(uuidv4());
    if (isNewConfig) {
      newConfig();
    }
  };

  const toJSON = () => {
    const jsonObj = {
      ...network.toJSON,
      ...misc.toJSON,
      ...logging.toJSON,
      http: http.toJSON,
      api: api.toJSON,
      randomx: randomx.toJSON,
      cpu: {
        ...cpu.toJSON,
        ...cpuProfiles.toJSON,
      },
      cuda: cuda.toJSON,
      opencl: opencl.toJSON,
      pools: [...(pools.toJSON as [])],
      benchmark: benchmark.toJSON,
    };
    return jsonObj;
  };

  const fromJSON = (data: Record<string, unknown>) => {
    reset(false);
    network.fromJSON(data);
    misc.fromJSON(data);
    logging.fromJSON(data);
    http.fromJSON(data?.http as any);
    api.fromJSON(data?.api as any);
    randomx.fromJSON(data?.randomx as any);
    cpu.fromJSON(data?.cpu as any);
    cpuProfiles.fromJSON(data?.cpu as any);
    cuda.fromJSON(data?.cuda as any);
    opencl.fromJSON(data?.opencl as any);
    benchmark.fromJSON(data?.benchmark as any);
    pools.fromJSON(data?.pools as any);
    setUuid(uuidv4());
  };

  console.log(network.state);
  console.log(http.state);
  console.log(logging.state);
  console.log(api.state);
  console.log(benchmark.state);
  console.log(misc.state);
  console.log(randomx.state);
  console.log(cuda.state);
  console.log(opencl.state);
  console.log(cpu.state);
  console.log(cpuProfiles.state);
  console.log(pools.state);

  return {
    network,
    http,
    logging,
    api,
    benchmark,
    misc,
    randomx,
    cuda,
    opencl,
    cpu,
    cpuProfiles,
    pools,
    reset,
    toJSON,
    fromJSON,
    uuid,
  };
};

export default useXMRigConfig;
