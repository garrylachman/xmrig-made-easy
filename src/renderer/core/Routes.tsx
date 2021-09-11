import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { XMRigContext } from 'renderer/xmrig-config';

const HomeLazy = React.lazy(() => import('../containers/home/Home'));
const NetworkLazy = React.lazy(() => import('../containers/network/Network'));
const APILazy = React.lazy(() => import('../containers/api'));
const LoggingLazy = React.lazy(() => import('../containers/logging/Logging'));
const MiscLazy = React.lazy(() => import('../containers/misc/Misc'));
const CpuLazy = React.lazy(() => import('../containers/cpu/CPU'));
const CpuProfilesLazy = React.lazy(() => import('../containers/cpu/Profiles'));
const RandomXLazy = React.lazy(() => import('../containers/cpu/RandomX'));
const OpenCLLazy = React.lazy(() => import('../containers/opencl/OpenCL'));
const CudaLazy = React.lazy(() => import('../containers/cuda/CUDA'));
const BenchmarkLazy = React.lazy(
  () => import('../containers/benchmark/Benchmark')
);
const PoolsListLazy = React.lazy(() => import('../containers/pools/PoolsList'));
const PoolLazy = React.lazy(() => import('../containers/pools/Pool'));

const Routes = () => {
  const { misc, configAsJSON } = React.useContext(XMRigContext);
  React.useEffect(
    () => console.log(configAsJSON()),
    [misc?.state, configAsJSON]
  );

  return (
    <Switch>
      <Route path="/misc" render={() => <MiscLazy />} />
      <Route path="/logging" render={() => <LoggingLazy />} />
      <Route path="/network" render={() => <NetworkLazy />} />
      <Route path="/api" render={() => <APILazy />} />
      <Route path="/cpu/profiles" render={() => <CpuProfilesLazy />} />
      <Route path="/cpu/randomx" render={() => <RandomXLazy />} />
      <Route path="/cpu" render={() => <CpuLazy />} />
      <Route path="/opencl" render={() => <OpenCLLazy />} />
      <Route path="/cuda" render={() => <CudaLazy />} />
      <Route path="/benchmark" render={() => <BenchmarkLazy />} />
      <Route path="/pools/:poolId" render={() => <PoolLazy />} />
      <Route path="/pools" render={() => <PoolsListLazy />} />
      <Route path="/" render={() => <HomeLazy />} />
    </Switch>
  );
};

export default Routes;
