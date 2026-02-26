import {
  FaJava, FaDocker
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiCplusplus,
  SiDart, SiCmake, SiSwift, SiKotlin, SiSass
} from 'react-icons/si';
import { TbBrandMysql } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";
import { IconType } from 'react-icons';

type IconEntry = {
  icon: IconType;
  color?: string; // optional nếu không muốn override
};

export const iconMap: Record<string, IconEntry> = {
  // db/languages currently used by Project repo badges
  mysql: { icon: TbBrandMysql, color: '#016089' },
  mssql: { icon: DiMsqlServer, color: '#E2302A' },
  tsql: { icon: DiMsqlServer, color: '#E2302A' },

  // langs
  java: { icon: FaJava, color: '#b07219' },
  javascript: { icon: SiJavascript, color: '#f1e05a' },
  typescript: { icon: SiTypescript, color: '#3178c6' },
  dart: { icon: SiDart, color: '#00B4AB' },
  kotlin: { icon: SiKotlin, color: '#7F52FF' },
  scss: { icon: SiSass, color: '#CD6799' },
  cmake: { icon: SiCmake, color: '#064F8C' },
  swift: { icon: SiSwift, color: '#F05138' },
  cplusplus: { icon: SiCplusplus, color: '#f34b7d' },

  // others
  dockerfile: { icon: FaDocker, color: '#2496ED' },
  // Unused for now (kept as reference):
  // github, leetcode, hackerrank, linkedin, youtube, facebook, tiktok
  // vue, react, nextjs, angular, springboot, nodejs
  // postgresql, mongodb, redis, flutter
  // python, csharp, go, rust, php, git
};
