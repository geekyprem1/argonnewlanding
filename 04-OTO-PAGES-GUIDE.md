# ArgonMax — OTO Landing Pages: Kya Likhna Hai + Kaise Banana Hai (OTO 1 → 10)

> Ye file 10 OTO pages (aur unke downsell pages) ka **poora plan** hai: page pe kya likhna hai, kya dikhana hai, kaise banana hai, aur kya **nahi** likhna.
>
> - Samjhane wala hissa Hinglish me hai. **Page ki copy English me hai** (sales page English me hi jayegi).
> - Verify kiya gaya: `docs/OTO-FUNNEL.md`, migrations `0006`–`0022`, aur app ka asli code (`src/`). Jo line app me nahi hai, use yaha `❌` ya `[VERIFY]` mark kiya hai.
> - `[BRACKETS]` = tumhe real value daalni hai (jaise `[ACTIVATION_TIME]`). Bina replace kiye page live mat karo.
> - Ye file seedha kisi AI ko bhi de sakte ho (sabse last me ready prompt hai).

---

# PART 0 — Pehle ye padho (5 min)

## 0.1 Kaunsa doc sahi hai

- **Final structure + prices:** `docs/OTO-FUNNEL.md` + migration `0022_funnel_merge.sql`. (OTO1 = Unlimited **Pro** $47, OTO2 = Creative PRO $87.)
- `docs/sales/00-COMPLETE-LANDING-PAGE-BRIEF.md` ka **Part B + Part F** purana hai (OTO1 $37, OTO2 Pro $47, Creative Studio alag). **Ignore karo.**
- `docs/sales/02-OTO-COPY.md` me OTO1–9 ki copy hai (OTO10 nahi hai). Kaam ki hai, par kuch lines app se match nahi karti. Wo fixes yaha har OTO ke **Claim check** me hain.
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
2. **Top pe "Order confirmed" strip:** *"✓ Your ArgonMax order is confirmed. One quick, one-time upgrade before you go to your dashboard."* Isse ye naya pitch nahi, order ka hissa lagta hai.
3. **Headline "Wait —" se shuru** (existing OTO copy ka pattern). H1 me benefit + outcome, **price nahi**.
4. **Price sirf deal box + buttons me.** H1 aur sub-headline me nahi.
5. **Sirf wahi likho jo app me abhi hai.** Har OTO ka **Claim check** follow karo. Naya feature promise karna hai to pehle build karo.
6. **Underlying AI provider / model ka naam kahin nahi:** page text, alt text, FAQ, meta tags, image file names, screenshots (URL bar / console me bhi nahi). Sirf brand: *ArgonMax, ArgonMax K3*. (Replicate, gpt-image, p-video, OpenRouter, Kimi, DeepSeek, OpenAI wagairah kahin nahi.)
7. **Scarcity sirf real.** "Only on this page" tabhi likho jab sach ho. Countdown sirf **real date** ke saath (FE page ka `launchEndsAt` pattern: date khali = countdown hidden). Fake timer / fake "only 3 left" nahi.
8. **Income claims nahi.** "Pure profit", "pays back 10x", "first client covers it" hatao ya conditional + "results vary" me badlo. Testimonials sirf real; placeholder ho to `SAMPLE` clearly mark karo aur launch se pehle replace karo.
9. **Manual delivery ka expectation set karo:** deal box ki micro-line aur FAQ me `[ACTIVATION_TIME]`.
10. **Guarantee FE jaisi:** 30-day money-back, har page pe chhota block.
11. **NO link honest ho.** "No thanks, I'll stay with my starter limit" theek hai. Guilt-trip ("I don't want to make money") nahi.
12. **Mobile first (360px):** top strip + H1 + sub + YES button pehli screen me dikhe. Sticky YES bar hero CTA ke scroll hone ke baad.
13. **Fast + simple:** static HTML, 2 fonts preload, images `.webp` + `width/height`, koi extra library nahi. JS band ho tab bhi content padha ja sake.
14. **`noindex`:** `<meta name="robots" content="noindex,nofollow">`. Page me koi secret/download link mat rakho (URL public hota hai; payment ko platform protect karta hai).
15. **Accessibility:** images ka alt text, keyboard focus dikhe, `prefers-reduced-motion` respect (FE script already karta hai), contrast theek.
16. **Legal footer (har page):** *"ArgonMax is an independent product. Results are not typical or guaranteed and depend on effort, skill and market factors. No income guarantees."* + Terms · Privacy · Refund · Support.

---

# PART 2 — Page blueprint (har OTO page ke 16 blocks)

Ye `02-OTO-COPY.md` ke 20 sections ka compact version hai (Congrats + 10x idea merge, 3 benefit blocks, sab ek flow me).

