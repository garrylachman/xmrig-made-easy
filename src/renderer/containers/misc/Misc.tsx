/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { MiscConfig } from 'renderer/xmrig-config/types';
import { PauseOnActionFormControl } from './components/PauseOnActionFormControl';

const Misc = () => {
  const { misc, uuid } = React.useContext(XMRigContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm<MiscConfig>({
    defaultValues: misc?.state,
  });

  const pauseOnActive = useWatch({
    control,
    name: 'pauseOnActive',
  });

  const onChange = () =>
    handleSubmit(() => {
      misc?.setState(getValues());
    }).apply(this);

  React.useEffect(() => reset(misc?.state), [uuid]);

  return (
    <CardsBoard onChange={onChange}>
      <SettingCard
        title="Autosave"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable automatic config save if new mining profiles are generated."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('autosave')}
        />
      </SettingCard>
      <SettingCard
        title="Background"
        defaultValue="false"
        valueType="boolean"
        helpText="Run XMRig in the foreground or background."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('background')}
        />
      </SettingCard>
      <SettingCard
        title="DMI"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable DMI/SMBIOS reader."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('dmi')}
        />
      </SettingCard>
      <SettingCard
        title="Watch"
        defaultValue="true"
        valueType="boolean"
        helpText="Enable or disable config file watching. If this feature enabled and config file was changed on disk the miner will reload config."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('watch')}
        />
      </SettingCard>
      <SettingCard
        title="Pause on Battery"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable pause mine on battery power."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('pauseOnBattery')}
        />
      </SettingCard>
      <SettingCard
        title="Pause on Active"
        defaultValue="false"
        valueType="boolean"
        helpText="Enable or disable pause mine when the user is active. Optionally this option accepts a number of seconds, if the user is away for more than specified number of seconds mine will resume, true equals to 60 seconds. This option is supported on Windows and macOS."
      >
        <input
          type="checkbox"
          className="toggle toggle-lg"
          {...register('pauseOnActive')}
        />

        <PauseOnActionFormControl
          pauseOnActive={pauseOnActive}
          error={errors['_pauseOnActive']}
          register={register}
        />
      </SettingCard>
    </CardsBoard>
  );
};

export default Misc;
