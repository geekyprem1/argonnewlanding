# ArgonMax — OTO Landing Pages: Kya Likhna Hai + Kaise Banana Hai (OTO 1 → 10)

> Ye file 10 OTO pages (aur unke downsell pages) ka **poora plan** hai: page pe kya likhna hai, kya dikhana hai, kaise banana hai, aur kya **nahi** likhna.
>
> - **Har OTO page ek long-form sales page hai: 29 sections** (minimum 20, hamesha). Benefit-first likha gaya hai, taaki buyer ko page par hi poori value dikh jaye aur wo "Yes" kare.
> - Samjhane wala hissa Hinglish me hai. **Page ki copy English me hai** (sales page English me hi jayegi).
> - Verify kiya gaya: `docs/OTO-FUNNEL.md`, migrations `0006`–`0022`, aur app ka asli code (`src/`). Jo line app me nahi hai, use yaha `❌` ya `[VERIFY]` mark kiya hai.
> - `[BRACKETS]` = tumhe real value daalni hai (jaise `[ACTIVATION_TIME]`). Bina replace kiye page live mat karo.
> - Ye file seedha kisi AI ko bhi de sakte ho (sabse last me ready prompt hai).

---

# PART 0 — Pehle ye padho (5 min)

## 0.1 Kaunsa doc sahi hai

- **Final structure + prices:** `docs/OTO-FUNNEL.md` + migration `0022_funnel_merge.sql`. (OTO1 = Unlimited **Pro** $47, OTO2 = Creative PRO $87.)
- `docs/sales/00-COMPLETE-LANDING-PAGE-BRIEF.md` ka **Part B + Part F** purana hai (OTO1 $37, OTO2 Pro $47, Creative Studio alag). **Ignore karo.**
- `docs/sales/02-OTO-COPY.md` me OTO1–9 ki 20-section copy hai (OTO10 nahi hai). Kaam ki hai, par kuch lines app se match nahi karti. Wo fixes yaha har OTO ke **Claim check** me hain.
- **Kahin bhi fark ho to is file ko maano.**

## 0.2 Funnel flow (kaunsa page, kitna price, Yes/No par kahan)

| # | Page | File | Price | Yes ke baad | No par |
|---|------|------|------:|-------------|--------|
| 1 | OTO1 Unlimited Pro | `oto1.html` | $47 | `oto2.html` | `oto1-ds.html` |
| 1b | DS Unlimited Pro Lite | `oto1-ds.html` | $27 | `oto2.html` | `oto2.html` |
| 2 | OTO2 Creative PRO Gold | `oto2.html` | $87 | `oto3.html` | `oto2-ds.html` |
| 2b | DS Creative PRO Silver | `oto2-ds.html` | $47 | `oto3.html` | `oto3.html` |
| 3 | OTO3 DFY Templates | `oto3.html` | $67 | `oto4.html` | `oto3-ds.html` |
| 3b | DS DFY Lite | `oto3-ds.html` | $37 | `oto4.html` | `oto4.html` |
| 4 | OTO4 Bulk Automation | `oto4.html` | $39 | `oto5.html` | `oto4-ds.html` |
| 4b | DS Bulk Lite | `oto4-ds.html` | $27 | `oto5.html` | `oto5.html` |
| 5 | OTO5 Traffic & Leads | `oto5.html` | $47 | `oto6.html` | `oto5-ds.html` |
| 5b | DS Traffic Lite | `oto5-ds.html` | $27 | `oto6.html` | `oto6.html` |
| 6 | OTO6 Agency | `oto6.html` | $97 | `oto7.html` | `oto6-ds.html` |
| 6b | DS Agency Lite | `oto6-ds.html` | $67 | `oto7.html` | `oto7.html` |
| 7 | OTO7 Reseller | `oto7.html` | $67 | `oto8.html` | `oto7-ds.html` |
| 7b | DS Reseller Lite | `oto7-ds.html` | $47 | `oto8.html` | `oto8.html` |
| 8 | OTO8 Whitelabel | `oto8.html` | $197 | `oto9.html` | `oto8-ds.html` |
| 8b | DS Whitelabel Lite | `oto8-ds.html` | $97 | `oto9.html` | `oto9.html` |
| 9 | OTO9 Enterprise / Team | `oto9.html` | $127 | `oto10.html` | `oto9-ds.html` |
| 9b | DS Enterprise Lite | `oto9-ds.html` | $77 | `oto10.html` | `oto10.html` |
| 10 | OTO10 VIP + Coaching | `oto10.html` | $97 | `thanks.html` | `oto10-ds.html` |
| 10b | DS VIP Lite | `oto10-ds.html` | $47 | `thanks.html` | `thanks.html` |

- **"Yes ke baad"** = WarriorPlus/JVZoo product settings me jo post-purchase redirect URL set karoge. **"No"** = page ka chhota muted link.
- FE checkout ka thank-you/redirect → `oto1.html`.
- `thanks.html` = last page: "check your email, login link, activation time, support". Bundle ka alag page is file me nahi hai.

## 0.3 Page likhne se pehle 7 decisions (tumhe lene hain)

1. **OTO1 "Unlimited" asal me kya hai?** DB me OTO1 abhi `is_unlimited = true` hai (migration `0022`) aur uspe daily fair-use cap lagta hai: default **200,000 words/day**, midnight UTC pe reset (`0014`, `src/lib/credits.ts`). Pehle `0015` ne unlimited band karke 1,000,000 fixed bucket kiya tha, `0022` ne wapas on kar diya.
   → Ya page pe **"Unlimited words (fair-use `[200,000]`/day)"** likho, ya DB ko 1M fixed bucket pe wapas karo aur **"1,000,000-word allowance"** likho. Page aur DB same hone chahiye.
2. **OTO3 me "100+ templates" mat likho.** DB me **30 Gold (premium) + 12 Silver (bump)** templates hain. → "30 Gold templates" likho (ya pehle aur templates banao).
3. **OTO1 se 4 lines hatao:** "priority processing", "fastest model", "extra-long context mode", "advanced code tools". Code me priority/fast-lane nahi hai, aur Code Reviewer / Refactorer / Unit Test Writer to FE ke free templates hain.
4. **Downsells:** DB me sirf 4 plan bane hain (DS Unlimited Pro Lite, DS DFY Lite, DS Agency Lite, DS Creative PRO Silver). Baaki 6 abhi nahi bane, aur 4 downsell aise hain jinka "kam wala hissa" code me enforce nahi hota. Detail **Part 5** me.
5. **Agency plan me Whitelabel flag already ON hai** (`0006` seed). Matlab OTO8 ($197) ka main point Agency buyers ($97) ko pehle se mil jata hai. → Ya Agency plan se flag hatao, ya OTO8 page ko "custom domain + setup help" pe focus karo.
6. **Business-side kaam page se pehle:** OTO5 ka training content record karo, OTO7 ka sales kit + delivery process, OTO10 ke calls / community. App me ye sab sirf links ki list hai, asli kaam tumhara hai.
7. **Activation time:** delivery manual hai (webhook nahi). Har page pe sach likho: *"Activated in your dashboard within `[ACTIVATION_TIME]`. You'll get an email."*

> ⚠️ **Fulfilment warning (important):** Admin > Users me **"Apply plan"** karne se us user ke **saare flags, words aur image/video credits plan ke numbers se overwrite** ho jaate hain (`src/app/api/admin/users/route.ts`). Agar buyer ne OTO1 + OTO2 + OTO4 teeno liye, to har baar plan assign mat karo, warna pichla unlock mit jayega aur credits zero ho sakte hain.
> **Stack karne ke liye:** Admin > Users > **Features** toggles + "add words" use karo. Table Part 6 me hai.

---

# PART 1 — Har OTO page ke common rules

1. **Ek page = ek faisla.** Ek price, ek YES button (kai baar repeat), ek chhota NO link. Nav menu, social icons, extra links nahi. Footer me sirf legal links.
2. **Top pe "Order confirmed" strip** (S1). Isse ye naya pitch nahi, order ka hissa lagta hai.
3. **Headline "Wait —" se shuru** (existing OTO copy ka pattern). H1 me benefit + outcome, **price nahi**.
4. **Price sirf value stack (S22) + deal box (S23) + buttons me.** H1 aur sub-headline me nahi.
5. **Sirf wahi likho jo app me abhi hai.** Har OTO ka **Claim check** follow karo. Naya feature promise karna hai to pehle build karo.
6. **Underlying AI provider / model ka naam kahin nahi:** page text, alt text, FAQ, meta tags, image file names, screenshots (URL bar / console me bhi nahi). Sirf brand: *ArgonMax, ArgonMax K3*. (Replicate, gpt-image, p-video, OpenRouter, Kimi, DeepSeek, OpenAI wagairah kahin nahi.)
7. **Scarcity sirf real.** "Only on this page" tabhi likho jab sach ho. Countdown sirf **real date** ke saath (FE page ka `launchEndsAt` pattern: date khali = countdown hidden). Fake timer / fake "only 3 left" nahi.
8. **Income claims nahi.** "Pure profit", "pays back 10x", "first client covers it" hatao ya conditional + "results vary" me badlo. Testimonials sirf real; placeholder ho to `SAMPLE` clearly mark karo aur launch se pehle replace karo.
9. **Manual delivery ka expectation set karo:** trust bar (S6), deal box (S23) aur FAQ (S26) me `[ACTIVATION_TIME]`.
10. **Guarantee FE jaisi:** 30-day money-back (S24).
11. **NO link honest ho.** "No thanks, I'll stay with my starter limit" theek hai. Guilt-trip ("I don't want to make money") nahi.
12. **Mobile first (360px):** S1 + S2 + S3 + S4 (YES button) pehli screen me dikhe. Sticky YES bar pehle CTA ke scroll hone ke baad.
13. **Long page, par tez:** static HTML, 2 fonts preload, images `.webp` + `width/height` + `loading="lazy"` (hero ko chhodkar), koi extra library nahi. JS band ho tab bhi content padha ja sake.
14. **`noindex`:** `<meta name="robots" content="noindex,nofollow">`. Page me koi secret/download link mat rakho (URL public hota hai; payment ko platform protect karta hai).
15. **Accessibility:** images ka alt text, keyboard focus dikhe, `prefers-reduced-motion` respect (FE script already karta hai), contrast theek.
16. **Legal footer (har page):** S29.
17. **Benefit-first likho.** Har feature ke saath uska fayda (formula Part 2 me). Sirf feature list mat likho. Buyer ko "iska mujhe kya milega?" ka jawab har section me milna chahiye.
18. **CTA har 4–5 sections ke baad:** S4, S12, S16, S20, S23, S27 + sticky bar. Buyer ko "Yes" dabane ke liye wapas scroll na karna pade.
19. **Har page pe minimum 20 sections, hamesha.** Scarcity skip karo to S25 "What happens next" ban jata hai, section count nahi ghatega. Downsell pages chhote rehte hain (8 blocks, Part 2).

---

# PART 2 — Page blueprint (har OTO page ke 29 sections)

Ye `02-OTO-COPY.md` ke 20 sections ka long-form version hai. **Har OTO ka section numbering same (S1–S29)**, taaki clone karna, QA karna aur AI ko dena aasan ho.

**Buyer ke mind ka flow:** dhyan kheecho (S1–S6) → "haan mujhe ye chahiye" (S7–S11) → samjhao ye kaise kaam karta hai (S12) → fayde dikhao (S13–S16) → "kya ye mere liye hai?" (S17) → fark dikhao (S18–S21) → value aur price (S22–S23) → darr hatao (S24–S26) → close (S27–S29).

