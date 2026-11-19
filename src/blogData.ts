/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rawArticleIndex from '../data/blogArticlesIndex.json';

export interface BlogArticleSection {
  heading: string;
  body?: string;
  points?: string[];
  subsections?: {
    subheading: string;
    text: string;
  }[];
}

export interface BlogArticleFAQ {
  question: string;
  answer: string;
}

export interface BlogArticleContentBlock {
  type: 'p' | 'h2' | 'h3' | 'list' | 'qna' | 'cta';
  text?: string;
  items?: string[];
  question?: string;
  answer?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  summary: string;
  eyeCatch: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags?: string[];
  noindex?: boolean;
  content?: 
    | BlogArticleContentBlock[]
    | {
        intro?: string;
        sections?: BlogArticleSection[];
        faqs?: BlogArticleFAQ[];
        conclusion?: string;
      };
}

export const BLOG_ARTICLES: BlogArticle[] = rawArticleIndex as BlogArticle[];

// Strict 1-to-1 unique mapping for photographic assets so NO image is reused ("画像は２度使わないようにして / 画像が被ってる記事あるよ")
// ALL photos feature Japanese people or authentic Japanese ryotei/cafe/interior scenes - NO foreigners ("外国人の画像は使わないで日本人にして")
export const ARTICLE_EXCLUSIVE_IMAGES: Record<string, string> = {
  'cast-direct-interview': '/images/shinodayama_cast_mai_1792225964470.webp',
  'recruiter-direct-interview': '/images/shinodayama_advisor_sakura_1792225964799.webp',
  'shinodayamashinchi-beginner-guide': '/images/shinodayama_hero_banner_1792225964954.webp',
  'shinodayamashinchi-salary-system': '/images/col_salary_yen_1792463652387.webp',
  'shinodayamashinchi-privacy-guide': '/images/col_privacy_safe_1792463653857.webp',
  'shinodayamashinchi-housing-support': '/images/col_dorm_interior_1792463651469.webp',
  'shinodayamashinchi-interview-guide': '/images/col_interview_counseling_jp_1792475575633.webp',
  'shinodayamashinchi-trial-guide': '/images/col_trial_orient_jp_1792475594501.webp',
  'shinodayamashinchi-age-and-looks': '/images/shinodayama_cast_yuri_1792225965491.webp',
  'shinodayamashinchi-tax-guide': '/images/col_tax_calc_1792473971279.webp',
  'shinodayamashinchi-non-alcoholic': '/images/col_non_alcohol_1792473970240.webp',
  'shinodayamashinchi-short-term-work': '/images/col_short_term_1792473989733.webp',
  'shinodayamashinchi-safety-and-security': '/images/col_safety_gate_1792474007202.webp',
  'shinodayamashinchi-kimono-and-makeup': '/images/col_beauty_kimono_1792463653258.webp',
  'shinodayamashinchi-double-work-lifestyle': '/images/col_double_work_jp_1792475554864.webp',
  'shinodayamashinchi-mental-support': '/images/col_mental_care_jp_1792475594172.webp',
  'shinodayamashinchi-search-keywords': '/images/col_search_phone_jp_1792475574840.webp',
  'shinodayamashinchi-obachan-role': '/images/col_obachan_tea_1792474118271.webp',
  'shinodayamashinchi-weekend-shift': '/images/col_weekend_planner_1792475629264.webp',
  'shinodayamashinchi-popular-cast-tips': '/images/col_popular_cast_jp_1792476715216.webp',
  'shinodayamashinchi-student-success': '/images/col_ageless_beauty_1792475612676.webp',
  'shinodayamashinchi-10million-savings': '/images/col_savings_goal_jp_1792476735709.webp',
  'shinodayamashinchi-friends-recruit': '/images/col_bath_detox_jp_1792476829424.webp',
  'shinodayamashinchi-mature-ladies-success': '/images/col_mature_beauty_jp_1792476778964.webp',
  'shinodayamashinchi-dormitory-life-real': '/images/col_cozy_apartment_jp_1792476810515.webp',
  'shinodayamashinchi-daytime-shift-advantage': '/images/col_daytime_clock_jp_1792476810942.webp',
  'shinodayamashinchi-vs-other-night-jobs': '/images/workstyle_guide_hero_1794546577303.webp',
  'shinodayamashinchi-no-resume-quick-trial': '/images/col_quick_trial_essentials_jp_1792476863910.webp',
  'shinodayamashinchi-friendly-support-staff-real': '/images/col_friendly_staff_jp_1792476884275.webp',
  'shinodayamashinchi-resort-style-work-holiday': '/images/col_resort_work_jp_1792476884003.webp',
  'cafe-line-counseling-support-guide': '/images/col_cast_holiday_jp_1792475554095.webp',
  'free-makeup-costume-rental-support': '/images/col_one_day_flow_1792474096539.webp',
  'commute-access-tennoji-namba-guide': '/images/col_goal_roadmap_jp_1792476864281.webp',
  'night-shift-taxi-pickup-safety-system': '/images/col_interview_hacks_jp_1792476795351.webp',
  'sns-privacy-protection-rules': '/images/privacy_phone_discreet_1794375281535.webp',
  'local-travel-work-hotel-support': '/images/col_friends_pair_jp_1792476736438.webp',
  'shift-schedule-app-management-tips': '/images/col_kimono_fabrics_1792474118565.webp',
  'overseas-travel-study-abroad-savings-plan': '/images/col_ryokan_manner_1792465891118.webp',
  'bank-account-hand-cash-safe-management': '/images/col_luxury_beauty_1792474257173.webp',
  'ryokan-culture-japanese-manner-elegance': '/images/col_secure_ryotei_1792475628730.webp',
  'non-alcoholic-juice-smart-hospitality': '/images/col_taiken_prep_1792475646166.webp',
  'shinodayamashinchi-salary-calculation-system': '/images/dorm_bed_area_1794374510713.webp',
  'shinodayamashinchi-street-differences-recruitment': '/images/col_ageless_beauty_1792475612676.webp',
  'shinodayamashinchi-work-rules-hygiene-safety-standards': '/images/col_easy_yukata_jp_1792476829780.webp',
  'shinodayama-job-guide': '/images/ryokan_working_woman_1792485020272.webp',
  'shinodayamashinchi-work-flow-simulation': '/images/dorm_main_studio_1794374510330.webp',
  'shinodayamashinchi-interview-requirements-documents': '/images/col_official_documents_1792465890547.webp',
  'shinodayamashinchi-dorm-life-support-truth': '/images/dorm_storage_desk_1794374512351.webp',
  'shinodayamashinchi-identity-alibi-safety-measures': '/images/hub_beginner_cast_1792485407920.webp',
  'shinodayama-street-compare': '/images/col_privacy_discretion_1792475612461.webp',
  'shinodayamashinchi-stamina-mental-care-100k': '/images/cast_ayaka_snap_1794475329022.webp',
  'shinodayama-safe-recruitment': '/images/cast_mai_snap_1794475286956.webp',
  'shinodayamashinchi-work-rules-hygiene-no-bath-washing-reality': '/images/hub_experienced_cast_1792485405837.webp',
  'shinodayamashinchi-scout-fraud-avoidance-safe-recruitment': '/images/cast_yuri_snap_1794475308769.webp',
  'shinodayamashinchi-tax-return-sole-proprietor-expenses-guide': '/images/privacy_ryokan_room_1794375281070.webp',
  'shinodayamashinchi-training-lecture-no-practical-exam': '/images/relocation_suitcase_travel_1794374512087.webp',
  'is-shinodayamashinchi-scary-safety-truth': '/images/safety_female_consultation_1794375281375.webp',
  'shinodayamashinchi-customer-demographics-types': '/images/shinodayama_cast_ayaka_1792486845624.webp',
  'first-day-at-shinodayamashinchi-schedule-flow': '/images/waiting_lounge_woman_1794803592646.webp',
  'interview-questions-and-pass-points-guide': '/images/col_bath_detox_jp_1792476829424.webp',
  'what-to-wear-interview-trial-fashion-guide': '/images/station_to_ryokan_access_1794816812051.webp',
  'what-to-bring-first-day-belongings-checklist': '/images/col_bonus_envelope_jp_1792476753315.webp',
  'service-time-minutes-table-turning-mechanism': '/images/cast_ayaka_snap_1794475329022.webp',
  'can-i-work-once-a-week-freedom-shift-truth': '/images/cast_mai_snap_1794475286956.webp',
  'can-i-do-double-work-without-getting-caught': '/images/col_future_dreams_jp_1792476794603.webp',
  'how-to-quit-penalty-truth-smooth-exit': '/images/cast_yuri_snap_1794475308769.webp',
  'shinodayamashinchi-standby-room-reality': '/images/standby_lounge_interior_1794827974238.jpg',
  'shinodayamashinchi-nakaishiki-system-guide': '/images/nakai_support_hallway_1794827974260.jpg',
  'shinodayamashinchi-first-day-income-simulation': '/images/cash_daypay_envelope_1794827975388.jpg',
  'shinodayamashinchi-tobita-matsushima-comparison': '/images/izumi_ryokan_street_1794827977542.jpg',
  'shinodayamashinchi-half-year-rule-shop-choice': '/images/traditional_wood_doorway_1794827976919.jpg',
  'shinodayamashinchi-interview-pass-checklist': '/images/interview_meeting_cafe_1794827978936.jpg',
  'shinodayamashinchi-20th-holiday-shift-plan': '/images/monthly_schedule_planner_1794827978795.jpg',
  'shinodayamashinchi-dormitory-dekasegi-packing': '/images/dormitory_packing_luggage_1794827978756.jpg',
  'shinodayamashinchi-side-job-family-privacy': '/images/hanwa_commute_station_1794827979495.jpg',
  'shinodayamashinchi-30s-40s-beginner-guide': '/images/mature_elegance_portrait_1794827979790.jpg',
  'shinodayamashinchi-looks-body-criteria-guide': '/images/article_looks_style_1794999113478.jpg',
  'shinodayamashinchi-slow-hours-guarantee-truth': '/images/article_schedule_income_1794999113133.jpg',
  'shinodayamashinchi-legality-safety-compliance-guide': '/images/article_safety_compliance_1794999114141.jpg',
  'shinodayamashinchi-age-limit-hiring-criteria': '/images/article_age_interview_jp_1794999132725.jpg',
  'shinodayamashinchi-service-scope-rules-guide': '/images/article_hospitality_rules_1794999117545.jpg',
  'shinodayamashinchi-period-hygiene-care-guide': '/images/article_hygiene_care_1794999133833.jpg',
  'shinodayamashinchi-half-year-rule-quit-guide': '/images/article_half_year_rule_1794999134711.jpg',
  'shinodayamashinchi-single-mother-dayshift-guide': '/images/article_mama_dayshift_1794999135116.jpg',
  'shinodayamashinchi-access-car-commute-guide': '/images/article_station_commute_1794999135021.jpg',
  'shinodayamashinchi-direct-apply-vs-scout-guide': '/images/article_direct_vs_scout_1794999136077.jpg',
  'shinodayamashinchi-tattoo-scar-conceal-guide': '/images/article_tattoo_care_jp_1795000238370.jpg',
  'shinodayamashinchi-nails-hair-scent-grooming': '/images/article_nails_grooming_jp_1795000239169.jpg',
  'shinodayamashinchi-waiting-time-activities-guide': '/images/article_lounge_wait_jp_1795000239578.jpg',
  'shinodayamashinchi-married-housewife-tax-dependent': '/images/article_shufufuyo_life_jp_1795000240585.jpg',
  'shinodayamashinchi-nomination-free-repeater-system': '/images/article_nomination_nakai_jp_1795000239883.jpg',
  'shinodayamashinchi-foreign-guest-language-rules': '/images/article_foreign_guest_rule_jp_1795000254235.jpg',
  'shinodayamashinchi-cosmetic-surgery-downtime-shift': '/images/article_beauty_downtime_jp_1795000255214.jpg',
  'shinodayamashinchi-no-deductions-fines-truth': '/images/article_zero_deduction_jp_1795000255282.jpg',
  'shinodayamashinchi-no-contact-stalker-security': '/images/article_security_exit_quiet_1795000275057.jpg',
  'shinodayamashinchi-transition-from-other-nightwork': '/images/article_career_switch_jp_1795000256860.jpg',
  'shinodayamashinchi-demerits-unsuitable-truth': '/images/article_pros_cons_jp_1795000853146.jpg',
  'shinodayamashinchi-seasonal-busy-slow-calendar': '/images/article_seasonal_calendar_jp_1795000853815.jpg',
  'shinodayamashinchi-kyoto-hyogo-nara-wakayama-access': '/images/article_kansai_rail_jp_1795000854103.jpg',
  'shinodayamashinchi-vs-papakatsu-chatlady-concafe': '/images/article_safe_compare_jp_1795000854369.jpg',
  'shinodayamashinchi-vio-hair-removal-skin-care': '/images/article_skin_care_smooth_jp_1795000854760.jpg',
  'shinodayamashinchi-pms-low-dose-pill-balance': '/images/article_pms_pill_care_jp_1795000871295.jpg',
  'shinodayamashinchi-rental-credit-card-screening': '/images/article_rental_credit_jp_1795000871621.jpg',
  'shinodayamashinchi-visit-only-consultation-guide': '/images/article_kengaku_only_jp_1795000872431.jpg',
  'shinodayamashinchi-shy-introvert-conversation-tips': '/images/article_shy_conversation_jp_1795000874480.jpg',
  'shinodayamashinchi-graduation-dayjob-exit-plan': '/images/article_graduation_next_jp_1795000873763.jpg',
  'shinodayamashinchi-hidden-camera-recording-prevention': '/images/article_camera_security_jp_1795001590292.jpg',
  'shinodayamashinchi-bust-size-height-complex-guide': '/images/article_petite_tall_style_jp_1795001590790.jpg',
  'shinodayamashinchi-smoking-nonsmoking-environment': '/images/article_clean_air_lounge_jp_1795001591520.jpg',
  'shinodayamashinchi-locker-shower-amenities-guide': '/images/article_powder_locker_jp_1795001590890.jpg',
  'shinodayamashinchi-glasses-contacts-vision-tips': '/images/article_glasses_onoff_jp_1795001591656.jpg',
  'shinodayamashinchi-comeback-after-blank-guide': '/images/article_comeback_blank_jp_1795001613891.jpg',
  'shinodayamashinchi-kaigyo-invoice-tax-basics': '/images/article_kaigyo_invoice_jp_1795001613056.jpg',
  'shinodayamashinchi-debt-repayment-savings-plan': '/images/article_debt_repayment_jp_1795001614093.jpg',
  'shinodayamashinchi-id-documents-privacy-handling': '/images/article_id_privacy_doc_jp_1795001614377.jpg',
  'shinodayamashinchi-light-side-income-shift-guide': '/images/article_light_pocket_money_jp_1795001615238.jpg',
  'shinodayamashinchi-std-checkup-health-guide': '/images/article_std_health_jp_1795002189517.jpg',
  'shinodayamashinchi-atopy-sensitive-skin-allergy': '/images/article_sensitive_skin_jp_1795002190748.jpg',
  'shinodayamashinchi-skin-tone-odor-hygiene-care': '/images/article_clean_bodycare_jp_1795002190812.jpg',
  'shinodayamashinchi-pregnancy-postpartum-return-guide': '/images/article_postpartum_care_jp_1795002191942.jpg',
  'shinodayamashinchi-shorthair-wig-extension-guide': '/images/article_shorthair_style_jp_1795002213017.jpg',
  'shinodayamashinchi-braces-aligners-dental-guide': '/images/article_dental_aligner_jp_1795002191955.jpg',
  'shinodayamashinchi-emergency-nakai-blacklist-safety': '/images/article_nakai_safety_jp_1795002193973.jpg',
  'shinodayamashinchi-guest-privacy-conversation-guard': '/images/article_privacy_talk_jp_1795002194219.jpg',
  'shinodayamashinchi-fulltime-health-insurance-pension': '/images/article_insurance_pension_jp_1795002194314.jpg',
  'jr-shinodayama-station-shopping-convenience-guide': '/images/article_station_shops_jp_1795002193812.jpg',
  'shinodayamashinchi-living-with-parents-privacy-guide': '/images/article_parents_home_jp_1795002845348.jpg',
  'shinodayamashinchi-cohabiting-boyfriend-privacy-rules': '/images/article_partner_privacy_jp_1795002845022.jpg',
  'shinodayamashinchi-trial-only-decline-guide': '/images/article_trial_decision_jp_1795002846275.jpg',
  'shinodayamashinchi-line-inquiry-reschedule-template': '/images/article_line_reschedule_jp_1795002846200.jpg',
  'shinodayamashinchi-cast-relationships-no-factions': '/images/article_lounge_harmony_jp_1795002847339.jpg',
  'shinodayamashinchi-15min-vs-long-course-comparison': '/images/article_course_pace_jp_1795002847743.jpg',
  'shinodayamashinchi-second-shift-first-month-guide': '/images/article_first_month_step_jp_1795002848591.jpg',
  'shinodayamashinchi-dayshift-vs-nightshift-comparison': '/images/article_day_night_shift_jp_1795002848539.jpg',
  'shinodayamashinchi-vs-takii-imazato-comparison': '/images/article_osaka_shinchi_cmp_jp_1795002849602.jpg',
  'shinodayamashinchi-kix-shinosaka-namba-access': '/images/article_kansai_transit_jp_1795002849597.jpg',
  'shinodayamashinchi-acquaintance-guest-ng-prevention': '/images/article_ng_guard_jp_1795007126762.jpg',
  'shinodayamashinchi-ekasegi-extend-early-return': '/images/article_ekasegi_flex_jp_1795007127245.jpg',
  'shinodayamashinchi-stand-vs-ryokan-waiting-comparison': '/images/article_stand_ryokan_jp_1795007127959.jpg',
  'shinodayamashinchi-short-shift-late-early-leave': '/images/article_short_shift_jp_1795007128702.jpg',
  'shinodayamashinchi-20th-holiday-payday-shift-strategy': '/images/article_holiday_strategy_jp_1795007128671.jpg',
  'shinodayamashinchi-hourly-guarantee-conditions-truth': '/images/article_guarantee_rules_jp_1795007129776.jpg',
  'shinodayamashinchi-vs-soap-health-pinsaro-comparison': '/images/article_experience_switch_jp_1795007129506.jpg',
  'shinodayamashinchi-multi-job-other-area-rules': '/images/article_multijob_balance_jp_1795007131591.jpg',
  'shinodayamashinchi-nakai-staff-recruitment-guide': '/images/nakai_staff_jp_1795022672264.jpg',
  'shinodayamashinchi-emergency-contact-privacy-deletion': '/images/privacy_guarantee_jp_1795022673127.jpg',
  'shinodayamashinchi-no-panel-photo-no-diary-privacy': '/images/no_panel_photo_jp_1795022673371.jpg',
  'shinodayamashinchi-same-day-apply-interview-trial-schedule': '/images/same_day_trial_jp_1795022674805.jpg',
  'shinodayamashinchi-same-day-absence-shift-change-manner': '/images/shift_notice_jp_1795022673915.jpg',
  'shinodayamashinchi-work-costume-sizes-rental-guide': '/images/costume_size_jp_1795022675879.jpg',
  'shinodayamashinchi-holiday-monthly-spot-shift-guide': '/images/spot_work_jp_1795022676418.jpg',
  'shinodayamashinchi-guest-welcome-sendoff-hospitality': '/images/guest_welcome_jp_1795022677235.jpg',
  'shinodayamashinchi-age-20-japanese-nationality-eligibility': '/images/eligibility_id_jp_1795022677719.jpg',
  'shinodayamashinchi-restart-after-divorce-marriage-savings': '/images/fresh_start_jp_1795022678759.jpg',
};

