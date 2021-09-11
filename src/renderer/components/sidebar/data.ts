import { AiFillApi } from 'react-icons/ai';
import { FaNetworkWired, FaLayerGroup } from 'react-icons/fa';
import { SiNvidia, SiAmd } from 'react-icons/si';
import { RiCpuLine } from 'react-icons/ri';
import { GiLogging } from 'react-icons/gi';
import { ImStatsBars2 } from 'react-icons/im';
import { GoBeaker } from 'react-icons/go';
import { FiCornerDownRight } from 'react-icons/fi';
import { MenuItem } from './types';

const sidebarMenu: MenuItem[] = [
  {
    name: 'Network',
    href: '/network',
    icon: FaNetworkWired,
  },
  {
    name: 'Pools',
    href: '/pools',
    icon: FaLayerGroup,
  },
  {
    name: 'CPU',
    href: '/cpu',
    icon: RiCpuLine,
  },
  {
    name: 'Generated Profiles',
    href: '/cpu/profiles',
    icon: FiCornerDownRight,
    subItem: true,
  },
  {
    name: 'RandomX',
    href: '/cpu/randomx',
    icon: FiCornerDownRight,
    subItem: true,
  },
  {
    name: 'OpenCL',
    href: '/opencl',
    icon: SiAmd,
  },
  {
    name: 'CUDA',
    href: '/cuda',
    icon: SiNvidia,
  },
  {
    name: 'API',
    href: '/api',
    icon: AiFillApi,
  },
  {
    name: 'Logging',
    href: '/logging',
    icon: GiLogging,
  },
  {
    name: 'Benchmark',
    href: '/benchmark',
    icon: ImStatsBars2,
  },
  {
    name: 'Misc',
    href: '/misc',
    icon: GoBeaker,
  },
];

export default sidebarMenu;