| S | Section | Kya likhna hai | Layout idea |
|---|---------|----------------|-------------|
| 1 | Order strip | **Standard** (neeche) | `.eyebrow--green` |
| 2 | **H1** | "Wait —" + sabse bada benefit + doosra benefit | `.h1` |
| 3 | Sub-headline | Ye kya hai + kya badlega + "one payment" | `.lead` |
| 4 | **Pehla CTA** | YES button + micro-line | `.cta` |
| 5 | Hero visual | Real screenshot / mock + 1-line caption | framed image |
| 6 | Trust bar | **Standard** (4 points) | icon strip |
| 7 | Hook | Congrats + "smart log X karte hain" | 2–3 lines |
| 8 | The 10x idea | Ek line me "kyun" (pros kya alag karte hain) | big statement |
| 9 | The gap | Abhi ke account me kya missing hai (real) | 2–3 lines |
| 10 | Cost of staying | Jaise ho waise rehne ki **asli** keemat: time, tabs, ruka kaam. Darawa nahi, stats nahi | short paragraph |
| 11 | Introducing | Product naam + 1 line | centered reveal |
| 12 | How it works | 3 steps (click Yes → activate → use) | 3 cards |
| 13 | **Benefit 1** | Title + feature→benefit + screenshot | zigzag |
| 14 | **Benefit 2** | same | zigzag |
| 15 | **Benefit 3** | same | zigzag |
| 16 | Use cases | 5–7 concrete cheezein jo buyer ab kar/bana sakta hai | icon grid |
| 17 | Who it's for / not for | 2 column: kiske liye / kiske liye nahi (trust badhata hai) | two columns |
| 18 | Before vs After | 5 pairs | two columns |
| 19 | A day with it | Subah → dopahar → shaam | timeline |
| 20 | Benefit bullets | 7–9 ✅ lines, sab real | checklist grid |
| 21 | Comparison | Abhi vs Upgrade ke baad (**apne hi product se compare**, competitor se nahi) | 3-col table |
| 22 | Value stack | Har piece + "normal cost" + price anchor (sirf verified) | stack list |
| 23 | **Deal box** | Naam, recap, **price**, micro-line, YES | `.order` card |
| 24 | Guarantee | **Standard** | badge |
| 25 | Scarcity ya "What happens next" | **Standard** (neeche) | strip |
| 26 | FAQ | 6–8 honest Q&A (limits + activation zaroor) | `.qa` |
| 27 | Final CTA | 1 line recap + YES + NO link | `.cta` |
| 28 | P.S. | 2 lines, income claim nahi | text |
| 29 | Legal footer | **Standard** | small text |

- **Extra CTA blocks** (section count me nahi gine jate): S12, S16, S20 ke baad ek-ek YES button + micro-line.
- **Proof (optional, S5 ya S19 ke paas):** sirf real screenshots / real testimonials. Nahi hain to skip, page ka count 29 hi rahega.

## Standard copy (S1, S6, S24, S25, S29): har page pe wahi

> **S1 · Order strip:** ✓ Your ArgonMax order is confirmed. One quick, one-time upgrade before you go to your dashboard.
>
> **S6 · Trust bar (4 points):** One-time payment · Added to your existing account · Activated within `[ACTIVATION_TIME]` · 30-day money-back guarantee
>
> **S24 · Guarantee:** 30-Day Money-Back Guarantee. Try it for 30 days. If it isn't right for you, email `[SUPPORT_EMAIL]` and we'll refund this upgrade.
>
> **S25 · Option A (sirf agar real deadline hai):** This upgrade is offered at the launch price of `$X` until `[DATE]`. After that the price changes. *(+ real countdown, `launchEndsAt` se)*
>
> **S25 · Option B (real deadline nahi hai, default):** **What happens next.** 1) Click Yes. 2) We activate it within `[ACTIVATION_TIME]` and email you. 3) *(har OTO ka apna step 3, neeche likha hai)*
>
> **S29 · Legal footer:** ArgonMax is an independent product. Results are not typical or guaranteed and depend on effort, skill and market factors. No income guarantees. Terms · Privacy · Refund Policy · Support

## Feature → Benefit formula (S13–S16, S20 ke liye)

> **[Feature]**, so you can **[result]** without **[pain]**.

Examples:
- *Chat with your files, so you can get answers from a 12-page report in seconds instead of reading it line by line.*
- *Bulk run, so you can write 20 product descriptions without opening a new chat 20 times.*

Har benefit block me 3 cheezein: **kya hai** (1 line) → **tumhe kya milega** (1 line) → **dikhao** (screenshot).

## Downsell page = 8 blocks (chhota rakho)

Buyer ne ek baar "No" bol diya hai, lamba pitch dobara nahi.
Top strip ("Wait — before you go…") → H1 → "kya milega / kya skip hua" (2 column) → price → YES → NO → guarantee (S24) → footer (S29).

---

# PART 3 — Design (FE page se reuse)

FE page `Argonlanding/` me already ban chuka hai. OTO pages uski **same look** lenge (naya design nahi).

**Tokens** (`Argonlanding/styles.css`):

| Cheez | Value |
|------|-------|
| Background / surface | `#050a15` / `#0b1527` |
| Text / muted | `#eaf2ff` / `#8a9db9` |
| Eyebrow (cyan) | `#27d3f6` |
| YES button (amber) | `#ffd466 → #ffb724 → #ff8f1f` |
| Checks (green) / warning (red) | `#3be8a8` / `#ff5d50` |
| Deal box (paper) | bg `#eef4fd`, ink `#091531` |
| Fonts | Bricolage Grotesque (headings), Geist (body), Geist Mono (labels), Caveat (script touches) |

**Section → existing class / layout:**

| Section | Class / markup |
|---------|----------------|
| Layout | `.wrap`, `.wrap--mid`, `.wrap--narrow`, `.sec` |
| S1 | `.eyebrow.eyebrow--green` |
| S2, S3 | `.h1`, `.lead` |
| S4, S27 (+ extra CTAs) | `.btn.btn--buy.btn--xl.btn--pulse` + `.cta` + `.cta__micro` |
| S8 | `.h2` big statement, `grad-amber` highlight |
| S12 | 3 cards (grid) |
| S13–S15 | zigzag: text + screenshot, alternate sides |
| S16 | icon grid (sprite icons) |
| S17, S18 | two columns (green check / red cross icons) |
| S19 | vertical timeline |
| S21 | `<table>` styled like FE comparison (section 35 jaisa) |
| S22 | stack list, total pe strike-through, price highlight amber |
| S23 | `.order` (`.order__bar`, `.order__foot`) |
| S26 | `.faq__list` + `<details class="qa" name="faq">` |
| Sticky bar | `.sticky` (JS `.is-on` toggle, `inert` attribute) |
| Animations | `.reveal` / `.rise` |
| **NO link (naya)** | `.nothanks` → `oto.css` me banao: muted, chhota, underline, 44px tap area |

**Long-page rhythm:** sections ke background alternate karo (`--bg` / `--surface`), deal box (S23) paper card rakho taaki page ka sabse alag block wahi lage. FE ka top `.progress` bar reuse karo (lambe page pe scroll progress dikhata hai).

**Icons** (FE ke inline Lucide sprite me already hain; jo chahiye wo `<symbol>` page me copy karo):

| OTO | Icons |
|-----|-------|
| 1 | `i-zap`, `i-file-up`, `i-image` |
| 2 | `i-image`, `i-video`, `i-clapperboard` |
| 3 | `i-layout-grid`, `i-layers`, `i-wand-sparkles` |
| 4 | `i-repeat`, `i-list-checks`, `i-layers` |
| 5 | `i-megaphone`, `i-search` |
| 6 | `i-briefcase`, `i-users` |
| 7 | `i-handshake`, `i-tag` |
| 8 | `i-palette`, `i-badge-check` |
| 9 | `i-users`, `i-layout-dashboard` |
| 10 | `i-graduation-cap`, `i-star` |

---

# PART 4 — OTO 1 → 10 (page-by-page, har ek me 29 sections)

**Kaise padhna hai:** har OTO me **S1, S6, S24, S29 standard** hain (Part 2). **S25** default "What happens next" hai, bas step 3 OTO ke hisaab se likha hai. Baaki **24 sections** (S2–S5, S7–S23, S26–S28) us OTO ki apni copy hain. `[BRACKETS]` tumhe bharne hain.

---

## OTO 1 — Unlimited Pro · $47

📄 `oto1.html` · Downsell: **Unlimited Pro Lite $27** → `oto1-ds.html`

| | |
|---|---|
| Page ka ek kaam | Buyer ki 2 rukawatein ek click me hatana: word limit, aur "AI mere documents / images nahi samajhta" |
| Admin plan | `OTO1 Unlimited Pro` ✅ (DB me hai) |
| Flags | `is_unlimited` + `feature_pro` |
| App me asli unlock | Unlimited words (daily fair-use cap) · Chat With Documents (`/documents`) · AI Vision (image button in Chat) |
| S25 step 3 | *Open **Documents** in your sidebar and look for the image button in Chat.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Remove Your Word Limit AND Unlock Chat With Documents + AI Vision, In One Move.
- **S3 · Sub-headline:** ArgonMax Unlimited Pro lifts the word cap on everything you create, lets you ask questions about your own files, and lets the AI look at your images. One payment. No monthly fee.
- **S4 · Pehla CTA:** **[ Yes — Upgrade Me To Unlimited Pro ($47) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** Dashboard jisme "Words remaining: Unlimited" ho + Documents Q&A side by side. *Caption:* "Your dashboard after the upgrade: no word counter to watch, plus two new tools."
- **S6 · Trust bar:** standard
- **S7 · Hook:** Smart move grabbing ArgonMax. Your starter account is built to get you going. But the people who get the most out of AI don't ration it, and they don't stop at plain text.
- **S8 · The 10x idea:** The difference between *trying* AI and *working* with AI is simple: you stop counting words, and you start feeding it your own material: your documents, your screenshots, your projects.
- **S9 · The gap:** Right now your account runs on a word balance. It can't read your PDFs and it can't look at a screenshot. When the balance runs low, the work stops.
- **S10 · Cost of staying:** Stopping mid-project costs you momentum: the funnel half-written, the email series unfinished, the report still unread. And pasting a long document into chat in pieces eats the very time you were trying to save.
- **S11 · Introducing:** **ArgonMax Unlimited Pro.** Three upgrades in one: unlimited words (fair use), Chat With Documents, and AI Vision.
- **S12 · How it works:** 1) Click Yes. 2) We switch it on within `[ACTIVATION_TIME]` and email you. 3) Open your dashboard: no word counter, **Documents** in the sidebar, an image button in Chat. *(+ extra CTA)*
- **S13 · Benefit 1 — Create without counting words:** Unlimited words, so you can write the whole funnel, the full email series or a month of content in one sitting without watching a counter. Fair use: `[200,000]` words per day, resetting every midnight (UTC). Most people never reach it.
- **S14 · Benefit 2 — Chat with your documents:** Upload a PDF, TXT or MD file, so you can get summaries, key points and answers to "where does it say…?" in seconds instead of reading line by line. Works with text-based files up to about 40,000 characters per chat (roughly 12–15 pages). Split longer files.
- **S15 · Benefit 3 — AI that can see:** Drop a screenshot or photo into Chat, so you can get a description, the text inside it, or starter code that matches the design, without describing it in words.
- **S16 · Use cases:** (icon grid) *(+ extra CTA)*
  - Summarize a 12-page report into key points, then ask follow-up questions.
  - Ask "where does it say…" about a long guide or policy document.
  - Turn meeting notes (TXT / MD) into action items.
  - Drop a layout screenshot and ask for starter code.
  - Pull the text out of a photo or screenshot.
  - Write a full email series or a month of content in one sitting.
- **S17 · Who it's for / not for:**
  - *For:* marketers, agencies, developers, consultants and researchers who use ArgonMax every day.
  - *Not for:* people who barely touch their starter allowance, or who need scanned (image-only) PDFs read. Those aren't supported yet.
- **S18 · Before vs After:**
  - Word balance shrinking → No counter (fair use).
  - Stopping mid-project → Finishing in one sitting.
  - Pasting a document in pieces → Upload it once and ask.
  - Describing a screenshot in words → Show it and ask.
  - Separate tools for files and images → One dashboard.
- **S19 · A day with it:**
  - *Morning:* Upload the client's 12-page brief. Get a summary and a list of questions.
  - *Midday:* Write the week's email series. No counter in sight.
  - *Afternoon:* Screenshot a landing page you like and ask for its structure and a first-draft version.
  - *Evening:* Copy the results. Done.
- **S20 · Benefit bullets:** ✅ Unlimited words (fair-use daily limit) ✅ Chat with PDF, TXT and MD files ✅ Up to ~40,000 characters per document chat ✅ AI image Vision in Chat ✅ Works inside your existing dashboard ✅ Nothing to install ✅ One-time payment ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Word limit: balance that runs down → unlimited (fair use `[200,000]`/day)
  - Chat with your files: not available → PDF, TXT, MD (~40,000 characters each)
  - Understand images: not available → upload in Chat
  - Where it lives: — → the same dashboard you already use
  - Price: included in your account → one-time $47, no monthly fee
