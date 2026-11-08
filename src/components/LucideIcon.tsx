/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  className?: string;
}

export default function LucideIcon({ name, size = 16, className = '', ...props }: LucideIconProps) {
  // Convert kebab-case or PascalCase to matching Lucide export
  const formattedName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const IconComponent =
    (LucideIcons as Record<string, any>)[name] ||
    (LucideIcons as Record<string, any>)[formattedName] ||
    LucideIcons.HelpCircle;

  return <IconComponent size={size} className={className} {...props} />;
}
