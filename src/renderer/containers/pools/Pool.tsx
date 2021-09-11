/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { MiscConfig, PoolConfig } from 'renderer/xmrig-config/types';
import { PauseOnActionFormControl } from './components/PauseOnActionFormControl';

const Pool = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { pools, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm<PoolConfig>({
    defaultValues: pools?.state[Number(poolId)],
  });

  const onChange = () =>
    handleSubmit(() => {
      pools?.setState((oldState) => {
        return oldState.map((item, index) =>
          index === Number(poolId) ? getValues() : item
        );
      });
    }).apply(this);

  React.useEffect(() => reset(pools?.state[Number(poolId)]), [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Enabled"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable the current pool."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('enabled')}
        />
      </SettingCard>
      <SettingCard
        title="Algo"
        valueType="string"
        defaultValue="null"
        helpText="Mining algorithm. This option is ignored if a pool supports algorithm negotiation."
        error={errors.algo}
      >
        <input
          type="text"
          placeholder="Algo"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.algo },
            { 'input-success': !errors.algo },
          ])}
          {...register('algo')}
        />
      </SettingCard>
      <SettingCard
        title="Coin"
        valueType="string"
        defaultValue="null"
        helpText="Mining coin. Possible values: monero, arqma, dero, keva, ravencoin. Main purpose of this option is detecting the algorithm by block version for smooth algorithm change during coin fork. This option is also ignored if a pool supports algorithm negotiation. Don't use this option with nicehash.com because you can't control what coin you mine."
        error={errors.algo}
      >
        <select
          placeholder="Coin"
          className={classNames(['select', 'select-bordered'])}
          {...register('coin')}
        >
          <option>null</option>
          <option>monero</option>
          <option>arqma</option>
          <option>dero</option>
          <option>keva</option>
          <option>ravencoin</option>
        </select>
      </SettingCard>
      <SettingCard
        title="Pool URL"
        valueType="string"
        defaultValue=""
        helpText="Url address of the pool or url of daemon RPC API. For example <b>hostname:443</b>. Address optionally may contain one of following schemes:<br/><p class='text-xs'><b>stratum+tcp://</b> - default, supported for backward compatibility, don't need specify this scheme explicitly.<b>stratum+ssl://</b> - same as above but with SSL/TLS support. If this scheme is used, <b>tls</b> option ignored.<b>daemon+http://</b> - daemon JSON-RPC for solo mining, only daemons with API compatible with Monero and Dero are supported.<b>daemon+https://</b> - same as above but with SSL/TLS support.</p>"
        error={errors.url}
      >
        <input
          type="text"
          placeholder="pool.hashvault.pro:443"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.url },
            { 'input-success': !errors.url },
          ])}
          {...register('url', {
            required: {
              value: true,
              message: 'Pool is required',
            },
            pattern: {
              value: /^.*:[0-9]+$/,
              message: 'Invalid URL, Must include port',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="User"
        valueType="string"
        defaultValue=""
        helpText="Your wallet address on most pools, consult your pool getting started page."
        error={errors.user}
      >
        <input
          type="text"
          placeholder="User"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.user },
            { 'input-success': !errors.user },
          ])}
          {...register('user', {
            required: {
              value: true,
              message: 'Required',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Pass"
        valueType="string"
        defaultValue="x"
        helpText="Password, can be used for specifying worker name on some pools, consult your pool getting started page."
        error={errors.pass}
      >
        <input
          type="text"
          placeholder="Pass"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.pass },
            { 'input-success': !errors.pass },
          ])}
          {...register('pass', {
            required: {
              value: true,
              message: 'Required',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Rig identifier"
        valueType="string"
        defaultValue="null"
        helpText="Rig identifier, needs pool support."
        error={errors.rigId}
      >
        <input
          type="text"
          placeholder="Rig identifier"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.rigId },
            { 'input-success': !errors.rigId },
          ])}
          {...register('rigId')}
        />
      </SettingCard>
      <SettingCard
        title="Nicehash"
        defaultValue="false"
        valueType="boolean"
        helpText="NiceHash support. This option is only required if you mine on nicehash."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('nicehash')}
        />
      </SettingCard>
      <SettingCard
        title="Keepalive"
        defaultValue="false"
        valueType="boolean"
        helpText="KeepAlive support."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('keepalive')}
        />
      </SettingCard>
      <SettingCard
        title="TLS"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable SSL/TLS."
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

export default Pool;