- **S22 · Value stack:** Unlimited words (fair use) *normally part of a monthly plan* · Chat With Documents *normally a separate monthly tool* · AI Vision *normally a premium feature* · **Normal cost: `[VERIFY: tumhara khud ka comparison]` per month** → **Today: one payment of $47.**
- **S23 · Deal box:** ArgonMax Unlimited Pro · Unlimited words (fair use) + Chat With Documents + AI Vision · **$47 one-time** · micro-line (S6) · **[ Yes — Upgrade Me To Unlimited Pro ($47) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *Is it really unlimited?* Unlimited words with a fair-use limit of `[200,000]` words per day. It resets every midnight (UTC).
  - *Which files work?* PDF (with selectable text), TXT and MD, up to about 40,000 characters each.
  - *What about scanned PDFs?* Image-only PDFs aren't supported yet.
  - *Does Vision need any setup?* No. Once Pro is on, the image button appears in Chat.
  - *Is there a monthly fee?* No. One payment.
  - *When do I get access?* Within `[ACTIVATION_TIME]`. You'll get an email.
  - *What if it's not for me?* 30-day money-back guarantee.
- **S27 · Final CTA:** *Remove the word limit. Chat with your files. Let the AI see your images. One payment of $47.* **[ Yes — Upgrade Me To Unlimited Pro ($47) ]** / No thanks, I'll stay with my starter limit
- **S28 · P.S.:** Driving with the handbrake on is a choice. Take it off, once, for $47.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Dashboard card **"Words remaining: Unlimited"** (app me asli: `∞ Unlimited`) → S5.
- `/documents` page: PDF loaded + ek sawal + jawab → S14.
- Chat me image upload + AI ka answer → S15.
- Before / after strip: starter word bar → ∞ → S18.
- Use-case icons (6) → S16.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "Turn 100-page PDFs into answers" | Limit 40,000 chars/doc; bada doc reject hota hai (`api/documents/chat`) | "up to ~40,000 characters (about 12–15 pages) per chat" |
| "Priority processing", "fastest model" | Code me nahi hai | hata do |
| "Extra-long context mode" | Nahi hai | hata do |
| "Advanced code tools (review / refactor / tests)" | Code Reviewer, Refactorer, Unit Test Writer FE ke free templates hain (`0005`) | hata do |
| "Unlimited" aur "1,000,000-word allowance" dono | DB ya to unlimited hai ya fixed bucket (Decision #1) | ek hi likho |
| "Words reset every month" | Monthly reset ka code nahi mila | "monthly" mat likho |
| "Upload DOCX" (`OTO-FUNNEL.md`) | Sirf `.pdf .txt .md` | wahi likho |
| Vision claim | `KIMI_VISION_MODEL` khali ho to vision band rehta hai | launch se pehle production me test karo |

### Downsell — `oto1-ds.html` (Unlimited Pro Lite $27)
> **H1:** Wait — Not Ready For Unlimited? Take Unlimited Pro Lite Instead.
> **Body:** A one-time allowance of 200,000 words, plus Chat With Documents and AI Vision, for $27. *You skip:* unlimited usage.

⚠️ Purani spec me "Chat-with-PDF only (no vision)" tha, par DB me `DS Unlimited Pro Lite` ka `feature_pro = true` PDF chat **aur** Vision dono deta hai. Copy DB se match karo (upar wali), ya dev se alag vision flag banwao.

---

## OTO 2 — Creative PRO (Gold) · $87

📄 `oto2.html` · Downsell: **Creative PRO Silver $47** → `oto2-ds.html`

| | |
|---|---|
| Page ka ek kaam | Text-only user ko visuals (image + video) ki taraf le jana |
| Admin plan | `OTO2 Creative PRO Gold` ✅ (500 img + 50 vid) · DS `DS Creative PRO Silver` ✅ (150 + 25) |
| Flags | `feature_media` + `image_credits` + `video_credits` |
| App page | `/studio` (Features me label: "Creative Studio") |
| S25 step 3 | *Open **Creative Studio** in your sidebar and type your first prompt.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Add AI Image & Video Creation To ArgonMax. No Extra Subscriptions.
- **S3 · Sub-headline:** Type a prompt, pick a shape, get an image. Type another, get a 10-second video. 500 image credits and 50 video credits are added to your account one time. No monthly fee.
- **S4 · Pehla CTA:** **[ Yes — Add Creative PRO Gold ($87) ]** · *One-time credits · 30-day money-back guarantee*
- **S5 · Hero visual:** Creative Studio gallery (3 images + 1 video thumbnail) + credits cards. *Caption:* "The Creative Studio, inside the dashboard you already use."
- **S6 · Trust bar:** standard
- **S7 · Hook:** You can already write and code with ArgonMax. Now make the visuals that stop the scroll: ad images, thumbnails, social posts and short promo clips.
- **S8 · The 10x idea:** Words explain. Visuals get the first look. The creators and sellers who pair their copy with a strong image or clip give people a reason to stop.
- **S9 · The gap:** Your account is built around text and code. For images and video you'd need other tools, other logins and other bills.
- **S10 · Cost of staying:** Every ad, thumbnail or promo clip means leaving ArgonMax, learning another tool and paying for it again next month. The copy is ready, and the visual is the thing holding it up.
- **S11 · Introducing:** **ArgonMax Creative PRO.** Adds the Creative Studio to your dashboard: **500 image credits and 50 video credits**.
- **S12 · How it works:** 1) Click Yes. 2) We add the Studio and your credits within `[ACTIVATION_TIME]` and email you. 3) Open **Creative Studio**, describe what you want, pick a shape, and get the result in your gallery. *(+ extra CTA)*
- **S13 · Benefit 1 — Images in seconds:** Choose square (1:1), landscape (3:2) or portrait (2:3), so you can get a post-ready image from one sentence instead of hunting for stock photos.
- **S14 · Benefit 2 — 10-second videos:** 720p clips in 7 shapes: 16:9, 9:16, 4:3, 3:4, 3:2, 2:3 and 1:1, so you can make Reels, Shorts, Stories and ad clips without a video editor. Videos render in the background, so you can keep working.
- **S15 · Benefit 3 — One gallery, nothing to juggle:** Everything you create is saved in your gallery. View it, download it, reuse your prompts. If a generation fails, your credit is returned automatically.
- **S16 · Use cases:** (icon grid) *(+ extra CTA)*
  - Ad images for your campaigns.
  - Cover images and thumbnails (landscape 3:2).
  - Social posts (square or portrait).
  - Product visuals and mood boards.
  - 10-second promo clips for Reels, Shorts and Stories (9:16).
  - Teaser clips for a launch (16:9).
  - Concept visuals for a client pitch.
- **S17 · Who it's for / not for:**
  - *For:* marketers, e-commerce sellers, social creators and agencies who need visuals regularly.
  - *Not for:* anyone who needs long-form video (clips are 10 seconds) or ultra-high-resolution print files.
- **S18 · Before vs After:**
  - Text only → Text + images + video.
  - Hunting for stock images → Describe it, get it.
  - A different tool for each format → One dashboard.
  - Another monthly bill → One-time credits.
  - Lost files across tools → One saved gallery.
- **S19 · A day with it:**
  - *Morning:* Write the ad copy in Writer.
  - *Late morning:* Make three image options in the Studio.
  - *Before lunch:* Generate a 9:16 clip for Stories.
  - *Afternoon:* Download everything from your gallery and schedule it.
- **S20 · Benefit bullets:** ✅ 500 image credits ✅ 50 video credits ✅ Square, landscape and portrait images ✅ 10-second 720p video in 7 shapes ✅ Saved gallery with download ✅ Failed generations are refunded ✅ One-time credits, not monthly ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Image creation: not available → 500 credits
  - Video creation: not available → 50 clips (10 seconds, 720p)
  - Image shapes: — → 1:1, 3:2, 2:3
  - Video shapes: — → 7 shapes
  - Gallery: — → saved, downloadable
  - Where it lives: other tools → inside ArgonMax
- **S22 · Value stack:** 500 image credits · 50 video credits · Saved gallery · Failed-generation refunds · **Separate image and video tools are usually billed monthly, each: `[VERIFY: tumhare numbers]`** → **Today: one payment of $87.**
- **S23 · Deal box:** ArgonMax Creative PRO · 500 images + 50 videos · **$87 one-time** · micro-line · **[ Yes — Add Creative PRO Gold ($87) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *Do credits renew monthly?* No. They're one-time credits.
  - *Where do my files go?* Your Creative Studio gallery.
  - *How long are videos?* 10 seconds at 720p.
  - *Which shapes can I choose?* Images: 1:1, 3:2, 2:3. Video: 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 1:1.
  - *What if a generation fails?* The credit is returned automatically.
  - *Do video and image credits share a balance?* No. They're separate.
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *500 images. 50 videos. One gallery. One payment of $87.* **[ Yes — Add Creative PRO Gold ($87) ]** / No thanks
- **S28 · P.S.:** Words tell. Visuals sell.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Creative Studio gallery (3 images + 1 video thumbnail) → S5, S15.
- Credits cards "Image credits 500 · Video credits 50" → S11, S23.
- Ratio selector close-up → S13, S14.
- Ek prompt → result before/after → S12.
- Phone mock me 9:16 clip → S16.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "HD / 4K / photorealistic / studio quality" | Image quality `low` pe set hai (cost control, `api/media/generate`) | "ads, social posts, thumbnails, concepts" |
| Images ke liye 7 ratios | Images: sirf 1:1, 3:2, 2:3. Video: 7 ratios | exact likho |
| Provider / model names | White-label rule | kabhi nahi |
| "Unlimited images/videos", "monthly credits" | One-time counts | "one-time credits" |
| Gold + Silver dono OTO page pe (`02-OTO-COPY` block 14) | Silver downsell hai | OTO page pe **sirf Gold**, Silver sirf DS page pe |
| "Top-ups available later" | Top-up feature bana nahi | skip |
| "Commercial use of generated media" | Terms me clear nahi | tabhi likho jab terms confirm ho |
| "Credits never expire" | Policy tumhari | tabhi jab decide ho |

### Downsell — `oto2-ds.html` (Silver $47)
> **H1:** Wait — Get Creative PRO Silver Instead: Same Studio, Smaller Credit Pack.
> **Body:** 150 image credits + 25 video credits, one-time, $47. Same gallery, same shapes, same 10-second 720p video.

---

## OTO 3 — DFY Templates (Gold Vault) · $67

📄 `oto3.html` · Downsell: **DFY Lite $37** → `oto3-ds.html`

| | |
|---|---|
| Page ka ek kaam | "Khali page se shuru mat karo": premium template vault |
| Admin plan | `OTO3 DFY` ✅ |
| Flag | `template_level = 2` |
| Asli unlock | **30 Gold templates** (+ 12 Silver agar bump nahi liya) · App me `/templates` pe 🥇 Gold badge |
| S25 step 3 | *Open **Templates**, pick a 🥇 Gold template and fill in your details.* |

**Vault ki real list (S16 me grid me dikhao):**

| Group | Templates |
|-------|-----------|
| Listings & stores | Real Estate Listing, Amazon Product Listing, Etsy Listing Optimizer, Shopify Store Copy |
| Sales & funnels | Sales Funnel Copy, Landing Page Copy, Upsell & Downsell Copy, VSL Script, Webinar Script, Ad Angle Generator |
| Email sequences | 7-Day Email Series, Abandoned Cart Emails, Product Launch Sequence |
| Ads & social | Facebook Ads Campaign, Google Ads Campaign, TikTok Hooks |
| Authority & content | Case Study Writer, White Paper Writer, Book Outline, Podcast Show Notes, Affiliate Review, Lead Magnet Creator, Brand Story Writer, About Us Page, FAQ Generator |
| Business | Course Curriculum, Coaching Program, Local Business SEO, Investor Pitch, Job Description |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Skip The Blank Page. Unlock 30 Done-For-You Gold Templates For Funnels, Emails, Ads, Listings & More.
- **S3 · Sub-headline:** Unlock the Gold vault inside your Templates library. Pick a template, add your details, and ArgonMax writes the whole piece for you. One payment.
- **S4 · Pehla CTA:** **[ Yes — Add The DFY Pack ($67) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** Templates grid with 🥇 Gold badges (real naam). *Caption:* "Your Templates library after the upgrade."
- **S6 · Trust bar:** standard
- **S7 · Hook:** You've got the tools. Now get the shortcuts that make them faster.
- **S8 · The 10x idea:** Pros don't start from a blank page. They start from a proven structure and fill in the blanks. That's the whole secret.
- **S9 · The gap:** Your starter templates are great for single pieces. The bigger jobs (funnels, launch sequences, webinar and VSL scripts, store listings) need a structure you'd otherwise have to invent every time.
- **S10 · Cost of staying:** Starting a funnel or a sequence from a blank prompt means deciding the structure, remembering every part and rewriting the brief each time. That is time you could spend selling.
- **S11 · Introducing:** **ArgonMax DFY Pack.** 30 Gold templates, unlocked inside your Templates library.
- **S12 · How it works:** 1) Click Yes. 2) We unlock the Gold vault within `[ACTIVATION_TIME]` and email you. 3) Open Templates, pick a Gold template, fill in your product and audience, and generate. *(+ extra CTA)*
- **S13 · Benefit 1 — Skip the blank page:** Pick a template, fill in the blanks, generate, so you get a structured first draft in minutes instead of staring at an empty box.
- **S14 · Benefit 2 — Built for niches that pay:** Real estate, Amazon and Etsy sellers, Shopify stores, coaches, local businesses, so you can serve those clients with templates made for their kind of work.
- **S15 · Benefit 3 — Campaigns, not snippets:** Sales Funnel Copy (opt-in to thank-you), a 7-Day Email Series, a Product Launch Sequence, Abandoned Cart Emails. Add your details and get the full sequence, not one paragraph.
- **S16 · What's inside the vault:** (grid, 6 groups; list upar) *(+ extra CTA)*
  - Listings & stores · Sales & funnels · Email sequences · Ads & social · Authority & content · Business
