/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { LoggingConfig } from 'renderer/xmrig-config/types';

const Logging = () => {
  const { logging, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<LoggingConfig>({
    defaultValues: logging?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      logging?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(logging?.state), [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Syslog"
        defaultValue="false"
        valueType="boolean"
        helpText="Use system log for output messages. This option is ignored on Windows."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('syslog')}
        />
      </SettingCard>
      <SettingCard
        title="Log File"
        valueType="string"
        defaultValue="null"
        helpText="Log all output to specified file. This option supports environment variables. Due limitations of JSON format Windows directory separator should be escaped like \\ or written in Unix style like /."
        error={errors.logFile}
      >
        <input
          type="text"
          placeholder="Log File"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.logFile },
            { 'input-success': !errors.logFile },
          ])}
          {...register('logFile')}
        />
      </SettingCard>
      <SettingCard
        title="Print Time"
        valueType="number"
        defaultValue="60"
        helpText="Print hashrate report every specified number of seconds."
        error={errors.printTime}
      >
        <input
          type="number"
          placeholder="Print Time"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.printTime },
            { 'input-success': !errors.printTime },
          ])}
          {...register('printTime', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Must be greater than 0',
            },
            min: { value: 1, message: 'Must be greater than 0' },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Health Print Time"
        valueType="number"
        defaultValue="60"
        helpText="Print health report every specified number of seconds."
        error={errors.healthPrintTime}
      >
        <input
          type="number"
          placeholder="Health Print Time"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.healthPrintTime },
            { 'input-success': !errors.healthPrintTime },
          ])}
          {...register('healthPrintTime', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Must be greater than 0',
            },
            min: { value: 1, message: 'Must be greater than 0' },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Colors"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable colored output."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('colors')}
        />
      </SettingCard>
      <SettingCard
        title="Verbose"
        valueType="number"
        defaultValue="0"
        helpText="Set number above 0 to increase log verbosity."
        error={errors.verbose}
      >
        <input
          type="number"
          placeholder="Verbose"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.verbose },
            { 'input-success': !errors.verbose },
          ])}
          {...register('verbose', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Required',
            },
            min: {
              value: 0,
              message: 'Verbose cannot be negative',
            },
          })}
        />
      </SettingCard>
    </CardsBoard>
  );
};

export default Logging;