| # | Block | Kya likhna hai | Tip |
|---|-------|----------------|-----|
| 1 | Top strip | "Order confirmed — one more thing" | 1 line, green eyebrow |
| 2 | **H1** ("Wait —") | Benefit + outcome | max 2–3 lines |
| 3 | Sub-headline + pehla YES button | Ye kya hai + kya badlega + "one payment" | 2 lines + CTA |
| 4 | Hook | Congrats + "smart people do X" | 2–3 lines |
| 5 | The gap | FE me kya missing hai (real) | 2 lines |
| 6 | Introducing + hero visual | "Introducing [Name]" + screenshot | naam + 1 line + image |
| 7 | **3 benefit blocks** | Title + 2 lines + screenshot, har ek me ek real feature | zigzag layout |
| 8 | Who it's for + life-with-it | 1 line audience + 2–3 line "day in life" | short |
| 9 | Checklist | 5–7 ✅ bullets (sab real) | scan-able |
| 10 | Value / price anchor | Alternative ki cost (sirf verified) ya time-saving | 2 lines |
| 11 | **Deal box** | Name, kya included, **price**, micro-line, YES | `.order` card |
| 12 | Guarantee | 30-day money-back | 2 lines |
| 13 | Honest scarcity | Real date / real reason, warna **skip** | 1–2 lines |
| 14 | FAQ | 4–6 honest Q&A (limits + activation zaroor) | `<details>` |
| 15 | Final CTA | YES + NO + P.S. | P.S. 2 lines |
| 16 | Legal footer | disclaimer + links | small text |

- **Proof (optional):** sirf real screenshots / real testimonials. Nahi hain to block skip karo, page chhota rakho.
- **Deal box micro-line (sab pages):** *One-time payment · Added to your existing account · Activated within `[ACTIVATION_TIME]` · 30-day money-back guarantee.*

**Downsell page = 8 blocks:** top strip ("Wait — before you go…") → H1 → "kya milega / kya skip hua" (2 column) → price → YES → NO → guarantee → footer.

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

**Block → existing class:**

| Block | Class / markup |
|-------|----------------|
| Layout | `.wrap`, `.wrap--mid`, `.wrap--narrow`, `.sec` |
| Top strip | `.eyebrow.eyebrow--green` |
| Headings | `.h1`, `.h2`, `.h3`, `.lead` |
| YES button | `.btn.btn--buy.btn--xl.btn--pulse` |
| CTA micro-line | `.cta` + `.cta__micro` |
| Deal box | `.order` (`.order__bar`, `.order__foot`) |
| FAQ | `.faq__list` + `<details class="qa" name="faq">` |
| Sticky bar | `.sticky` (JS `.is-on` toggle, `inert` attribute) |
| Animations | `.reveal` / `.rise` |
| **NO link (naya)** | `.nothanks` → `oto.css` me banao: muted, chhota, underline, 44px tap area |

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

# PART 4 — OTO 1 → 10 (page-by-page)

---

## OTO 1 — Unlimited Pro · $47

📄 `oto1.html` · Downsell: **Unlimited Pro Lite $27** → `oto1-ds.html`

| | |
|---|---|
| Page ka ek kaam | Buyer ki 2 rukawatein ek click me hatana: word limit, aur "AI mere documents / images nahi samajhta" |
| Admin plan | `OTO1 Unlimited Pro` ✅ (DB me hai) |
| Flags | `is_unlimited` + `feature_pro` |
| App me asli unlock | Unlimited words (daily fair-use cap) · Chat With Documents (`/documents`) · AI Vision (📎 button in Chat) |

### Kya likhna hai

> **H1:** Wait — Remove Your Word Limit AND Unlock Chat With Documents + AI Vision, In One Move.
>
> **Sub-headline:** ArgonMax Unlimited Pro lifts the word cap on everything you create, lets you ask questions about your own PDFs, and lets the AI look at your images. One payment. No monthly fee.
>
> **Hook:** Smart move grabbing ArgonMax. Your starter account is built to get you going. But the people who get real value from AI don't ration it, and they don't stop at plain text.
>
> **Gap:** Right now your account runs on a word balance, and it can't read your files or look at a screenshot. Unlimited Pro removes both brakes at once.
>
> **Introducing:** **ArgonMax Unlimited Pro** — unlimited words, Chat With Documents and AI Vision, inside the dashboard you already use.
>
> **Benefit 1 — Create without counting words:** Write the whole funnel, the full email series, a month of content, in one sitting. Fair-use limit: `[200,000]` words per day, resetting every midnight (UTC). Most people never touch it.
>
> **Benefit 2 — Chat with your documents:** Upload a PDF, TXT or MD file and ask for summaries, key points, or "where does it say…". Works with text-based files up to about 40,000 characters per chat (roughly 12–15 pages). Split longer files.
>
> **Benefit 3 — AI that can see:** Upload a screenshot or photo in Chat and get a description, the text inside it, or code that matches the design.
>
> **Who it's for:** Marketers, agencies, developers, consultants and researchers who use ArgonMax every day.
>
> **Checklist:** ✅ Unlimited words (fair-use daily limit) ✅ Chat with PDF / TXT / MD files ✅ AI image Vision ✅ Lives inside your existing dashboard ✅ One-time payment ✅ 30-day money-back guarantee
>
> **Price anchor:** AI plans built for heavy usage, and separate document-chat tools, are normally billed every month. This is one payment. *(Competitor ke exact prices tabhi likho jab khud verify kiye ho.)*
>
> **Deal:** Upgrade now for a one-time **$47**.
>
> **FAQ**
> - *Is it really unlimited?* Unlimited words with a fair-use limit of `[200,000]` words per day. It resets every midnight (UTC).
> - *Which files work?* PDF (with selectable text), TXT and MD, up to about 40,000 characters each. Scanned or image-only PDFs aren't supported yet.
> - *Does Vision need setup?* No. Once Pro is on, the image button appears in Chat.
> - *When do I get access?* Within `[ACTIVATION_TIME]`. You'll get an email.
>
> **CTA:** **[ Yes — Upgrade Me To Unlimited Pro ($47) ]** / No thanks, I'll stay with my starter limit
>
> **P.S.** Driving with the handbrake on is a choice. Take it off, once, for $47.

