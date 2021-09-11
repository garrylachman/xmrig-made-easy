/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import md5 from 'md5';
import { XMRigContext } from 'renderer/xmrig-config';
import { NavLink } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { poolDefaultConfig } from 'renderer/xmrig-config/data';
import classNames from 'classnames';
import { PoolConfig } from 'renderer/xmrig-config/types';

const PoolsList = () => {
  const { pools } = React.useContext(XMRigContext);

  const newPoolHandler = () => {
    pools?.setState((oldState) => [...oldState, { ...poolDefaultConfig }]);
  };

  const deletePool = (pool: PoolConfig) => {
    pools?.setState((oldState) => oldState.filter((item) => item !== pool));
  };

  return (
    <div className="card shadow-lg bg-base-100">
      <div className="card-body">
        <div className="card-title">Pools</div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>URL</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {pools?.state &&
              pools.state.map((pool, id) => (
                <tr key={md5(`pool-${id}`)} className="hover">
                  <td>{id + 1}</td>
                  <td>{pool.url}</td>
                  <td>
                    <div
                      className={classNames([
                        'badge',
                        { 'badge-primary': pool.enabled },
                        { 'badge-ghost': !pool.enabled },
                      ])}
                    >
                      {pool.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </td>
                  <td className="text-right pr-0">
                    <NavLink to={`/pools/${id}`} className="btn btn-xs mr-2">
                      <MdEdit className="mr-1" />
                      Edit
                    </NavLink>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => deletePool(pool)}
                    >
                      <MdDelete className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={newPoolHandler}>
            New Pool
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolsList;
