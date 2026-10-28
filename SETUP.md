# 초기 세팅 가이드

이 보일러플레이트로 새 프로젝트를 시작할 때의 순서다. 예시 이름은 `my-app`.

## 1. 클론하고 git 새로 시작

```bash
git clone https://github.com/detourguru/boilerplate.git my-app
cd my-app
rm -rf .git        # PowerShell: Remove-Item -Recurse -Force .git
git init -b main
```

`.git`을 지우지 않으면 `origin`이 보일러플레이트 저장소를 가리킨다. 그 상태로 push하면 보일러플레이트에 올라간다.

보일러플레이트 저장소의 Settings에서 Template repository를 켜 두면 GitHub의 Use this template 버튼으로 새 저장소를 바로 만들 수 있다. 이 경우 1번 대신 새 저장소를 클론하고 4번은 건너뛴다.

## 2. 설치하고 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

http://localhost:3000 이 열리면 된다. Supabase 키가 비어 있어도 첫 화면은 뜬다. Node는 22 버전을 쓴다(`.nvmrc`).

## 3. 이름 바꾸기

| 파일                     | 바꿀 값                             |
| ------------------------ | ----------------------------------- |
| `package.json`           | `name`                              |
| `src/config/site.ts`     | `name`, `description`, `themeColor` |
| `supabase/config.toml`   | `project_id`                        |
| `README.md`, `AGENTS.md` | 맨 위 프로젝트 소개                 |

## 4. GitHub에 올리기

GitHub에서 빈 저장소를 만든다(README나 .gitignore 추가 안 함). 그다음 아래를 실행한다.

```bash
git add .
git commit -m "보일러플레이트로 프로젝트 시작"
git remote add origin https://github.com/<계정>/my-app.git
git push -u origin main
```

`.env.local`은 `.gitignore`에 들어 있어서 올라가지 않는다.

## 5. Supabase 연결

1. supabase.com에서 새 프로젝트를 만든다.
2. 대시보드에서 프로젝트 URL과 API 키를 복사해 `.env.local`에 넣는다.
   - `NEXT_PUBLIC_SUPABASE_URL`: 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon 키(새 대시보드에서는 publishable 키)
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role 키(새 대시보드에서는 secret 키). 서버 전용이라 `NEXT_PUBLIC_`을 붙이면 안 된다.
3. CLI로 연결한다. `<ref>`는 대시보드 주소 `supabase.com/dashboard/project/<ref>`에 있는 값이다.

   ```bash
   npx supabase login
   npx supabase link --project-ref <ref>
   ```

4. 테이블은 마이그레이션 파일로 만든다.

   ```bash
   npx supabase migration new init   # supabase/migrations/에 빈 SQL 파일 생성
   # 생성된 파일에 create table 등 SQL 작성
   npx supabase db push              # 원격 DB에 적용
   npm run db:types                  # src/types/database.types.ts 갱신
   ```

로그인을 붙일 때는 README의 `src/proxy.ts` 항목을 따른다.

## 6. Vercel 배포

1. vercel.com에서 Add New -> Project로 GitHub 저장소를 가져온다.
2. Environment Variables에 `.env.local`의 값을 넣는다. `NEXT_PUBLIC_SITE_URL`은 비워두면 Vercel 도메인을 쓴다.
3. Deploy를 누른다. 이후 `main`에 push할 때마다 자동으로 배포된다.
4. Supabase Auth를 쓰면 Supabase의 Authentication -> URL Configuration에 배포 도메인을 등록한다.

## 7. 환경변수를 새로 추가할 때

코드에서 `process.env`를 직접 읽지 않는다.

1. `.env.example`에 이름만 적는다.
2. 서버 전용 값은 `src/lib/env.server.ts`, `NEXT_PUBLIC_` 값은 `src/lib/env.ts`의 스키마에 추가한다.
3. `.env.local`과 Vercel에 실제 값을 넣는다.
4. 코드에서는 `serverEnv.SUPABASE_SERVICE_ROLE_KEY`처럼 읽는다.

## 8. 확인

```bash
npm run check   # lint, format, typecheck
npm run build
```

## 체크리스트

- [ ] 클론하고 `.git` 지운 뒤 `git init -b main`
- [ ] `npm install`, `.env.local` 만들기, `npm run dev` 확인
- [ ] 이름 바꾸기 (`package.json`, `site.ts`, `config.toml`, README, AGENTS.md)
- [ ] GitHub 저장소 만들고 push
- [ ] GitHub 저장소 설정에서 Dependabot alerts와 security updates 켜기
- [ ] Supabase 프로젝트 만들고 키 넣고 `link`
- [ ] Vercel 연결하고 환경변수 등록
- [ ] (선택) 카카오 공유: `NEXT_PUBLIC_KAKAO_JS_KEY`를 넣고 Kakao Developers에 도메인 등록
- [ ] 예시 결과 페이지(`src/app/result/[id]`) 정리
- [ ] `npm run check`, `npm run build` 통과
