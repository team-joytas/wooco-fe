// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://e19f957d0e4a28d6b5bb2815a127fae2@o4509474768683008.ingest.us.sentry.io/4509474794831872",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      showBranding: false,
      triggerLabel: "의견 남기기",
      triggerAriaLabel: "의견 남기기",
      formTitle: "의견 남기기",
      submitButtonLabel: "제출",
      cancelButtonLabel: "취소",
      addScreenshotButtonLabel: "화면 캡쳐",
      removeScreenshotButtonLabel: "캡쳐 삭제",
      nameLabel: "제보자",
      namePlaceholder: "이름을 입력해주세요",
      emailLabel: "이메일",
      isRequiredLabel: "(필수)",
      messageLabel: "하고 싶은 말",
      messagePlaceholder: "자유롭게 의견 남겨주세요. \n건의, 버그제보 모두 환영합니다.",
      successMessageText: "소중한 의견 감사합니다!"
    }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;