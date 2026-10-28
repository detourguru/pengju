# 팽주 (Pengju) 🍵

나만의 찻자리 메이트 & 탕수 타이머, 테이스팅 로그 서비스입니다.

- **실시간 탕수 타이머**: 차 종류별 맞춤 탕수 시간 카운트다운과 부드러운 알림
- **찻자리 & 다구 아카이빙**: 오늘 마신 차(소청감, 백차, 홍차 등)와 다구(개완, 차호, 찻잔) 기록
- **수색 & 테이스팅 노트**: 탕수별 수색 변화와 감성적인 찻자리 카드 생성

## 스택

- Next.js 16 (App Router, TypeScript, `src/` 디렉토리)
- Tailwind CSS v4, shadcn/ui 스타일 컴포넌트 (`src/components/ui/`)
- Supabase (`src/lib/supabase/`, `supabase/`)
- Capacitor (iOS/Android 네이티브 앱 빌드)
- Vercel Analytics
- Pretendard 한글 폰트

## 포함된 구성

| 경로                                                | 내용                                                   |
| --------------------------------------------------- | ------------------------------------------------------ |
| `src/config/site.ts`                                | 서비스 이름, 설명, 테마 색                             |
| `src/app/opengraph-image.tsx`                       | 기본 OG 이미지                                         |
| `src/app/result/[id]/`                              | 결과 페이지 예시 (결과별 메타데이터와 OG 이미지, 공유) |
| `src/components/share-buttons.tsx`                  | 카카오톡 공유, 링크 복사, Web Share API                |
| `src/lib/in-app-browser.ts`                         | 인앱 브라우저 감지와 외부 브라우저로 열기              |
| `src/lib/analytics.ts`                              | 타입이 있는 Vercel Analytics 이벤트                    |
| `src/lib/env.ts`, `src/lib/env.server.ts`           | 환경변수 검증                                          |
| `src/lib/supabase/`                                 | client, server, admin 클라이언트와 세션 갱신 헬퍼      |
| `src/app/not-found.tsx`, `error.tsx`, `loading.tsx` | 404, 에러, 로딩 화면                                   |
| `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`    | 검색엔진과 웹 앱 메타 파일                             |
| `.github/`                                          | CI(lint, format, typecheck, build)와 Dependabot        |

## 시작하기

```bash
npm install
cp .env.example .env.local
npm run dev
```

새 프로젝트로 클론해서 시작할 때는 [SETUP.md](SETUP.md)를 따른다.

## 스크립트

| 명령어                 | 설명                                         |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | 개발 서버                                    |
| `npm run build`        | 프로덕션 빌드                                |
| `npm run check`        | lint, format:check, typecheck를 한 번에 실행 |
| `npm run lint`         | ESLint 검사                                  |
| `npm run lint:fix`     | ESLint 자동 수정                             |
| `npm run format`       | Prettier 전체 포맷                           |
| `npm run format:check` | 포맷 확인만                                  |
| `npm run typecheck`    | 라우트 타입 생성 후 TypeScript 검사          |
| `npm run db:types`     | 연결된 Supabase 프로젝트에서 DB 타입 생성    |

## clone 후 진행할 것

- [ ] `src/config/site.ts`의 이름, 설명, 테마 색 바꾸기
- [ ] `src/app/result/[id]/results.ts` 예시 데이터를 실제 결과로 바꾸거나 예시 페이지 지우기
- [ ] Supabase를 쓴다면
  - [ ] 프로젝트를 만들고 `.env.local`에 URL과 키 채우기
  - [ ] `supabase/config.toml`의 `project_id`를 프로젝트 이름으로 바꾸기
  - [ ] `npx supabase login`과 `npx supabase link --project-ref <ref>` 후 `npm run db:types`
  - [ ] 로그인을 붙인다면 `src/proxy.ts`를 만들고 `proxy()`에서 `src/lib/supabase/proxy.ts`의 `updateSession()`을 호출하기
- [ ] 카카오톡 공유를 쓴다면 Kakao Developers 앱의 JavaScript 키를 `NEXT_PUBLIC_KAKAO_JS_KEY`에 넣고 사이트 도메인 등록하기
- [ ] Vercel 프로젝트 연결, 환경변수 등록, 배포 (`NEXT_PUBLIC_SITE_URL`을 비워두면 Vercel 프로덕션 도메인을 쓴다)
- [ ] GitHub 저장소 설정에서 Dependabot alerts와 security updates 켜기

## 참고

- Vercel Analytics 커스텀 이벤트(`track()`)는 Pro 이상 플랜에서만 집계된다.
- OG 이미지 폰트는 용량 제한 때문에 Pretendard KS X 1001 서브셋을 쓴다. 서브셋에 없는 드문 한글 음절은 빈 칸으로 나온다.
