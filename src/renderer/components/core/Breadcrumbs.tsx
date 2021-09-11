/* eslint-disable import/prefer-default-export */
import React from 'react';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs([
    { path: '/cpu', breadcrumb: 'CPU' },
    { path: '/opencl', breadcrumb: 'OpenCL' },
    { path: '/cuda', breadcrumb: 'CUDA' },
    { path: '/api', breadcrumb: 'API' },
    { path: '/cpu/randomx', breadcrumb: 'Random X' },
    { path: '/cpu/profiles', breadcrumb: 'Generated Profiles' },
  ]);

  return (
    <div className="text-sm breadcrumbs alert bg-base-100 mb-4 shadow p-4">
      <ul>
        {breadcrumbs.map(({ breadcrumb, key, match }) => (
          <li key={`breadcrum-${key}`}>
            <NavLink to={match.url}>{breadcrumb}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
