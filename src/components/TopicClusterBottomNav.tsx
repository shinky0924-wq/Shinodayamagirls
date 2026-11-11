/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import LucideIcon from './LucideIcon';
import { ALL_CLUSTER_NODES } from '../topicClusterData';

interface TopicClusterBottomNavProps {
  currentTopicId?: string;
  onNavigateHome: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  className?: string;
}

export default function TopicClusterBottomNav({
  currentTopicId,
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  className = ''
}: TopicClusterBottomNavProps) {
  return (
    <nav
      aria-label="公式テーマ・分野別ガイド一覧"
      className={`bg-white rounded-[24px] p-6 sm:p-8 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)] ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F0DDE4]/70">
        <div>
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            ALL GUIDE THEMES
          </span>
          <h3 className="font-display font-black text-lg sm:text-xl text-[#1F2432] flex items-center gap-2">
            <LucideIcon name="Compass" size={20} className="text-[#D8175D]" />
            <span>信太山新地 公式テーマ・分野別ガイド</span>
          </h3>
          <p className="text-xs text-[#666666] mt-1">
            知りたいテーマを選んで、お仕事内容や待遇、お店選びなどを詳しくご確認いただけます。
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateHome}
          className="self-start sm:self-auto text-xs font-bold text-[#555555] hover:text-[#D8175D] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF5F8] border border-[#F0DDE4] hover:bg-[#FFE8F0] transition-all cursor-pointer shrink-0"
        >
          <LucideIcon name="Home" size={13} className="text-[#D8175D]" />
          <span>求人トップへ戻る</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {ALL_CLUSTER_NODES.map((node) => {
          const isRecruit = node.id === 'recruit';
          const isActive = node.id === currentTopicId;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                if (isRecruit) {
                  onNavigateHome();
                } else if (node.id === 'faq') {
                  if (onNavigateFaq) onNavigateFaq();
                } else if (node.id === 'blog') {
                  if (onNavigateBlog) onNavigateBlog();
                } else {
                  onNavigateTopic(node.id);
                }
              }}
              className={`p-3 rounded-[16px] border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                isActive
                  ? 'border-[#D8175D] bg-[#FFF5F8] ring-2 ring-[#D8175D]/30 shadow-xs'
                  : 'border-[#F0DDE4] bg-[#FFFAFC] hover:bg-white hover:border-[#D8175D]/50 hover:shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl shrink-0">{node.emoji}</span>
                  <span
                    className={`text-xs font-bold leading-tight ${
                      isActive ? 'text-[#D8175D] font-black' : 'text-[#1F2432] group-hover:text-[#D8175D]'
                    }`}
                  >
                    {node.title}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 text-[10px]">
                {isActive ? (
                  <span className="text-[#D8175D] font-extrabold flex items-center gap-0.5">
                    <span>現在地</span>
                  </span>
                ) : (
                  <span className="text-[#888888] group-hover:text-[#D8175D] font-medium flex items-center gap-0.5">
                    <span>詳しく見る</span>
                    <LucideIcon name="ChevronRight" size={10} />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
