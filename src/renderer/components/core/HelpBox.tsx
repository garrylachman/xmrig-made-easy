/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MdLiveHelp } from 'react-icons/md';

type HelpBoxProps = {
  text: string;
  icon?: boolean;
};

const HelpBox = ({ text, icon = false }: HelpBoxProps) => (
  <div className="alert alert-info glass">
    <div className="items-center">
      {icon && <MdLiveHelp className="text-6xl mx-2" />}
      <label
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: text.replaceAll('.', '.<br/>') }}
      />
    </div>
  </div>
);

export default HelpBox;
