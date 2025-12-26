# 🌤️ 우리동네 날씨 & 미세먼지 알림판

사용자의 현재 위치를 기반으로 실시간 날씨와 미세먼지 정보를 보여주는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 📍 **자동 위치 감지**: HTML5 Geolocation API를 사용한 현재 위치 자동 감지
- 🌡️ **실시간 날씨 정보**: 온도, 체감온도, 습도, 풍속, 날씨 상태
- 💨 **대기질 정보**: 미세먼지(PM10), 초미세먼지(PM2.5) 실시간 농도 및 등급
- 🔄 **실시간 업데이트**: 새로고침 버튼으로 최신 정보 갱신
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. API 키 설정

`.env` 파일을 생성하고 API 키를 입력하세요:

```bash
# .env.example을 복사해서 .env 파일 생성
cp .env.example .env
```

`.env` 파일 내용:
```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_AIRKOREA_API_KEY=your_airkorea_api_key_here
```

#### API 키 발급 방법

**OpenWeatherMap API 키**
1. [OpenWeatherMap](https://openweathermap.org) 접속
2. 회원가입 후 로그인
3. API Keys 메뉴에서 키 확인
4. 발급 후 2-3시간 대기 (활성화 시간)

**에어코리아 API 키**
1. [공공데이터포털](https://www.data.go.kr) 접속
2. 회원가입 후 로그인
3. "한국환경공단_에어코리아_대기오염정보" 검색
4. 활용신청 후 승인 대기 (1-2일 소요)
5. 마이페이지에서 일반 인증키(Encoding) 확인

### 3. 개발 서버 실행

```bash
npm run dev
```

자동으로 브라우저가 열리고 `http://localhost:3000`에서 실행됩니다.

### 4. 빌드 (배포용)

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

⚠️ **중요**: Geolocation API는 HTTPS 또는 localhost에서만 작동합니다.

## 📁 프로젝트 구조

```
realtime_api/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # JavaScript 로직
├── .gitignore          # Git 제외 파일 목록
├── CLAUDE.md           # Claude Code 가이드
├── initial.md          # 프로젝트 계획서
└── README.md           # 이 파일
```

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**:
  - HTML5 Geolocation API (위치 정보)
  - OpenWeatherMap API (날씨 정보)
  - 에어코리아 API (대기질 정보)

## ⚠️ 주의사항

### HTTPS 요구사항
- Geolocation API는 보안 컨텍스트(HTTPS 또는 localhost)에서만 작동합니다
- 배포시 반드시 HTTPS를 사용하세요

### API 사용 제한
- **OpenWeatherMap**: 60 calls/분, 1,000,000 calls/월 (무료 플랜)
- **에어코리아**: 500 calls/일 (개발 계정)

### CORS 이슈
에어코리아 API는 CORS 정책으로 인해 브라우저에서 직접 호출이 제한될 수 있습니다.
프로덕션 환경에서는 다음 해결 방법을 고려하세요:

1. **프록시 서버 사용** (추천)
2. **서버리스 함수** (Vercel Functions, Netlify Functions)
3. **백엔드 API 서버** 구축

## 🌐 배포 방법

### Vercel (추천)

1. **Vercel CLI 사용**
```bash
npm install -g vercel
vercel
```

2. **환경변수 설정**
```bash
vercel env add VITE_OPENWEATHER_API_KEY
vercel env add VITE_AIRKOREA_API_KEY
```

3. **또는 웹에서 배포**
   - [Vercel](https://vercel.com)에서 GitHub 저장소 연결
   - Settings → Environment Variables에서 API 키 추가
   - 자동 배포 완료!

### Netlify

1. **Netlify CLI 사용**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

2. **또는 웹에서 배포**
   - [Netlify](https://netlify.com) 접속
   - "New site from Git" 선택
   - 저장소 연결
   - Site settings → Environment variables에서 API 키 추가
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages

⚠️ **주의**: GitHub Pages는 환경변수를 지원하지 않으므로 추천하지 않습니다. Vercel이나 Netlify를 사용하세요.

## 🎨 대기질 등급 기준

### PM2.5 (초미세먼지)
- 😊 **좋음**: 0-15 ㎍/m³
- 🙂 **보통**: 16-35 ㎍/m³
- 😷 **나쁨**: 36-75 ㎍/m³
- 🤢 **매우나쁨**: 76+ ㎍/m³

### PM10 (미세먼지)
- 😊 **좋음**: 0-30 ㎍/m³
- 🙂 **보통**: 31-80 ㎍/m³
- 😷 **나쁨**: 81-150 ㎍/m³
- 🤢 **매우나쁨**: 151+ ㎍/m³

## 🐛 문제 해결

### "위치 정보 권한이 거부되었습니다"
- 브라우저 설정에서 위치 권한을 허용하세요
- Chrome: 설정 → 개인정보 및 보안 → 사이트 설정 → 위치

### "API 키가 설정되지 않았습니다"
- `script.js` 파일의 CONFIG 객체에 API 키를 입력했는지 확인하세요

### "대기질 정보를 불러오는데 실패했습니다"
- CORS 이슈로 인한 문제일 수 있습니다
- 프록시 서버 사용을 고려하세요

### 날씨 아이콘이 표시되지 않습니다
- 인터넷 연결을 확인하세요
- OpenWeatherMap API 키가 활성화되었는지 확인하세요 (2-3시간 소요)

## 📝 라이선스

MIT License

## 🙏 감사의 말

- 날씨 데이터: [OpenWeatherMap](https://openweathermap.org)
- 대기질 데이터: [에어코리아](https://www.airkorea.or.kr)

---

Made with ❤️ by Claude Code
