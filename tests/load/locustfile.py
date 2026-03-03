"""
NutriAware Load Testing — Locust Script
اختبار الحمل لمنصة NutriAware باستخدام Locust

Usage / طريقة التشغيل:
  # With Web UI / مع واجهة المتصفح:
  locust -f locustfile.py --host=https://your-staging.web.app

  # Headless Mode / بدون واجهة:
  locust -f locustfile.py --headless \
    --host=https://your-staging.web.app \
    -u 50 -r 5 -t 10m \
    --csv=results/nutriaware

  # Windows PowerShell (Headless - Safe Defaults) / (بدون واجهة - إعدادات آمنة):
  $env:VERCEL_AUTOMATION_BYPASS_SECRET="<YOUR_SECRET>"; `
  locust -f locustfile.py --headless `
    --host="https://your-staging.web.app" `
    -u 10 -r 2 -t 3m `
    --csv="results/nutriaware"

  # Windows PowerShell (Interactive UI) / (مع واجهة تفاعلية):
  $env:VERCEL_AUTOMATION_BYPASS_SECRET="<YOUR_SECRET>"; `
  locust -f locustfile.py --host="https://your-staging.web.app"

Parameters / المعاملات:
  -u / --users    : Max concurrent users / أقصى مستخدمين متزامنين
  -r / --spawn-rate : Users spawned per second / معدل إضافة المستخدمين/ثانية
  -t / --run-time : Total test duration / مدة الاختبار الكلية

⚠️ WARNING / تحذير:
  - Test on staging FIRST / اختبر على بيئة الاختبار أولاً
  - Monitor server resources / راقب موارد الخادم
  - Use --run-time to auto-stop / استخدم --run-time للإيقاف التلقائي
"""

import time
import random
import logging
import os
import sys
from locust import HttpUser, task, between, events, tag
from locust.runners import MasterRunner

# ─── Vercel Protection Bypass / تخطي حماية Vercel ───
# Reads the bypass secret to authenticate against Vercel Deployment Protection
# يقرأ كلمة المرور لتخطي حماية Vercel
VERCEL_SECRET = os.getenv("VERCEL_AUTOMATION_BYPASS_SECRET") or os.getenv("VERCEL_BYPASS_SECRET")

if not VERCEL_SECRET:
    print("\n" + "═" * 60)
    print("❌ ERROR: Vercel Bypass Secret is missing! / خطأ: كلمة مرور تخطي حماية Vercel مفقودة!")
    print("Please set the VERCEL_AUTOMATION_BYPASS_SECRET environment variable.")
    print("يرجى تعيين متغير البيئة VERCEL_AUTOMATION_BYPASS_SECRET قبل تشغيل الاختبار.")
    print("Example: $env:VERCEL_AUTOMATION_BYPASS_SECRET=\"secret_here\"")
    print("═" * 60 + "\n")
    sys.exit(1)

logger = logging.getLogger(__name__)

# ─── Success/Failure Thresholds / معايير النجاح ───
THRESHOLDS = {
    "max_p95_ms": 3000,          # p95 latency target / هدف زمن p95
    "max_error_rate": 0.01,      # Max 1% errors / أقصى نسبة أخطاء 1%
    "max_avg_response_ms": 2000, # Max avg response / أقصى متوسط استجابة
}


