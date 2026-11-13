/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';

interface ConsultationFormProps {
  content: SiteContent['consultation'];
  initialMessage?: string;
  onClearInitialMessage?: () => void;
  onScrollToRequirements?: () => void;
}

export default function ConsultationForm({
  content,
  initialMessage,
  onClearInitialMessage,
  onScrollToRequirements,
}: ConsultationFormProps) {
  const [copied, setCopied] = useState(false);
  const [showTemplateHelper, setShowTemplateHelper] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultTemplate = `${content.templateText}${initialMessage ? '\n' + initialMessage : ''}`;

  useEffect(() => {
    if (initialMessage) {
      setShowTemplateHelper(true);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initialMessage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultTemplate).then(() => {
      setCopied(true);
      import('../firebase')
        .then(({ submitConsultation }) =>
          submitConsultation({
            name: 'LINE相談希望者（メッセージコピー）',
            contact: '公式LINE遷移',
            message: defaultTemplate,
            source: 'consultation_box',
          })
        )
        .catch(() => {});
      setTimeout(() => setCopied(false), 2000);
      if (onClearInitialMessage) {
        onClearInitialMessage();
      }
    });
  };

  const handleScrollJobs = () => {
    if (onScrollToRequirements) {
      onScrollToRequirements();
    } else {
      document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 bg-[#FFF6F8] border-y border-[#F3E5EA]"
      id="consultation"
    >
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
          LINE CONSULTATION
        </p>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] mb-4 leading-snug">
          {content.title}
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto mb-8 whitespace-pre-line">
          {content.description}
        </p>

        {/* Primary CTA Buttons */}
        <div className="bg-white rounded-3xl border border-[#EFE2E7] shadow-[0_6px_24px_rgba(166,93,121,0.08)] p-6 sm:p-8 max-w-xl mx-auto">
          <p className="text-xs font-bold text-[#A65D79] mb-4">
            {content.lineBadgeText}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="consultation-line-cta-btn"
              className="w-full font-display font-bold py-4 px-6 rounded-2xl shadow-[0_4px_16px_rgba(6,199,85,0.28)] hover:shadow-[0_6px_20px_rgba(6,199,85,0.36)] transition-all flex items-center justify-center gap-2.5 text-white bg-[#06C755] hover:bg-[#05b34c] text-base sm:text-lg"
            >
              <LucideIcon name="MessageCircle" className="fill-white text-white shrink-0" size={22} />
              <span>LINEで気軽に相談する</span>
            </a>

            <button
              type="button"
              onClick={handleScrollJobs}
              id="consultation-requirements-btn"
              className="w-full font-display font-bold py-3.5 px-6 rounded-2xl bg-[#FFF6F8] hover:bg-[#FCE8EF] text-[#A65D79] border border-[#E2CED6] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <LucideIcon name="ClipboardList" size={18} />
              <span>募集要項をもう一度確認する</span>
            </button>
          </div>

          <p className="text-[11px] text-[#666666] mt-3 whitespace-pre-line">
            {content.lineSubtitle}
          </p>

          {/* Optional Copy Helper Toggle */}
          <div className="mt-5 pt-4 border-t border-[#F3E7EC]">
            <button
              type="button"
              onClick={() => setShowTemplateHelper(!showTemplateHelper)}
              className="text-xs font-bold text-[#A65D79] hover:text-[#E85B91] inline-flex items-center gap-1 cursor-pointer"
            >
              <LucideIcon name={showTemplateHelper ? 'ChevronUp' : 'Copy'} size={13} />
              <span>
                {showTemplateHelper ? 'LINE相談テンプレートを閉じる' : 'LINEで送る文章のテンプレートを使う'}
              </span>
            </button>

            {showTemplateHelper && (
              <div className="mt-4 bg-[#F7F2EC] border border-[#E9DFD4] rounded-2xl p-4 text-left">
                <p className="text-xs text-[#555555] font-medium mb-2">
                  {content.copySubtitle}
                </p>
                <div className="w-full bg-white border border-[#E5D7DC] rounded-xl py-3 px-4 font-sans text-xs sm:text-sm text-[#333333] select-all mb-3 leading-relaxed whitespace-pre-wrap">
                  {defaultTemplate}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    copied
                      ? 'bg-[#FFF6F8] text-[#A65D79] border border-[#A65D79]'
                      : 'bg-[#333333] text-white hover:bg-[#4A4A4A]'
                  }`}
                >
                  <LucideIcon name={copied ? 'Check' : 'Copy'} size={15} />
                  <span>{copied ? 'コピーしました' : content.copyButtonText}</span>
                </button>
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#666666] mt-4 whitespace-pre-line">
            {content.privacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
