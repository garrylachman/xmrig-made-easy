/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */

import React from 'react';
import {
  saveAsDialog,
  saveConfig,
  loadConfig,
} from 'renderer/utils/file-utils';
import useXMRigConfig, { IUseConfig } from './hooks';
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

type XMRigConfigContextProps = {
  network?: IUseConfig<NetworkConfig>;
  misc?: IUseConfig<MiscConfig>;
  http?: IUseConfig<HttpConfig>;
  api?: IUseConfig<ApiConfig>;
  logging?: IUseConfig<LoggingConfig>;
  randomx?: IUseConfig<RandomXConfig>;
  cuda?: IUseConfig<CudaConfig>;
  opencl?: IUseConfig<OpenCLConfig>;
  cpu?: IUseConfig<CpuConfig>;
  cpuProfiles?: IUseConfig<CpuProfilesConfig>;
  benchmark?: IUseConfig<BenchmarkConfig>;
  pools?: IUseConfig<PoolConfig[]>;
  reset: () => void;
  saveAs: () => void;
  save: () => void;
  load: () => void;
  configAsJSON: () => Record<string, unknown>;
  uuid: string;
};

export const XMRigContext = React.createContext<XMRigConfigContextProps>({
  network: undefined,
  misc: undefined,
  http: undefined,
  api: undefined,
  logging: undefined,
  randomx: undefined,
  cuda: undefined,
  opencl: undefined,
  cpu: undefined,
  cpuProfiles: undefined,
  benchmark: undefined,
  pools: undefined,
  reset: () => {},
  saveAs: () => {},
  save: () => {},
  load: () => {},
  configAsJSON: () => ({}),
  uuid: '',
});

export const XMRigContextProvider: React.FC<{}> = ({ children }) => {
  const {
    network,
    misc,
    http,
    api,
    logging,
    randomx,
    cuda,
    opencl,
    cpu,
    cpuProfiles,
    benchmark,
    pools,
    reset,
    toJSON: configAsJSON,
    fromJSON: configFromJSON,
    uuid,
  } = useXMRigConfig();

  const saveAs = async () => {
    console.log(configAsJSON());
    await saveAsDialog(JSON.stringify(configAsJSON(), null, ' '));
  };

  const save = async () => {
    console.log(configAsJSON());
    await saveConfig(JSON.stringify(configAsJSON(), null, ' '));
  };

  const load = async () => {
    const data = await loadConfig();
    if (data) {
      configFromJSON(JSON.parse(data));
    }
  };

  return (
    <XMRigContext.Provider
      value={{
        network,
        misc,
        http,
        api,
        logging,
        randomx,
        cuda,
        opencl,
        cpu,
        cpuProfiles,
        benchmark,
        pools,
        reset,
        saveAs,
        save,
        load,
        configAsJSON,
        uuid,
      }}
    >
      {children}
    </XMRigContext.Provider>
  );
};
