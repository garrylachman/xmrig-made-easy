/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { CudaConfig } from 'renderer/xmrig-config/types';

const CUDA = () => {
  const { cuda, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm<CudaConfig>({
    defaultValues: cuda?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      cuda?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(cuda?.state), [uuid]);

  const enabled = useWatch({
    control,
    name: 'enabled',
  });

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Enabled"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable CUDA mining backend."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('enabled')}
        />
      </SettingCard>
      <SettingCard
        title="Loader"
        valueType="string"
        defaultValue="null"
        helpText="Optional path to the CUDA plugin. This option supports environment variables. Due limitations of JSON format Windows directory separator should be escaped like \\ or written in Unix style like /."
        error={errors.loader}
      >
        <input
          type="text"
          placeholder="Loader"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.loader },
            { 'input-success': !errors.loader },
          ])}
          disabled={!enabled}
          {...register('loader')}
        />
      </SettingCard>
      <SettingCard
        title="nvml"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable NVML (NVIDIA Management Library) support."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('cache')}
        />
      </SettingCard>
    </CardsBoard>
  );
};

export default CUDA;
