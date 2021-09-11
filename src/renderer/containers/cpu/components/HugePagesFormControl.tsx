/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import classNames from 'classnames';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { CpuConfig } from 'renderer/xmrig-config/types';

type HugePagesFormControlProps<T> = {
  hugePages: boolean;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  disabled?: boolean;
};

export const HugePagesFormControl: React.FC<
  HugePagesFormControlProps<CpuConfig>
> = ({ hugePages, error, register, disabled = false }) => {
  return (
    <>
      {hugePages && (
        <div className="form-control pt-3">
          <label className="label">
            <span className="label-text">Huge page size in kB</span>
          </label>
          <div className="indicator w-full">
            <input
              type="number"
              placeholder="Huge page size in kB"
              disabled={disabled}
              className={classNames([
                'input',
                'input-bordered',
                'input-sm',
                'w-full',
                'pr-10',
                { 'input-error': error },
                { 'input-success': !error },
              ])}
              {...register('_hugePages', {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: 'Required.',
                },
                min: { value: 1, message: 'Required at least 1.' },
              })}
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3 font-medium">
              kb
            </div>
            {error && (
              <span className="indicator-item indicator-center badge badge-secondary">
                {error?.message}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
