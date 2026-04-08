// src/components/SkillBadge.tsx
import React from 'react';
import './SkillBadge.css';

interface Props {
    name: string;
}

export const SkillBadge: React.FC<Props> = ({ name }) => {
    return <span className="skill-badge">{name}</span>;
};