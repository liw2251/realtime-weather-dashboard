// API 설정 - .env 파일에서 로드 (Vite 환경변수)
const CONFIG = {
    OPENWEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || '92ded90b0e6fefaf120ddb8304e9b54c',
    AIRKOREA_API_KEY: import.meta.env.VITE_AIRKOREA_API_KEY || '3de5dd7e54bb8d9151f17c5dba8f487731fa885d061efaf3bf1dd387db95428f'
};

// DOM 요소
const elements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorMessage: document.querySelector('.error-message'),
    weatherSection: document.getElementById('weather-section'),
    airQualitySection: document.getElementById('air-quality-section'),
    refreshBtn: document.getElementById('refresh-btn'),
    retryBtn: document.getElementById('retry-btn'),

    // 날씨 정보
    locationName: document.getElementById('location-name'),
    currentTime: document.getElementById('current-time'),
    weatherIcon: document.getElementById('weather-icon'),
    temp: document.getElementById('temp'),
    weatherDesc: document.getElementById('weather-desc'),
    feelsLike: document.getElementById('feels-like'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('wind-speed'),

    // 대기질 정보
    airGradeDisplay: document.getElementById('air-grade-display'),
    airGradeText: document.getElementById('air-grade-text'),
    pm10Value: document.getElementById('pm10-value'),
    pm10Grade: document.getElementById('pm10-grade'),
    pm25Value: document.getElementById('pm25-value'),
    pm25Grade: document.getElementById('pm25-grade'),
    stationName: document.getElementById('station-name'),
    measureTime: document.getElementById('measure-time')
};

// 상태 관리
let currentLocation = null;

// 초기화
function init() {
    checkAPIKeys();
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // 1분마다 시간 업데이트

    elements.refreshBtn.addEventListener('click', () => loadAllData());
    elements.retryBtn.addEventListener('click', () => loadAllData());

    loadAllData();
}

// API 키 확인
function checkAPIKeys() {
    if (!CONFIG.OPENWEATHER_API_KEY || !CONFIG.AIRKOREA_API_KEY) {
        console.warn('⚠️ API 키가 설정되지 않았습니다. script.js 파일의 CONFIG 객체에 API 키를 입력해주세요.');
    }
}

// 현재 시간 업데이트
function updateCurrentTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    elements.currentTime.textContent = now.toLocaleDateString('ko-KR', options);
}

// UI 상태 관리
function showLoading(message = '위치 정보를 가져오는 중...') {
    elements.loading.querySelector('p').textContent = message;
    elements.loading.classList.remove('hidden');
    elements.error.classList.add('hidden');
    elements.weatherSection.classList.add('hidden');
    elements.airQualitySection.classList.add('hidden');
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.loading.classList.add('hidden');
    elements.error.classList.remove('hidden');
    elements.weatherSection.classList.add('hidden');
    elements.airQualitySection.classList.add('hidden');
}

function showContent() {
    elements.loading.classList.add('hidden');
    elements.error.classList.add('hidden');
    elements.weatherSection.classList.remove('hidden');
    elements.airQualitySection.classList.remove('hidden');
}

// 위치 정보 가져오기
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('이 브라우저는 위치 정보를 지원하지 않습니다.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                resolve(currentLocation);
            },
            (error) => {
                let message = '위치 정보를 가져올 수 없습니다.';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message = '위치 정보 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = '위치 정보를 사용할 수 없습니다.';
                        break;
                    case error.TIMEOUT:
                        message = '위치 정보 요청 시간이 초과되었습니다.';
                        break;
                }
                reject(new Error(message));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// 날씨 정보 가져오기
async function getWeatherData(lat, lon) {
    if (!CONFIG.OPENWEATHER_API_KEY) {
        throw new Error('OpenWeatherMap API 키가 설정되지 않았습니다.');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.OPENWEATHER_API_KEY}&units=metric&lang=kr`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('날씨 정보를 가져오는데 실패했습니다.');
    }

    return await response.json();
}

// 날씨 정보 표시
function displayWeatherData(data) {
    elements.locationName.textContent = data.name || '현재 위치';
    elements.temp.textContent = Math.round(data.main.temp);
    elements.weatherDesc.textContent = data.weather[0].description;
    elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${data.wind.speed} m/s`;

    // 날씨 아이콘
    const iconCode = data.weather[0].icon;
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    elements.weatherIcon.alt = data.weather[0].description;
}