### Kya dikhana hai
- Dashboard card **"Words remaining: Unlimited"** (app me asli: `∞ Unlimited`).
- `/documents` page: PDF loaded + ek sawal + jawab.
- Chat me 📎 image upload + AI ka answer.
- Before / after: starter word bar → ∞.

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

### Kya likhna hai

> **H1:** Wait — Add AI Image & Video Creation To ArgonMax. No Extra Subscriptions.
>
> **Sub-headline:** Type a prompt, pick a shape, get an image. Type another, get a 10-second video. Credits are added to your account one time — no monthly fee.
>
> **Hook:** You can already write and code. Now make the visuals that stop the scroll: ad images, thumbnails, social posts and short promo clips.
>
> **Gap:** Your account is built around text and code. Creative PRO adds the Creative Studio: image and video generation, saved in your own gallery.
>
> **Introducing:** **ArgonMax Creative PRO** — 500 image credits and 50 video credits, ready in your dashboard.
>
> **Benefit 1 — Images in seconds:** Choose square (1:1), landscape (3:2) or portrait (2:3). Great for ads, social posts and product visuals.
>
> **Benefit 2 — 10-second videos:** 720p clips in 7 shapes: 16:9, 9:16, 4:3, 3:4, 3:2, 2:3 and 1:1. Good for Reels, Shorts, Stories and ad clips. Videos render in the background, so you can keep working.
>
> **Benefit 3 — One gallery, nothing to juggle:** Everything you create is saved in your gallery. View it, download it, reuse your prompts. If a generation fails, your credit is returned automatically.
>
> **Who it's for:** Marketers, e-commerce sellers, social creators and agencies.
>
> **Checklist:** ✅ 500 image credits ✅ 50 video credits ✅ Multiple aspect ratios ✅ 10-second 720p video ✅ Saved gallery ✅ One-time credits, not monthly ✅ 30-day guarantee
>
> **Price anchor:** Separate image and video tools are usually billed monthly, each. *(Numbers sirf verified.)*
>
> **Deal:** Add Creative PRO for a one-time **$87**.
>
> **FAQ**
> - *Do credits renew monthly?* No. They're one-time credits.
> - *Where do my files go?* Your Creative Studio gallery.
> - *How long are videos?* 10 seconds at 720p.
> - *What if a generation fails?* The credit is returned automatically.
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Add Creative PRO Gold ($87) ]** / No thanks
>
> **P.S.** Words tell. Visuals sell.

### Kya dikhana hai
- Creative Studio gallery (3 images + 1 video thumbnail).
- Credits cards: "Image credits 500 · Video credits 50".
- Ratio selector close-up; ek prompt → result before/after.

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
> **Body:** 150 image credits + 25 video credits, one-time, $47. Same gallery, same ratios, same 10-second 720p video.

---

## OTO 3 — DFY Templates (Gold Vault) · $67

📄 `oto3.html` · Downsell: **DFY Lite $37** → `oto3-ds.html`

| | |
|---|---|
| Page ka ek kaam | "Khali page se shuru mat karo": premium template vault |
| Admin plan | `OTO3 DFY` ✅ |
| Flag | `template_level = 2` |
| Asli unlock | **30 Gold templates** (+ 12 Silver agar bump nahi liya) · App me `/templates` pe 🥇 Gold badge |

**Vault ki real list (page pe grid me dikhao):**

| Group | Templates |
|-------|-----------|
| Listings & stores | Real Estate Listing, Amazon Product Listing, Etsy Listing Optimizer, Shopify Store Copy |
| Sales & funnels | Sales Funnel Copy, Landing Page Copy, Upsell & Downsell Copy, VSL Script, Webinar Script, Ad Angle Generator |
| Email sequences | 7-Day Email Series, Abandoned Cart Emails, Product Launch Sequence |
| Ads & social | Facebook Ads Campaign, Google Ads Campaign, TikTok Hooks |
| Authority & content | Case Study Writer, White Paper Writer, Book Outline, Podcast Show Notes, Affiliate Review, Lead Magnet Creator, Brand Story Writer, About Us Page, FAQ Generator |
| Business | Course Curriculum, Coaching Program, Local Business SEO, Investor Pitch, Job Description |