class NutriAwareUser(HttpUser):
    """
    Simulates a realistic user journey on NutriAware
    محاكاة رحلة مستخدم واقعية على منصة NutriAware
    """

    # Think time: 1-5 seconds between actions
    # وقت التفكير: 1-5 ثوانٍ بين الإجراءات
    wait_time = between(1, 5)

    # Common headers / رؤوس HTTP مشتركة
    HEADERS = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
        "Accept-Language": "ar,en;q=0.9",
        "User-Agent": "Locust-NutriAware-QA/1.0",
        
        # Vercel Automation Bypass Headers
        "x-vercel-protection-bypass": VERCEL_SECRET,
        "x-vercel-set-bypass-cookie": "true",
    }

    def on_start(self):
        """
        Called once per user when spawned
        يُستدعى مرة واحدة عند إنشاء كل مستخدم
        """
        self.pages_visited = 0
        logger.info(f"🟢 User started / بدء مستخدم جديد")

    def on_stop(self):
        """Called when user stops / يُستدعى عند توقف المستخدم"""
        logger.info(f"🔴 User stopped after {self.pages_visited} pages / توقف بعد {self.pages_visited} صفحات")

    # ─── High Priority Tasks / مهام ذات أولوية عالية ───

    @task(30)
    @tag("core", "homepage")
    def visit_homepage(self):
        """
        Visit homepage — most common action
        زيارة الصفحة الرئيسية — الإجراء الأكثر شيوعاً
        """
        with self.client.get("/", headers=self.HEADERS,
                             name="/ Homepage (الرئيسية)",
                             catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"HTTP {response.status_code}")
        self.pages_visited += 1

    @task(25)
    @tag("core", "survey")
    def visit_survey(self):
        """
        Visit survey page — critical user journey
        زيارة صفحة الاستبيان — رحلة المستخدم الحرجة
        """
        with self.client.get("/project-evaluation", headers=self.HEADERS,
                             name="/project-evaluation Survey (الاستبيان)",
                             catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"HTTP {response.status_code}")
        self.pages_visited += 1

    # ─── Medium Priority Tasks / مهام ذات أولوية متوسطة ───

    @task(15)
    @tag("content", "knowledge")
    def visit_knowledge(self):
        """
        Visit knowledge center / زيارة مركز المعرفة
        """
        with self.client.get("/knowledge", headers=self.HEADERS,
                             name="/knowledge (المعرفة)",
                             catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"HTTP {response.status_code}")
        self.pages_visited += 1

    @task(10)
    @tag("tools", "ai")
    def visit_ai_tools(self):
        """
        Visit AI tools / زيارة أدوات الذكاء الاصطناعي
        """
        with self.client.get("/ai-tools", headers=self.HEADERS,
                             name="/ai-tools (أدوات الذكاء)",
                             catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"HTTP {response.status_code}")
        self.pages_visited += 1

    @task(10)
    @tag("tools", "assessment")
    def visit_assessment(self):
        """
        Visit assessment tool / زيارة أداة التقييم
        """
        with self.client.get("/assessment", headers=self.HEADERS,
                             name="/assessment (التقييم)",
                             catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"HTTP {response.status_code}")
        self.pages_visited += 1

    # ─── Low Priority Tasks / مهام ذات أولوية منخفضة ───

    @task(5)
    @tag("info")
    def visit_about(self):
        """Visit about page / زيارة صفحة عن المنصة"""
        self.client.get("/about", headers=self.HEADERS,
                        name="/about (عن المنصة)")
        self.pages_visited += 1

    @task(5)
    @tag("info")
    def visit_contact(self):
        """Visit contact page / زيارة صفحة الاتصال"""
        self.client.get("/contact", headers=self.HEADERS,
                        name="/contact (اتصل بنا)")
        self.pages_visited += 1

    # ─── Realistic User Journey / رحلة مستخدم واقعية ───

    @task(10)
    @tag("journey")
    def full_user_journey(self):
        """
        Simulate a complete user journey:
        محاكاة رحلة مستخدم كاملة:
        1. Homepage → Knowledge → AI Tools → Survey
        """
        # Step 1: Homepage / الخطوة 1: الصفحة الرئيسية
        self.client.get("/", headers=self.HEADERS,
                        name="Journey: / Homepage")
        time.sleep(random.uniform(1, 3))

        # Step 2: Knowledge / الخطوة 2: المعرفة
        self.client.get("/knowledge", headers=self.HEADERS,
                        name="Journey: /knowledge")
        time.sleep(random.uniform(2, 5))

        # Step 3: AI Tools / الخطوة 3: الأدوات
        self.client.get("/ai-tools", headers=self.HEADERS,
                        name="Journey: /ai-tools")
        time.sleep(random.uniform(1, 3))

        # Step 4: Survey / الخطوة 4: الاستبيان
        self.client.get("/project-evaluation", headers=self.HEADERS,
                        name="Journey: /project-evaluation")

        self.pages_visited += 4


# ─── Event Hooks / أحداث ───

@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    """
    Called when test starts / يُستدعى عند بدء الاختبار
    """
    logger.info("=" * 60)
    logger.info("🚀 NutriAware Load Test Started / بدأ اختبار الحمل")
    logger.info(f"🎯 Target: {environment.host}")
    logger.info("=" * 60)


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    """
    Called when test ends — prints summary / يُستدعى عند انتهاء الاختبار
    """
    stats = environment.runner.stats

    total_requests = stats.total.num_requests
    total_failures = stats.total.num_failures
    error_rate = total_failures / total_requests if total_requests > 0 else 0
    avg_response = stats.total.avg_response_time
    p95 = stats.total.get_response_time_percentile(0.95) or 0
    p99 = stats.total.get_response_time_percentile(0.99) or 0
    rps = stats.total.current_rps

    max_users = environment.runner.user_count if hasattr(environment.runner, 'user_count') else 0
    break_point = max_users if error_rate > THRESHOLDS["max_error_rate"] else -1
    safe_users = int(break_point * 0.7) if break_point > 0 else int(max_users * 0.7)

    print("\n" + "═" * 60)
    print("📊 NutriAware Load Test Results / نتائج اختبار الحمل")
    print("═" * 60)
    print(f"📝 Total Requests / إجمالي الطلبات: {total_requests}")
    print(f"❌ Failures / الإخفاقات: {total_failures} ({error_rate:.2%})")
    print(f"⏱  Avg Response / متوسط الاستجابة: {avg_response:.0f}ms")
    print(f"⏱  p95 Latency / زمن p95: {p95:.0f}ms")
    print(f"⏱  p99 Latency / زمن p99: {p99:.0f}ms")
    print(f"🔄 RPS / طلبات/ثانية: {rps:.1f}")
    print(f"👥 Peak Users / أقصى مستخدمين: {max_users}")
    print(f"🔴 Break Point / نقطة الانهيار: {'Not reached / لم تُحدد' if break_point < 0 else f'{break_point} users'}")
    print(f"✅ Safe Concurrent / المستخدمين الآمنين: ~{safe_users}")
    print("═" * 60)

    # Threshold checks / فحص المعايير
    issues = []
    if error_rate > THRESHOLDS["max_error_rate"]:
        issues.append(f"⚠️ Error rate {error_rate:.2%} > {THRESHOLDS['max_error_rate']:.0%} / نسبة الأخطاء تجاوزت الحد")
    if p95 > THRESHOLDS["max_p95_ms"]:
        issues.append(f"⚠️ p95 {p95:.0f}ms > {THRESHOLDS['max_p95_ms']}ms / زمن p95 تجاوز الهدف")
    if avg_response > THRESHOLDS["max_avg_response_ms"]:
        issues.append(f"⚠️ Avg {avg_response:.0f}ms > {THRESHOLDS['max_avg_response_ms']}ms / المتوسط تجاوز الحد")

    if issues:
        print("\n⚠️ THRESHOLD VIOLATIONS / تجاوزات المعايير:")
        for issue in issues:
            print(f"  {issue}")
    else:
        print("\n✅ ALL THRESHOLDS PASSED / جميع المعايير نجحت!")

    print()
