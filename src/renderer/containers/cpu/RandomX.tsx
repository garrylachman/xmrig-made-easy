/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { RandomXConfig } from 'renderer/xmrig-config/types';
import { HugePagesFormControl } from './components/HugePagesFormControl';

const RandomX = () => {
  const { randomx, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<RandomXConfig>({
    defaultValues: randomx?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      randomx?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(randomx?.state), [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Thread count to initialize"
        valueType="number"
        defaultValue="-1"
        helpText="Thread count to initialize RandomX dataset. Auto-detect (-1) or number of threads."
        error={errors.init}
      >
        <input
          type="number"
          placeholder="Initialize"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.init },
            { 'input-success': !errors.init },
          ])}
          {...register('init', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Required',
            },
            min: {
              value: -1,
              message: 'Min. value -1',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="AVX2 for dataset"
        valueType="number"
        defaultValue="-1"
        helpText="Use AVX2 for dataset initialization. Faster on some CPUs. Auto-detect (-1), disabled (0), always enabled on CPUs that support AVX2 (1)."
        error={errors.initAvx2}
      >
        <select
          placeholder="AVX2"
          className={classNames(['select', 'select-bordered'])}
          {...register('initAvx2', {
            valueAsNumber: true,
          })}
        >
          <option value="-1">Auto-detect</option>
          <option value="0">Disabled</option>
          <option value="1">Enabled</option>
        </select>
      </SettingCard>
      <SettingCard
        title="Mode"
        valueType="string"
        defaultValue='"auto"'
        helpText='RandomX mining mode: "auto", "fast" (2 GB memory), "light" (256 MB memory).'
        error={errors.mode}
      >
        <select
          placeholder="Mode"
          className={classNames(['select', 'select-bordered'])}
          {...register('mode')}
        >
          <option>auto</option>
          <option>fast</option>
          <option>light</option>
        </select>
      </SettingCard>
      <SettingCard
        title="1GB Pages"
        defaultValue="false"
        valueType="boolean"
        helpText="Use 1GB hugepages for RandomX dataset (Linux only). It gives 1-3% speedup."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('oneGbPages')}
        />
      </SettingCard>
      <SettingCard
        title="Restore MSR"
        defaultValue="true"
        valueType="boolean"
        helpText="Restore MSR register values to their original values on exit. Used together with wrmsr."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('rdmsr')}
        />
      </SettingCard>
      <SettingCard
        title="MSR mod"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable MSR mod. It gives up to 15% speedup depending on your system."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('wrmsr')}
        />
      </SettingCard>
      <SettingCard
        title="Cache QoS"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable Cache QoS. It's useful when you can't or don't want to mine on all CPU cores to make mining hashrate more stable."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('cache_qos')}
        />
      </SettingCard>
      <SettingCard
        title="NUMA"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable NUMA support (better hashrate on multi-CPU servers and Ryzen Threadripper)."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('numa')}
        />
      </SettingCard>
      <SettingCard
        title="Scratchpad Prefetch Mode"
        valueType="number"
        defaultValue="1"
        helpText="Which instruction to use in RandomX loop to prefetch data from scratchpad.1 is default and fastest in most cases. Can be off (0), prefetcht0 instruction (1), prefetchnta instruction (2, a bit faster on Coffee Lake and a few other CPUs), mov instruction (3)."
        error={errors.scratchpad_prefetch_mode}
      >
        <select
          placeholder="Scratchpad Prefetch Mode"
          className={classNames(['select', 'select-bordered'])}
          {...register('scratchpad_prefetch_mode', {
            valueAsNumber: true,
          })}
        >
          <option value="0">off</option>
          <option value="1">prefetcht0</option>
          <option value="2">prefetchnta</option>
          <option value="3">mov</option>
        </select>
      </SettingCard>
    </CardsBoard>
  );
};

export default RandomX;
