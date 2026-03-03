/**
 * NutriAware Load Testing — k6 Script
 * اختبار الحمل لمنصة NutriAware باستخدام k6
 * 
 * Scenarios / السيناريوهات:
 *   1. Load Test (تحميل تدريجي) — Gradual ramp-up
 *   2. Stress Test (اختبار إجهاد) — Push to failure
 *   3. Spike Test (اختبار الذروة المفاجئة) — Sudden surge
 * 
 * Usage / طريقة التشغيل:
 *   # Load test only / اختبار التحميل فقط:
 *   k6 run --env SCENARIO=load --env BASE_URL=https://your-staging.web.app loadtest.js
 *   
 *   # Stress test / اختبار الإجهاد:
 *   k6 run --env SCENARIO=stress --env BASE_URL=https://your-staging.web.app loadtest.js
 *   
 *   # Spike test / اختبار الذروة:
 *   k6 run --env SCENARIO=spike --env BASE_URL=https://your-staging.web.app loadtest.js
 *   
 *   # All scenarios / جميع السيناريوهات:
 *   k6 run --env SCENARIO=all --env BASE_URL=https://your-staging.web.app loadtest.js
 *
 * Environment Variables / متغيرات البيئة:
 *   BASE_URL  — Target URL (default: http://localhost:5173)
 *   SCENARIO  — load | stress | spike | all (default: load)
 *
 * ⚠️ WARNING / تحذير:
 *   - Test on staging FIRST / اختبر على بيئة الاختبار أولاً
 *   - Monitor server resources during test / راقب موارد الخادم أثناء الاختبار
 *   - This is a CLIENT-SIDE SPA + Firebase test / هذا اختبار لتطبيق SPA + Firebase
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// ─── Custom Metrics / مقاييس مخصصة ───
const errorRate = new Rate('errors');
const pageLoadTrend = new Trend('page_load_time', true);
const surveyLoadTrend = new Trend('survey_page_load', true);
const throughputCounter = new Counter('total_bytes_received');

// ─── Configuration / الإعدادات ───
const BASE = __ENV.BASE_URL || 'http://localhost:5173';
const SCENARIO = __ENV.SCENARIO || 'load';

// ─── Thresholds / معايير النجاح ───
export const options = {
    thresholds: {
        // Error rate < 1% / نسبة الأخطاء أقل من 1%
        errors: ['rate<0.01'],
        // p95 response < 3s / زمن الاستجابة p95 أقل من 3 ثوانٍ
        http_req_duration: ['p(95)<3000', 'p(99)<5000'],
        // Page load < 4s / تحميل الصفحة أقل من 4 ثوانٍ
        page_load_time: ['p(95)<4000'],
        // Survey page < 5s / صفحة الاستبيان أقل من 5 ثوانٍ
        survey_page_load: ['p(95)<5000'],
    },

    // Scenarios configured dynamically below
    scenarios: {},

    // Stop conditions / شروط الإيقاف
    // Abort if error rate > 10% for 30s
    // إيقاف الاختبار إذا تجاوزت نسبة الأخطاء 10% لمدة 30 ثانية
};

// ─── Dynamic Scenario Selection / اختيار السيناريو ديناميكياً ───
const SCENARIOS = {
    // 1. Load Test — Gradual Ramp / تحميل تدريجي
    load: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
            { duration: '1m', target: 10 },   // Ramp up to 10 / تصعيد إلى 10
            { duration: '3m', target: 10 },   // Hold 10 / ثبات عند 10
            { duration: '1m', target: 25 },   // Ramp to 25 / تصعيد إلى 25
            { duration: '3m', target: 25 },   // Hold 25 / ثبات عند 25
            { duration: '1m', target: 50 },   // Ramp to 50 / تصعيد إلى 50
            { duration: '3m', target: 50 },   // Hold 50 / ثبات عند 50
            { duration: '2m', target: 0 },    // Ramp down / خفض تدريجي
        ],
        gracefulRampDown: '30s',
    },

    // 2. Stress Test — Push to Limits / دفع للحدود
    stress: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
            { duration: '1m', target: 20 },   // Warm up / إحماء
            { duration: '2m', target: 50 },   // Normal load / حمل عادي
            { duration: '2m', target: 100 },  // High load / حمل مرتفع
            { duration: '2m', target: 150 },  // Near breaking point / قرب نقطة الانهيار
            { duration: '2m', target: 200 },  // Breaking point / نقطة الانهيار
            { duration: '3m', target: 200 },  // Hold at max / ثبات عند الأقصى
            { duration: '2m', target: 0 },    // Recovery / استعادة
        ],
        gracefulRampDown: '30s',
    },

    // 3. Spike Test — Sudden Surge / ارتفاع مفاجئ
    spike: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
            { duration: '30s', target: 5 },    // Baseline / خط الأساس
            { duration: '1m', target: 5 },     // Hold baseline / ثبات
            { duration: '10s', target: 150 },  // SPIKE! / الذروة المفاجئة!
            { duration: '2m', target: 150 },   // Hold spike / ثبات عند الذروة
            { duration: '10s', target: 5 },    // Drop back / عودة للأساس
            { duration: '2m', target: 5 },     // Recovery / استعادة
            { duration: '30s', target: 0 },    // Ramp down / إنهاء
        ],
        gracefulRampDown: '15s',
    },
};

// Apply selected scenario(s)
if (SCENARIO === 'all') {
    options.scenarios = SCENARIOS;
} else {
    options.scenarios[SCENARIO] = SCENARIOS[SCENARIO] || SCENARIOS.load;
}

// ─── Pages to Test / الصفحات المراد اختبارها ───
const PAGES = [
    { name: 'Homepage / الصفحة الرئيسية', path: '/', weight: 30 },
    { name: 'Survey / الاستبيان', path: '/project-evaluation', weight: 25 },
    { name: 'Knowledge / المعرفة', path: '/knowledge', weight: 15 },
    { name: 'AI Tools / أدوات الذكاء', path: '/ai-tools', weight: 10 },
    { name: 'Assessment / التقييم', path: '/assessment', weight: 10 },
    { name: 'About / عن المنصة', path: '/about', weight: 5 },
    { name: 'Contact / اتصل بنا', path: '/contact', weight: 5 },
];

// Weighted random page selection / اختيار عشوائي مرجح
function pickPage() {
    const total = PAGES.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * total;
    for (const page of PAGES) {
        r -= page.weight;
        if (r <= 0) return page;
    }
    return PAGES[0];
}

// ─── Main VU Function / الدالة الرئيسية ───
export default function () {
    const page = pickPage();

    group(page.name, () => {
        const start = Date.now();
        const res = http.get(`${BASE}${page.path}`, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'ar,en;q=0.9',
                'User-Agent': 'k6-loadtest/1.0 NutriAware-QA',
            },
            timeout: '30s',
        });

        const duration = Date.now() - start;
        pageLoadTrend.add(duration);

        if (page.path === '/project-evaluation') {
            surveyLoadTrend.add(duration);
        }

        // Bytes tracking / تتبع البيانات المنقولة
        throughputCounter.add(res.body ? res.body.length : 0);

        // Assertions / التحقق
        const passed = check(res, {
            [`${page.name} — status 200`]: (r) => r.status === 200,
            [`${page.name} — response < 5s`]: (r) => r.timings.duration < 5000,
            [`${page.name} — body contains HTML`]: (r) => r.body && r.body.includes('<!DOCTYPE') || r.body.includes('<html') || r.body.includes('<div'),
        });

        errorRate.add(!passed);
    });

    // Think time — simulate real user behavior / محاكاة سلوك مستخدم حقيقي
    sleep(Math.random() * 3 + 1); // 1–4 seconds
}

// ─── Summary Handler / ملخص النتائج ───
export function handleSummary(data) {
    // Calculate safe concurrency / حساب التزامن الآمن
    const p95 = data.metrics.http_req_duration?.values?.['p(95)'] || 0;
    const errRate = data.metrics.errors?.values?.rate || 0;
    const maxVUs = data.metrics.vus_max?.values?.max || 0;

    const breakPoint = errRate > 0.01 ? maxVUs : -1;
    const safeUsers = breakPoint > 0 ? Math.floor(breakPoint * 0.7) : Math.floor(maxVUs * 0.7);

    console.log('\n' + '═'.repeat(60));
    console.log('📊 NutriAware Load Test Results / نتائج اختبار الحمل');
    console.log('═'.repeat(60));
    console.log(`🎯 Max VUs / أقصى مستخدمين متزامنين: ${maxVUs}`);
    console.log(`⏱  p95 Latency / زمن p95: ${(p95 / 1000).toFixed(2)}s`);
    console.log(`❌ Error Rate / نسبة الأخطاء: ${(errRate * 100).toFixed(2)}%`);
    console.log(`🔴 Break Point / نقطة الانهيار: ${breakPoint > 0 ? breakPoint + ' VUs' : 'Not reached / لم تُحدد'}`);
    console.log(`✅ Safe Concurrent Users / المستخدمين الآمنين: ~${safeUsers}`);
    console.log('═'.repeat(60) + '\n');

    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
        'results/summary.json': JSON.stringify(data, null, 2),
    };
}

// Text summary helper
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
