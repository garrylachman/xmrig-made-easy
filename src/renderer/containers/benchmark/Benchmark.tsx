/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { BenchmarkConfig } from 'renderer/xmrig-config/types';

const Benchmark = () => {
  const { benchmark, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<BenchmarkConfig>({
    defaultValues: benchmark?.state,
  });

  const onChange = () =>
    handleSubmit(() => {
      benchmark?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(benchmark?.state), [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Size"
        valueType="string"
        defaultValue="null"
        helpText="Run benchmark, value can be between <b>1M</b> and <b>10M</b>, for offline benchmark also possible values <b>250K</b> and <b>500K</b>."
        error={errors.size}
      >
        <input
          type="text"
          placeholder="Size"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.size },
            { 'input-success': !errors.size },
          ])}
          {...register('size', {
            pattern: {
              value: /^([0-9]{1,2})M$|^([2-5][0-9][0-9])K$/,
              message: '1M and 10M or 250K and 500K',
            },
          })}
        />
      </SettingCard>
      <SettingCard
        title="Algo"
        valueType="string"
        defaultValue="rx/0"
        helpText="Benchmark algorithm possible values: rx/0 and rx/wow."
        error={errors.algo}
      >
        <select
          placeholder="Algo"
          className={classNames(['select', 'select-bordered'])}
          {...register('algo')}
        >
          <option>rx/0</option>
          <option>rx/wow</option>
        </select>
      </SettingCard>
      <SettingCard
        title="Submit"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable an online benchmark."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('submit')}
        />
      </SettingCard>
      <SettingCard
        title="Verify"
        valueType="string"
        defaultValue="null"
        helpText="Verify submitted benchmark by ID."
        error={errors.verify}
      >
        <input
          type="text"
          placeholder="Verify"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.verify },
            { 'input-success': !errors.verify },
          ])}
          {...register('verify')}
        />
      </SettingCard>
      <SettingCard
        title="Seed"
        valueType="string"
        defaultValue="null"
        helpText="Custom RandomX seed for benchmark."
        error={errors.seed}
      >
        <input
          type="text"
          placeholder="seed"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.seed },
            { 'input-success': !errors.seed },
          ])}
          {...register('seed')}
        />
      </SettingCard>
      <SettingCard
        title="Hash"
        valueType="string"
        defaultValue="null"
        helpText="Compare benchmark result with specified hash."
        error={errors.hash}
      >
        <input
          type="text"
          placeholder="hash"
          className={classNames([
            'input',
            'input-bordered',
            { 'input-error': errors.hash },
            { 'input-success': !errors.hash },
          ])}
          {...register('hash')}
        />
      </SettingCard>
    </CardsBoard>
  );
};

export default Benchmark;
