# Quick Start Guide

## Requirements

-   Docker installed

## Installation & Setup

Install project dependencies and build assets:

```bash
make install
```

## Accessing the Application

-   Dev application: [localhost](http://localhost:8081)
-   Dev storybook: [storybook](http://localhost:6006)

---

-   Live application: [https://crypto-school.boris.lt](https://crypto-school.boris.lt)
-   Live Storybook: [https://crypto-school.boris.lt/storybook](https://crypto-school.boris.lt/storybook)

### Common Commands

Help:

```bash
make help
```

Code Formatting (pint):

```bash
make pint
```

Start Application Containers:

```bash
make start
```

Development Mode:

```bash
make dev
```

SSR Mode:

```bash
make start-ssr
```

Storybook Build/Deploy:

```bash
make storybook-spawn
```

# 📊 A/B Testing Strategy — Crypto School Assessment

## ✅ Goals

-   Increase user interaction with lesson CTAs (quizzes, call-to-actions)
-   Identify optimal timing, format, and content for CTA modals
-   Collect actionable behavioral insights using Amplitude

---

## 🔍 A/B Test Scenarios

---

### 1. CTA Timing Test

**Objective:** Determine best moment to show the CTA popup.

| Variant | Behavior                                                   |
| ------- | ---------------------------------------------------------- |
| A       | CTA appears 10 seconds before video ends (current default) |
| B       | CTA appears after video ends                               |
| C       | CTA appears only if user watched at least 70% of the video |

**Amplitude Tracking:**

-   `cta_popup_displayed`
-   `video_watch_percentage`
-   `cta_button_clicked`

---

### 2. CTA Format Test

**Objective:** Compare full-screen vs subtle CTA designs.

| Variant | Behavior                                           |
| ------- | -------------------------------------------------- |
| A       | Full-screen modal (current)                        |
| B       | Toast-style banner at bottom corner                |
| C       | Inline CTA below video (appears after 70% watched) |

**Amplitude Tracking:**

-   `cta_type_shown` (`modal`, `toast`, `inline`)
-   `cta_closed`
-   `quiz_started`

---

### 3. CTA Personalization Test

**Objective:** Test impact of tailored messaging on engagement.

| Variant | Behavior                                                                        |
| ------- | ------------------------------------------------------------------------------- |
| A       | Generic CTA (“Take a short quiz!”)                                              |
| B       | Personalized CTA with lesson name (“You crushed Synthwave Basics! Try a quiz.”) |
| C       | Only show CTA for certain lesson IDs                                            |

**Amplitude Tracking:**

-   `cta_text_variant`
-   `lesson_id`
-   `cta_clicked`

---

### 4. Exit Intent CTA

**Objective:** Re-engage users about to leave.

**Trigger Conditions:**

-   User becomes idle for 10 seconds
-   Mouse leaves viewport (desktop only)
-   Tab switch or blur

**Amplitude Tracking:**

-   `exit_intent_detected`
-   `exit_intent_cta_shown`
-   `exit_cta_clicked`

---

## 🛠 Example Tracking Event

```ts
amplitude.track("cta_popup_displayed", {
    lesson_id: currentLesson.id,
    video_watch_percentage: 82,
    cta_type: "modal",
    variant: "post-video",
});
```

# 🧪 Running A/B Experiments

This project is instrumented with A/B testing logic using **Laravel Pennant** and **Amplitude**. Below are detailed instructions on how to run, implement, and evaluate experiments related to user engagement and CTA optimization.

---

## 🔧 Feature Flag Setup (Laravel Pennant)

Each experiment is controlled via feature flags. Example:

```php
if (Feature::active('cta_post_video')) {
    // Show CTA after video ends
} else {
    // Default: show CTA 10s before video ends
}
```

## 🧪 Tools Used

-   Laravel Pennant – Feature flag management
-   **Amplitude** – Analytics & A/B test insights
-   **Inertia.js + Vue** – SPA architecture
-   **Tailwind CSS** – Rapid UI styling