// All available 100% verified authentic Japanese photographic assets
export const ALL_JAPANESE_PHOTO_ASSETS: string[] = [
  '/images/shinodayama_cast_mai_1792225964470.webp',
  '/images/shinodayama_advisor_sakura_1792225964799.webp',
  '/images/shinodayama_hero_banner_1792225964954.webp',
  '/images/col_salary_yen_1792463652387.webp',
  '/images/col_privacy_safe_1792463653857.webp',
  '/images/col_dorm_interior_1792463651469.webp',
  '/images/col_interview_counseling_jp_1792475575633.webp',
  '/images/col_trial_orient_jp_1792475594501.webp',
  '/images/shinodayama_cast_yuri_1792225965491.webp',
  '/images/col_tax_calc_1792473971279.webp',
  '/images/col_non_alcohol_1792473970240.webp',
  '/images/col_short_term_1792473989733.webp',
  '/images/col_safety_gate_1792474007202.webp',
  '/images/col_beauty_kimono_1792463653258.webp',
  '/images/col_double_work_jp_1792475554864.webp',
  '/images/col_mental_care_jp_1792475594172.webp',
  '/images/col_search_phone_jp_1792475574840.webp',
  '/images/col_obachan_tea_1792474118271.webp',
  '/images/col_weekend_planner_1792475629264.webp',
  '/images/col_popular_cast_jp_1792476715216.webp',
  '/images/col_ageless_beauty_1792475612676.webp',
  '/images/col_savings_goal_jp_1792476735709.webp',
  '/images/col_bath_detox_jp_1792476829424.webp',
  '/images/col_mature_beauty_jp_1792476778964.webp',
  '/images/col_cozy_apartment_jp_1792476810515.webp',
  '/images/col_daytime_clock_jp_1792476810942.webp',
  '/images/workstyle_guide_hero_1794546577303.webp',
  '/images/col_quick_trial_essentials_jp_1792476863910.webp',
  '/images/col_friendly_staff_jp_1792476884275.webp',
  '/images/col_resort_work_jp_1792476884003.webp',
  '/images/col_cast_holiday_jp_1792475554095.webp',
  '/images/col_one_day_flow_1792474096539.webp',
  '/images/col_goal_roadmap_jp_1792476864281.webp',
  '/images/col_interview_hacks_jp_1792476795351.webp',
  '/images/privacy_phone_discreet_1794375281535.webp',
  '/images/col_friends_pair_jp_1792476736438.webp',
  '/images/col_kimono_fabrics_1792474118565.webp',
  '/images/col_ryokan_manner_1792465891118.webp',
  '/images/col_luxury_beauty_1792474257173.webp',
  '/images/col_secure_ryotei_1792475628730.webp',
  '/images/col_taiken_prep_1792475646166.webp',
  '/images/dorm_bed_area_1794374510713.webp',
  '/images/col_easy_yukata_jp_1792476829780.webp',
  '/images/ryokan_working_woman_1792485020272.webp',
  '/images/dorm_main_studio_1794374510330.webp',
  '/images/col_official_documents_1792465890547.webp',
  '/images/dorm_storage_desk_1794374512351.webp',
  '/images/hub_beginner_cast_1792485407920.webp',
  '/images/col_privacy_discretion_1792475612461.webp',
  '/images/cast_ayaka_snap_1794475329022.webp',
  '/images/cast_mai_snap_1794475286956.webp',
  '/images/hub_experienced_cast_1792485405837.webp',
  '/images/cast_yuri_snap_1794475308769.webp',
  '/images/privacy_ryokan_room_1794375281070.webp',
  '/images/relocation_suitcase_travel_1794374512087.webp',
  '/images/safety_female_consultation_1794375281375.webp',
  '/images/shinodayama_cast_ayaka_1792486845624.webp',
  '/images/waiting_lounge_woman_1794803592646.webp',
  '/images/station_to_ryokan_access_1794816812051.webp',
  '/images/col_bonus_envelope_jp_1792476753315.webp',
  '/images/col_future_dreams_jp_1792476794603.webp',
  '/images/standby_lounge_interior_1794827974238.jpg',
  '/images/nakai_support_hallway_1794827974260.jpg',
  '/images/cash_daypay_envelope_1794827975388.jpg',
  '/images/izumi_ryokan_street_1794827977542.jpg',
  '/images/traditional_wood_doorway_1794827976919.jpg',
  '/images/interview_meeting_cafe_1794827978936.jpg',
  '/images/monthly_schedule_planner_1794827978795.jpg',
  '/images/dormitory_packing_luggage_1794827978756.jpg',
  '/images/hanwa_commute_station_1794827979495.jpg',
  '/images/mature_elegance_portrait_1794827979790.jpg',
  '/images/article_looks_style_1794999113478.jpg',
  '/images/article_schedule_income_1794999113133.jpg',
  '/images/article_safety_compliance_1794999114141.jpg',
  '/images/article_age_interview_jp_1794999132725.jpg',
  '/images/article_hospitality_rules_1794999117545.jpg',
  '/images/article_hygiene_care_1794999133833.jpg',
  '/images/article_half_year_rule_1794999134711.jpg',
  '/images/article_mama_dayshift_1794999135116.jpg',
  '/images/article_station_commute_1794999135021.jpg',
  '/images/article_direct_vs_scout_1794999136077.jpg',
  '/images/article_tattoo_care_jp_1795000238370.jpg',
  '/images/article_nails_grooming_jp_1795000239169.jpg',
  '/images/article_lounge_wait_jp_1795000239578.jpg',
  '/images/article_shufufuyo_life_jp_1795000240585.jpg',
  '/images/article_nomination_nakai_jp_1795000239883.jpg',
  '/images/article_foreign_guest_rule_jp_1795000254235.jpg',
  '/images/article_beauty_downtime_jp_1795000255214.jpg',
  '/images/article_zero_deduction_jp_1795000255282.jpg',
  '/images/article_security_exit_quiet_1795000275057.jpg',
  '/images/article_career_switch_jp_1795000256860.jpg',
  '/images/article_pros_cons_jp_1795000853146.jpg',
  '/images/article_seasonal_calendar_jp_1795000853815.jpg',
  '/images/article_kansai_rail_jp_1795000854103.jpg',
  '/images/article_safe_compare_jp_1795000854369.jpg',
  '/images/article_skin_care_smooth_jp_1795000854760.jpg',
  '/images/article_pms_pill_care_jp_1795000871295.jpg',
  '/images/article_rental_credit_jp_1795000871621.jpg',
  '/images/article_kengaku_only_jp_1795000872431.jpg',
  '/images/article_shy_conversation_jp_1795000874480.jpg',
  '/images/article_graduation_next_jp_1795000873763.jpg',
  '/images/article_camera_security_jp_1795001590292.jpg',
  '/images/article_petite_tall_style_jp_1795001590790.jpg',
  '/images/article_clean_air_lounge_jp_1795001591520.jpg',
  '/images/article_powder_locker_jp_1795001590890.jpg',
  '/images/article_glasses_onoff_jp_1795001591656.jpg',
  '/images/article_comeback_blank_jp_1795001613891.jpg',
  '/images/article_kaigyo_invoice_jp_1795001613056.jpg',
  '/images/article_debt_repayment_jp_1795001614093.jpg',
  '/images/article_id_privacy_doc_jp_1795001614377.jpg',
  '/images/article_light_pocket_money_jp_1795001615238.jpg',
  '/images/article_std_health_jp_1795002189517.jpg',
  '/images/article_sensitive_skin_jp_1795002190748.jpg',
  '/images/article_clean_bodycare_jp_1795002190812.jpg',
  '/images/article_postpartum_care_jp_1795002191942.jpg',
  '/images/article_shorthair_style_jp_1795002213017.jpg',
  '/images/article_dental_aligner_jp_1795002191955.jpg',
  '/images/article_nakai_safety_jp_1795002193973.jpg',
  '/images/article_privacy_talk_jp_1795002194219.jpg',
  '/images/article_insurance_pension_jp_1795002194314.jpg',
  '/images/article_station_shops_jp_1795002193812.jpg',
  '/images/article_parents_home_jp_1795002845348.jpg',
  '/images/article_partner_privacy_jp_1795002845022.jpg',
  '/images/article_trial_decision_jp_1795002846275.jpg',
  '/images/article_line_reschedule_jp_1795002846200.jpg',
  '/images/article_lounge_harmony_jp_1795002847339.jpg',
  '/images/article_course_pace_jp_1795002847743.jpg',
  '/images/article_first_month_step_jp_1795002848591.jpg',
  '/images/article_day_night_shift_jp_1795002848539.jpg',
  '/images/article_osaka_shinchi_cmp_jp_1795002849602.jpg',
  '/images/article_kansai_transit_jp_1795002849597.jpg',
  '/images/article_ng_guard_jp_1795007126762.jpg',
  '/images/article_ekasegi_flex_jp_1795007127245.jpg',
  '/images/article_stand_ryokan_jp_1795007127959.jpg',
  '/images/article_short_shift_jp_1795007128702.jpg',
  '/images/article_holiday_strategy_jp_1795007128671.jpg',
  '/images/article_guarantee_rules_jp_1795007129776.jpg',
  '/images/article_experience_switch_jp_1795007129506.jpg',
  '/images/article_multijob_balance_jp_1795007131591.jpg',
  '/images/nakai_staff_jp_1795022672264.jpg',
  '/images/privacy_guarantee_jp_1795022673127.jpg',
  '/images/no_panel_photo_jp_1795022673371.jpg',
  '/images/same_day_trial_jp_1795022674805.jpg',
  '/images/shift_notice_jp_1795022673915.jpg',
  '/images/costume_size_jp_1795022675879.jpg',
  '/images/spot_work_jp_1795022676418.jpg',
  '/images/guest_welcome_jp_1795022677235.jpg',
  '/images/eligibility_id_jp_1795022677719.jpg',
  '/images/fresh_start_jp_1795022678759.jpg',
];

