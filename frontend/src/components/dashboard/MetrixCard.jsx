import { GitPullRequest } from 'lucide-react'
import React from 'react'

const MetrixCard = ({
    title = "Total Repos",
    value = "150",
    icon = <GitPullRequest/>,
    color = "#818cf8",
    colorBg = "rgba(99,102,241,0.15)",
    trend = "+12%",
    trendType = "up", // "up" | "down" | "neutral"
  }) => {
    const badgeStyle = {
      up: { background: "rgba(34,197,94,0.12)", color: "#4ade80" },
      down: { background: "rgba(239,68,68,0.12)", color: "#f87171" },
      neutral: { background: "rgba(148,163,184,0.12)", color: "#94a3b8" },
    }[trendType];
  
    return (
      <div className="bg-blue-500/30  w-40 border border-white/[0.08] rounded-xl p-4 hover:border-white/20 transition-colors">
        <div className="w-9 h-9 rounded-lg text-white  flex items-center justify-center mb-3"
          style={{ background: colorBg } }>
          {icon}
        </div>
        <p className="text-xs text-white/45 mb-1 tracking-wide">{title}</p>
        <p className="text-[26px] font-medium text-white leading-none mb-2">{value}</p>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={badgeStyle}>{trend}</span>
      </div>
    );
  };

export default MetrixCard