### Kya likhna hai

> **H1:** Wait — Skip The Blank Page. Unlock 30 Done-For-You Gold Templates For Funnels, Emails, Ads, Listings & More.
>
> **Sub-headline:** Unlock the Gold vault inside your Templates library. Pick a template, add your details, and ArgonMax writes the whole piece for you.
>
> **Hook:** Pros don't start from scratch. They start from proven structures and fill in the blanks.
>
> **Gap:** Your starter templates are great for single pieces. The Gold vault covers the bigger jobs: funnels, launch sequences, webinar and VSL scripts, store and marketplace listings.
>
> **Introducing:** **ArgonMax DFY Pack** — 30 Gold templates, unlocked in your Templates library.
>
> **Benefit 1 — Skip the blank page:** Pick a template, fill in your product and audience, generate. Weeks of structure done in minutes.
>
> **Benefit 2 — Built for niches that pay:** Real estate, Amazon and Etsy sellers, Shopify stores, coaches, local businesses.
>
> **Benefit 3 — Campaigns, not just snippets:** Sales Funnel Copy (opt-in to thank-you), a 7-Day Email Series, Product Launch Sequence, Abandoned Cart Emails. Add your details, get the full sequence.
>
> **Who it's for:** Agencies and freelancers who bill clients, and anyone who wants results fast.
>
> **Checklist:** ✅ 30 Gold templates ✅ Funnels, sequences and scripts ✅ Niche-specific templates ✅ Unlocked in your Templates library ✅ Fresh output every time ✅ One-time price
>
> **Price anchor:** A single copywriter can charge hundreds for one funnel. You get a vault. *(Number verify karke.)*
>
> **Deal:** Unlock the DFY Pack for a one-time **$67**.
>
> **FAQ**
> - *Where do they appear?* In your Templates library, marked 🥇 Gold.
> - *Are these pre-written campaigns?* No. They're expert templates: you add your details and ArgonMax writes it fresh every time.
> - *How many?* 30 Gold templates.
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Add The DFY Pack ($67) ]** / No thanks
>
> **P.S.** Every hour spent writing from scratch is an hour you're not earning. Templates mean speed.

### Kya dikhana hai
- Templates grid me real naam + 🥇 Gold badge.
- Ek template ka before / after: khali form → generated Sales Funnel Copy.
- Niche chips row (Real Estate · Amazon · Etsy · Shopify · Coaching · Local).

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

### Kya likhna hai

> **H1:** Wait — Create In BULK: Turn Hours Of Repetitive Work Into One Click.
>
> **Sub-headline:** Write one instruction, paste a list, and ArgonMax generates a result for every item, up to 20 per run. Copy everything or download it in one file.
>
> **Hook:** You can create almost anything with ArgonMax. Now create it at scale.
>
> **Gap:** Without Bulk, you generate one piece at a time. With Bulk, one run gives you up to 20.
>
> **Introducing:** **ArgonMax Bulk Generator** — inside your dashboard.
>
> **Benefit 1 — Mass product descriptions:** 20 products? One instruction ("Write a short product description for {item}") and 20 descriptions are ready.
>
> **Benefit 2 — Batch anything repetitive:** Ad variations, email subject lines, titles, captions, FAQs, short bios. If you repeat it, Bulk can run it.
>
> **Benefit 3 — Export in one go:** Copy all results at once, or download them as a single .txt file.
>
> **Who it's for:** E-commerce sellers, agencies, and anyone with repetitive content at volume.
>
> **Life with it:** Paste your list in the morning, hit run, come back to a finished batch.
>
> **Checklist:** ✅ Up to 20 items per run ✅ One instruction, many results ✅ `{item}` placeholder ✅ Copy all / download .txt ✅ Inside your dashboard ✅ One-time price
>
> **Value (time, not price):** If a batch like this normally eats an afternoon, Bulk gives that afternoon back.
>
> **Deal:** Add Bulk Automation for a one-time **$39**.
>
> **FAQ**
> - *How many at once?* Up to 20 per run. Run it again for more.
> - *Does Bulk use my words?* Yes. Each result uses words from your normal balance (Unlimited Pro covers it).
> - *Can I upload a CSV?* Not today. Paste your list, one item per line.
> - *What is it best for?* Short-to-medium pieces: descriptions, ads, titles, captions.
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Add Bulk Automation ($39) ]** / No thanks
>
> **P.S.** Doing it one at a time is a choice. So is getting your evenings back.

