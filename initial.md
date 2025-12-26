오늘 만들 프로젝트 : 우리동네 날씨 실시간 파악 & 미세먼지 알림판

## 📋 프로젝트 개요
- **목적**: 사용자의 현재 위치 기반으로 실시간 날씨와 미세먼지 정보를 한눈에 보여주는 웹 대시보드
- **타겟**: MVP (Minimum Viable Product) - 핵심 기능만 빠르게 구현
- **특징**: 별도 앱 설치 없이 브라우저에서 바로 사용 가능

---

## 🛠️ 필요한 것들

### 1. API 목록 (무료 & 쉬운 구현)

#### 📍 위치 정보 API
- **HTML5 Geolocation API** (브라우저 기본 제공)
  - 비용: 무료
  - 특징: 별도 가입 불필요, 브라우저 내장
  - 사용법: `navigator.geolocation.getCurrentPosition()`
  - 주의: HTTPS 환경에서만 작동
  - 참고: [MDN Geolocation API 문서](https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)

#### ☀️ 날씨 정보 API (2가지 옵션)

**옵션 1: OpenWeatherMap API** (추천 - 가장 쉬움)
- 비용: 무료 (60 calls/분, 1,000,000 calls/월)
- 가입: https://openweathermap.org
- 장점:
  - 가장 간단한 사용법
  - 한국어 지원
  - 좌표 기반 조회 가능
  - JSON 형식으로 응답
- API 호출 예시:
  ```
  https://api.openweathermap.org/data/2.5/weather?lat={위도}&lon={경도}&appid={API_KEY}&units=metric&lang=kr
  ```
- 제공 정보: 현재 날씨, 온도, 습도, 풍속, 날씨 아이콘
- 한계: 무료 플랜에서는 미세먼지 데이터 제공 안 함

**옵션 2: 기상청 단기예보 API** (공공데이터)
- 비용: 무료
- 가입: https://www.data.go.kr
- 제공 정보: 기온, 강수확률, 습도, 풍향/풍속
- API 문서: https://www.data.go.kr/data/15084084/openapi.do
- 특징:
  - 한국 지역 정확도 높음
  - 5km x 5km 격자 단위
  - 읍/면/동 단위 상세 정보
- 단점: 좌표를 격자 좌표로 변환 필요 (약간 복잡)

#### 💨 미세먼지 정보 API

**한국환경공단 에어코리아 API** (필수)
- 비용: 무료 (개발계정 500 트래픽/일)
- 가입: https://www.data.go.kr/data/15073861/openapi.do
- 제공 정보:
  - 미세먼지(PM10) 농도
  - 초미세먼지(PM2.5) 농도
  - 통합대기환경지수
  - 측정소별 실시간 데이터
  - 대기질 예보
- API 기능:
  - 측정소별 실시간 측정정보 조회
  - 시도별 실시간 측정정보 조회
  - 대기질 예보통보 조회
  - 통합대기환경지수 조회

---

## 💻 기술 스택 (MVP 추천)

### 프론트엔드
```
- HTML5 (Geolocation API 사용)
- CSS3 (반응형 디자인)
- Vanilla JavaScript (프레임워크 없이 간단하게)
```

### 개발 도구
```
- VS Code (또는 원하는 에디터)
- Live Server (로컬 테스트용)
```

### 배포 (선택사항)
```
- GitHub Pages (무료, HTTPS 지원)
- Vercel (무료, 간단한 배포)
- Netlify (무료, HTTPS 지원)
```

---

## 🚀 MVP 구현 단계

### 1단계: 기본 설정
- [ ] 프로젝트 폴더 생성
- [ ] index.html, style.css, script.js 파일 생성
- [ ] 필요한 API 키 발급
  - OpenWeatherMap API 키
  - 공공데이터포털 API 키 (에어코리아)

### 2단계: 위치 정보 가져오기
- [ ] HTML5 Geolocation API로 사용자 위치 확인
- [ ] 위도/경도 데이터 저장
- [ ] 위치 권한 요청 UI 구현

### 3단계: 날씨 정보 표시
- [ ] OpenWeatherMap API 호출
- [ ] 날씨 데이터 파싱 (온도, 날씨 상태, 아이콘)
- [ ] 화면에 날씨 정보 표시

### 4단계: 미세먼지 정보 표시
- [ ] 에어코리아 API 호출
- [ ] 가까운 측정소 찾기
- [ ] 미세먼지/초미세먼지 농도 표시
- [ ] 대기질 등급 표시 (좋음/보통/나쁨/매우나쁨)

### 5단계: UI/UX 개선
- [ ] 반응형 디자인 적용
- [ ] 로딩 상태 표시
- [ ] 에러 처리 (위치 거부, API 오류 등)
- [ ] 새로고침 버튼 추가

### 6단계: 배포
- [ ] GitHub 저장소 생성
- [ ] GitHub Pages 또는 Vercel로 배포
- [ ] HTTPS 확인 (Geolocation API 작동 필수)

---

## 📦 필요한 API 키 발급 방법

### 1. OpenWeatherMap
1. https://openweathermap.org 접속
2. 회원가입 (Sign Up)
3. API Keys 메뉴에서 키 확인
4. 발급 후 2-3시간 후 활성화됨

### 2. 공공데이터포털 (에어코리아)
1. https://www.data.go.kr 접속
2. 회원가입
3. "에어코리아" 검색
4. "한국환경공단_에어코리아_대기오염정보" 활용신청
5. 승인 후 (1-2일 소요) 마이페이지에서 일반 인증키(Encoding) 확인

---

## ⚠️ 주의사항

1. **HTTPS 필수**: Geolocation API는 보안 컨텍스트(HTTPS 또는 localhost)에서만 작동
2. **API 키 보안**: API 키를 GitHub에 직접 올리지 말 것 (.env 파일 사용 권장)
3. **트래픽 제한**:
   - OpenWeatherMap: 60 calls/분
   - 에어코리아: 개발계정 500 calls/일
4. **좌표 변환**: 기상청 API 사용 시 위경도를 격자 좌표로 변환 필요
5. **브라우저 호환성**: 최신 브라우저 사용 권장

---

## 📚 참고 자료

### API 문서
- [기상청 단기예보 API](https://www.data.go.kr/data/15084084/openapi.do)
- [에어코리아 대기오염정보 API](https://www.data.go.kr/data/15073861/openapi.do)
- [OpenWeatherMap API 문서](https://openweathermap.org/current)
- [MDN Geolocation API](https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)

### 공공데이터 포털
- [기상자료개방포털](https://data.kma.go.kr/)
- [공공데이터포털](https://www.data.go.kr/)
- [에어코리아](https://www.airkorea.or.kr/)

---

## 🎯 MVP 핵심 기능 요약

1. ✅ 사용자 위치 자동 감지 (Geolocation)
2. ✅ 현재 날씨 표시 (온도, 날씨 상태, 아이콘)
3. ✅ 미세먼지/초미세먼지 농도 표시
4. ✅ 대기질 등급 표시 (색상으로 구분)
5. ✅ 간단한 새로고침 기능

---

## 💡 추가 개선 아이디어 (MVP 이후)

- [ ] 시간별/주간 날씨 예보
- [ ] 위치 즐겨찾기 기능
- [ ] 날씨 알림 푸시 기능
- [ ] 다크모드 지원
- [ ] 지역 검색 기능
- [ ] 날씨에 따른 옷차림 추천
- [ ] PWA로 전환 (앱처럼 사용)