- **S17 · Who it's for / not for:**
  - *For:* agencies and freelancers who bill clients, store owners, coaches, and anyone who wants results fast.
  - *Not for:* people who want pre-written copy to paste unchanged. Templates write fresh output from *your* details every time.
- **S18 · Before vs After:**
  - Blank prompt → Structured template.
  - Rewriting the brief each time → Fill in a few fields.
  - One paragraph at a time → The whole funnel or sequence.
  - Generic copy → Made for your niche.
  - Hours of setup → A first draft in minutes.
- **S19 · A day with it:**
  - *Morning:* A client needs a launch. Load Product Launch Sequence, 7-Day Email Series and Facebook Ads Campaign.
  - *Midday:* Fill in their offer once, generate all three, edit.
  - *Afternoon:* Send the drafts for approval.
- **S20 · Benefit bullets:** ✅ 30 Gold templates ✅ Funnels, sequences and scripts ✅ Listings for Amazon, Etsy, Shopify and real estate ✅ Ads for Facebook, Google and TikTok ✅ Unlocked in your Templates library ✅ Fresh output every time ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Job size: single pieces → full funnels and sequences
  - Templates: your starter set → + 30 Gold templates
  - Niche coverage: general → real estate, e-commerce, coaching, local business
  - Setup per project: write the brief → fill in a few fields
- **S22 · Value stack:** Funnel & sales copy templates · Email sequence templates · Ads & social templates · Listings & store templates · Authority & business templates · **Writing a funnel, an email series and an ad set from scratch is hours of work: `[VERIFY: tumhara verified figure]`** → **Today: one payment of $67.**
- **S23 · Deal box:** ArgonMax DFY Pack · 30 Gold templates · **$67 one-time** · micro-line · **[ Yes — Add The DFY Pack ($67) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *Where do they appear?* In your Templates library, marked 🥇 Gold.
  - *Are these pre-written campaigns?* No. They're expert templates: you add your details and ArgonMax writes it fresh every time.
  - *How many are there?* 30 Gold templates.
  - *Do I need writing skills?* No. You fill in the blanks.
  - *Can I use them for clients?* `[Commercial license terms ke hisaab se]`
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *30 Gold templates. Funnels, sequences, ads and listings. One payment of $67.* **[ Yes — Add The DFY Pack ($67) ]** / No thanks
- **S28 · P.S.:** Every hour spent writing from scratch is an hour you're not earning. Templates mean speed.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Templates grid me real naam + 🥇 Gold badge → S5.
- Ek template ka before / after: khali form → generated Sales Funnel Copy → S13.
- Niche chips row (Real Estate · Amazon · Etsy · Shopify · Coaching · Local) → S14.
- Vault ki 6 group cards → S16.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "100+ premium templates" (`OTO-FUNNEL`, `02-OTO-COPY` headline) | DB me 30 Gold | "30 Gold templates" |
| "Ready-made campaigns you just copy" | Templates AI personas hain, naya likhte hain | "add your details, get the full funnel / sequence" |
| "Niche packs" | Niche templates hain, "pack" nahi | "niche templates" |
| "Silver" naam | In-app: Silver = bump (tier 1). Creative PRO Silver se confuse hoga | sirf "Gold" use karo |
| Copywriter cost number | Unverified | verify ya soft line |

### Downsell — `oto3-ds.html`
⚠️ DB me `DS DFY Lite` ka `template_level = 1` hai, jo sirf **12 Silver (bump) templates** deta hai. Bump buyers ke paas wo pehle se hain, aur "40 templates" ka promise sach nahi hoga.
**Recommendation:** abhi ye downsell **skip** karo (OTO3 "No" → seedha `oto4.html`). Banana ho to dev se ek aur tier (mid-level) banwao.

---

## OTO 4 — Automation / Bulk · $39

📄 `oto4.html` · Downsell: **Bulk Lite $27** → `oto4-ds.html`

| | |
|---|---|
| Page ka ek kaam | Ek-ek karke banane se **20 ek saath** banane pe le jana (time bachat) |
| Admin plan | `OTO4 Automation` ✅ |
| Flag | `feature_bulk` |
| App page | `/bulk` |
| Asli behaviour | 1 instruction + list (har line ek item) → **max 20 items/run**. Instruction me `{item}` placeholder. Output **Copy all** ya **Download .txt** |
| S25 step 3 | *Open **Bulk Generator**, write one instruction with `{item}`, paste your list and hit run.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Create In BULK: Turn Hours Of Repetitive Work Into One Click.
- **S3 · Sub-headline:** Write one instruction, paste a list, and ArgonMax generates a result for every item, up to 20 per run. Copy everything or download it in one file. One payment.
- **S4 · Pehla CTA:** **[ Yes — Add Bulk Automation ($39) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** `/bulk` screenshot: instruction + ~10 items + results below. *Caption:* "One instruction. A list. A finished batch."
- **S6 · Trust bar:** standard
- **S7 · Hook:** You can create almost anything with ArgonMax. Now create it at scale.
- **S8 · The 10x idea:** The people who ship the most aren't typing faster. They write the instruction once and let it run on every item.
- **S9 · The gap:** Without Bulk, you generate one piece at a time. Twenty products means twenty separate prompts.
- **S10 · Cost of staying:** Repetitive content eats afternoons: open a chat, paste, wait, copy, repeat. The work isn't hard, it's just endless, and it pushes your real projects to tomorrow.
- **S11 · Introducing:** **ArgonMax Bulk Generator.** One instruction, up to 20 results per run.
- **S12 · How it works:** 1) Click Yes. 2) We unlock Bulk within `[ACTIVATION_TIME]` and email you. 3) Open Bulk Generator, write your instruction with `{item}`, paste your list (one item per line) and run it. *(+ extra CTA)*
- **S13 · Benefit 1 — Mass product descriptions:** One instruction ("Write a short product description for `{item}`"), so 20 products get 20 descriptions in one run instead of 20 chats.
- **S14 · Benefit 2 — Batch anything repetitive:** Ad variations, email subject lines, titles, captions, FAQs, short bios, so any task you repeat becomes a single run.
- **S15 · Benefit 3 — Export in one go:** Copy all results at once, or download them as a single .txt file, so nothing gets lost between tabs.
- **S16 · Use cases:** (icon grid) *(+ extra CTA)*
  - Product descriptions for a whole catalogue batch.
  - 20 ad headline variations for testing.
  - Email subject lines for a campaign.
  - Blog or video title ideas by topic.
  - Social captions for a week of posts.
  - Short FAQ answers for each product.
  - Short bios for a team or a list of speakers.
- **S17 · Who it's for / not for:**
  - *For:* e-commerce sellers, agencies and anyone with repetitive content at volume.
  - *Not for:* long-form pieces. Each result has a length limit, so Bulk is best for short-to-medium content. Also no CSV upload today.
- **S18 · Before vs After:**
  - One prompt per item → One instruction for all.
  - An afternoon of copy-paste → One run.
  - Results scattered across chats → One list.
  - Re-typing the same brief → Write it once.
  - Evenings lost to repetition → Evenings back.
- **S19 · A day with it:**
  - *Morning:* Paste 20 product names, write one instruction, hit run.
  - *Coffee break:* Review the batch.
  - *Late morning:* Download the .txt and upload to your store.
  - *Rest of the day:* Spent on the work that actually needs you.
- **S20 · Benefit bullets:** ✅ Up to 20 items per run ✅ One instruction, many results ✅ `{item}` placeholder ✅ Copy all with one click ✅ Download as a .txt file ✅ Inside your existing dashboard ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Items per run: 1 → up to 20
  - Instruction: retyped every time → written once
  - Export: copy piece by piece → Copy all or download .txt
  - Time for a batch of 20: an afternoon → one run
- **S22 · Value stack:** Bulk Generator (20 per run) · `{item}` placeholder workflow · Copy all + .txt download · **Value (time, not price): if a batch like this normally eats an afternoon, Bulk gives that afternoon back.** → **Today: one payment of $39.**
- **S23 · Deal box:** ArgonMax Bulk Automation · Up to 20 results per run · **$39 one-time** · micro-line · **[ Yes — Add Bulk Automation ($39) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *How many at once?* Up to 20 per run. Run it again for more.
  - *Does Bulk use my words?* Yes. Each result uses words from your normal balance (Unlimited Pro covers it).
  - *Can I upload a CSV?* Not today. Paste your list, one item per line.
  - *What is it best for?* Short-to-medium pieces: descriptions, ads, titles, captions.
  - *Can I export?* Yes. Copy all, or download a .txt file.
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *One instruction. Twenty results. One payment of $39.* **[ Yes — Add Bulk Automation ($39) ]** / No thanks
- **S28 · P.S.:** Doing it one at a time is a choice. So is getting your evenings back.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- `/bulk` screenshot: instruction bhari hui + ~10 items + niche results → S5, S12.
- "20 items → 20 results" counter graphic → S13.
- Export buttons (Copy all, Download .txt) close-up → S15.
- Use-case icons (7) → S16.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "Upload CSV" | Nahi hai, sirf paste | "paste your list" |
| "Export as zip / doc" | Sirf Copy all + .txt | wahi |
| "Save & reuse prompt presets" | Bana nahi | hata do |
| "100 outputs in one click" (purana Next landing config) | Max 20/run | 20 |
| "Long-form per item" | Har result ki length capped (`MAX_OUTPUT_WORDS = 1024`) | "short-to-medium pieces" |
| "Free / no words used" | Words kat-te hain | FAQ me sach batao |

### Downsell — `oto4-ds.html`
⚠️ "10 items per run" abhi **enforce nahi hota**: `MAX_ITEMS = 20` sabke liye hardcoded hai (`api/bulk/route.ts`). Plan bhi nahi bana. **Skip karo** ya dev se per-plan cap banwao.

---

## OTO 5 — Traffic & Leads · $47

📄 `oto5.html` · Downsell: **Traffic Lite $27** → `oto5-ds.html`

| | |
|---|---|
| Page ka ek kaam | "Content bana liya, ab log kaise aayenge?" |
| Admin plan | `OTO5 Traffic` ✅ |
| Flag | `feature_traffic` |
| App page | `/training` (sirf wo resources jo Admin > Resources me section `training` me daale ho: video / pdf / link) |
| ⚠️ | Seed rows `example.com` ke **placeholder** hain. Asli content ke bina ye OTO launch mat karo. Neeche ke saare `[N]` real count se bharo |
| S25 step 3 | *Open the **Training** tab in your sidebar and start with Module 1.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — You Can Create Anything With ArgonMax… But Do You Know How To Get People To See It?
- **S3 · Sub-headline:** Unlock the Traffic & Leads training inside your dashboard: step-by-step playbooks for free traffic, plus lead-generation scripts and templates you can use right away. One payment.
- **S4 · Pehla CTA:** **[ Yes — Add Traffic & Leads ($47) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** Training tab screenshot with **real module titles**. *Caption:* "Your Training tab after the upgrade."
- **S6 · Trust bar:** standard
- **S7 · Hook:** Great content is only half the game. Traffic is the other half, and most people skip it.
- **S8 · The 10x idea:** The best post, page or video in the world earns nothing if nobody sees it. People who get results don't just create. They know where their audience is and how to reach it.
- **S9 · The gap:** ArgonMax makes the assets. It doesn't tell you how to put them in front of real people. That's what this training does.
- **S10 · Cost of staying:** Without a traffic plan, you publish and hope. Weeks pass, the content sits unseen, and you start to think the content was the problem.
- **S11 · Introducing:** **ArgonMax Traffic Edition.** A training library inside your Training tab.
- **S12 · How it works:** 1) Click Yes. 2) We unlock the Training tab within `[ACTIVATION_TIME]` and email you. 3) Open it, start with Module 1 and follow along at your own pace. *(+ extra CTA)*
- **S13 · Benefit 1 — Free-traffic playbooks:** `[N]` step-by-step guides, so you can start getting visitors without a big ad budget. *(Yaha real titles ki list dalo.)*
- **S14 · Benefit 2 — Lead-gen scripts & templates:** Capture-page copy, outreach scripts and follow-ups: `[N]` ready-to-use files, so you don't write them from scratch.
- **S15 · Benefit 3 — Learn inside the app:** No scattered PDFs and links. Open the Training tab and follow along, so everything stays in one place.
- **S16 · What's inside:** (module list) *(+ extra CTA)*
  - Module 1: `[Real title]`
  - Module 2: `[Real title]`
  - Module 3: `[Real title]`
  - Lead-gen file 1: `[Real title]`
  - Lead-gen file 2: `[Real title]`
  - *(Sirf wahi jo upload ho chuka hai. Durations sirf agar real.)*