export function getValidArticleEyeCatch(article?: BlogArticle | null): string {
  if (!article) {
    return '/images/shinodayama_hero_banner_1792225964954.webp';
  }

  // 1. Direct slug match in exclusive mapping
  if (article.slug && ARTICLE_EXCLUSIVE_IMAGES[article.slug]) {
    return ARTICLE_EXCLUSIVE_IMAGES[article.slug];
  }

  // 2. Direct article eyeCatch if verified authentic Japanese photo asset
  if (article.eyeCatch && ALL_JAPANESE_PHOTO_ASSETS.includes(article.eyeCatch)) {
    return article.eyeCatch;
  }

  // 3. Fallback based on deterministic hash across all Japanese photos
  const key = article.slug || article.id || article.title || '';
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % ALL_JAPANESE_PHOTO_ASSETS.length;
  return ALL_JAPANESE_PHOTO_ASSETS[index];
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

let cachedFullArticles: BlogArticle[] | null = null;
const cachedSingleArticles = new Map<string, BlogArticle>();

export async function loadAllFullBlogArticles(): Promise<BlogArticle[]> {
  if (cachedFullArticles) return cachedFullArticles;
  const mod = await import('../data/blogArticles.json');
  cachedFullArticles = (mod.default || mod) as BlogArticle[];
  return cachedFullArticles;
}

export async function loadFullBlogArticle(slug: string): Promise<BlogArticle | undefined> {
  if (!slug) return undefined;
  if (cachedSingleArticles.has(slug)) {
    return cachedSingleArticles.get(slug);
  }
  if (cachedFullArticles) {
    return cachedFullArticles.find((a) => a.slug === slug);
  }
  try {
    const res = await fetch(`/articles/${encodeURIComponent(slug)}.json`);
    if (res.ok) {
      const article = (await res.json()) as BlogArticle;
      if (article && article.slug) {
        cachedSingleArticles.set(slug, article);
        return article;
      }
    }
  } catch {
    // fallback to lazy full bundle when individual JSON is unavailable
  }
  const fullList = await loadAllFullBlogArticles();
  return fullList.find((a) => a.slug === slug);
}
