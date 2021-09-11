/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { HttpConfig } from 'renderer/xmrig-config/types';

const Http = () => {
  const { http, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm<HttpConfig>({
    defaultValues: http?.state,
  });

  const enabled = useWatch({
    control,
    name: 'enabled',
  });

  const onChange = () =>
    handleSubmit(() => {
      http?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(http?.state), [uuid]);

  return (
    <form onChange={onChange}>
      <SettingCard
        title="Enabled"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable HTTP API."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('enabled')}
        />
      </SettingCard>
      <SettingCard
        title="Hostname"
        valueType="string"
        defaultValue="127.0.0.1"
        helpText="Bind host (IP address) for HTTP API."
        error={errors.host}
      >
        <input
          type="text"
          placeholder="Hostname"
          disabled={!enabled}
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.host },
            { 'input-success': !errors.host },
          ])}
          {...register('host')}
        />
      </SettingCard>
      <SettingCard
        title="Port"
        valueType="number"
        defaultValue="0"
        helpText="Bind port. Default value 0 is a valid option but not too useful because the API will bind to a random port on each start, you must choose the port."
        error={errors.port}
      >
        <input
          type="number"
          placeholder="port"
          disabled={!enabled}
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.port },
            { 'input-success': !errors.port },
          ])}
          {...register('port', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Port must be between 0-65535',
            },
            min: { value: 0, message: 'Port must be between 0-65535' },
            max: { value: 65535, message: 'Port must be between 0-65535' },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Access Token"
        valueType="string"
        defaultValue="null"
        helpText="Access token."
        error={errors.accessToken}
      >
        <input
          type="text"
          placeholder="Access Token"
          disabled={!enabled}
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.accessToken },
            { 'input-success': !errors.accessToken },
          ])}
          {...register('accessToken')}
        />
      </SettingCard>
      <SettingCard
        title="Restricted"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable (only if access token set) or disable full access to HTTP API."
      >
        <input
          type="checkbox"
          disabled={!enabled}
          className="toggle toggle-lg"
          {...register('restricted')}
        />
      </SettingCard>
    </form>
  );
};

export default Http;