- **S17 · Who it's for / not for:**
  - *For:* anyone who wants customers, not just content. Beginners especially.
  - *Not for:* anyone looking for a guaranteed traffic number or a magic button. This teaches methods; results depend on your effort.
- **S18 · Before vs After:**
  - Publish and hope → Publish with a plan.
  - Guessing where to post → Clear playbooks.
  - Writing outreach from scratch → Ready scripts.
  - Scattered tips → One Training tab.
  - Content nobody sees → Content in front of people.
- **S19 · A day with it:**
  - *Morning:* Create the piece in ArgonMax.
  - *Afternoon:* Open the Training tab and follow the playbook to get it in front of people.
  - *Evening:* Use a follow-up script on the new leads.
- **S20 · Benefit bullets:** ✅ `[N]` training videos / guides ✅ Free-traffic playbooks ✅ Lead-gen scripts and templates ✅ Beginner-friendly `[confirm]` ✅ Lives in your Training tab ✅ Learn at your own pace ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Content creation: ✅ ArgonMax → ✅ ArgonMax
  - Knowing how to get visitors: guesswork → step-by-step playbooks
  - Outreach and follow-ups: written from scratch → ready scripts
  - Where learning lives: scattered links → one Training tab
- **S22 · Value stack:** Free-traffic playbooks · Lead-gen scripts and templates · Training tab access · **Traffic courses are commonly priced far above this: `[VERIFY: tumhara number]`** → **Today: one payment of $47.**
- **S23 · Deal box:** ArgonMax Traffic Edition · Playbooks + scripts + templates · **$47 one-time** · micro-line · **[ Yes — Add Traffic & Leads ($47) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *Is it beginner-friendly?* `[Yes — record karne ke baad confirm karo.]`
  - *Where is it?* In the Training tab of your sidebar.
  - *Does it promise traffic or sales?* No. It teaches methods; results depend on your effort.
  - *Do I need paid ads?* `[Truth.]`
  - *Is it video or PDF?* `[Real format list.]`
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *Stop publishing into the void. Learn how to get seen. One payment of $47.* **[ Yes — Add Traffic & Leads ($47) ]** / No thanks
- **S28 · P.S.:** Content without traffic is a billboard in the desert.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Training tab screenshot **real module titles** ke saath (type icons: video / PDF / link) → S5, S16.
- Syllabus checklist (durations sirf agar real) → S16.
- "Publish and hope" vs "Publish with a plan" graphic → S18.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "Proven system", "get X visitors" | Proof / data nahi | "step-by-step methods" |
| "Video course" | Tabhi jab videos upload ho chuke ho | real count |
| "Lead-gen templates" (AI templates jaise) | Ye resources (PDF / links) hain, AI templates nahi | "swipe files & scripts" |
| Module count / hours | Placeholder | real numbers |
| "$197+ course" | Unverified | verify ya soft line |

### Downsell — `oto5-ds.html`
⚠️ "Training only (no lead templates)" enforce nahi hota: resources me level ka option nahi hai, aur plan bhi nahi bana. **Skip** karo ya DS buyer ko manual delivery (email links) do.

---

## OTO 6 — Agency License · $97

📄 `oto6.html` · Downsell: **Agency Lite $67** → `oto6-ds.html`

| | |
|---|---|
| Page ka ek kaam | Buyer ko "AI service business" ka rasta dikhana |
| Admin plan | `OTO6 Agency` ✅ · DS `DS Agency Lite` ✅ |
| Asli unlock | **100 client accounts** · **2,000,000-word pool** · plan flags: Pro, Bulk, Gold templates (level 2), Whitelabel |
| App page | `/agency` |
| Kaise kaam karta hai | Owner client ka email + password daalke account banata hai. Client ke words **owner ke pool se kat-te hain** (default 10,000, owner badal sakta hai) |
| S25 step 3 | *Open **Agency** in your sidebar and add your first client.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Turn ArgonMax Into An AI Service Business: Create Up To 100 Client Accounts.
- **S3 · Sub-headline:** Create logins for your clients, give each a share of your word pool, and manage everyone from one Agency dashboard. You set your own prices and keep 100% of what you charge. One payment.
- **S4 · Pehla CTA:** **[ Yes — Start My AI Agency ($97) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** `/agency` page: 5–6 **fake** clients + word balances + "Add client" form. *Caption:* "Your Agency dashboard: every client in one place."
- **S6 · Trust bar:** standard
- **S7 · Hook:** You've got a powerful tool. Now let it work with clients.
- **S8 · The 10x idea:** Most businesses want AI-written content, but won't do it themselves. The people who offer it as a service don't need to build software. They need a tool that's already built and a way to give clients access.
- **S9 · The gap:** Your account is for you. Agency lets other people, your clients, log in under your control.
- **S10 · Cost of staying:** Using ArgonMax only for yourself means your output is capped by your own hours. Every client you could have served is a project you never started.
- **S11 · Introducing:** **ArgonMax Agency License.** Up to 100 client accounts, a 2,000,000-word pool you control, and agency commercial rights.
- **S12 · How it works:** 1) Click Yes. 2) We activate Agency within `[ACTIVATION_TIME]` and email you. 3) Open **Agency**, enter a client's email and password, choose how many words to give them, and they can log in. *(+ extra CTA)*
- **S13 · Benefit 1 — Instant agency:** Add a client in seconds: email, password, done, so you can start serving clients without building anything.
- **S14 · Benefit 2 — You control the words:** Your Agency account comes with a 2,000,000-word pool. Give one client 10,000 words and another 100,000, so you decide who gets what and keep control of usage.
- **S15 · Benefit 3 — Everything you need to deliver:** Your own account includes Chat With Documents, AI Vision, Bulk and the Gold template vault, so you can produce the work, plus your name, logo and colors on the dashboard your clients see. `[Admin > Plans me flags confirm karo; Whitelabel line tabhi jab flag rakhna ho.]`
- **S16 · Use cases (services people already pay for):** (icon grid) *(+ extra CTA)*
  - Blog and article packages.
  - Email sequences for small businesses.
  - Ad copy sets (Facebook, Google).
  - Product descriptions for online stores (Bulk).
  - Social media content calendars.
  - Document summaries and research briefs for clients (Chat With Documents, in your own account).
- **S17 · Who it's for / not for:**
  - *For:* freelancers, marketers and consultants who want to sell AI-powered content services.
  - *Not for:* anyone expecting income without finding clients. ArgonMax gives you the tool. Finding clients is your part. Also not for you if you'd rather not manage client logins.
- **S18 · Before vs After:**
  - Just you → You and up to 100 clients.
  - Your own word balance → A 2,000,000-word pool you allocate.
  - Ad-hoc help for friends → A proper client dashboard.
  - One-off projects → Repeatable service packages.
  - A tool you use → A service you offer.
- **S19 · A day with it:**
  - *Morning:* A new client says yes. Create their account in under a minute.
  - *Midday:* Deliver their first content batch using your own account.
  - *Afternoon:* Check how many words each client has left.
  - *Evening:* Invoice. Repeat tomorrow.
- **S20 · Benefit bullets:** ✅ Up to 100 client accounts ✅ Agency commercial rights ✅ 2,000,000-word pool you allocate ✅ Pro tools, Bulk and Gold templates in your own account ✅ One dashboard for every client ✅ You keep 100% of what you charge ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Who can log in: only you → you + up to 100 clients
  - Word pool: your balance → 2,000,000 words you allocate
  - Client management: — → one Agency dashboard
  - Commercial rights: standard license → agency rights
  - Your account's tools: core → + Pro, Bulk, Gold templates
- **S22 · Value stack:** 100 client accounts · 2,000,000-word pool · Pro tools + Bulk + Gold templates in your account · Agency dashboard · Agency commercial rights · **Agencies commonly charge clients hundreds per month for content work. `[VERIFY]` Results vary; nothing here is a guarantee.** → **Today: one payment of $97.**
- **S23 · Deal box:** ArgonMax Agency License · 100 client accounts + 2,000,000-word pool · **$97 one-time** · micro-line · **[ Yes — Start My AI Agency ($97) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *How many clients?* Up to 100.
  - *Do I keep what I charge?* Yes. You bill your clients yourself; ArgonMax takes no cut.
  - *What do clients get?* The core tools (Chat, Writer, Code, Templates) with the words you give them. Pro and Bulk stay in your own account.
  - *Where do client words come from?* Your pool.
  - *Can clients see ArgonMax branding?* `[Truth — depends on Whitelabel (Decision #5).]`
  - *Do I need technical skills?* No. You add a client with an email and a password.
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *100 client accounts. A pool you control. Your prices. One payment of $97.* **[ Yes — Start My AI Agency ($97) ]** / No thanks
- **S28 · P.S.:** If you land even one client at typical agency rates, this can pay for itself. Results vary. No guarantee.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- `/agency` page: 5–6 **fake** clients + word balances + "Add client" form → S5, S12.
- Flow graphic: You → Clients → S14.
- Branding preview (agar Whitelabel flag rakha hai) → S15.
- Service-package icons → S16.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "One client can pay back this 10x in a month" | Income claim | conditional P.S. (upar) |
| "Your first client covers this many times over. The rest is profit." | Income claim | conditional P.S. |
| "Agencies charge $500–$2,000/client. You need one." | Income-style | "commonly charge hundreds… results vary" |
| "Client sub-accounts get Pro tools" | Agency-mode clients ko Pro / Bulk inherit **nahi** hota (sirf Team mode me) | "core tools" |
| "Unlimited usage for clients" | Words pool se kat-te hain | pool wording |
| "50–100 accounts" (`OTO-FUNNEL`) | Plan = 100, DS = 25 | 100 |

### Downsell — `oto6-ds.html` (Agency Lite $67)
> **H1:** Wait — Start Smaller: Agency Lite With 25 Client Accounts.
> **Body:** 25 client accounts, a 500,000-word pool, Pro, Bulk and Gold templates in your own account. *You skip:* the other 75 client slots, the bigger pool and the branding editor.

(DB me `DS Agency Lite`: 25 accounts, 500,000 words, Whitelabel off ✅)

---

## OTO 7 — Reseller License · $67

📄 `oto7.html` · Downsell: **Reseller Lite $47** → `oto7-ds.html`

| | |
|---|---|
| Page ka ek kaam | "ArgonMax khud bech ke kamao" |
| Admin plan | `OTO7 Reseller` ✅ |
| Flag | `is_reseller` |
| App page | `/reseller` (Admin > Resources, section `reseller`: sales kit, license PDF) |
| ⚠️ | Code me reseller ke buyers ko account dene ka **koi system nahi**. Delivery process tumhe define karna hai |
| S25 step 3 | *Open the **Reseller** tab and download your sales kit.* |

**Delivery process (suggestion, manual):** Reseller apne customer ka email form / email se tumhe bhejta hai → tum Admin > Users > New user se account banate ho → customer ko login email jata hai. Page pe yehi process aur turnaround time likho.

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Sell ArgonMax Itself. Get The Reseller License And A Done-For-You Sales Kit.
- **S3 · Sub-headline:** Sell ArgonMax accounts as your own offer, set your own price, and use our ready-made sales kit to get started. One payment.
- **S4 · Pehla CTA:** **[ Yes — Give Me Reseller Rights ($67) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** Reseller tab screenshot (kit items list). *Caption:* "Your Reseller tab: license and sales kit, ready to download."
- **S6 · Trust bar:** standard
- **S7 · Hook:** Why only use ArgonMax when you can sell it?
- **S8 · The 10x idea:** Selling a product that already works is faster than building one. You skip the development, the hosting and the years of trial and error, and start with something real to offer.
- **S9 · The gap:** Agency lets you serve clients with your own tools. Reseller lets you sell ArgonMax accounts to other people as your own offer.
- **S10 · Cost of staying:** Building and hosting a product like this yourself takes far longer than a one-time $67, and you'd still have to write the sales page.
- **S11 · Introducing:** **ArgonMax Reseller License.** Selling rights plus a done-for-you sales kit.
- **S12 · How it works:** 1) Click Yes. 2) We activate your Reseller tab within `[ACTIVATION_TIME]` and email you. 3) Download the kit, set your price and start promoting. `[Real delivery: aapke buyers ko account kaise milta hai.]` *(+ extra CTA)*
- **S13 · Benefit 1 — A product that's already built:** No development, no hosting. ArgonMax runs in the cloud, so you can focus on selling.
- **S14 · Benefit 2 — Done-for-you sales kit:** `[REAL kit items: e.g. sales page copy, email swipes, graphics]`, ready to download from your Reseller tab, so you don't start from a blank page.
- **S15 · Benefit 3 — Simple delivery:** `[Real process: you send us your buyer's email, we create the account within X hours.]` so you don't have to run any tech.
- **S16 · Use cases (ways to use it):** (icon grid) *(+ extra CTA)*
  - Sell accounts to your email list.
  - Promote to your social audience.
  - Offer it to your freelance clients as a tool.
  - Bundle it with your own training or service.
  - Run a launch with the included swipes.
