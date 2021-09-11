/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { OpenCLConfig } from 'renderer/xmrig-config/types';

const OpenCL = () => {
  const { opencl, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm<OpenCLConfig>({
    defaultValues: opencl?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      opencl?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(opencl?.state), [uuid]);

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
        helpText="Enable or disable OpenCL mining backend."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('enabled')}
        />
      </SettingCard>
      <SettingCard
        title="Cache"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable OpenCL disk cache for compiled code."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          disabled={!enabled}
          {...register('cache')}
        />
      </SettingCard>
      <SettingCard
        title="Loader"
        valueType="string"
        defaultValue="null"
        helpText="Optional path to OpenCL-ICD-Loader. This option supports environment variables. Due limitations of JSON format Windows directory separator should be escaped like \\ or written in Unix style like /."
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
        title="Platform"
        valueType="string"
        defaultValue="AMD"
        helpText="OpenCL platform name or numeric index. Only AMD hardware supported, other platforms may work but it is not guaranteed nor tested."
        error={errors.platform}
      >
        <input
          type="text"
          placeholder="Platform"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.platform },
            { 'input-success': !errors.platform },
          ])}
          disabled={!enabled}
          {...register('platform')}
        />
      </SettingCard>
      <SettingCard
        title="ADL"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable AMD ADL or sysfs reader."
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

export default OpenCL;
