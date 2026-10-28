<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 글쓰기 규칙

PR, 이슈, 커밋 메시지, 일감 댓글, 리뷰 코멘트, 코드 주석, 문서 등에 전부 적용한다.

## 공통

- 간결하고 명확하게 쓴다. 장황한 배경 설명, 부연, 같은 말 반복을 넣지 않는다.
- 반드시 필요한 게 아니면 쓰지 않는다. 섹션, 문장, 주석 전부 마찬가지다.
- 한 문장에 절을 세 개 이상 잇지 않는다. 한 문단에는 요지 하나만 담는다.

## 문장부호

- 가운뎃점(·)을 쓰지 않는다. 쉼표나 "와/과", "이나"로 나열한다.
- 줄표(—, –, ㅡ)를 쓰지 않는다. 괄호에 넣거나 문장을 나눈다.
- 한글 합성어 하이픈("테스트-주도")을 쓰지 않는다. 코드나 영문 고유 표기는 예외다.
- 강조용 볼드나 따옴표를 쓰지 않는다. 인용 대사의 큰따옴표와 코드 백틱만 쓴다.
- 화살표는 `->`만 쓴다. →, ⇒ 같은 특수문자 화살표는 쓰지 않는다.
- 한 문장에 쉼표가 두 개를 넘으면 문장을 끊는다.

## 이슈 등록, 의견 제시

- 이슈를 등록하거나 의견을 낼 때(리뷰 코멘트, 개선 제안, 일감 댓글 포함) As-is와 To-be를 항상 같이 쓴다. 읽는 사람이 목표를 바로 알 수 있어야 한다.
  - As-is: 지금 어떻게 동작하는지 (재현 조건, 실제 결과)
  - To-be: 어떻게 되어야 하는지 (기대 결과, 완료 기준)
- 근거는 이슈 번호, 커밋, 문서 링크로 단다.

## PR, 커밋 메시지

- 무엇을 왜 바꿨는지만 쓴다. diff를 보면 알 수 있는 파일별 변경 목록은 옮겨 적지 않는다.

## 코드 주석

- 코드만 봐서는 알 수 없는 것(이유, 제약, 우회한 버그)만 쓴다. 코드가 하는 일을 다시 설명하지 않는다.
- 짧게 쓴다. 길어지면 이슈나 PR 링크로 대신한다.

# 프로젝트 규칙

웹토이를 빠르게 만들기 위한 보일러플레이트다.

## 구조

- `src/config/site.ts`: 서비스 이름, 설명, 테마 색. 새 웹토이는 이 파일부터 채운다.
- `src/app`: 라우트. 결과 페이지 예시는 `src/app/result/[id]`에 있다.
- `src/components/ui`: shadcn/ui 컴포넌트.
- `src/components`: 여러 페이지에서 쓰는 컴포넌트.
- `src/lib`: 공용 유틸.
  - `env.ts`, `env.server.ts`: 환경변수 검증
  - `metadata.ts`, `og.tsx`: 페이지 메타데이터와 OG 이미지
  - `share.ts`, `kakao.ts`, `in-app-browser.ts`: 공유와 인앱 브라우저 대응
  - `analytics.ts`: 이벤트 추적
- `src/lib/supabase`: Supabase 클라이언트.
- `supabase/`: Supabase CLI 설정과 마이그레이션.

## 코드 작성

- 기본은 Server Component다. 상태나 브라우저 API가 필요할 때만 `"use client"`를 붙이고 그 범위를 작게 둔다.
- 새 UI가 필요하면 직접 만들기 전에 `npx shadcn@latest add <name>`으로 가져온다.
- Supabase 클라이언트는 쓰는 곳에 맞춰 고른다.
  - Client Component: `@/lib/supabase/client`
  - Server Component, Route Handler, Server Action: `@/lib/supabase/server`
  - RLS를 우회해야 하는 서버 작업: `@/lib/supabase/admin`
- 테이블을 바꾸면 `npx supabase migration new <name>`으로 마이그레이션을 만들고 `npm run db:types`로 타입을 다시 만든다.
- `process.env`를 직접 읽지 않는다. `env.ts`(공개 값)나 `env.server.ts`(서버 전용 값) 스키마에 추가하고 `.env.example`에도 적는다.
- 페이지 메타데이터는 `createMetadata()`로 만든다. 공유 썸네일이 필요한 페이지에는 `opengraph-image.tsx`를 두고 `renderOgImage()`를 쓴다.
- 새 이벤트는 `analytics.ts`의 `AnalyticsEvents` 타입에 먼저 추가하고 `track()`으로 보낸다.
- UI는 모바일 우선으로 만든다. 높이는 `vh` 대신 `dvh`를 쓰고, 하단 고정 버튼에는 `pb-safe`를 붙인다.
- UI 문구는 한국어로 쓴다.

## 완료 전 확인

- `npm run check`(lint, format:check, typecheck)를 통과해야 한다.
- 라우트나 메타데이터를 바꿨으면 `npm run build`도 돌린다.