- **S17 · Who it's for / not for:**
  - *For:* affiliates, marketers and sellers who want a product of their own to promote.
  - *Not for:* anyone without an audience or a way to reach buyers. The kit helps you sell, but you bring the traffic.
- **S18 · Before vs After:**
  - Promoting other people's offers → Selling your own.
  - Building a product → Starting with one that's built.
  - Writing a sales page from scratch → Using a ready kit.
  - Handling tech → We create the accounts `[if true]`.
  - Earning a commission → Setting your own price.
- **S19 · A day with it:**
  - *Morning:* Download the kit and personalise the sales page.
  - *Midday:* Send the email swipes to your list.
  - *Afternoon:* A buyer comes in. Send us their email. We create the account.
- **S20 · Benefit bullets:** ✅ Reseller license ✅ Sales kit in your Reseller tab ✅ Set your own price ✅ We create accounts for your buyers `[if true]` ✅ No development or hosting ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Selling rights: — → ✅ Reseller license
  - Sales material: you write it → done-for-you kit
  - Product: you'd build it → already built
  - Account delivery: — → `[our process]`
- **S22 · Value stack:** Reseller license · Sales kit (`[list real items]`) · Delivery process `[if true]` · **Building and hosting a product like this takes far longer than a one-time $67.** → **Today: one payment of $67.**
- **S23 · Deal box:** ArgonMax Reseller License · License + sales kit · **$67 one-time** · micro-line · **[ Yes — Give Me Reseller Rights ($67) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *What exactly can I sell?* `[e.g. front-end accounts only.]`
  - *How do my buyers get their accounts?* `[Process.]`
  - *Who supports my buyers?* `[Truth.]`
  - *Any limits?* `[Per your license terms.]`
  - *Where is the kit?* In the Reseller tab.
  - *Can I set my own price?* Yes.
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *Reseller rights. A ready sales kit. Your price. One payment of $67.* **[ Yes — Give Me Reseller Rights ($67) ]** / No thanks
- **S28 · P.S.:** You set your price and keep what you charge. How much you sell depends on your marketing. No guarantees.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Reseller tab screenshot (kit items list) → S5, S14.
- Kit ke sales page ka thumbnail → S14.
- 3-step delivery diagram: You sell → send buyer email → we create account → S12, S15.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "Two or three sales and this pays for itself. After that, pure profit." | Income claim | conditional P.S. |
| "A license like this often sells for $297+" | Unverified | hata do |
| "We handle delivery / support" | Tabhi jab process ready ho | real process |
| "Keep 100%" | Ok agar koi revenue share nahi | "keep what you charge" |
| "Done-for-you sales kit" | App sirf links dikhata hai, kit tumhe banani hai | kit ready karke hi bechna |

### Downsell — `oto7-ds.html` (Reseller Lite $47)
Limited license count (jaise 25 accounts). Plan banao (`is_reseller` on) aur limit **terms me** likho. Enforcement manual hai.

---

## OTO 8 — Whitelabel · $197

📄 `oto8.html` · Downsell: **Whitelabel Lite $97** → `oto8-ds.html`

| | |
|---|---|
| Page ka ek kaam | "Apna brand": positioning |
| Admin plan | `OTO8 Whitelabel` ✅ |
| Flag | `is_whitelabel` |
| App page | `/branding`: App name, **Logo URL** (link paste, upload nahi), Primary color, Custom domain |
| Domain | **Manual:** tum Vercel > Domains me domain add karte ho, buyer DNS (CNAME) set karta hai (`docs/WHITELABEL.md`) |
| S25 step 3 | *Open **Branding**, set your name, logo link and color.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Put YOUR Brand On The App, Not Ours.
- **S3 · Sub-headline:** Set your own app name, logo and colors, and run it on your own domain with our setup guide and help. One payment.
- **S4 · Pehla CTA:** **[ Yes — Make It My Brand ($197) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** Before / after: ArgonMax dashboard → sample "YourBrand AI" dashboard. *Caption:* "Same power. Your name on the door."
- **S6 · Trust bar:** standard
- **S7 · Hook:** Ready to look like the owner of the platform, not a user of someone else's?
- **S8 · The 10x idea:** People pay more attention to, and more money for, a product with a brand. Software with your name on it positions you as the authority, not the reseller.
- **S9 · The gap:** Reseller sells our brand. Whitelabel lets you present ArgonMax under yours.
- **S10 · Cost of staying:** Every client who logs in sees someone else's name. That makes your offer look like a middleman's, and it makes pricing harder to defend.
- **S11 · Introducing:** **ArgonMax Whitelabel.** Your app name, your logo, your colors, your domain.
- **S12 · How it works:** 1) Click Yes. 2) We activate Whitelabel within `[ACTIVATION_TIME]` and email you. 3) Open **Branding**, set your name, logo link and color, then follow the domain guide. *(+ extra CTA)*
- **S13 · Benefit 1 — Your name and logo:** Replace the app name and logo across the dashboard and pick your accent color, so your clients see your brand from the first login.
- **S14 · Benefit 2 — Your own domain:** Run it at app.yourbrand.com. You get a step-by-step guide and `[we add the domain on our side within X days]`, so your platform lives at your address.
- **S15 · Benefit 3 — Your clients see your brand:** Agency and team accounts under you show your branding, so everyone you invite sees one consistent brand.
- **S16 · Use cases:** (icon grid) *(+ extra CTA)*
  - A branded client portal for your agency.
  - A branded workspace for your team.
  - A branded login at your own domain.
  - A "powered by your brand" tool you include in a package.
  - A product page for your own AI offer.
- **S17 · Who it's for / not for:**
  - *For:* agencies, consultants and entrepreneurs building a brand.
  - *Not for:* anyone who doesn't have a brand name or logo yet, or who doesn't plan to give anyone else access. `[AI assistant ki identity ka note: Claim check dekho.]`
- **S18 · Before vs After:**
  - ArgonMax name → Your name.
  - Default logo → Your logo.
  - Default colors → Your accent color.
  - A shared address → Your domain.
  - Looks like a tool → Looks like your platform.
- **S19 · A day with it:**
  - *Morning:* Set your brand in the Branding page. Takes a few minutes.
  - *Midday:* Follow the domain guide. We add your domain on our side.
  - *Afternoon:* Invite your first client and see them log in to your brand.
- **S20 · Benefit bullets:** ✅ Custom app name ✅ Custom logo ✅ Custom accent color ✅ Custom domain with setup help ✅ Client and team accounts show your brand ✅ Step-by-step guide ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - App name: ArgonMax → yours
  - Logo: ArgonMax → yours
  - Accent color: default → yours
  - Domain: shared → your own, with setup help
  - What clients see: someone else's product → your brand
- **S22 · Value stack:** Custom name + logo + color · Custom domain with setup guide `[and help]` · Branding for client and team accounts · **Custom-branded software normally means a developer and a bigger bill.** → **Today: one payment of $197.**
- **S23 · Deal box:** ArgonMax Whitelabel · Your name, logo, colors and domain · **$197 one-time** · micro-line · **[ Yes — Make It My Brand ($197) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *Is a custom domain included?* Yes, with a step-by-step guide `[and our help]`. You add a DNS record at your registrar.
  - *How do I add my logo?* Paste an image link on the Branding page.
  - *Do my clients see ArgonMax?* `[Truth — Claim check dekho.]`
  - *Can I change it later?* Yes. Edit the Branding page any time.
  - *Do my client accounts show my brand?* Yes, accounts under you show your branding.
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *Your name. Your logo. Your domain. One payment of $197.* **[ Yes — Make It My Brand ($197) ]** / No thanks
- **S28 · P.S.:** Owning a branded platform changes how clients see you.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Branding editor screenshot → S12, S13.
- Before / after: sidebar + login (ArgonMax vs sample "YourBrand AI") → S5, S18.
- Diagram: `app.yourbrand.com → ArgonMax` → S14.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "Clients log in and never know it's ArgonMax" | AI ki identity prompt **global** hai (Admin > Settings, `src/lib/identity.ts`). Whitelabel buyer ke dashboard me bhi AI khud ko "ArgonMax AI" bolta hai | "your name, logo, colors and domain" |
| "Upload your logo" | Sirf URL paste | "add your logo link" |
| "Custom domain automatic" | Manual (Vercel + DNS) | "with setup guide and help" |
| "Remove ArgonMax branding everywhere" | Emails / baaki jagah verify nahi | scope exact likho |
| "A developer would charge $5,000+" | Unverified | soft line |

**Decision:** "clients ko pata hi nahi chalega" claim karna hai to pehle dev se **per-brand AI identity** banwao. Tab tak FAQ me sach rakho.

### Downsell — `oto8-ds.html` (Whitelabel Lite $97)
Name + logo + color; **domain help nahi**. Plan banao (`is_whitelabel` on). Domain field Branding page pe dono ko dikhega, to page pe likho "domain setup help sirf full Whitelabel me".

---

## OTO 9 — Enterprise / Team · $127

📄 `oto9.html` · Downsell: **Enterprise Lite $77** → `oto9-ds.html`

| | |
|---|---|
| Page ka ek kaam | Team ko ek account ke neeche lana |
| Admin plan | `OTO9 Enterprise` ✅ |
| Asli unlock (plan seed) | **10 seats** (= tum + 9 teammates) · **2,000,000-word pool** · Pro + Bulk + Traffic training + VIP area + Gold templates |
| App page | `/team` |
| Kaise kaam karta hai | Owner teammate ka email + password daalke account banata hai. Words owner ke pool se. Teammates ko owner ke **Pro aur Bulk** flags milte hain |
| S25 step 3 | *Open **Team** in your sidebar and invite your first teammate.* |

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Add Your Whole Team. 10 Seats, A Big Shared Word Pool, And Priority Support.
- **S3 · Sub-headline:** Invite up to 9 teammates under your account (10 seats including you), share a 2,000,000-word pool, and get priority support. One payment.
- **S4 · Pehla CTA:** **[ Yes — Upgrade To Enterprise ($127) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** `/team` page: seat list (fake naam) + words allocation. *Caption:* "One account. Your whole team."
- **S6 · Trust bar:** standard
- **S7 · Hook:** Going big? This upgrade is built for teams and heavy users.
- **S8 · The 10x idea:** A team working on one platform, from one shared pool, outproduces the same people on separate accounts. Nothing gets duplicated, and you can see where the usage goes.
- **S9 · The gap:** The front-end is a single seat. Enterprise adds your team and top-tier limits.
- **S10 · Cost of staying:** One login for everyone means passing work around by hand, or each person running into their own limits. That slows the whole team down to the speed of its smallest balance.
- **S11 · Introducing:** **ArgonMax Enterprise.** 10 seats, a 2,000,000-word shared pool and priority support.
- **S12 · How it works:** 1) Click Yes. 2) We activate Enterprise within `[ACTIVATION_TIME]` and email you. 3) Open **Team**, add a teammate's email and password, and choose their words. *(+ extra CTA)*
- **S13 · Benefit 1 — Team seats:** Create a login for each teammate. They get your Pro tools (Chat With Documents, Vision) and Bulk, so everyone works with the same power.
- **S14 · Benefit 2 — One shared pool:** 2,000,000 words, yours to allocate. Give heavy users more, so words go where the work is.
- **S15 · Benefit 3 — Priority support, plus extras:** `[Define real response time]`. Your account also includes the Gold templates, the Training library and the VIP area. `[Admin > Plans me flags confirm karo.]`
- **S16 · Use cases:** (icon grid) *(+ extra CTA)*
  - A content team writing from a shared pool.
  - A support team drafting replies faster.
  - A developer team using Chat With Documents on specs.
  - A marketing team running Bulk for catalogue work.
  - A small agency giving staff their own logins.
