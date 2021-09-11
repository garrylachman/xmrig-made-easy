/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { ApiConfig } from 'renderer/xmrig-config/types';

const API = () => {
  const { api, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ApiConfig>({
    defaultValues: api?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      api?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(api?.state), [uuid]);

  return (
    <form onChange={onChange}>
      <SettingCard
        title="ID"
        valueType="string"
        defaultValue="null"
        helpText="Instance ID for API."
        error={errors.id}
      >
        <input
          type="text"
          placeholder="ID"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.id },
            { 'input-success': !errors.id },
          ])}
          {...register('id')}
        />
      </SettingCard>
      <SettingCard
        title="Worker ID"
        defaultValue="null"
        valueType="string"
        helpText="Worker ID, hostname if not specified."
        error={errors.workerId}
      >
        <input
          type="text"
          placeholder="Worker ID"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.workerId },
            { 'input-success': !errors.workerId },
          ])}
          {...register('workerId')}
        />
      </SettingCard>
    </form>
  );
};

export default API;
