# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**우리동네 날씨 실시간 파악 & 미세먼지 알림판**

MVP 웹 애플리케이션: 사용자 위치 기반 실시간 날씨 및 미세먼지 정보 대시보드

## Tech Stack

- **Frontend**: Vanilla JavaScript (no framework), HTML5, CSS3
- **APIs**:
  - HTML5 Geolocation API (user location)
  - OpenWeatherMap API (weather data)
  - 에어코리아 API (air quality/fine dust data)
- **Deployment**: GitHub Pages, Vercel, or Netlify (HTTPS required)

## Development Commands

### Local Development
```bash
# No build process - serve static files directly
# Use Live Server in VS Code or any static file server

# Example with Python
python -m http.server 8000

# Example with Node.js http-server
npx http-server

# Access at http://localhost:8000
```

### Testing
- Manual testing in browser required
- Must use HTTPS or localhost (Geolocation API requirement)

## Architecture

### File Structure
```
/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # Main JavaScript logic
└── .env (gitignored)   # API keys (if using)
```

### Core Components

1. **Location Service** (`script.js`)
   - Uses `navigator.geolocation.getCurrentPosition()`
   - Handles permission requests and errors
   - Returns latitude/longitude coordinates

2. **Weather Service** (`script.js`)
   - Fetches from OpenWeatherMap API
   - Endpoint: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=kr`
   - Parses and displays: temperature, weather condition, icon

3. **Air Quality Service** (`script.js`)
   - Fetches from 에어코리아 API
   - Finds nearest monitoring station
   - Displays PM10, PM2.5 levels and air quality grade

4. **UI Layer** (`index.html`, `style.css`)
   - Responsive design
   - Loading states
   - Error handling UI
   - Refresh functionality

## API Configuration

### Required API Keys

1. **OpenWeatherMap**
   - Sign up: https://openweathermap.org
   - Free tier: 60 calls/min, 1M calls/month
   - Activation: 2-3 hours after signup

2. **에어코리아 (Air Korea)**
   - Sign up: https://www.data.go.kr
   - Search for "한국환경공단_에어코리아_대기오염정보"
   - Approval: 1-2 days
   - Free tier: 500 calls/day

### API Key Security
- Never commit API keys to repository
- Use environment variables or config file (gitignored)
- For client-side: Consider using serverless functions or proxy

## Important Constraints

### HTTPS Requirement
- Geolocation API only works in secure contexts
- Use HTTPS in production or localhost for development
- GitHub Pages/Vercel/Netlify provide free HTTPS

### Rate Limits
- OpenWeatherMap: 60 calls/minute
- 에어코리아: 500 calls/day (development account)
- Implement caching to reduce API calls

### Coordinate Systems
- Geolocation returns WGS84 coordinates (latitude/longitude)
- OpenWeatherMap accepts lat/lon directly
- 기상청 API (if used) requires conversion to grid coordinates

## Development Workflow

1. **Setup**
   - Create HTML/CSS/JS files
   - Obtain API keys
   - Configure local server

2. **Implementation Order**
   - Location detection first
   - Weather display second
   - Air quality last
   - UI/UX polish final

3. **Error Handling Priority**
   - Location permission denied
   - API failures/timeouts
   - Network errors
   - Invalid API responses

4. **Browser Compatibility**
   - Target modern browsers (Chrome, Firefox, Safari, Edge)
   - Geolocation API widely supported
   - Fetch API for HTTP requests

## Deployment Checklist

- [ ] HTTPS enabled
- [ ] API keys secured (environment variables)
- [ ] Error messages user-friendly
- [ ] Loading states implemented
- [ ] Mobile responsive design
- [ ] Cross-browser tested
