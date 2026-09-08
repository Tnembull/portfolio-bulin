# Security Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely eliminate client-side PIN exposure, implement signed HTTP-Only session authentication, enforce server-side route protection via Next.js middleware, secure file upload APIs, and route database modifications through authenticated server endpoints.

**Architecture:**
- Web Crypto API / Node `crypto` based HMAC-SHA256 session token generation and verification (`src/lib/auth.ts`) compatible with both Edge runtime (middleware) and Node.js runtime.
- Server-side auth endpoints: `POST /api/admin/auth` (login/logout) setting `httpOnly: true, secure: true, sameSite: "strict"` cookie.
- Server-side save endpoint: `POST /api/admin/save` verifying the session before persisting state to Supabase.
- Next.js `middleware.ts`: Intercepts `/admin/:path*` and redirects unauthorized traffic to `/login`.
- Remove hardcoded PINs in `src/lib/supabase.ts` and set `ADMIN_MASTER_PIN` & `SESSION_SECRET` in `.env.local`.
- Secure `upload/route.ts` and `presign/route.ts` with the cryptographic session verifier.
- Harden `next.config.ts` with HSTS headers.

**Tech Stack:** Next.js 15 (App Router & Edge Middleware), Web Crypto API (`crypto.subtle`), TypeScript, Supabase.

---

### Task 1: Create Cryptographic Session Utility (`src/lib/auth.ts`)

**Files:**
- Create: `src/lib/auth.ts`

**Interfaces:**
- Produces: `signSessionToken(payload: object): Promise<string>`, `verifySessionToken(token: string): Promise<boolean>`

- [ ] **Step 1: Create `src/lib/auth.ts`**
  - Implement tamper-proof session token signing using Web Crypto API (`crypto.subtle.sign("HMAC", ...)`).
  - Use `process.env.SESSION_SECRET` (with a strong fallback for dev environment).
  - Include token expiry timestamp (e.g., 24 hours).
  - Implement `verifySessionToken` validating signature and expiration.

- [ ] **Step 2: Commit**
  ```bash
  git add src/lib/auth.ts
  git commit -m "feat(security): add WebCrypto HMAC session token generator and verifier"
  ```

---

### Task 2: Implement Secure Server Auth & Save API Routes

**Files:**
- Create: `src/app/api/admin/auth/route.ts`
- Create: `src/app/api/admin/save/route.ts`
- Modify: `.env.local`

**Interfaces:**
- Consumes: `signSessionToken`, `verifySessionToken` from `@/lib/auth`

- [ ] **Step 1: Update `.env.local`**
  - Add `ADMIN_MASTER_PIN=@Dikidiki224`
  - Add `SESSION_SECRET=mna_devops_portfolio_super_secure_vault_key_2026`

- [ ] **Step 2: Create `src/app/api/admin/auth/route.ts`**
  - `POST`: Validates `pin` against `process.env.ADMIN_MASTER_PIN` in constant time.
  - On success: signs session token and attaches it to an `httpOnly`, `secure`, `sameSite="strict"` cookie named `admin_session`.
  - `DELETE`: Clears the `admin_session` cookie for logout.

- [ ] **Step 3: Create `src/app/api/admin/save/route.ts`**
  - `POST`: Validates `admin_session` cookie with `verifySessionToken`. If invalid, returns 401.
  - On valid session: executes Supabase upsert from server.

- [ ] **Step 4: Commit**
  ```bash
  git add src/app/api/admin/auth/route.ts src/app/api/admin/save/route.ts .env.local
  git commit -m "feat(security): add server-side admin authentication and save endpoints"
  ```

---

### Task 3: Enforce Server-side Protection in Middleware & Upload APIs

**Files:**
- Modify: `src/middleware.ts`
- Modify: `src/app/api/upload/route.ts`
- Modify: `src/app/api/presign/route.ts`

- [ ] **Step 1: Update `src/middleware.ts`**
  - Check for `admin_session` cookie on `/admin/:path*`.
  - Verify signature with `verifySessionToken`.
  - If invalid or missing, redirect to `/login`.
  - If valid and visiting `/login`, redirect to `/admin`.

- [ ] **Step 2: Update `src/app/api/upload/route.ts` & `src/app/api/presign/route.ts`**
  - Replace naive `porto_admin_auth === "true"` with `verifySessionToken(admin_session)`.
  - Reject unauthorized uploads with 401.

- [ ] **Step 3: Commit**
  ```bash
  git add src/middleware.ts src/app/api/upload/route.ts src/app/api/presign/route.ts
  git commit -m "feat(security): enforce cryptographic session verification in middleware and upload APIs"
  ```

---

### Task 4: Remove Hardcoded PINs & Update Frontend Admin Pages

**Files:**
- Modify: `src/lib/supabase.ts`
- Modify: `src/app/admin/page.tsx`
- Modify: `src/app/login/page.tsx`
- Modify: `src/context/PortfolioContext.tsx`

- [ ] **Step 1: Sanitize `src/lib/supabase.ts`**
  - Delete `defaultFallbackPins = ["@Dikidiki224", ...]` completely from client code.
  - Remove direct client PIN checking.

- [ ] **Step 2: Update `src/app/login/page.tsx` & `src/app/admin/page.tsx`**
  - Connect login forms to `POST /api/admin/auth`.
  - Connect `saveEntirePortfolio` in `PortfolioContext` to `POST /api/admin/save`.
  - Update logout handler to call `DELETE /api/admin/auth`.

- [ ] **Step 3: Commit**
  ```bash
  git add src/lib/supabase.ts src/app/admin/page.tsx src/app/login/page.tsx src/context/PortfolioContext.tsx
  git commit -m "refactor(security): remove client-side fallback PINs and connect to server auth API"
  ```

---

### Task 5: Add Security Headers & Production Build Verification

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add HSTS in `next.config.ts`**
  - Add `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.

- [ ] **Step 2: Run verification tests**
  - Run `npx tsc --noEmit`
  - Run `npm run build` with `BypassSandbox: true`

- [ ] **Step 3: Commit**
  ```bash
  git add next.config.ts
  git commit -m "feat(security): add HSTS and strict transport security headers"
  ```