### Kya dikhana hai
- `/bulk` screenshot: instruction bhari hui + ~10 items + niche results.
- "20 items → 20 results" counter graphic.
- Export buttons (Copy all, Download .txt) close-up.

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
| ⚠️ | Seed rows `example.com` ke **placeholder** hain. Asli content ke bina ye OTO launch mat karo |

### Kya likhna hai

> **H1:** Wait — You Can Create Anything With ArgonMax… But Do You Know How To Get People To See It?
>
> **Sub-headline:** Unlock the Traffic & Leads training inside your dashboard: step-by-step playbooks for free traffic, plus lead-generation templates and scripts you can use right away.
>
> **Hook:** Content is only half the game. Traffic is the other half, and most people skip it.
>
> **Gap:** ArgonMax makes the assets. This shows you how to put them in front of real people.
>
> **Introducing:** **ArgonMax Traffic Edition** — a training library inside your Training tab.
>
> **Benefit 1 — Free-traffic playbooks:** `[N]` step-by-step guides. *(Yaha real titles ki list dalo.)*
>
> **Benefit 2 — Lead-gen scripts & templates:** Capture-page copy, outreach scripts and follow-ups: `[N]` ready-to-use files.
>
> **Benefit 3 — Learn inside the app:** No scattered PDFs and links. Open the Training tab and follow along.
>
> **Who it's for:** Anyone who wants customers, not just content. Beginners especially.
>
> **Checklist:** ✅ `[N]` training videos / guides ✅ Free-traffic playbooks ✅ Lead-gen scripts and templates ✅ In your Training tab ✅ One-time price
>
> **Price anchor:** Traffic courses are commonly priced far above this. *(Number sirf verified.)*
>
> **Deal:** Add the Traffic Edition for a one-time **$47**.
>
> **FAQ**
> - *Is it beginner-friendly?* `[Yes — confirm after you record it.]`
> - *Where is it?* In the Training tab of your sidebar.
> - *Does it promise traffic or sales?* No. It teaches methods; results depend on your effort.
> - *Do I need paid ads?* `[Truth.]`
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Add Traffic & Leads ($47) ]** / No thanks
>
> **P.S.** Content without traffic is a billboard in the desert.

### Kya dikhana hai
- Training tab screenshot **real module titles** ke saath (type icons: video / PDF / link).
- Syllabus checklist (durations sirf agar real).

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

### Kya likhna hai

> **H1:** Wait — Turn ArgonMax Into An AI Service Business: Create Up To 100 Client Accounts.
>
> **Sub-headline:** Create logins for your clients, give each a share of your word pool, and manage everyone from one Agency dashboard. You set your own prices and keep 100% of what you charge.
>
> **Hook:** You've got a powerful tool. Now let it work with clients.
>
> **Gap:** Your account is for you. Agency lets other people, your clients, log in under your control.
>
> **Introducing:** **ArgonMax Agency License**.
>
> **Benefit 1 — Instant agency:** Add a client in seconds: email, password, done. No software to build, nothing to set up.
>
> **Benefit 2 — You control the words:** Your Agency account comes with a 2,000,000-word pool. Give one client 10,000 words and another 100,000. Your call.
>
> **Benefit 3 — Everything you need to deliver:** Your own account includes Chat With Documents, AI Vision, Bulk and the Gold template vault, plus your name, logo and colors on the dashboard your clients see. `[Admin > Plans me flags confirm karo; Whitelabel line tabhi jab flag rakhna ho.]`
>
> **Who it's for:** Freelancers, marketers and consultants who want to sell AI-powered content services.
>
> **Life with it:** Land a client, create their account, deliver, invoice, repeat.
>
> **Checklist:** ✅ Up to 100 client accounts ✅ Agency commercial rights ✅ 2,000,000-word pool you allocate ✅ Pro, Bulk and Gold templates in your own account ✅ Manage everyone in one place ✅ One-time price
>
> **Price anchor:** Agencies commonly charge clients hundreds per month for content work. *Results vary; nothing here is a guarantee.*
>
> **Deal:** Unlock Agency for a one-time **$97**.
>
> **FAQ**
> - *How many clients?* Up to 100.
> - *Do I keep what I charge?* Yes. You bill your clients yourself; ArgonMax takes no cut.
> - *What do clients get?* The core tools (Chat, Writer, Code, Templates) with the words you give them. Pro and Bulk stay in your own account.
> - *Where do client words come from?* Your pool.
> - *Can clients see ArgonMax branding?* `[Truth — depends on Whitelabel (Decision #5).]`
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Start My AI Agency ($97) ]** / No thanks
>
> **P.S.** If you land even one client at typical agency rates, this can pay for itself. Results vary. No guarantee.

### Kya dikhana hai
- `/agency` page: 5–6 **fake** clients + word balances + "Add client" form.
- Flow graphic: You → Clients.
- Branding preview (agar Whitelabel flag rakha hai).

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

**Delivery process (suggestion, manual):** Reseller apne customer ka email form / email se tumhe bhejta hai → tum Admin > Users > New user se account banate ho → customer ko login email jata hai. Page pe yehi process aur turnaround time likho.

