'use client';

import { useEffect, useState, useRef } from 'react';

interface OrgNode {
  id: string;
  vi: string;
  en: string;
  level: number;
  parentId?: string;
  x?: number;
  y?: number;
}

interface OrganizationChartProps {
  className?: string;
}

export default function OrganizationChart({ className = '' }: OrganizationChartProps) {
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const nodes: OrgNode[] = [
    // Level 1
    { id: 'director', vi: 'GIÁM ĐỐC', en: 'DIRECTOR', level: 1 },
    // Level 2
    { id: 'vice-director', vi: 'PHÓ GIÁM ĐỐC', en: 'VICE DIRECTOR', level: 2, parentId: 'director' },
    // Level 3 - Departments
    { id: 'admin', vi: 'PHÒNG HÀNH TỔ CHỨC HÀNH CHÁNH', en: 'ADMINISTRATION DEPARTMENT', level: 3, parentId: 'vice-director' },
    { id: 'accounting', vi: 'PHÒNG KẾ TOÁN', en: 'ACCOUNTING DEPARTMENT', level: 3, parentId: 'vice-director' },
    { id: 'marketing', vi: 'PHÒNG KINH DOANH', en: 'MARKETING DEPARTMENT', level: 3, parentId: 'vice-director' },
    { id: 'technical', vi: 'PHÒNG KỸ THUẬT', en: 'TECHNICAL DEPARTMENT', level: 3, parentId: 'vice-director' },
    { id: 'supply', vi: 'PHÒNG CUNG ỨNG VẬT TƯ', en: 'MATERIAL SUPPLYING DEPARTMENT', level: 3, parentId: 'vice-director' },
    { id: 'workshop', vi: 'XƯỞNG - KHO', en: 'WORKSHOP - STORAGE', level: 3, parentId: 'vice-director' },
    // Level 4 - Teams under Technical Department
    { id: 'hvac', vi: 'ĐỘI THI CÔNG HỆ THỐNG ĐIỀU HÒA KHÔNG KHÍ', en: 'HVAC TEAM', level: 4, parentId: 'technical' },
    { id: 'fire', vi: 'ĐỘI THI CÔNG HỆ THỐNG PCCC', en: 'FIRE FIGHTING TEAM', level: 4, parentId: 'technical' },
    { id: 'plumbing', vi: 'ĐỘI THI CÔNG HỆ THỐNG CẤP THOÁT NƯỚC', en: 'PLUMBING TEAM', level: 4, parentId: 'technical' },
    { id: 'piping', vi: 'ĐỘI THI CÔNG HỆ THỐNG ỐNG CÔNG NGHỆ', en: 'PROCESS PIPING TEAM', level: 4, parentId: 'technical' },
    { id: 'substation', vi: 'ĐỘI THI CÔNG HỆ THỐNG TRẠM BIẾN ÁP', en: 'SUB-STATION TEAM', level: 4, parentId: 'technical' },
    { id: 'electrical', vi: 'ĐỘI THI CÔNG HỆ THỐNG ĐIỆN', en: 'ELECTRICAL TEAM', level: 4, parentId: 'technical' },
  ];

  // Calculate positions
  const calculatePositions = () => {
    const containerWidth = containerRef.current?.clientWidth || 1400;
    const chartWidth = Math.max(containerWidth, 1400);
    const positions: Record<string, { x: number; y: number }> = {};

    // Level 1 - Director (center top)
    positions['director'] = { x: chartWidth / 2, y: 100 };

    // Level 2 - Vice Director (center, below director)
    positions['vice-director'] = { x: chartWidth / 2, y: 220 };

    // Level 3 - Departments (horizontal spread, centered)
    const deptNodes = nodes.filter(n => n.level === 3);
    const boxWidth = 240;
    const spacing = 20;
    const totalDeptWidth = (deptNodes.length * boxWidth) + ((deptNodes.length - 1) * spacing);
    const startX = (chartWidth - totalDeptWidth) / 2 + boxWidth / 2;
    
    deptNodes.forEach((node, index) => {
      positions[node.id] = { 
        x: startX + index * (boxWidth + spacing), 
        y: 380 
      };
    });

    // Level 4 - Teams (horizontal spread below technical department, centered)
    const teamNodes = nodes.filter(n => n.level === 4);
    const teamBoxWidth = 220;
    const teamSpacing = 15;
    const totalTeamWidth = (teamNodes.length * teamBoxWidth) + ((teamNodes.length - 1) * teamSpacing);
    const teamStartX = (chartWidth - totalTeamWidth) / 2 + teamBoxWidth / 2;
    
    teamNodes.forEach((node, index) => {
      positions[node.id] = { 
        x: teamStartX + index * (teamBoxWidth + teamSpacing), 
        y: 550 
      };
    });

    return positions;
  };

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    const handleResize = () => {
      setPositions(calculatePositions());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    // Animate nodes level by level
    const levels = [1, 2, 3, 4];
    let currentLevelIndex = 0;

    const animateLevel = () => {
      if (currentLevelIndex >= levels.length) return;

      const currentLevel = levels[currentLevelIndex];
      const levelNodes = nodes.filter(n => n.level === currentLevel);
      
      levelNodes.forEach((node, index) => {
        setTimeout(() => {
          setVisibleNodes(prev => new Set([...prev, node.id]));
        }, index * 150);
      });

      currentLevelIndex++;
      setTimeout(animateLevel, levelNodes.length * 150 + 300);
    };

    animateLevel();
  }, [isInView]);


  const getBoxWidth = (node: OrgNode): number => {
    // Fixed widths for different levels
    if (node.level === 1 || node.level === 2) {
      return 220;
    } else if (node.level === 3) {
      return 240;
    } else {
      return 220;
    }
  };

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div ref={containerRef} className="relative w-full max-w-[1600px] min-h-[650px] bg-gradient-to-br from-blue-50 to-white py-8 px-8 overflow-visible">
        {/* Title */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold">
            <span className="text-red-600">SƠ ĐỒ TỔ CHỨC</span>
            <span className="text-[#0A3D62]"> - </span>
            <span className="text-[#0A3D62]">ORGANIZATION CHART</span>
          </h3>
        </div>

        {/* Render nodes */}
        <div className="relative z-10 w-full h-full">
          {nodes.map(node => {
            const pos = positions[node.id];
            if (!pos) return null;

            const isVisible = visibleNodes.has(node.id);
            const boxWidth = getBoxWidth(node);

            return (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: `translate(-50%, -50%) ${isVisible ? 'scale(1)' : 'scale(0.8)'}`,
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                }}
              >
                <div
                  className="border-2 border-black rounded bg-white shadow-lg text-center p-3 flex flex-col justify-center"
                  style={{ 
                    width: `${boxWidth}px`, 
                    minHeight: '85px',
                  }}
                >
                  <div className="text-red-600 font-bold text-sm leading-tight mb-1">
                    {node.vi}
                  </div>
                  <div className="text-blue-700 font-semibold text-xs">
                    {node.en}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

