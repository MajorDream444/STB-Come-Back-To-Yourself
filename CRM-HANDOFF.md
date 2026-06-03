# Flo's Simple CRM — Google Sheets Handoff

The system should help Flo remember, follow up, and stay organised
without making her feel like she is running a complicated business machine.

---

## The Client Journey

```
Website CTA
    ↓
Free Discovery Call / Intake Form
    ↓
Google Sheets CRM  ←  source of truth for everything below
    ↓
Follow-up queue
    ↓
Client session
    ↓
Integration follow-up
    ↓
Testimonial request
```

---

## Google Sheet — Tab Structure

Create one shared Google Sheet called:
**"Flo — Client & Lead Tracker"**

Share it between Flo and Major/STB with editor access.

Flo's job: update status fields only.
Major/STB's job: maintain the structure, set up automations later.

---

### Tab 1 — LEADS

> Every person who reaches out, submits a form, or expresses interest.

| Column | Notes |
|--------|-------|
| Date Added | When they first came in |
| Name | First + last |
| Email | Primary contact |
| WhatsApp / Phone | Optional |
| Instagram / Social | If known |
| Source | Website / Instagram / Referral / Word of mouth / Weekly Circle |
| Interest | Discovery Call / Reset / Journey / Weekly Circle / General |
| Status | New / Contacted / Call Booked / Waitlist / Not a Fit / Nurturing |
| Next Step | What needs to happen |
| Follow-Up Date | When to check in |
| Notes | Anything relevant Flo wants to remember |

---

### Tab 2 — DISCOVERY CALLS

> Every discovery call Flo takes, whether it converts or not.

| Column | Notes |
|--------|-------|
| Date | When the call happened |
| Name | |
| Call Status | Completed / No-show / Rescheduled |
| Main Reason They Reached Out | In their words, not Flo's interpretation |
| What They Are Carrying | Brief honest summary |
| Fit Level | Strong fit / Possible / Not right now / Not a fit |
| Recommended Offer | Which session feels right |
| Follow-Up Needed | Yes / No |
| Notes | Anything Flo wants to remember |

---

### Tab 3 — CLIENTS

> Everyone who has paid and booked a session.

| Column | Notes |
|--------|-------|
| Name | |
| Email | |
| Offer Purchased | Discovery / Reset / Journey |
| Session Date | |
| Payment Status | Paid / Pending / Waived |
| Intake Completed | Yes / No |
| Integration Follow-Up Sent | Yes / No / Date |
| Testimonial Requested | Yes / No / Date |
| Testimonial Received | Yes / No |
| Notes | |

---

### Tab 4 — TESTIMONIALS

> A record of every piece of feedback received.

| Column | Notes |
|--------|-------|
| Name | |
| Session Type | |
| Testimonial Text | Full quote |
| Permission To Use Publicly | Yes / No / Asked |
| Image Permission | Yes / No / N/A |
| Date Received | |
| Where Used | Website / Instagram / Proposal / None yet |

---

### Tab 5 — FOLLOW-UP QUEUE

> The active list of people Flo needs to reach back out to.

| Column | Notes |
|--------|-------|
| Name | |
| Reason For Follow-Up | After call / After session / Nurture / Re-engage |
| Due Date | When to reach out |
| Message Sent | Yes / No |
| Response | Their response if any |
| Next Action | What to do next |

---

## Client Intake Form

Use this copy for a simple Typeform or Google Form that links from the website
booking CTA. Responses can feed directly into the Leads tab.

---

**Form Title:** Before We Meet

**Intro:**
> This short form helps Flo understand a little about where you are before your
> discovery call. There are no right or wrong answers. Just be honest.

---

**Question 1**
What's your name?

**Question 2**
What's your email address?

**Question 3**
How did you find Flo?
- Website
- Instagram
- A friend referred me
- Other

**Question 4**
What's bringing you here right now?
*(Open text — short paragraph)*

**Question 5**
What have you already tried?
*(Open text — optional)*

**Question 6**
Is there anything you want Flo to know before you speak?
*(Open text — optional)*

**Question 7**
Which session are you most drawn to?
- I'm not sure yet — I'd like to explore on the call
- Nervous System Reset (30–45 min)
- Private Breathwork Journey (90 min)

**Closing message:**
> Thank you. Flo will be in touch personally to confirm your time.

---

## CRM Principles

- **Google Sheet is the source of truth** for all client tracking in the early phase.
- **Flo only needs to update status fields** — not build complex reports.
- **Major/STB manages the structure** and can set up automations when volume grows.
- **Future automation** can connect intake form submissions, booking links, and email
  responses directly into this sheet (via Zapier, Make, or Apps Script).
- The system grows with Flo — it starts simple and only adds complexity when needed.

---

## When To Add Automation

When Flo is consistently running:
- 5+ discovery calls per week → automate lead capture from intake form to Leads tab
- 3+ sessions per week → automate session confirmation and follow-up reminders
- Regular testimonial collection → automate the request after each session

Until then: keep it manual, keep it human, keep it calm.

---

## V1 Scheduling Rule

**Manual scheduling is acceptable in V1.**

Automation should only be added when the manual process becomes the bottleneck.

Flo personally reviews each request and confirms timing directly.
This keeps the process intentional and paced — and it is appropriate for this stage.

When Flo is spending more than 1 hour per week just on scheduling admin,
that is the signal to add a booking tool (e.g. Calendly with intake form).

---

## Waitlist

When capacity is full, leads move to **Waitlist** status.

Flo sends a short personal note:

> Thank you for reaching out. I am currently full but am holding a small waitlist.
> I will be in touch when a space opens. — Flo
