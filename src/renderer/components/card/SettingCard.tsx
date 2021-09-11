/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

import HelpBox from 'renderer/components/core/HelpBox';
import { UIContext } from 'renderer/core/UI';

type SettingCardProps = {
  title: string;
  defaultValue?: string;
  valueType?: string;
  helpText?: string;
  error?: FieldError;
};

const SettingCard: React.FC<SettingCardProps> = ({
  title,
  defaultValue = null,
  valueType = null,
  helpText = null,
  children,
  error = null,
}) => {
  const { cardColumns } = React.useContext(UIContext);
  const compactMode = React.useMemo<boolean>(
    () => cardColumns === 3,
    [cardColumns]
  );
  const colSize = React.useMemo<string>(() => {
    switch (cardColumns) {
      case 1:
        return 'w-6/12';
      case 2:
      case 3:
      default:
        return 'w-12/12';
    }
  }, [cardColumns]);

  return React.useMemo(
    () => (
      <>
        <div className="card shadow-lg bg-base-100 mb-4 overflow-visible">
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <div
              className={classNames([
                'flex',
                'w-full',
                { 'flex-row': cardColumns === 1 },
                { 'flex-col': cardColumns > 1 },
              ])}
            >
              <div
                className={classNames([
                  'card',
                  'rounded-box',
                  'place-items-left',
                  'overflow-visible',
                  colSize,
                ])}
              >
                <div className="indicator w-full flex-col">
                  {React.Children.map(children, (child) => {
                    return React.cloneElement(child as ReactElement, {
                      className: classNames([
                        (child as ReactElement).props.className,
                        {
                          'w-full':
                            (child as ReactElement).props.type !== 'checkbox',
                        },
                      ]),
                    });
                  })}
                  {error && (
                    <span className="indicator-item indicator-center badge badge-secondary">
                      {error?.message}
                    </span>
                  )}
                </div>
                {defaultValue && valueType && (
                  <div className="inline pt-3">
                    <span className="badge badge-primary mr-2">
                      {defaultValue}
                    </span>
                    <span className="badge badge-ghost">{valueType}</span>
                  </div>
                )}
              </div>
              {helpText && !compactMode && (
                <>
                  <div
                    className={classNames([
                      'divider',
                      { 'divider-vertical': cardColumns === 1 },
                      { 'divider-horizontal': cardColumns > 1 },
                    ])}
                  >
                    ?
                  </div>
                  <div
                    className={classNames([
                      'block',
                      'card',
                      'rounded-box',
                      colSize,
                    ])}
                  >
                    <HelpBox text={helpText} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    ),
    [children, colSize, error, compactMode]
  );
};

export default SettingCard;