- **S17 · Who it's for / not for:**
  - *For:* small businesses, agencies and serious power users with more than one person.
  - *Not for:* solo users. If it's just you, the front-end plus Unlimited Pro is enough.
- **S18 · Before vs After:**
  - One seat → 10 seats (you + 9).
  - Each person's own limits → One shared pool.
  - Passing work around → Everyone works in ArgonMax.
  - Standard support → Priority support `[SLA]`.
  - Guessing who used what → You allocate the words.
- **S19 · A day with it:**
  - *Morning:* Add a new teammate in a minute.
  - *Midday:* The team writes and summarises from one pool.
  - *Afternoon:* Give the busiest teammate more words.
- **S20 · Benefit bullets:** ✅ 10 seats (you + 9) ✅ 2,000,000-word shared pool ✅ Teammates get Pro + Bulk ✅ Priority support `[SLA]` ✅ Gold templates, Training library and VIP area ✅ Manage everyone in one place ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Seats: 1 → 10 (you + 9)
  - Word pool: your balance → 2,000,000 shared
  - Teammate tools: — → your Pro + Bulk
  - Support: standard → priority `[SLA]`
  - Extras: — → Gold templates, Training, VIP area
- **S22 · Value stack:** 10 seats · 2,000,000-word pool · Pro + Bulk for teammates · Priority support · Gold templates + Training + VIP area · **Per-seat AI tools are usually billed monthly, per user: `[VERIFY: tumhare numbers]`** → **Today: one payment of $127.**
- **S23 · Deal box:** ArgonMax Enterprise · 10 seats + 2,000,000 words · **$127 one-time** · micro-line · **[ Yes — Upgrade To Enterprise ($127) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar)
- **S26 · FAQ:**
  - *How many seats?* 10 including you.
  - *Do members get Pro tools?* Yes, your Pro and Bulk access.
  - *Are words shared?* Yes. You allocate from the pool.
  - *What does priority support mean?* `[Real answer.]`
  - *Can I add more seats later?* `[Truth.]`
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *10 seats. A shared pool. Priority support. One payment of $127.* **[ Yes — Upgrade To Enterprise ($127) ]** / No thanks
- **S28 · P.S.:** Your team is your leverage. Give them the best tool, once.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- `/team` page: seats list (fake naam) + words allocation → S5, S12.
- "1 owner + 9 members" diagram → S13.
- Shared-pool bar graphic → S14.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "10 team members" | Cap = seats − 1 = 9 members | "10 seats (you + 9)" |
| "Highest / unlimited usage" | 2,000,000 fixed pool, unlimited off (`0015`) | "2,000,000 words" |
| "Each seat has its own allowance" | Pool shared | "shared pool" |
| "Priority support" | Manual promise | SLA define karo |
| Per-user price numbers | Unverified | verify ya soft line |

### Downsell — `oto9-ds.html` (Enterprise Lite $77)
3 seats (you + 2). **Plan abhi nahi bana**: Admin > Plans me banao (seats = 3, Pro + Bulk on, words = tumhari marzi).

---

## OTO 10 — VIP Setup + Coaching · $97

📄 `oto10.html` · Downsell: **VIP Lite $47** → `oto10-ds.html`

| | |
|---|---|
| Page ka ek kaam | "Hum saath me setup karte hain": hand-holding |
| Admin plan | `OTO10 VIP` ✅ |
| Flag | `is_vip` |
| App page | `/training` → **"⭐ VIP Exclusive"** section (resources section `vip`) |
| ⚠️ | App sirf links ki list deta hai. **Call, live training, community, priority support: ye sab tumhe manually deliver karna hai.** Page pe wahi promise karo jo nibha sako |
| S25 step 3 | *Open **Training** and find your VIP area. Your booking link is waiting.* |

**Apne deliverables chuno (menu):**
- 1:1 setup session: `[30]` min, booking link.
- Live group training: `[N sessions per month]`, replays.
- Private community: `[Discord / Telegram / Facebook]` link.
- Priority support: `[response time]`.
- Optional "done-for-you setup": `[exactly kya: workspace set-up, top 5 templates loaded, pehla project saath me]`.

### Page copy (S1 → S29)

- **S1 · Order strip:** standard
- **S2 · H1:** Wait — Want Us To Set It Up With You And Show You The Fastest Path To Results?
- **S3 · Sub-headline:** VIP gives you a personal setup session, live group training with Q&A, a private community and priority support, so you're never figuring it out alone. One payment.
- **S4 · Pehla CTA:** **[ Yes — Add VIP Setup & Coaching ($97) ]** · *One-time payment · 30-day money-back guarantee*
- **S5 · Hero visual:** Training page ka "⭐ VIP Exclusive" section (booking link + replay list). *Caption:* "Your VIP area, inside the dashboard."
- **S6 · Trust bar:** standard
- **S7 · Hook:** Tools don't create results. Using them does.
- **S8 · The 10x idea:** The people who get results fastest rarely work it out alone. They get the setup right on day one, ask questions early and learn from people who've done it.
- **S9 · The gap:** The front-end gives you the tool and the guides. VIP gives you a person and a plan.
- **S10 · Cost of staying:** Working it out alone costs weeks: the wrong template, the wrong setup, a question that sits unanswered. The tool is the same, but the time to a first result is not.
- **S11 · Introducing:** **ArgonMax VIP Setup & Coaching.** A setup call, live training, a private community and priority support.
- **S12 · How it works:** 1) Click Yes. 2) We unlock your VIP area within `[ACTIVATION_TIME]` and email you. 3) Open it, book your setup call and join the community. *(+ extra CTA)*
- **S13 · Benefit 1 — Personal setup session:** A `[30]`-minute call to set up your workspace, pick your best templates and plan your first project, so you start with a plan instead of a blank screen.
- **S14 · Benefit 2 — Live training + Q&A:** `[N]` live sessions `[cadence]`, so you can ask your real questions. Can't attend? Replays are waiting in your VIP area.
- **S15 · Benefit 3 — Private community + priority support:** Ask questions, share wins and get help `[response time]`, so you're never stuck waiting.
- **S16 · Use cases (what you can bring to the call):** (icon grid) *(+ extra CTA)*
  - "Which templates should I start with?"
  - "How do I set up my first client project?"
  - "Can you look at my workflow?"
  - "I'm stuck. What should I try next?"
  - "What would you do in my place?"
- **S17 · Who it's for / not for:**
  - *For:* beginners, busy owners and anyone who wants a faster start.
  - *Not for:* anyone looking for guaranteed results or income. VIP is guidance and support, not a promise of outcomes.
- **S18 · Before vs After:**
  - Figuring it out alone → Guided setup.
  - Unanswered questions → Live Q&A and community.
  - Guessing your first project → A plan on day one.
  - Waiting for support → Priority support `[SLA]`.
  - Slow start → A faster first result.
- **S19 · A day with it:**
  - *Day 1:* Book your setup call.
  - *Week 1:* Your first project is done with guidance.
  - *Ongoing:* The live sessions and community are your safety net.
- **S20 · Benefit bullets:** ✅ 1:1 setup session ✅ Live group training with Q&A ✅ Replays in your VIP area ✅ Private community ✅ Priority support ✅ One-time price ✅ 30-day money-back guarantee *(+ extra CTA)*
- **S21 · Comparison (3-col table):**
  - Setup: on your own → guided call
  - Questions: documentation → live Q&A + community
  - Support: standard → priority `[SLA]`
  - Training: guides → live + replays
  - First project: trial and error → planned
- **S22 · Value stack:** 1:1 setup session · Live group training + replays · Private community · Priority support · **One-to-one help is normally billed by the hour: `[VERIFY: tumhare numbers]`** → **Today: one payment of $97.**
- **S23 · Deal box:** ArgonMax VIP Setup & Coaching · Setup call + live training + community · **$97 one-time** · micro-line · **[ Yes — Add VIP Setup & Coaching ($97) ]**
- **S24 · Guarantee:** standard
- **S25 · Scarcity / What happens next:** standard (Option B, step 3 upar). *Agar setup calls ki real limit hai: "Limited to `[N]` setup calls per week."*
- **S26 · FAQ:**
  - *Do I have to attend live?* No. Replays go into your VIP area.
  - *How do I book the call?* The booking link appears in your VIP area after activation.
  - *Is this a course?* It's guided help: a setup call, live sessions and a community.
  - *Are spots limited?* `[Only if true.]`
  - *Does VIP guarantee results?* No. It's guidance and support. Results depend on your effort.
  - *When do I get access?* Within `[ACTIVATION_TIME]`.
- **S27 · Final CTA:** *A setup call. Live training. A community. Priority support. One payment of $97.* **[ Yes — Add VIP Setup & Coaching ($97) ]** / No thanks
- **S28 · P.S.:** The fastest way to results is rarely doing it alone.
- **S29 · Legal footer:** standard

### Kya dikhana hai (visuals)
- Training page ka "⭐ VIP Exclusive" section (booking link + replay list) → S5, S12.
- Call / calendar visual → S13.
- Community preview (naam blur) → S15.
- Agar founder / coach ki photo hai to yaha lagao (trust) → S7 ya S13.

### Claim check

| ❌ Mat likho | Kyun | ✅ Ye likho |
|-------------|------|------------|
| "We set everything up for you" (vague) | "Setup" ka matlab define nahi | exact list |
| Community / live sessions | App me nahi hain, tumhe chalane hain | real link + schedule |
| "Priority support" | Manual | SLA |
| "Limited spots" | Sirf agar real cap ho | tabhi |
| Guaranteed results / income | Allowed nahi | "help you get started faster" |

### Downsell — `oto10-ds.html` (VIP Lite $47)
Recorded training only (no live, no community). ⚠️ `is_vip` wala plan same VIP section dikhata hai (onboarding call link bhi). **Manual delivery** (email me recording links) karo ya dev se alag level banwao.

---

# PART 5 — Downsell reality (DB me kya hai, kya banana hai)

| Downsell | Price | Plan DB me? | "Kam wala hissa" enforce hota hai? | Action |
|----------|------:|-------------|-------------------------------------|--------|
| DS1 Unlimited Pro Lite | $27 | ✅ `DS Unlimited Pro Lite` | ✅ 200k fixed words, unlimited nahi. PDF + Vision **dono** milte hain | Copy DB se match |
| DS2 Creative PRO Silver | $47 | ✅ `DS Creative PRO Silver` | ✅ 150 img + 25 vid | Ok |
| DS3 DFY Lite | $37 | ✅ `DS DFY Lite` | ⚠️ Sirf 12 Silver templates (bump jaise) | **Skip** ya dev |
| DS4 Bulk Lite | $27 | ❌ nahi bana | ❌ `MAX_ITEMS = 20` sabke liye | **Skip** ya dev (per-plan cap) |
| DS5 Traffic Lite | $27 | ❌ | ❌ Resources me level nahi | **Skip** ya manual delivery |
| DS6 Agency Lite | $67 | ✅ `DS Agency Lite` | ✅ 25 accounts, 500k words, no Whitelabel | Ok |
| DS7 Reseller Lite | $47 | ❌ | Policy based | Plan banao + terms me limit |
| DS8 Whitelabel Lite | $97 | ❌ | Policy based (domain help nahi) | Plan banao |
| DS9 Enterprise Lite | $77 | ❌ | Plan se (seats = 3) | Plan banao |
| DS10 VIP Lite | $47 | ❌ | ❌ Same VIP section dikhega | Manual delivery ya dev |

**Agar kisi DS ko skip karte ho:** us OTO ka "No" link seedha **next OTO** pe jayega (Part 0.2 table me `-ds` page hata do).