### Kya likhna hai

> **H1:** Wait — Sell ArgonMax Itself. Get The Reseller License And A Done-For-You Sales Kit.
>
> **Sub-headline:** Sell ArgonMax accounts as your own offer, set your own price, and use our ready-made sales kit to get started.
>
> **Hook:** Why only use ArgonMax when you can sell it?
>
> **Gap:** Agency lets you serve clients with your own tools. Reseller lets you sell ArgonMax accounts to other people.
>
> **Introducing:** **ArgonMax Reseller License** — selling rights plus a sales kit.
>
> **Benefit 1 — A product that's already built:** No development, no hosting. ArgonMax runs in the cloud.
>
> **Benefit 2 — Done-for-you sales kit:** `[REAL kit items: e.g. sales page copy, email swipes, graphics]`, ready to download from your Reseller tab.
>
> **Benefit 3 — Simple delivery:** `[Real process: you send us your buyer's email, we create the account within X hours.]`
>
> **Who it's for:** Affiliates, marketers and sellers who want a product of their own to promote.
>
> **Checklist:** ✅ Reseller license ✅ Sales kit in your Reseller tab ✅ Set your own price ✅ We create accounts for your buyers `[if true]` ✅ One-time price
>
> **Value:** Building and hosting a product like this yourself takes far longer than a one-time $67.
>
> **Deal:** Get Reseller rights for a one-time **$67**.
>
> **FAQ**
> - *What exactly can I sell?* `[e.g. front-end accounts only.]`
> - *How do my buyers get their accounts?* `[Process.]`
> - *Who supports my buyers?* `[Truth.]`
> - *Any limits?* `[Per your license terms.]`
> - *Where is the kit?* In the Reseller tab.
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Give Me Reseller Rights ($67) ]** / No thanks
>
> **P.S.** You set your price and keep what you charge. How much you sell depends on your marketing. No guarantees.

### Kya dikhana hai
- Reseller tab screenshot (kit items list).
- Kit ke sales page ka thumbnail.
- 3-step delivery diagram: You sell → send buyer email → we create account.

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

### Kya likhna hai

> **H1:** Wait — Put YOUR Brand On The App, Not Ours.
>
> **Sub-headline:** Set your own app name, logo and colors, and run it on your own domain with our setup guide and help.
>
> **Hook:** Branded software positions you as the authority and makes your offer easier to sell.
>
> **Gap:** Reseller sells our brand. Whitelabel lets you present ArgonMax under yours.
>
> **Introducing:** **ArgonMax Whitelabel**.
>
> **Benefit 1 — Your name and logo:** Replace the app name and logo across the dashboard and pick your accent color.
>
> **Benefit 2 — Your own domain:** Run it at app.yourbrand.com. You get a step-by-step guide and `[we add the domain on our side within X days]`.
>
> **Benefit 3 — Your clients see your brand:** Agency and team accounts under you show your branding.
>
> **Who it's for:** Agencies, consultants and entrepreneurs building a brand.
>
> **Life with it:** Clients log in to YourBrand AI and see your name, logo and colors.
>
> **Checklist:** ✅ Custom app name ✅ Custom logo ✅ Custom accent color ✅ Custom domain with setup help ✅ Client accounts show your brand ✅ One-time price
>
> **Value:** Custom-branded software normally means a developer and a bigger bill.
>
> **Deal:** Unlock Whitelabel for a one-time **$197**.
>
> **FAQ**
> - *Is a custom domain included?* Yes, with a step-by-step guide `[and our help]`. You add a DNS record at your registrar.
> - *How do I add my logo?* Paste an image link on the Branding page.
> - *Do my clients see ArgonMax?* `[Truth — see Claim check.]`
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Make It My Brand ($197) ]** / No thanks
>
> **P.S.** Owning a branded platform changes how clients see you.

### Kya dikhana hai
- Branding editor screenshot.
- Before / after: sidebar + login (ArgonMax vs sample "YourBrand AI").
- Diagram: `app.yourbrand.com → ArgonMax`.

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

### Kya likhna hai

