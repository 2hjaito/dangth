import { FaJava, FaGitAlt, FaJs } from 'react-icons/fa'
import { RiJavaLine } from 'react-icons/ri'
import { TbBrandNodejs } from 'react-icons/tb'
import { DiMsqlServer, DiRedis } from 'react-icons/di'
import { IconType } from 'react-icons'

const ICON_MAP: Record<string, IconType> = {
  FaJava,
  FaJs,
  RiJavaLine,
  TbBrandNodejs,
  DiMsqlServer,
  FaGitAlt,
  DiRedis,
}

interface Props {
  icon?: string
}

export const SidebarIcon = ({ icon }: Props) => {
  if (!icon) return <span className="w-4" />

  const IconComponent = ICON_MAP[icon]

  if (!IconComponent) return <span className="w-4" />

  const ResolvedIcon = IconComponent as IconType

  return <ResolvedIcon className="w-4 h-4" />
}