**Admin > Plans me naye plan banane ke liye suggested flags:**

| Plan | Price | Flags |
|------|------:|-------|
| `DS Reseller Lite` | 47 | Reseller on |
| `DS Whitelabel Lite` | 97 | Whitelabel on |
| `DS Enterprise Lite` | 77 | Team seats = 3, Pro on, Bulk on |

---

# PART 6 — Kaise banana hai (step by step)

## Step 1 — Jagah decide karo
**Recommended:** `Argonlanding/oto/` (static HTML), FE page ke saath.
- FE jaisi hi look, login ki zarurat nahi.
- App down ho tab bhi sales chalti rahe.
- Static files = sasta hosting. Free plan ke terms me **commercial use allowed hai ya nahi, host chunne se pehle check kar lena.**

*(Option B: Next.js routes `/oto1` … Ye bhi chalega, public rahenge kyunki `src/proxy.ts` sirf PROTECTED list ko login-gate karta hai. Par design aur animations dobara banane padenge, isliye recommend nahi.)*

## Step 2 — Folder banao
```
Argonlanding/
├─ styles.css            (existing, reuse. Isse change mat karo)
├─ assets/               (existing: logo, fonts)
└─ oto/
   ├─ oto-config.js      ← saare links + prices ek jagah
   ├─ oto.css            ← chhote OTO-only styles (.nothanks, .oto-top, zigzag, timeline, compare table)
   ├─ oto.js             ← config inject + reveal + sticky bar + ?sections helper
   ├─ assets/            ← screenshots (.webp)
   ├─ oto1.html … oto10.html
   ├─ oto1-ds.html … oto10-ds.html
   └─ thanks.html
```

## Step 3 — `oto-config.js`
```js
window.ARGONMAX_OTO = {
  activationTime: "24 hours",   // jo sach hai wahi likho
  supportEmail: "",
  launchEndsAt: "",             // REAL date ya khali (khali = S25 "What happens next" dikhega)
  pages: {
    oto1:      { price: "47", buy: "", no: "oto1-ds.html" },
    "oto1-ds": { price: "27", buy: "", no: "oto2.html" },
    // … oto2 … oto10 aur unke -ds, Part 0.2 table ke hisaab se
  }
};
```
- `buy` = platform ka OTO buy link.
- Buy ke baad kahan jana hai (next page) wo **platform ke product settings** me set hota hai, yaha nahi.

## Step 4 — `oto.js` (chhota)
Kaam:
- `[data-oto-buy]` ka href, `[data-oto-no]` ka href, `[data-oto-price]` aur `[data-oto-activation]` ka text set karna.
- S25: `launchEndsAt` real future date ho to Option A (countdown) dikhao, warna Option B ("What happens next") dikhao. **Dono me se ek hamesha dikhna chahiye** (section count 29 rahe).
- `.reveal` fade-in, sticky bar, scroll progress bar.
- `?sections` helper (URL ke end me `?sections` lagao to har section pe number badge dikhe).

> ⚠️ **Gotcha:** FE ka `script.js` OTO pages me **include mat karo**. Wo har `[data-price]` ko FE ka `$17` bana deta hai aur har `[data-buy]` ko FE ka checkout link. Isliye OTO pages me alag attributes (`data-oto-*`) use karo. Reveal / sticky / `?sections` logic `script.js` se copy kar sakte ho.

## Step 5 — Pehle sirf `oto1.html` banao (master template, 29 sections)
`Argonlanding/index.html` ka `<head>` copy karo (fonts preload, `no-js` → `js` inline script) aur `styles.css` ka path `../styles.css` karo. Extra: `<meta name="robots" content="noindex,nofollow">` aur `<title>Wait — Unlimited Pro | ArgonMax</title>`.

**Rule:** har S ka apna element, `id="oNN"` aur `data-section="N"` ke saath (FE page ke `sNN` jaisa). Isse `?sections` helper 29 badges dikhata hai aur QA aasan hota hai.

Body skeleton:
```html
<body data-oto="oto1">
  <header class="oto-top"><img src="../assets/argonmax-logo.webp" width="900" height="191" alt="ArgonMax AI"></header>

  <!-- S1 -->  <p class="eyebrow eyebrow--green" id="o01" data-section="1">✓ Your ArgonMax order is confirmed…</p>

  <!-- S2–S6: hero -->
  <h1 class="h1" id="o02" data-section="2">Wait — …</h1>
  <p class="lead" id="o03" data-section="3">…</p>
  <div class="cta" id="o04" data-section="4">
    <a class="btn btn--buy btn--xl btn--pulse" href="#o23" data-oto-buy>
      <span>Yes — … ($<span data-oto-price>47</span>)</span>
    </a>
    <p class="cta__micro">…</p>
  </div>
  <figure id="o05" data-section="5">…hero screenshot + caption…</figure>
  <ul id="o06" data-section="6">…4 trust points…</ul>

  <!-- S7–S11: story --> o07 hook · o08 10x idea · o09 gap · o10 cost of staying · o11 introducing
  <!-- S12: how it works (3 cards) + extra CTA -->
  <!-- S13–S15: 3 benefit blocks (zigzag) -->
  <!-- S16: use cases (icon grid) + extra CTA -->
  <!-- S17–S19: for/not-for · before/after · a day with it -->
  <!-- S20: benefit bullets + extra CTA -->
  <!-- S21: comparison <table> -->
  <!-- S22: value stack -->

  <section class="sec offer" id="o23" data-section="23"><div class="order"><!-- deal box --></div></section>

  <!-- S24 guarantee · S25 scarcity OR what-happens-next (oto.js decides) -->

  <section class="sec faq" id="o26" data-section="26">
    <div class="faq__list"><details class="qa" name="faq"><summary>…</summary><div class="qa__a"><p>…</p></div></details></div>
  </section>

  <section class="sec" id="o27" data-section="27">
    <a class="btn btn--buy btn--xl btn--pulse" href="#o23" data-oto-buy>Yes — …</a>
    <a class="nothanks" href="oto1-ds.html" data-oto-no>No thanks, …</a>
  </section>
  <p id="o28" data-section="28">P.S. …</p>
  <footer id="o29" data-section="29"><!-- disclaimer + Terms · Privacy · Refund · Support --></footer>

  <div class="sticky" id="sticky" inert>…</div>
  <script src="oto-config.js"></script>
  <script src="oto.js"></script>
</body>
```
Jab `buy` khali hota hai, buttons deal box (`#o23`) pe scroll karte hain. Testing ke liye wahi chahiye (FE page ka same behaviour).

## Step 6 — `oto1.html` review karwao, phir 2 → 10 clone karo (order me)
Har page me badlo: `data-oto`, `<title>` + meta description, copy (Part 4), icons (Part 3), screenshots, FAQ, NO link. **29 sections ka structure same rakho.**

## Step 7 — Downsell pages (8 blocks, chhote)
Part 2 ka downsell layout. Har page pe "kya milega / kya skip hua" 2-column.

## Step 8 — Screenshots
App me **real-looking sample data** ke saath, 1280×800, `.webp`, descriptive `alt`.
- Emails, keys, provider names, URL bar blur / avoid.
- Agency / Team ke liye **fake** client naam.
- Lambe page pe images `loading="lazy"` (hero ko chhodkar).

## Step 9 — Test
- 360px / 768px / 1280px.
- JS band karke content padho (hidden nahi hona chahiye).
- Har YES / NO link click karke dekho (config bharne ke baad). Extra CTAs (S12, S16, S20 ke baad) bhi.
- **`?sections` lagao: 29 badges dikhne chahiye** (S25 skip ho to "What happens next" version dikhna chahiye).
- Har page ka **Claim check** table copy se compare karo.
- Provider-name sweep (result **khali** aana chahiye):
```powershell
Select-String -Path "Argonlanding\oto\*" -Pattern "openai|replicate|openrouter|kimi|moonshot|deepseek|gpt-|p-video"
```

## Step 10 — Platform wiring (WarriorPlus / JVZoo)
1. Har product (FE + OTO1–10 + downsells) banao, price set karo, **buy link** lo.
2. Buy links `oto-config.js` me daalo.
3. Har product ka post-purchase redirect = Part 0.2 ka "Yes ke baad" page. FE ka redirect = `oto1.html`.
4. Test purchase end-to-end karo.

## Step 11 — Fulfilment test (buyer ko unlock kaise karna hai)
Purchase email aaye → **Admin > Users > Features** me ye karo (plan assign **nahi**, warna overwrite):

| OTO | Features me ON karo | Numbers |
|-----|---------------------|---------|
| 1 Unlimited Pro | Unlimited, Pro | — |
| 2 Creative PRO | Creative Studio | Image / Video credits = **current + 500 / 50** (fields *set* hote hain, add nahi) |
| 3 DFY | — | Template level = 2 |
| 4 Bulk | Bulk | — |
| 5 Traffic | Traffic | — |
| 6 Agency | Agency (+ Pro, Bulk, Whitelabel agar plan jaisa dena hai) | Agency accounts = 100, Template level = 2, "add words" |
| 7 Reseller | Reseller | — |
| 8 Whitelabel | Whitelabel | — |
| 9 Enterprise | Pro, Bulk, Traffic, VIP | Team seats = 10, Template level = 2, "add words" |
| 10 VIP | VIP | — |

Phir us user se login karke check karo ki feature sach me dikh raha hai.

---

# PART 7 — Launch checklist

- [ ] Part 0.3 ke 7 decisions ho gaye
- [ ] **Har OTO page me S1–S29 maujood** (`?sections` se 29 badges), kam se kam 20 hamesha
- [ ] Har page ka **Claim check** follow kiya
- [ ] Extra CTAs (S12, S16, S20 ke baad) + sticky bar kaam karte hain
- [ ] `[ACTIVATION_TIME]` real hai, aur S6, S23, S26 me likha hai
- [ ] S25: ya real deadline (Option A) ya "What happens next" (Option B), fake countdown nahi
- [ ] OTO5: training record + Admin > Resources me upload (`example.com` rows replace), saare `[N]` real
- [ ] OTO7: sales kit + reseller terms + delivery process ready
- [ ] OTO10: setup call / live sessions / community / support SLA ready
- [ ] Downsell plans bane (Part 5) ya downsell skip kiye
- [ ] Saare `[BRACKETS]` aur `[VERIFY]` replace
- [ ] Testimonials real hain ya block hata diya
- [ ] Disclaimer + Terms / Privacy / Refund / Support links
- [ ] `noindex` har page pe
- [ ] Provider-name sweep clean
- [ ] Mobile QA (hero, YES, FAQ, NO link, lambe page ki loading speed)
- [ ] Test purchase + fulfilment test
- [ ] Vision model production env me set hai (OTO1 ka Vision claim)

---

# PART 8 — Ye prompt kisi AI ko paste karo

```
Build the ArgonMax OTO funnel pages from docs/sales/04-OTO-PAGES-GUIDE.md.

Scope: 10 long-form OTO pages (29 sections each) + 10 short downsell pages + thanks.html,
as static HTML in Argonlanding/oto/.

Rules:
- Reuse ../styles.css, ../assets/fonts and the head/markup patterns from Argonlanding/index.html.
  Do NOT modify styles.css or script.js.
- Do NOT include script.js on OTO pages. Create oto-config.js, oto.css and oto.js as described in Part 6.
- Every OTO page must contain all 29 sections (S1-S29) from Part 2, each as its own element with
  id="oNN" and data-section="N". Minimum 20 sections is a hard floor; the target is 29.
  Add extra YES buttons after S12, S16 and S20. S25 shows the real-deadline version only when
  launchEndsAt is a real future date, otherwise the "What happens next" version.
- Use ONLY the copy and facts from Part 4. Respect every "Claim check" table.
  Do not invent prices, features, numbers, testimonials or income claims.
- Write benefit-first: every feature paired with what the buyer gets (Part 2 formula).
- No underlying model/provider names anywhere (text, alt, meta, file names).
- Every page: noindex, one price, one YES button (repeated), one NO link, legal footer.
- Leave [BRACKETS] and [VERIFY] as visible TODOs. Do not fill them with guesses.
- Downsell pages use the 8-block layout. Skip the downsell pages marked "Skip" in Part 5
  and link "No" to the next OTO instead.
- Work in order: build oto1.html first, run the ?sections check, stop for my review,
  then continue 2 -> 10 one by one.
```

---

**End.** Kuch bhi page ka copy badalna ho ya kisi OTO ko pehle build karwana ho, to bol dena.
