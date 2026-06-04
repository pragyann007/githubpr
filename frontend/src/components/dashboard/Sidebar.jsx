import React from 'react'
import { Link } from 'react-router-dom';
import {
    GitPullRequest,
    LayoutDashboard,
    Sparkles,
    MessageSquareText,
    GitCompare,
    Wrench,
    BadgeCheck,
    ShieldAlert,
    Bot,
    Clock
} from "lucide-react"



 

const Sidebar = () => {
    const dashboardLinks = [
        {
            name: "Dashboard",
            link: "/dashboard",
            description: "Overview of connected repositories and recent activity",
            icon: <LayoutDashboard/>

        },
        {
          name: "Pull Requests",
          link: "/pull-requests",
          description: "All PRs from connected repositories",
          icon: <GitPullRequest/>
        },
    
        {
          name: "AI Review Summary",
          link: "/ai-summary",
          description: "AI-generated PR overview, risks, and insights",
          icon: <Sparkles/>
        },
        {
          name: "Inline AI Comments",
          link: "/ai-comments",
          description: "Line-by-line AI feedback on code changes",
          icon: <MessageSquareText/>
        },
        {
          name: "Diff Viewer",
          link: "/diff",
          description: "View code changes in unified or split diff mode",
          icon: <GitCompare/>
        },
        {
          name: "Suggested Fixes",
          link: "/fixes",
          description: "AI-generated patch suggestions for issues",
          icon: <Wrench/>
        },
        
        {
          name: "Security Scan",
          link: "/security",
          description: "Detect vulnerabilities and unsafe patterns",
          icon: <ShieldAlert/>
        },
        
      
      ];
  return (
    <div className='p-8 flex justify-between flex-col gap-0' >
        <div className="texts p-3 ">
            <h4 className='text-xl text-white text-bold ' >Git Set</h4>
        </div>

        <div className="links">
            {
                dashboardLinks.map((item,index)=>{
                    return(
                        <Link className='text-white text-md text-semibold p-3 flex gap-4 rounded-2xl mt-6 hover:bg-blue-500/30 ' to={item.link} >
                         <span>
                            {item.icon}
                            </span>   
                        {item.name}
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Sidebar