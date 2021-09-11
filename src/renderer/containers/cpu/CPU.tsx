/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { CpuConfig } from 'renderer/xmrig-config/types';
import { HugePagesFormControl } from './components/HugePagesFormControl';

const CPU = () => {
  const { cpu, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm<CpuConfig>({
    defaultValues: cpu?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      cpu?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(cpu?.state), [uuid]);

  const enabled = useWatch({
    control,
    name: 'enabled',
  });

  const hugePages = useWatch({
    control,
    name: 'hugePages',
  });

  const maxThreadsHint = useWatch({
    control,
    name: 'maxThreadsHint',
  });

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Enabled"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable CPU mining backend."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('enabled')}
        />
      </SettingCard>
      <SettingCard
        title="Huge Pages"
        defaultValue="true"
        valueType="boolean, number"
        helpText="Enable or disable huge pages support.On Linux this option also accepts huge page size in kB to use custom huge page sizes if it is supported by hardware. For example huge-pages: 32768 for 32 MB huge page size."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('hugePages')}
        />
        <HugePagesFormControl
          hugePages={hugePages}
          error={errors['_hugePages']}
          register={register}
          disabled={!enabled}
        />
      </SettingCard>
      <SettingCard
        title="Huge Pages Jit"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable huge pages support for RandomX JIT code. It gives a very small boost on Ryzen CPUs, but hashrate is unstable between launches. Use with caution."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('hugePagesJit')}
        />
      </SettingCard>
      <SettingCard
        title="Hardware AES"
        defaultValue="null"
        valueType="boolean, null"
        helpText="Force enable or disable hardware AES support. Default value null means miner autodetect this feature. Usually you don't need to change this option, this option is useful for some rare cases when XMRig can't detect hardware AES, but it is available. If you force enable this option, but your hardware does not support it, the miner will crash."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('hwAes')}
        />
      </SettingCard>
      <SettingCard
        title="Priority"
        valueType="number, null"
        defaultValue="null"
        helpText="Mining threads priority, value from 1 (lowest priority) to 5 (highest possible priority). Default value null means XMRig doesn't change threads priority at all. Setting priority higher than 2 can make your PC unresponsive."
        error={errors.priority}
      >
        <input
          type="number"
          placeholder="Priority"
          disabled={!enabled}
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.priority },
            { 'input-success': !errors.priority },
          ])}
          {...register('priority', {
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Allowed values 1-5',
            },
            max: {
              value: 5,
              message: 'Allowed values 1-5',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Memory Pool"
        defaultValue="false"
        valueType="boolean"
        helpText="Use continuous, persistent memory block for mining threads, useful for preserving huge pages allocation while algorithm switching. Possible values false (feature disabled, by default) or true."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('memoryPool')}
        />
      </SettingCard>
      <SettingCard
        title="Yield"
        defaultValue="true"
        valueType="boolean"
        helpText="Prefer system better system response/stability true (default value) or maximum hashrate false."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('yield')}
        />
      </SettingCard>
      <SettingCard
        title="Max Threads Hint"
        defaultValue="100"
        valueType="number"
        helpText="This option (was known as max-cpu-usage) is the most confusing option in the miner with many myths and legends. This option is just a hint for automatic configuration and can't precisely define CPU usage."
      >
        <div className="h-20">
          <div className="indicator-item indicator-middle indicator-center badge badge-primary mt-3">
            {maxThreadsHint}%
          </div>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue="1"
            className="range"
            disabled={!enabled}
            {...register('maxThreadsHint', {
              valueAsNumber: true,
              min: 1,
              max: 100,
            })}
          />
        </div>
      </SettingCard>
      <SettingCard
        title="Assembly Optimizations"
        defaultValue="true"
        valueType="boolean, string"
        helpText="Enable/configure or disable assembly optimizations. "
      >
        <select
          disabled={!enabled}
          className="select select-bordered"
          {...register('asm')}
        >
          <option>true</option>
          <option>false</option>
          <option>intel</option>
          <option>ryzen</option>
          <option>bulldozer</option>
        </select>
      </SettingCard>
      <SettingCard
        title="Argon2 Implementation"
        defaultValue="null"
        valueType="string, string"
        helpText='Allow override automatically detected Argon2 implementation, this option added mostly for debug purposes, default value null means autodetect. This is used in RandomX dataset initialization and also in some other mining algorithms. Other possible values: "x86_64", "SSE2", "SSSE3", "XOP", "AVX2", "AVX-512F". Manual selection has no safeguards - if your CPU doesnt support required instructions, the miner will crash.'
      >
        <select
          disabled={!enabled}
          className="select select-bordered"
          {...register('argon2Impl')}
        >
          <option>null</option>
          <option>x86_64</option>
          <option>SSE2</option>
          <option>SSSE3</option>
          <option>XOP</option>
          <option>AVX2</option>
          <option>AVX-512F</option>
        </select>
      </SettingCard>
      <SettingCard
        title="Astrobwt Max Size"
        valueType="number"
        defaultValue="550"
        helpText="AstroBWT algorithm: skip hashes with large stage 2 size, default: 550, min: 400, max: 1200. Optimal value depends on your CPU/GPU."
        error={errors.astrobwtMaxSize}
      >
        <input
          type="number"
          placeholder="Astrobwt Max Size"
          disabled={!enabled}
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.astrobwtMaxSize },
            { 'input-success': !errors.astrobwtMaxSize },
          ])}
          {...register('astrobwtMaxSize', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Required',
            },
            min: {
              value: 400,
              message: 'Allowed values 400-1200',
            },
            max: {
              value: 1200,
              message: 'Allowed values 400-1200',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="AstroBWT AVX2"
        defaultValue="false"
        valueType="boolean"
        helpText="AstroBWT algorithm: use AVX2 code. It's faster on some CPUs and slower on other."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('astrobwtAvx2')}
        />
      </SettingCard>
    </CardsBoard>
  );
};

export default CPU;
