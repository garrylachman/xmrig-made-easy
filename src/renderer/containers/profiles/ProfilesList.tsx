/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiCornerDownRight } from 'react-icons/fi';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { IUseConfig } from 'renderer/xmrig-config/hooks';
import { Algos, ProfilesConfig } from '../../xmrig-config/types';

type ProfilesListProps = {
  config: IUseConfig<ProfilesConfig> | undefined;
};

type ValuesProps = {
  [key: string]: {
    override: boolean;
    disable: boolean;
    value?: boolean | number[] | string | null;
  };
};

const stateToValues = (state: ProfilesConfig): ValuesProps => {
  return Object.keys(state)
    .map((key) => ({
      key,
      override: state[key] != null,
      disable: state[key] === false,
      value: state[key],
    }))
    .reduce(
      (acc, curr) => ({
        ...acc,
        [`${curr.key}`]: {
          override: curr.override,
          disable: curr.disable,
          value: curr.value,
        },
      }),
      {}
    );
};

const valuesToState = (values: ValuesProps): ProfilesConfig => {
  const retrunObj: Record<string, unknown> = {};
  Object.keys(values).forEach((key) => {
    retrunObj[key] = !values[key].override
      ? null
      : values[key].disable
      ? false
      : values[key].value;
  });
  return retrunObj as ProfilesConfig;
};

export const ProfilesList: React.FC<ProfilesListProps> = ({ config }) => {
  const { uuid } = React.useContext(XMRigContext);
  const [values, setValues] = React.useState<ValuesProps>(
    stateToValues(config?.state || {})
  );

  React.useEffect(() => config?.setState(valuesToState(values)), [values]);

  const { register, handleSubmit, reset, getValues } = useForm<ValuesProps>({
    defaultValues: values,
  });

  const onChange = () =>
    handleSubmit(() => {
      setValues(getValues());
    }).apply(this);

  React.useEffect(() => {
    setValues(stateToValues(config?.state || {}));
    reset(values);
  }, [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      {Algos.map((algo) => (
        <SettingCard
          key={algo}
          title={algo}
          helpText={`* Custom Value: Off for Auto-Detection<br/>* Disable algo or use current value: <b>${values[algo].value}</b>`}
        >
          <div className="form-control">
            <label className="cursor-pointer label pb-0">
              <span className="label-text">Custom Value</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                {...register(`${algo}.override`)}
              />
            </label>
            {values[algo] && values[algo].override && (
              <div className="flex content-center items-center ml-4">
                <FiCornerDownRight className="flex mr-2" />
                <label className="cursor-pointer label w-full  pt-2">
                  <span className="label-text">Disable Algo</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register(`${algo}.disable`)}
                  />
                </label>
              </div>
            )}
          </div>
        </SettingCard>
      ))}
    </CardsBoard>
  );
};
