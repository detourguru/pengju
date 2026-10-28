# 팽주 (Pengju) MVP 기능 정의서

사르딘(Sardine) 빈티지 틴캔 감성의 인터랙티브 찻자리 타이머와 테이스팅 아카이브 서비스.

## 1. 프로젝트 개요

- 서비스명: 팽주 (Pengju)
- 컨셉: 고리타분한 동양풍 다도를 탈피한 키치하고 감각적인 유럽 빈티지 사르딘 틴캔(Sardine Tin) 스타일의 찻자리 기록 웹/앱
- 타겟: 차를 일상적으로 즐기며 다구와 수색, 찻자리의 무드를 기록하고 공유하고 싶은 현대인
- 기술 스택: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Zustand, HTML5 Canvas API, Capacitor (iOS/Android 네이티브 빌드)
- 아키텍처 원칙: Local-First (IndexedDB / LocalStorage 기반, 회원가입 없이 즉시 사용)

## 2. 핵심 사용자 흐름 (User Journey)

1. 홈 화면 (내 찻잔 보관함과 차 세팅)
2. 탕수별 실시간 타이머 (브루잉 카운트다운)
3. 탕수별 수색 촬영과 컬러 자동 추출
4. 찻자리 완료 (맛 태그 선택과 차 일기 한두 줄 작성)
5. 사르딘 틴캔 라벨 렌더링과 인스타 스토리 공유
6. 내 틴캔 팬트리(선반) 아카이빙과 맛 태그 기반 다른 차 탐색

## 3. 화면별 세부 기능 명세

### 화면 1: 홈 (내 다구장과 찻자리 시작)
- 내 찻잔 보관함 (Cup Shelf)
  - 등록된 잔 목록을 가로 캐러셀 카드로 노출 (사진, 잔 이름, 추출된 고유 컬러칩)
  - 오늘 쓸 잔 선택 시 해당 잔의 고유 색상이 앱의 다이내믹 악센트 컬러로 적용
  - 신규 잔 등록: 잔 사진 촬영/업로드 -> Canvas 기반 대표 색상 3~4개 자동 추출 -> 색상 선택 -> 잔 이름(예: 멋장이 보라색 잔) 입력 후 저장
- 오늘 마실 차 입력
  - 차 종류 선택: 백차, 녹차, 홍차, 보이차, 우롱차, 허브티 (선택 시 기본 권장 온도와 1탕 시간 자동 추천)
  - 찻잎 이름 직접 입력 (예: 소청감 백차, 무인양품 유자 얼그레이)
- [찻자리 시작] 버튼 클릭 시 타이머 화면으로 진입

### 화면 2: 탕수 타이머와 수색 기록
- 타이머 게이지
  - 원형 프로그레스 게이지로 남은 시간 시각화
  - 1탕 종료 시 맑은 풍경/싱잉볼 알림음 재생
  - Web Worker 기반 타이머 구현 (화면 꺼짐이나 백그라운드 탭에서도 멈춤 방지)
- 탕수별 수색 컬러 추출 (카메라 연동)
  - 탕 완료 후 찻잔에 담긴 찻물 사진 촬영 또는 사진 업로드
  - Canvas 스포이드 알고리즘으로 찻물 중심부의 대표 수색(Hex 코드) 자동 추출
  - 각 탕수별 수색 데이터 축적 (1탕, 2탕, 3탕...)
- 다음 탕수 연결
  - 자동으로 이전 시간 + 5초를 기본값으로 제안
  - 플러스, 마이너스 버튼으로 5초 단위 미세 조절
- [찻자리 종료] 버튼

### 화면 3: 찻자리 마무리
- 맛 태그 선택
  - 칩 형태의 빠른 태그 선택 (#달콤함, #시트러스, #은은한꽃향, #구수함, #쌉싸름함, #청량함 등)
- 오늘의 차 일기 입력
  - 1~2줄 내외의 짧고 담백한 텍스트 입력창
- 오늘 들은 BGM 입력 (선택)
  - 오늘의 음악 한 줄 메모 (예: Hampton Hawes Trio)

### 화면 4: 사르딘 틴캔 라벨과 공유
- 사르딘 틴캔(Sardine Tin) 형태의 9:16 인스타 스토리 카드 렌더링
  - 둥근 사각 틴캔 프레임과 상단 풀탭(Pull-tab) 메탈 그래픽 디테일
  - 선택한 찻잔과 찻잎 이름, 날짜, 시간
  - 탕수별 실제 추출된 수색 컬러 스와치 바 (1탕부터 N탕까지의 실제 그라데이션)
  - 맛 태그와 팽주의 차 일기 2줄
- [인스타 스토리로 저장] 버튼: Canvas API로 고화질 이미지 생성 후 다운로드 또는 Web Share API 호출

### 화면 5: 맛 태그 기반 차 탐색 (Discovery)
- 맛 태그(#시트러스 등) 클릭 시 동일한 맛 태그를 가진 다른 차들의 목록 표시
- 다른 찻자리의 수색 스펙트럼과 팽주 코멘트 큐레이션 노출

## 4. 데이터 모델 (TypeScript Type)

```typescript
export type TeaType = 'white' | 'green' | 'black' | 'puer' | 'oolong' | 'herbal';

export interface Teacup {
  id: string;
  name: string; // 예: 멋장이 보라색 잔
  imageUrl: string;
  dominantColor: string; // Hex (예: #8E7C93)
  createdAt: string;
}

export interface InfusionLog {
  infusionNumber: number; // 1탕, 2탕...
  durationSeconds: number; // 추출 시간
  liquorColor: string; // 추출된 수색 Hex (예: #E8B86D)
  photoUrl?: string;
}

export interface TeaSession {
  id: string;
  date: string;
  time: string;
  teaName: string; // 예: 소청감 백차
  teaType: TeaType;
  teacup: Teacup;
  infusions: InfusionLog[];
  tasteTags: string[];
  diaryNote: string; // 1~2줄 차 일기
  bgm?: string;
  createdAt: string;
}
```
