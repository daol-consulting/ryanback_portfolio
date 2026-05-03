---
omd: 0.1
brand: 3D_Portfolio_White_Minimal
---

# Design System (oh-my-design)

이 문서는 프로젝트 루트의 **권위 있는 디자인 규칙**입니다.
UI/styling/microcopy/motion을 수정할 때 항상 이 문서를 우선합니다.

## 1. Visual Theme & Atmosphere
- 화이트 캔버스 기반의 **클린 미니멀** 톤
- 포인트 컬러는 `#10367D`만 사용해 “핵심만 강조”
- 과한 배경 패턴/강한 그라데이션/무거운 그림자는 지양
- 3D(캔버스/hero 3D)는 첫 화면에서 제거하고, 텍스트/카드로 랜딩 완성

## 2. Color Palette & Roles
### Primary Surfaces
- Background / Canvas: `#ffffff`
- Section alternate surface (light): `#f4f8ff`
- Card surface: `#ffffff`

### Text
- Primary text: `#1e293b` (Tailwind `text-white-100` in current config)
- Secondary text: `#64748b` (Tailwind `text-secondary`)

### Accent
- Brand point / links / focus: `#10367D`

### Borders & Chips
- Border line: `#dbe7ff`
- Soft tinted surface for chips: `#f0f6ff`

### Status / Utility (optional)
- Focus ring: `rgba(16,54,125,0.35)`(접근성 고려)

## 3. Typography Rules
- 디스플레이/섹션 타이틀은 “크게 + 굵게”
- 섹션 서브 라벨은 **짧고 대문자** 스타일: `#10367D`, tracking 넓게
- 본문은 읽기 쉬운 `text-secondary` 계열
- 문구는 과장(느낌표)과 이모지 남발을 피하고, 문장형으로 정리

## 4. Component Stylings
### Section Heading
- Sub-label: `#10367D`, uppercase, 작은 크기, 넓은 tracking
- Title: `#10367D` 또는 near-black 계열(대제목은 `#10367D` 선호)
- 섹션 구분은 얇은 `section-divider`를 사용

### Cards (Content Cards)
- Background: `#ffffff`
- Border: `#dbe7ff` 1px
- Shadow: 매우 얕게(카드가 “떠 보이기”보다 “구분되기” 목적)
- Hover: 그림자/보더 강도만 소폭 증가

### Tag Chips
- Background: `#f0f6ff`
- Border: `#dbe7ff`
- Text: `#10367D`
- 칩은 컴포넌트 내에서 일관된 패딩/반경 유지

### Primary CTA Button
- Background: `#10367D`
- Text: `#ffffff`
- Radius: 12~16px 범위(현재 UI 스타일 유지)
- Hover: opacity 감소 또는 밝기 변화(과한 애니메이션 금지)

### Secondary CTA Button
- Background: `#ffffff`
- Border: `#dbe7ff` 또는 `#10367D` 기반
- Text: `#10367D`

## 5. Layout Principles
- 큰 레이아웃 변화보다 “간격/정렬/위계”로 깔끔함을 만든다
- 섹션 폭은 `max-w-7xl` 중심
- 카드/그리드는 항상 동일한 간격 단위 사용

## 6. Depth & Elevation
- “그림자=경계”로 쓰고, 레이어를 과하게 늘리지 않는다
- radius는 일관되게(카드 16px 내외, 칩 8~9999px 범위)

## 7. Do's and Don'ts
Do:
- `#10367D`는 링크/버튼/타이포 포인트에만 제한
- 카드/입력/칩은 항상 화이트+보더 스타일로 통일
- 마이크로카피는 짧고 자신감 있게

Don't:
- 다크 배경(`bg-black-*`) 또는 `text-white-100` 중심 폴백을 사용하지 않는다
- 배경 패턴을 과도하게 사용하지 않는다
- 강한 bounce/spring 과장 동작을 지양

## 8. Responsive Behavior
- 모바일은 1열, 데스크탑은 2~3열 카드 그리드를 사용
- CTA 버튼은 줄바꿈 대응

## 9. Agent Prompt Guide (규칙 적용)
- 수정 요청을 받으면 먼저 DESIGN.md의 토큰/규칙과 충돌하는 클래스부터 제거한다
- “남아있는 어두운 스타일”은 반드시 라이트 톤으로 교체한다

## 10. Voice & Tone
- 전문적이고 간결한 문장
- 느낌표/과도한 감탄 표현 금지
- 이모지는 기본 금지(필요 시 사용자 요청이 있을 때만 예외)

## 11. Brand Narrative
- “깔끔함과 신뢰를 빠르게 전달하는 포트폴리오”
- 데이터/생산성/성능을 강조하는 개발자 톤

## 12. Principles
1. 포인트 컬러는 `#10367D` 단일 규칙
2. 라이트 톤은 화이트+보더+미세 섀도우만 사용
3. 위계는 크기/간격/라인으로 결정(색만으로 위계를 만들지 않기)

## 13. Personas
- 채용 담당/엔지니어: 빠르게 정보를 스캔하고, 신뢰 신호를 본다
- 프로젝트 리뷰어: UI 품질과 일관성을 즉시 파악한다

## 14. States
- Loading: 소프트한 스피너/로더(강한 애니메이션 금지)
- Empty: 간결한 안내 문구 + 약한 CTA
- Error: 문제 원인을 숨기지 않고, 한 문장으로 안내

## 15. Motion & Easing
- 과장 없는 슬라이드/페이드 사용
- hover는 opacity/그림자만 소폭
- reduce motion 환경에서는 애니메이션을 최소화

