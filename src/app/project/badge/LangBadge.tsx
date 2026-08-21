// LangBadge.tsx
import React from 'react';
import { iconMap } from '@/lib/utils/iconMap';

type LangBadgeProps = {
  lang: string;
};

const normalize = (lang: string): string =>
  lang.trim().toLowerCase().replace(/\+/g, 'plus').replace(/\#/g, 'sharp');

export const LangBadge = ({ lang }: LangBadgeProps) => {
  const normalized = normalize(lang);
  const iconEntry = iconMap[normalized];

  const color = iconEntry?.color ?? '#ccc';
  const IconComponent = iconEntry?.icon;

  if (!IconComponent) {
    console.log(lang);
    return (
      <span
        className="repo-lang"
        style={{
          color,
        }}
        title={lang}
      ></span>
    )
  }

  return (
    <span
      className="repo-lang flex items-center justify-center p-1 rounded-md"
      style={{
        color,
        fontSize: '1.2rem',
      }}
      title={lang}
    >
      <IconComponent />
    </span>
  );

};