// 대기질 정보 가져오기 (OpenWeatherMap Air Pollution API 사용)
async function getAirQualityData(lat, lon) {
    if (!CONFIG.OPENWEATHER_API_KEY) {
        throw new Error('OpenWeatherMap API 키가 설정되지 않았습니다.');
    }

    try {
        // OpenWeatherMap Air Pollution API 호출
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${CONFIG.OPENWEATHER_API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('대기질 정보를 가져오는데 실패했습니다.');
        }

        const data = await response.json();

        if (!data.list || data.list.length === 0) {
            throw new Error('대기질 데이터가 없습니다.');
        }

        const airData = data.list[0];

        // OpenWeatherMap 데이터를 에어코리아 형식으로 변환
        return {
            pm10Value: airData.components.pm10.toFixed(0),
            pm25Value: airData.components.pm2_5.toFixed(0),
            stationName: '현재 위치',
            dataTime: new Date().toLocaleString('ko-KR')
        };
    } catch (error) {
        console.error('대기질 API 오류:', error);
        throw new Error('대기질 정보를 불러오는데 실패했습니다: ' + error.message);
    }
}

// 대기질 등급 계산
function getAirQualityGrade(pm10, pm25) {
    const pm10Value = parseInt(pm10);
    const pm25Value = parseInt(pm25);

    // PM2.5 기준
    if (pm25Value <= 15) return { grade: 'good', text: '좋음' };
    if (pm25Value <= 35) return { grade: 'moderate', text: '보통' };
    if (pm25Value <= 75) return { grade: 'unhealthy', text: '나쁨' };
    return { grade: 'very-unhealthy', text: '매우나쁨' };
}

function getPMGrade(value, type) {
    const pm = parseInt(value);
    if (type === 'pm10') {
        if (pm <= 30) return { grade: 'good', text: '좋음' };
        if (pm <= 80) return { grade: 'moderate', text: '보통' };
        if (pm <= 150) return { grade: 'unhealthy', text: '나쁨' };
        return { grade: 'very-unhealthy', text: '매우나쁨' };
    } else {
        if (pm <= 15) return { grade: 'good', text: '좋음' };
        if (pm <= 35) return { grade: 'moderate', text: '보통' };
        if (pm <= 75) return { grade: 'unhealthy', text: '나쁨' };
        return { grade: 'very-unhealthy', text: '매우나쁨' };
    }
}

// 대기질 정보 표시
function displayAirQualityData(data) {
    const pm10 = data.pm10Value || '--';
    const pm25 = data.pm25Value || '--';

    // 전체 등급
    const overallGrade = getAirQualityGrade(pm10, pm25);
    elements.airGradeDisplay.className = `air-quality-grade ${overallGrade.grade}`;
    elements.airGradeText.textContent = overallGrade.text;

    // PM10
    elements.pm10Value.textContent = pm10;
    const pm10Grade = getPMGrade(pm10, 'pm10');
    elements.pm10Grade.textContent = pm10Grade.text;
    elements.pm10Grade.className = `air-grade-badge ${pm10Grade.grade}`;

    // PM2.5
    elements.pm25Value.textContent = pm25;
    const pm25Grade = getPMGrade(pm25, 'pm25');
    elements.pm25Grade.textContent = pm25Grade.text;
    elements.pm25Grade.className = `air-grade-badge ${pm25Grade.grade}`;

    // 측정소 정보
    elements.stationName.textContent = `측정소: ${data.stationName || '--'}`;
    elements.measureTime.textContent = `측정시간: ${data.dataTime || '--'}`;
}

// 모든 데이터 로드
async function loadAllData() {
    try {
        showLoading('위치 정보를 가져오는 중...');

        // 1. 위치 정보 가져오기
        const location = await getCurrentLocation();

        // 2. 날씨 정보 가져오기
        showLoading('날씨 정보를 불러오는 중...');
        const weatherData = await getWeatherData(location.lat, location.lon);
        displayWeatherData(weatherData);

        // 3. 대기질 정보 가져오기
        showLoading('대기질 정보를 불러오는 중...');
        try {
            const airQualityData = await getAirQualityData(location.lat, location.lon);
            displayAirQualityData(airQualityData);
        } catch (airError) {
            console.error('대기질 정보 오류:', airError);
            // 대기질 정보 실패시에도 날씨는 표시
            elements.airQualitySection.innerHTML = `
                <h3>💨 대기질 정보</h3>
                <div style="text-align: center; padding: 20px; color: #666;">
                    <p>${airError.message}</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">
                        ⚠️ 에어코리아 API는 CORS 정책으로 인해 브라우저에서 직접 호출이 제한될 수 있습니다.<br>
                        프록시 서버 사용을 권장합니다.
                    </p>
                </div>
            `;
        }

        showContent();
    } catch (error) {
        console.error('데이터 로드 오류:', error);
        showError(error.message);
    }
}

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', init);