> **H1:** Wait — Add Your Whole Team. 10 Seats, A Big Shared Word Pool, And Priority Support.
>
> **Sub-headline:** Invite up to 9 teammates under your account (10 seats including you), share a 2,000,000-word pool, and get priority support.
>
> **Hook:** Going big? A team on one platform outproduces scattered individuals.
>
> **Gap:** The front-end is a single seat. Enterprise adds your team and top-tier limits.
>
> **Introducing:** **ArgonMax Enterprise**.
>
> **Benefit 1 — Team seats:** Create a login for each teammate. They get your Pro tools (Chat With Documents, Vision) and Bulk.
>
> **Benefit 2 — One shared pool:** 2,000,000 words, yours to allocate. Give heavy users more.
>
> **Benefit 3 — Priority support, plus extras:** `[Define real response time]`. Your account also includes the Gold templates, the Training library and the VIP area. `[Admin > Plans me flags confirm karo.]`
>
> **Who it's for:** Small businesses, agencies and serious power users.
>
> **Checklist:** ✅ 10 seats (you + 9) ✅ 2,000,000-word shared pool ✅ Teammates get Pro + Bulk ✅ Priority support `[SLA]` ✅ Manage everyone in one place ✅ One-time price
>
> **Price anchor:** Per-seat AI tools are usually billed monthly, per user. *(Numbers sirf verified.)*
>
> **Deal:** Unlock Enterprise for a one-time **$127**.
>
> **FAQ**
> - *How many seats?* 10 including you.
> - *Do members get Pro tools?* Yes, your Pro and Bulk access.
> - *Are words shared?* Yes. You allocate from the pool.
> - *What does priority support mean?* `[Real answer.]`
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Upgrade To Enterprise ($127) ]** / No thanks
>
> **P.S.** Your team is your leverage. Give them the best tool, once.

### Kya dikhana hai
- `/team` page: seats list (fake naam) + words allocation.
- "1 owner + 9 members" diagram.

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

**Apne deliverables chuno (menu):**
- 1:1 setup session: `[30]` min, booking link.
- Live group training: `[N sessions per month]`, replays.
- Private community: `[Discord / Telegram / Facebook]` link.
- Priority support: `[response time]`.
- Optional "done-for-you setup": `[exactly kya: workspace set-up, top 5 templates loaded, pehla project saath me]`.

### Kya likhna hai

> **H1:** Wait — Want Us To Set It Up With You And Show You The Fastest Path To Results?
>
> **Sub-headline:** VIP gives you a personal setup session, live group training with Q&A, a private community and priority support, so you're never figuring it out alone.
>
> **Hook:** Tools don't create results. Using them does.
>
> **Gap:** The front-end gives you the tool and the guides. VIP gives you a person and a plan.
>
> **Introducing:** **ArgonMax VIP Setup & Coaching**.
>
> **Benefit 1 — Personal setup session:** A `[30]`-minute call to set up your workspace, pick your best templates and plan your first project.
>
> **Benefit 2 — Live training + Q&A:** `[N]` live sessions `[cadence]`. Can't attend? Replays are waiting in your VIP area.
>
> **Benefit 3 — Private community + priority support:** Ask questions, share wins and get help `[response time]`.
>
> **Who it's for:** Beginners, busy owners and anyone who wants a faster start.
>
> **Life with it:** Day 1, book your call. Week 1, your first project is done. After that, the live sessions are your safety net.
>
> **Checklist:** ✅ 1:1 setup session ✅ Live group training ✅ Replays in your VIP area ✅ Private community ✅ Priority support ✅ One-time price
>
> **Value:** One-to-one help is normally billed by the hour. *(Specific $ sirf verified.)*
>
> **Deal:** Add VIP Setup & Coaching for a one-time **$97**.
>
> **FAQ**
> - *Do I have to attend live?* No. Replays go into your VIP area.
> - *How do I book the call?* The booking link appears in your VIP area after activation.
> - *Is this a course?* It's guided help: a setup call, live sessions and a community.
> - *Are spots limited?* `[Only if true.]`
> - *When do I get access?* Within `[ACTIVATION_TIME]`.
>
> **CTA:** **[ Yes — Add VIP Setup & Coaching ($97) ]** / No thanks
>
> **P.S.** The fastest way to results is rarely doing it alone.

### Kya dikhana hai
- Training page ka "⭐ VIP Exclusive" section (booking link + replay list).
- Call / calendar visual, community preview (naam blur).
- Agar founder / coach ki photo hai to yaha lagao (trust).

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
   ├─ oto.css            ← chhote OTO-only styles (.nothanks, .oto-top, vault grid)
   ├─ oto.js             ← config inject + reveal + sticky bar
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
  launchEndsAt: "",             // REAL date ya khali (khali = countdown hidden)
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
Kaam: `[data-oto-buy]` ka href, `[data-oto-no]` ka href, `[data-oto-price]` aur `[data-oto-activation]` ka text set karna · countdown sirf real date pe · `.reveal` fade-in · sticky bar.
> ⚠️ **Gotcha:** FE ka `script.js` OTO pages me **include mat karo**. Wo har `[data-price]` ko FE ka `$17` bana deta hai aur har `[data-buy]` ko FE ka checkout link. Isliye OTO pages me alag attributes (`data-oto-*`) use karo. Reveal / sticky logic `script.js` se copy kar sakte ho.

## Step 5 — Pehle sirf `oto1.html` banao (master template)
`Argonlanding/index.html` ka `<head>` copy karo (fonts preload, `no-js` → `js` inline script) aur `styles.css` ka path `../styles.css` karo. Extra: `<meta name="robots" content="noindex,nofollow">` aur `<title>Wait — Unlimited Pro | ArgonMax</title>`.

