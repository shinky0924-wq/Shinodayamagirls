/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConcernItem {
  id: string;
  iconName: string;
  title: string;
  question: string;
  answer?: string;
}

export interface ReasonItem {
  number: string;
  iconName: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface JobFactItem {
  id: string;
  iconName: string;
  title: string;
  highlight: string[];
}

export interface FlowStep {
  number: string;
  title: string;
}

export interface TestimonialProfile {
  ageGroup: string;
  previousJob: string;
  workPeriod: string;
  nightWorkExp: string;
  interviewDate: string;
  interviewer: string;
  shiftStyle: string;
  consentNotice: string;
}

export interface TestimonialQA {
  qNumber: string;
  topic: string;
  question: string;
  answer: string;
}

export interface TestimonialStory {
  situationBefore: string;
  anxiety: string;
  storeSelection: string;
  firstDayImpression: string;
  workingHours: string;
  actualEarnings: string;
  currentStatus: string;
  adviceForOthers: string;
}

export interface TestimonialVerification {
  verifiedDate: string;
  docType: string;
  complianceCheck: string;
  storeName: string;
  verificationId: string;
  signatureMatch: string;
  consentDate: string;
  methodSummary: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  avatarUrl: string;
  signatureUrl: string;
  signatureName: string;
  tag: string;
  age: string;
  status: string;
  quote: string;
  highlightEarnings: string;
  monthlyAverage: string;
  profile: TestimonialProfile;
  interviewQAs: TestimonialQA[];
  story: TestimonialStory;
  verification: TestimonialVerification;
}
