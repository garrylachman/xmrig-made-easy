/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import SettingCard from 'renderer/components/card/SettingCard';
import CardsBoard from 'renderer/components/core/CardsBoard';
import { XMRigContext } from 'renderer/xmrig-config';
import { CpuConfig, CpuProfilesConfig } from 'renderer/xmrig-config/types';
import { ProfilesList } from '../profiles/ProfilesList';

const CPUProfiles = () => {
  const { cpuProfiles, uuid } = React.useContext(XMRigContext);

  return <ProfilesList config={cpuProfiles} />;
};

export default CPUProfiles;