Body skeleton:
```html
<body data-oto="oto1">
  <header class="oto-top"><img src="../assets/argonmax-logo.webp" width="900" height="191" alt="ArgonMax AI"></header>

  <p class="eyebrow eyebrow--green" id="o01">Order confirmed</p>

  <section class="sec" id="o02" data-section="2">
    <div class="wrap wrap--mid center">
      <h1 class="h1">Wait — …</h1>
      <p class="lead">…</p>
      <div class="cta">
        <a class="btn btn--buy btn--xl btn--pulse" href="#o11" data-oto-buy>
          <span>Yes — … ($<span data-oto-price>47</span>)</span>
        </a>
        <p class="cta__micro">…</p>
      </div>
    </div>
  </section>

  <!-- o03 … o10: hook, gap, introducing, 3 benefits, who, checklist, anchor -->

  <section class="sec offer" id="o11"><div class="order"><!-- deal box --></div></section>

  <!-- o12 guarantee · o13 scarcity (optional) -->

  <section class="sec faq" id="o14">
    <div class="faq__list"><details class="qa" name="faq"><summary>…</summary><div class="qa__a"><p>…</p></div></details></div>
  </section>

  <section class="sec" id="o15">
    <a class="btn btn--buy btn--xl btn--pulse" href="#o11" data-oto-buy>Yes — …</a>
    <a class="nothanks" href="oto2.html" data-oto-no>No thanks, …</a>
  </section>

  <footer id="o16"><!-- disclaimer + Terms · Privacy · Refund · Support --></footer>

  <div class="sticky" id="sticky" inert>…</div>
  <script src="oto-config.js"></script>
  <script src="oto.js"></script>
</body>
```
Jab `buy` khali hota hai, buttons deal box (`#o11`) pe scroll karte hain. Testing ke liye wahi chahiye (FE page ka same behaviour).

## Step 6 — `oto1.html` review karwao, phir 2 → 10 clone karo (order me)
Har page me badlo: `data-oto`, `<title>` + meta description, copy (Part 4), icons (Part 3), screenshots, FAQ, NO link. Structure same rakho.

## Step 7 — Downsell pages (8 blocks, chhote)
Part 2 ka downsell layout. Har page pe "kya milega / kya skip hua" 2-column.

## Step 8 — Screenshots
App me **real-looking sample data** ke saath, 1280×800, `.webp`, descriptive `alt`.
- Emails, keys, provider names, URL bar blur / avoid.
- Agency / Team ke liye **fake** client naam.

## Step 9 — Test
- 360px / 768px / 1280px.
- JS band karke content padho (hidden nahi hona chahiye).
- Har YES / NO link click karke dekho (config bharne ke baad).
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
- [ ] Har page ka **Claim check** follow kiya
- [ ] `[ACTIVATION_TIME]` real hai, aur har page pe likha hai
- [ ] OTO5: training record + Admin > Resources me upload (`example.com` rows replace)
- [ ] OTO7: sales kit + reseller terms + delivery process ready
- [ ] OTO10: setup call / live sessions / community / support SLA ready
- [ ] Downsell plans bane (Part 5) ya downsell skip kiye
- [ ] Saare `[BRACKETS]` replace
- [ ] Testimonials real hain ya block hata diya
- [ ] Disclaimer + Terms / Privacy / Refund / Support links
- [ ] `noindex` har page pe
- [ ] Provider-name sweep clean
- [ ] Mobile QA (hero, YES, FAQ, NO link)
- [ ] Test purchase + fulfilment test
- [ ] Vision model production env me set hai (OTO1 ka Vision claim)

---

# PART 8 — Ye prompt kisi AI ko paste karo

```
Build the ArgonMax OTO funnel pages from docs/sales/04-OTO-PAGES-GUIDE.md.

Scope: 10 OTO pages + 10 downsell pages + thanks.html, as static HTML in Argonlanding/oto/.

Rules:
- Reuse ../styles.css, ../assets/fonts and the head/markup patterns from Argonlanding/index.html.
  Do NOT modify styles.css or script.js.
- Do NOT include script.js on OTO pages. Create oto-config.js, oto.css and oto.js as described in Part 6.
- Follow the 16-block blueprint (Part 2) for OTO pages and the 8-block layout for downsell pages.
- Use ONLY the copy and facts from Part 4. Respect every "Claim check" table.
  Do not invent prices, features, numbers or income claims.
- No underlying model/provider names anywhere (text, alt, meta, file names).
- Every page: noindex, one price, one YES button (repeated), one NO link, legal footer.
- Leave [BRACKETS] as visible TODOs. Do not fill them with guesses.
- Skip the downsell pages marked "Skip" in Part 5 and link "No" to the next OTO instead.
- Work in order: build oto1.html first, stop for my review, then continue 2 -> 10 one by one.
```

---

**End.** Kuch bhi page ka copy badalna ho ya kisi OTO ko pehle build karwana ho, to bol dena.
