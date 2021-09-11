/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { AiFillFileAdd, AiFillFolderOpen, AiFillSave } from 'react-icons/ai';
import { UIContext } from 'renderer/core/UI';
import { XMRigContext } from 'renderer/xmrig-config';

const Header = () => {
  const { reset, saveAs, save, load } = React.useContext(XMRigContext);
  const { setCardColumns } = React.useContext(UIContext);

  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">XMRig Made Easy</span>
      </div>
      <div className="flex-none hidden px-2 mx-2 lg:flex">
        <div className="flex items-stretch">
          <a
            className="btn btn-ghost btn-sm rounded-btn"
            onClick={() => reset()}
            href="#1"
          >
            <AiFillFileAdd className="inline-block w-4 h-4 mr-2 stroke-current" />
            New
          </a>

          <a
            className="btn btn-ghost btn-sm rounded-btn"
            onClick={() => load()}
            href="#1"
          >
            <AiFillFolderOpen className="inline-block w-4 h-4 mr-2 stroke-current" />
            Open
          </a>

          <a
            className="btn btn-ghost btn-sm rounded-btn"
            onClick={() => saveAs()}
            href="#1"
          >
            <AiFillSave className="inline-block w-4 h-4 mr-2 stroke-current" />
            Save as
          </a>

          <a
            className="btn btn-ghost btn-sm rounded-btn"
            onClick={() => save()}
            href="#1"
          >
            <AiFillSave className="inline-block w-4 h-4 mr-2 stroke-current" />
            Save
          </a>
        </div>

        <div className="dropdown dropdown-hover dropdown-end ml-5">
          <div tabIndex={0} className="btn btn-ghost rounded-btn">
            Arrangement
          </div>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content w-52 shadow-lg bg-base-100 rounded-box"
          >
            <li>
              <button
                type="button"
                className="btn my-2"
                onClick={() => setCardColumns(1)}
              >
                1 Column
              </button>
            </li>

            <li>
              <div className="flex-row flex">
                <button
                  type="button"
                  className="btn my-2 w-6/12 mr-auto"
                  onClick={() => setCardColumns(2)}
                >
                  2
                </button>

                <button
                  type="button"
                  className="btn my-2 w-5/12"
                  onClick={() => setCardColumns(3)}
                >
                  3
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
