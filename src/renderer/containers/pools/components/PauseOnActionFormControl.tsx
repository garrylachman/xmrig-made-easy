/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import classNames from 'classnames';
import React from 'react';
import { FieldError, UseFormRegister, FieldValues } from 'react-hook-form';
import { MiscConfig } from 'renderer/xmrig-config/types';

type PauseOnActionFormControlProps<T> = {
  pauseOnActive: boolean;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
};

export const PauseOnActionFormControl: React.FC<
  PauseOnActionFormControlProps<MiscConfig>
> = ({ pauseOnActive, error, register }) => {
  return (
    <>
      {pauseOnActive && (
        <div className="form-control pt-3">
          <label className="label">
            <span className="label-text">Number of seconds</span>
          </label>
          <div className="indicator w-full">
            <input
              type="number"
              placeholder="Number of seconds"
              className={classNames([
                'input',
                'input-bordered',
                'input-sm',
                'w-full',
                { 'input-error': error },
                { 'input-success': !error },
              ])}
              {...register('_pauseOnActive', {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: 'Required.',
                },
                min: { value: 1, message: 'Required at least 1 sec.' },
              })}
            />
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
