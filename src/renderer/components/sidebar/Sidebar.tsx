import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import sidebarMenu from './data';

const Sidebar = () => {
  return (
    <div className="container w-3/12 mx-auto">
      <div className="artboard">
        <ul className="menu p-4 shadow-lg bg-base-100 rounded-box compact">
          <li className="menu-title">
            <span>Configuration</span>
          </li>
          {sidebarMenu &&
            sidebarMenu.map((item) => (
              <li key={item.name} className="my-0.5">
                <NavLink to={item.href} activeClassName="active glass">
                  <item.icon
                    className={classNames([
                      'inline-block',
                      'w-5',
                      'h-5',
                      'mr-2',
                      'stroke-current',
                      { 'ml-4': item?.subItem },
                    ])}
                  />
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
