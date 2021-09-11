/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { NetworkConfig } from 'renderer/xmrig-config/types';

const Network = () => {
  const { network, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<NetworkConfig>({
    defaultValues: network?.state,
  });

  const donateLevel = useWatch({
    control,
    name: 'donateLevel',
  });

  const donateOverProxy = useWatch({
    control,
    name: 'donateOverProxy',
  });

  const onChange = () =>
    handleSubmit(() => {
      network?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(network?.state), [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Retries"
        defaultValue="5"
        valueType="number"
        helpText="Number of times to retry before switching to a backup pool."
        error={errors.retries}
      >
        <input
          type="number"
          placeholder="Retries"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.retries },
            { 'input-success': !errors.retries },
          ])}
          {...register('retries', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Required',
            },
            min: { value: 1, message: 'Min. 1' },
            max: { value: 100, message: 'Max. 100' },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Retry Pause"
        defaultValue="5"
        valueType="number"
        helpText="Time to pause in seconds between retries."
        error={errors.retryPause}
      >
        <input
          type="number"
          placeholder="Retry Pause"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.retryPause },
            { 'input-success': !errors.retryPause },
          ])}
          {...register('retryPause', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Required',
            },
            min: { value: 1, message: 'Min. 1' },
            max: { value: 100, message: 'Max. 100' },
          })}
        />
      </SettingCard>
      <SettingCard
        title="User Agent"
        defaultValue="null"
        valueType="string, null"
        helpText="Set custom user-agent string for pool.."
      >
        <textarea
          className="textarea h-24 textarea-bordered"
          placeholder="User Agent"
          {...register('userAgent')}
        />
      </SettingCard>
      <SettingCard
        title="Donate Level"
        defaultValue="1"
        valueType="number"
        helpText="Donate level percentage. Official binaries don't allow donation level below 1%. If you like zero donation you must edit donate.h file and recompile the miner from source."
      >
        <div className="h-20">
          <div className="indicator-item indicator-middle indicator-center badge badge-primary mt-3">
            {donateLevel}%
          </div>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue="1"
            className="range"
            {...register('donateLevel', {
              valueAsNumber: true,
              min: 1,
              max: 100,
            })}
          />
        </div>
      </SettingCard>
      <SettingCard
        title="Donate Over Proxy"
        defaultValue="1"
        valueType="number"
        helpText="Donate over xmrig-proxy."
      >
        <div className="h-20">
          <div className="indicator-item indicator-middle indicator-center badge badge-primary mt-3">
            {donateOverProxy}%
          </div>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue="1"
            className="range"
            {...register('donateOverProxy', {
              valueAsNumber: true,
              min: 1,
              max: 100,
            })}
          />
        </div>
      </SettingCard>
      <SettingCard
        title="TLS"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable SSL/TLS for incoming API connections."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('tls')}
        />
      </SettingCard>
    </CardsBoard>
  );
};

export default Network;
