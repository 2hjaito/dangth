"use client";

import GitHubCalendar from 'react-github-calendar';
import { GITHUB } from '@/config/config';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function GithubContributions() {
  const theme = {
    dark: ['#374151', '#1e4429', '#2d6d32', '#3fa641', '#53d353'],
    light: ['#F0F0F0', '#b9e6c1', '#81cd95', '#4fb66f', '#2b9c51'],
  };

  return (
    <div className="react-github-calendar">
      {/* Thêm CSS inline ngay đây để đẩy thanh scroll ra cho nhanh */}
      <style>{`.react-github-calendar > div { padding-bottom: 20px !important; }`}</style>

      <GitHubCalendar
        username={GITHUB.username}
        blockSize={12}
        blockMargin={4}
        fontSize={12}
        theme={theme}
        renderBlock={(block, activity) => (
          <g
            data-tooltip-id="gh-tooltip"
            data-tooltip-content={`${activity.count} contributions on ${activity.date}`}
          >
            {block}
          </g>
        )}
      />

      {/* Component này để hiện cái bảng khi hover */}
      <ReactTooltip id="gh-tooltip" />
    </div>
  );
}