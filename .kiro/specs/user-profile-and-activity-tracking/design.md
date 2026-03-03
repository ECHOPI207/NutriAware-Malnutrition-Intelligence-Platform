# وثيقة التصميم

## نظرة عامة

هذا التصميم يعالج إصلاح وتحسين ميزتين أساسيتين في منصة NutriAware:

1. **رفع وإدارة الصورة الرمزية**: إصلاح وظيفة رفع الصور الرمزية للمستخدمين والمسؤولين
2. **تتبع النشاط**: إصلاح نظام تتبع نشاط المستخدمين لضمان تسجيل جميع الأنشطة

المشاكل الحالية:
- ميزة رفع الصورة الرمزية موجودة لكنها لا تعمل على الإطلاق
- نظام تتبع النشاط موجود لكنه لا يسجل أي أنشطة رغم حدوثها

الحل المقترح يركز على:
- تشخيص وإصلاح المشاكل الموجودة في الكود الحالي
- تحسين معالجة الأخطاء والموثوقية
- إضافة تسجيل شامل للأخطاء لتسهيل التشخيص المستقبلي
- ضمان التكامل الصحيح مع Firebase/Firestore

## البنية المعمارية

### المكونات الرئيسية

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                            │
├─────────────────────────────────────────────────────────────┤
│  Profile.tsx  │  ActivityLog.tsx  │  AvatarUpload Component │
└────────┬──────────────────┬────────────────────┬────────────┘
         │                  │                    │
         ▼                  ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
├─────────────────────────────────────────────────────────────┤
│  avatarService.ts  │  activityTracker.ts  │  cloudUpload.ts │
└────────┬──────────────────────┬────────────────┬────────────┘
         │                      │                │
         ▼                      ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Backend                          │
├─────────────────────────────────────────────────────────────┤
│  Firebase Storage  │  Firestore Database  │  Admin API      │
└─────────────────────────────────────────────────────────────┘
```

### تدفق البيانات

**رفع الصورة الرمزية:**
```
User → AvatarUpload Component → avatarService → Firebase Storage → Firestore
                                      ↓
                              activityTracker → Firestore (activity log)
```

**تتبع النشاط:**
```
User Action → Component → activityTracker → Firestore (activity log)
                              ↓
                    Local Queue (if offline) → Sync when online
```

## المكونات والواجهات

### 1. AvatarUpload Component

مكون React مسؤول عن واجهة رفع الصورة الرمزية.

```typescript
interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string;
  isAdmin?: boolean;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

interface AvatarUploadState {
  isUploading: boolean;
  previewUrl: string | null;
  selectedFile: File | null;
  uploadProgress: number;
  error: string | null;
}
```

**المسؤوليات:**
- عرض واجهة اختيار الملف (محلي أو سحابي)
- معاينة الصورة قبل الرفع
- توفير أدوات القص والتدوير
- عرض شريط التقدم أثناء الرفع
- معالجة الأخطاء وعرض الرسائل

### 2. avatarService

خدمة تتعامل مع جميع عمليات الصورة الرمزية.

```typescript
interface AvatarService {
  uploadAvatar(userId: string, file: File): Promise<string>;
  uploadAvatarFromUrl(userId: string, url: string): Promise<string>;
  deleteAvatar(userId: string): Promise<void>;
  getAvatarUrl(userId: string): Promise<string | null>;
  validateImageFile(file: File): ValidationResult;
  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File>;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}
```

**المسؤوليات:**
- التحقق من صحة الملفات (النوع، الحجم)
- رفع الصور إلى Firebase Storage
- تحديث Firestore بروابط الصور
- حذف الصور القديمة
- تغيير حجم الصور للأداء
- معالجة الأخطاء والإعادة التلقائية

### 3. cloudUploadService

خدمة للتعامل مع الرفع من مصادر سحابية.

```typescript
interface CloudUploadService {
  initGoogleDrivePicker(): Promise<void>;
  selectFromGoogleDrive(): Promise<CloudFile>;
  downloadFromCloud(file: CloudFile): Promise<File>;
}

interface CloudFile {
  id: string;
  name: string;
  mimeType: string;
  downloadUrl: string;
  size: number;
}
```

**المسؤوليات:**
- التكامل مع Google Drive API
- تحميل الملفات من المصادر السحابية
- التحقق من صحة الملفات المحملة

### 4. activityTracker

خدمة تتبع جميع أنشطة المستخدمين.

```typescript
interface ActivityTracker {
  trackToolAccess(userId: string, toolName: string): Promise<void>;
  trackToolExit(userId: string, toolName: string, duration: number): Promise<void>;
  trackResultGeneration(userId: string, toolName: string, resultType: string, summary: any): Promise<void>;
  trackProfileChange(userId: string, changes: ProfileChanges): Promise<void>;
  trackSettingsChange(userId: string, changes: SettingsChanges): Promise<void>;
  trackDataDeletion(userId: string, dataType: string, dataId: string): Promise<void>;
  syncPendingActivities(): Promise<void>;
}

interface ActivityLog {
  id: string;
  userId: string;
  activityType: ActivityType;
  timestamp: Timestamp;
  metadata: ActivityMetadata;
  sessionId?: string;
}

enum ActivityType {
  TOOL_ACCESS = 'tool_access',
  TOOL_EXIT = 'tool_exit',
  RESULT_GENERATION = 'result_generation',
  PROFILE_CHANGE = 'profile_change',
  SETTINGS_CHANGE = 'settings_change',
  DATA_DELETION = 'data_deletion',
  AVATAR_UPLOAD = 'avatar_upload',
  AVATAR_DELETE = 'avatar_delete'
}

interface ActivityMetadata {
  toolName?: string;
  duration?: number;
  resultType?: string;
  changes?: any;
  dataType?: string;
  [key: string]: any;
}

interface ProfileChanges {
  field: string;
  oldValue: any;
  newValue: any;
}

interface SettingsChanges {
  setting: string;
  oldValue: any;
  newValue: any;
}
```

**المسؤوليات:**
- تسجيل جميع أنواع الأنشطة
- التخزين المؤقت المحلي عند عدم الاتصال
- المزامنة التلقائية عند استعادة الاتصال
- معالجة الأخطاء دون تعطيل تجربة المستخدم
- تجميع الأنشطة المتعددة لتحسين الأداء

### 5. ActivityLog Component

مكون React لعرض سجل النشاط للمسؤولين.

```typescript
interface ActivityLogProps {
  isAdmin: boolean;
}

interface ActivityLogState {
  activities: ActivityLog[];
  filters: ActivityFilters;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
}

interface ActivityFilters {
  userId?: string;
  activityType?: ActivityType;
  dateFrom?: Date;
  dateTo?: Date;
  toolName?: string;
}
```

**المسؤوليات:**
- عرض قائمة الأنشطة مع الترقيم
- توفير فلاتر متقدمة
- البحث عن أنشطة مستخدم معين
- تصدير البيانات إلى CSV
- تحديث تلقائي للأنشطة الجديدة

### 6. Admin Avatar API

API للمسؤولين لتغيير صور المستخدمين.

```typescript
interface AdminAvatarAPI {
  changeUserAvatar(adminId: string, targetUserId: string, file: File): Promise<string>;
  deleteUserAvatar(adminId: string, targetUserId: string): Promise<void>;
  verifyAdminPermissions(adminId: string): Promise<boolean>;
}
```

**المسؤوليات:**
- التحقق من صلاحيات المسؤول
- تغيير صور المستخدمين
- تسجيل إجراءات المسؤول
- معالجة الأخطاء والتفويض

## نماذج البيانات

### User Profile (Firestore)

```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  avatarStoragePath?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isAdmin: boolean;
}
```

### Activity Log Entry (Firestore)

```typescript
interface ActivityLogEntry {
  id: string;
  userId: string;
  activityType: ActivityType;
  timestamp: Timestamp;
  metadata: {
    toolName?: string;
    duration?: number;
    resultType?: string;
    resultSummary?: any;
    changes?: Array<{
      field: string;
      oldValue: any;
      newValue: any;
    }>;
    dataType?: string;
    dataId?: string;
    performedBy?: string; // للإجراءات الإدارية
  };
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
}
```

### Firebase Storage Structure

```
/avatars/
  /{userId}/
    /avatar.jpg
    /avatar_thumb.jpg
```

### Firestore Collections

```
/users/{userId}
  - avatarUrl
  - avatarStoragePath
  - ...

/activityLogs/{logId}
  - userId
  - activityType
  - timestamp
  - metadata
  - ...

/pendingActivities/{deviceId}/{activityId}
  - (للتخزين المؤقت المحلي)
```

## التشخيص والإصلاح

### المشاكل المحتملة في رفع الصورة الرمزية

1. **مشاكل Firebase Storage:**
   - قواعد الأمان غير صحيحة
   - مسارات التخزين خاطئة
   - عدم معالجة الأخطاء

2. **مشاكل في الكود:**
   - عدم انتظار العمليات غير المتزامنة
   - عدم تحديث Firestore بعد الرفع
   - عدم حذف الصور القديمة

3. **مشاكل في الواجهة:**
   - عدم عرض حالة الرفع
   - عدم معالجة الأخطاء
   - عدم تحديث الصورة بعد الرفع

**الحلول:**
- التحقق من قواعد Firebase Storage وتحديثها
- إضافة معالجة شاملة للأخطاء
- إضافة تسجيل مفصل للأخطاء
- استخدام async/await بشكل صحيح
- إضافة إعادة محاولة تلقائية

### المشاكل المحتملة في تتبع النشاط

1. **عدم استدعاء activityTracker:**
   - المكونات لا تستدعي دوال التتبع
   - التتبع يحدث بعد فوات الأوان
   - الأخطاء تمنع التسجيل

2. **مشاكل في Firestore:**
   - قواعد الأمان تمنع الكتابة
   - مسارات المجموعات خاطئة
   - عدم معالجة الأخطاء

3. **مشاكل في التوقيت:**
   - التتبع يحدث قبل تهيئة Firebase
   - عدم انتظار العمليات غير المتزامنة
   - فقدان الأنشطة عند إغلاق الصفحة

**الحلول:**
- إضافة استدعاءات التتبع في جميع المكونات المناسبة
- استخدام React hooks لتتبع دورة حياة المكون
- إضافة قائمة انتظار محلية للأنشطة
- استخدام beforeunload للمزامنة قبل الإغلاق
- إضافة تسجيل مفصل للتشخيص

## استراتيجية معالجة الأخطاء

### مستويات معالجة الأخطاء

1. **مستوى الواجهة:**
   - عرض رسائل خطأ واضحة للمستخدم
   - توفير خيارات إعادة المحاولة
   - عدم تعطيل الواجهة بالكامل

2. **مستوى الخدمة:**
   - تسجيل الأخطاء بالتفصيل
   - إعادة المحاولة التلقائية (مع backoff)
   - التراجع إلى حالة آمنة

3. **مستوى Firebase:**
   - معالجة أخطاء الشبكة
   - معالجة أخطاء التفويض
   - معالجة أخطاء التخزين

### أنواع الأخطاء ومعالجتها

```typescript
enum ErrorType {
  VALIDATION_ERROR = 'validation_error',
  NETWORK_ERROR = 'network_error',
  STORAGE_ERROR = 'storage_error',
  PERMISSION_ERROR = 'permission_error',
  UNKNOWN_ERROR = 'unknown_error'
}

interface ErrorHandler {
  handleError(error: Error, context: ErrorContext): void;
  shouldRetry(error: Error): boolean;
  getRetryDelay(attemptNumber: number): number;
  logError(error: Error, context: ErrorContext): void;
}

interface ErrorContext {
  operation: string;
  userId?: string;
  metadata?: any;
}
```

### استراتيجية إعادة المحاولة

```typescript
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }
  throw new Error('Max retry attempts reached');
}
```

## الأداء والتحسين

### تحسين رفع الصور

1. **ضغط الصور:**
   - تقليل حجم الصور قبل الرفع
   - إنشاء صور مصغرة للعرض السريع
   - استخدام WebP عند الإمكان

2. **الرفع التدريجي:**
   - عرض شريط التقدم
   - السماح بإلغاء الرفع
   - استئناف الرفع عند الانقطاع

3. **التخزين المؤقت:**
   - تخزين الصور مؤقتاً في المتصفح
   - استخدام CDN لتوزيع الصور
   - تحميل الصور بشكل كسول

### تحسين تتبع النشاط

1. **التجميع:**
   - تجميع الأنشطة المتعددة في طلب واحد
   - إرسال الأنشطة كل 5 ثوان أو عند 10 أنشطة
   - تقليل عدد الكتابات إلى Firestore

2. **التخزين المحلي:**
   - استخدام IndexedDB للتخزين المؤقت
   - المزامنة في الخلفية
   - عدم حظر واجهة المستخدم

3. **الفهرسة:**
   - إنشاء فهارس Firestore للاستعلامات الشائعة
   - تحسين استعلامات البحث
   - استخدام الترقيم للبيانات الكبيرة

## الأمان والخصوصية

### قواعد Firebase Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      // السماح للمستخدم برفع صورته
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
      
      // السماح للمسؤولين بتغيير أي صورة
      allow write: if request.auth != null 
                   && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
      
      // السماح للجميع بقراءة الصور
      allow read: if true;
    }
  }
}
```

### قواعد Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // قواعد ملفات المستخدمين
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && (request.auth.uid == userId 
                       || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // قواعد سجل النشاط
    match /activityLogs/{logId} {
      // السماح للمستخدمين بكتابة أنشطتهم
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid;
      
      // السماح للمسؤولين بقراءة جميع الأنشطة
      allow read: if request.auth != null 
                  && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
      
      // السماح للمستخدمين بقراءة أنشطتهم فقط
      allow read: if request.auth != null 
                  && resource.data.userId == request.auth.uid;
    }
  }
}
```

### حماية البيانات الحساسة

- عدم تسجيل كلمات المرور أو معلومات الدفع
- تشفير البيانات الحساسة قبل التخزين
- تنظيف البيانات قبل التسجيل
- الامتثال لقوانين الخصوصية (GDPR)



## خصائص الصحة

الخاصية هي سمة أو سلوك يجب أن يكون صحيحاً عبر جميع عمليات التنفيذ الصالحة للنظام - في الأساس، بيان رسمي حول ما يجب أن يفعله النظام. تعمل الخصائص كجسر بين المواصفات المقروءة للإنسان وضمانات الصحة القابلة للتحقق آلياً.

### الخاصية 1: التحقق المتسق من صحة الصور

*لأي* ملف يتم رفعه (من جهاز محلي أو مصدر سحابي)، يجب أن يطبق النظام نفس قواعد التحقق: نوع الملف يجب أن يكون (JPEG, PNG, GIF, WebP) والحجم يجب ألا يتجاوز 5MB، وأي ملف لا يستوفي هذه المعايير يجب أن يُرفض مع رسالة خطأ واضحة.

**يتحقق من: المتطلبات 1.1, 1.2, 2.2, 2.3**

### الخاصية 2: التكامل الكامل لرفع الصورة

*لأي* صورة صالحة يتم رفعها بنجاح، يجب أن يحفظ النظام الصورة في Firebase Storage ويحدث رابط الصورة في ملف المستخدم في Firestore، بحيث يكون الرابط المحفوظ في Firestore يشير إلى الصورة الموجودة في Storage.

**يتحقق من: المتطلبات 1.3, 1.4**

### الخاصية 3: التنظيف بعد الإلغاء أو الفشل

*لأي* عملية رفع يتم إلغاؤها أو تفشل، يجب أن ينظف النظام جميع الملفات المؤقتة ويعيد الحالة إلى ما كانت عليه قبل بدء العملية، بحيث لا تبقى ملفات يتيمة في Storage أو الذاكرة المحلية.

**يتحقق من: المتطلبات 3.4, 9.1**

### الخاصية 4: بدء الرفع عند التأكيد

*لأي* صورة يتم معاينتها وتأكيدها من قبل المستخدم، يجب أن يبدأ النظام عملية الرفع فوراً ويعرض شريط التقدم.

**يتحقق من: المتطلبات 3.3**

### الخاصية 5: تسجيل إجراءات المسؤول

*لأي* إجراء يقوم به مسؤول على صورة مستخدم آخر (تغيير أو حذف)، يجب أن يسجل النظام هذا الإجراء في سجل النشاط مع معرف المسؤول ومعرف المستخدم المستهدف والطابع الزمني.

**يتحقق من: المتطلبات 4.2**

### الخاصية 6: حذف الصور القديمة عند التحديث

*لأي* عملية تحديث صورة (من قبل المستخدم أو المسؤول)، إذا كانت هناك صورة قديمة موجودة، يجب أن يحذف النظام الصورة القديمة من Firebase Storage قبل أو بعد حفظ الصورة الجديدة، لتجنب تراكم الملفات غير المستخدمة.

**يتحقق من: المتطلبات 4.3**

### الخاصية 7: الصورة الافتراضية عند الحذف

*لأي* عملية حذف صورة مستخدم، يجب أن يستبدل النظام الصورة المحذوفة برابط صورة افتراضية في ملف المستخدم، بحيث لا يكون حقل الصورة فارغاً أو null.

**يتحقق من: المتطلبات 4.4**

### الخاصية 8: تسجيل شامل للأنشطة

*لأي* نشاط مستخدم (الوصول إلى أداة، توليد نتيجة، تعديل ملف شخصي، تغيير إعدادات، حذف بيانات)، يجب أن يسجل النظام النشاط في Firestore مع معرف المستخدم، نوع النشاط، الطابع الزمني، والبيانات الوصفية المناسبة.

**يتحقق من: المتطلبات 5.1, 6.1, 7.1, 7.2, 7.3, 7.4**

### الخاصية 9: حساب مدة الاستخدام

*لأي* جلسة استخدام أداة، عندما يغادر المستخدم الأداة، يجب أن يحسب النظام المدة بشكل صحيح (وقت الخروج - وقت الدخول) ويسجلها في سجل النشاط.

**يتحقق من: المتطلبات 5.2**

### الخاصية 10: الحفظ الفوري للأنشطة

*لأي* نشاط يتم تسجيله، يجب أن يحفظ النظام السجل في Firestore فوراً (أو يضيفه إلى قائمة الانتظار المحلية إذا كان غير متصل)، بحيث لا تُفقد الأنشطة عند إغلاق الصفحة أو تحديثها.

**يتحقق من: المتطلبات 5.3**

### الخاصية 11: تنظيف البيانات الحساسة

*لأي* نتيجة يتم توليدها وتسجيلها، يجب أن ينظف النظام أي معلومات حساسة (كلمات مرور، معلومات دفع، بيانات صحية خاصة) من الملخص قبل حفظه في سجل النشاط.

**يتحقق من: المتطلبات 6.2**

### الخاصية 12: ربط النتائج بالأنشطة

*لأي* نتيجة يتم توليدها وحفظها، يجب أن يربط النظام النتيجة بسجل النشاط المقابل من خلال معرف مشترك، بحيث يمكن تتبع النتيجة إلى النشاط الذي أنتجها.

**يتحقق من: المتطلبات 6.3**

### الخاصية 13: تسجيل الحذف

*لأي* عملية حذف (نتيجة أو بيانات)، يجب أن يسجل النظام عملية الحذف مع نوع البيانات المحذوفة ومعرفها، بحيث يمكن تتبع من حذف ماذا ومتى.

**يتحقق من: المتطلبات 6.4**

### الخاصية 14: دقة الفلترة والبحث

*لأي* فلتر أو استعلام بحث يطبقه المسؤول على سجل النشاط، يجب أن تطابق جميع النتائج المعروضة معايير الفلتر بالضبط، ولا يجب أن تظهر أي سجلات لا تطابق المعايير.

**يتحقق من: المتطلبات 8.2, 8.3**

### الخاصية 15: الترقيم الصحيح

*لأي* عرض لسجل النشاط يحتوي على أكثر من 50 سجل، يجب أن يوفر النظام ترقيم صفحات بحيث كل صفحة تحتوي على 50 سجل كحد أقصى، وجميع السجلات يمكن الوصول إليها عبر الصفحات.

**يتحقق من: المتطلبات 8.4**

### الخاصية 16: صحة تصدير CSV

*لأي* عملية تصدير لسجل النشاط، يجب أن يولد النظام ملف CSV صالح يحتوي على جميع الحقول المطلوبة (معرف المستخدم، نوع النشاط، الطابع الزمني، البيانات الوصفية) لجميع السجلات المحددة.

**يتحقق من: المتطلبات 8.5**

### الخاصية 17: المرونة في مواجهة الأخطاء

*لأي* فشل في تسجيل النشاط أو الاتصال بـ Firestore، يجب ألا يمنع النظام المستخدم من إكمال عمله الأساسي، ويجب أن يخزن الأنشطة محلياً ويزامنها لاحقاً عند استعادة الاتصال.

**يتحقق من: المتطلبات 5.4, 9.3, 9.5**

### الخاصية 18: التسجيل غير المتزامن

*لأي* عملية تسجيل نشاط، يجب أن تحدث العملية بشكل غير متزامن (في الخلفية) بحيث لا تحظر أو تؤخر استجابة واجهة المستخدم للمستخدم.

**يتحقق من: المتطلبات 10.4**

### الخاصية 19: استخدام التخزين المؤقت للصور

*لأي* صورة يتم تحميلها مرتين أو أكثر في نفس الجلسة، يجب أن يستخدم النظام التخزين المؤقت (cache) لتحميل الصورة من الذاكرة المحلية بدلاً من تحميلها من Firebase Storage مرة أخرى.

**يتحقق من: المتطلبات 10.5**

## استراتيجية الاختبار

### نهج الاختبار المزدوج

سنستخدم نهجاً مزدوجاً للاختبار يجمع بين:

1. **اختبارات الوحدة (Unit Tests)**: للتحقق من أمثلة محددة، حالات حدية، وشروط الأخطاء
2. **اختبارات الخصائص (Property-Based Tests)**: للتحقق من الخصائص العامة عبر جميع المدخلات

كلا النوعين ضروريان ومكملان لبعضهما:
- اختبارات الوحدة تركز على حالات محددة وتكامل المكونات
- اختبارات الخصائص تتعامل مع تغطية شاملة للمدخلات من خلال التوليد العشوائي

### توازن اختبارات الوحدة

- اختبارات الوحدة مفيدة للأمثلة المحددة والحالات الحدية
- تجنب كتابة الكثير من اختبارات الوحدة - اختبارات الخصائص تتعامل مع تغطية الكثير من المدخلات
- يجب أن تركز اختبارات الوحدة على:
  - أمثلة محددة توضح السلوك الصحيح
  - نقاط التكامل بين المكونات
  - الحالات الحدية وشروط الأخطاء
- يجب أن تركز اختبارات الخصائص على:
  - الخصائص العامة التي تنطبق على جميع المدخلات
  - التغطية الشاملة للمدخلات من خلال التوليد العشوائي

### مكتبة اختبار الخصائص

سنستخدم **fast-check** لـ TypeScript/JavaScript لاختبار الخصائص.

### تكوين اختبارات الخصائص

- كل اختبار خاصية يجب أن يعمل لـ **100 تكرار كحد أدنى** (بسبب التوليد العشوائي)
- كل اختبار خاصية يجب أن يشير إلى خاصية وثيقة التصميم الخاصة به
- صيغة الوسم: **Feature: user-profile-and-activity-tracking, Property {رقم}: {نص الخاصية}**
- كل خاصية صحة يجب أن تُنفذ بواسطة اختبار خاصية واحد

### أمثلة على اختبارات الخصائص

#### مثال 1: التحقق المتسق من صحة الصور

```typescript
// Feature: user-profile-and-activity-tracking, Property 1: التحقق المتسق من صحة الصور
describe('Avatar Upload Validation', () => {
  it('should consistently validate images from any source', () => {
    fc.assert(
      fc.property(
        fc.record({
          file: fc.oneof(
            fc.constant({ type: 'image/jpeg', size: 1024 * 1024 }), // 1MB
            fc.constant({ type: 'image/png', size: 2 * 1024 * 1024 }), // 2MB
            fc.constant({ type: 'image/gif', size: 3 * 1024 * 1024 }), // 3MB
            fc.constant({ type: 'image/webp', size: 4 * 1024 * 1024 }), // 4MB
            fc.constant({ type: 'image/bmp', size: 1024 * 1024 }), // Invalid type
            fc.constant({ type: 'image/jpeg', size: 6 * 1024 * 1024 }), // Too large
          ),
          source: fc.constantFrom('local', 'google-drive', 'cloud')
        }),
        ({ file, source }) => {
          const result = avatarService.validateImageFile(file);
          
          const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
          const isValidSize = file.size <= 5 * 1024 * 1024;
          
          if (isValidType && isValidSize) {
            expect(result.isValid).toBe(true);
          } else {
            expect(result.isValid).toBe(false);
            expect(result.error).toBeDefined();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### مثال 2: تسجيل شامل للأنشطة

```typescript
// Feature: user-profile-and-activity-tracking, Property 8: تسجيل شامل للأنشطة
describe('Activity Tracking', () => {
  it('should log all user activities with correct metadata', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          userId: fc.uuid(),
          activityType: fc.constantFrom(
            'tool_access',
            'result_generation',
            'profile_change',
            'settings_change',
            'data_deletion'
          ),
          metadata: fc.object()
        }),
        async ({ userId, activityType, metadata }) => {
          const beforeCount = await getActivityCount(userId);
          
          await activityTracker.trackActivity(userId, activityType, metadata);
          
          const afterCount = await getActivityCount(userId);
          expect(afterCount).toBe(beforeCount + 1);
          
          const latestActivity = await getLatestActivity(userId);
          expect(latestActivity.userId).toBe(userId);
          expect(latestActivity.activityType).toBe(activityType);
          expect(latestActivity.timestamp).toBeDefined();
          expect(latestActivity.metadata).toEqual(metadata);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

#### مثال 3: دقة الفلترة والبحث

```typescript
// Feature: user-profile-and-activity-tracking, Property 14: دقة الفلترة والبحث
describe('Activity Log Filtering', () => {
  it('should return only activities matching the filter', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            userId: fc.uuid(),
            activityType: fc.constantFrom('tool_access', 'result_generation', 'profile_change'),
            timestamp: fc.date()
          }),
          { minLength: 10, maxLength: 100 }
        ),
        fc.uuid(),
        async (activities, targetUserId) => {
          // Insert activities
          await Promise.all(activities.map(a => insertActivity(a)));
          
          // Filter by user
          const filtered = await activityLog.filterByUser(targetUserId);
          
          // All results should match the filter
          filtered.forEach(activity => {
            expect(activity.userId).toBe(targetUserId);
          });
          
          // Count should match
          const expectedCount = activities.filter(a => a.userId === targetUserId).length;
          expect(filtered.length).toBe(expectedCount);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### اختبارات الوحدة

بالإضافة إلى اختبارات الخصائص، سنكتب اختبارات وحدة لـ:

1. **أمثلة محددة:**
   - رفع صورة JPEG صالحة بحجم 2MB
   - رفع صورة PNG بحجم 5MB بالضبط (حالة حدية)
   - محاولة رفع ملف PDF (نوع غير صالح)
   - محاولة رفع صورة بحجم 6MB (حجم غير صالح)

2. **تكامل المكونات:**
   - التكامل بين AvatarUpload Component و avatarService
   - التكامل بين activityTracker و Firestore
   - التكامل بين Admin API و activityTracker

3. **معالجة الأخطاء:**
   - فشل الاتصال بـ Firebase Storage
   - فشل الكتابة إلى Firestore
   - انقطاع الشبكة أثناء الرفع
   - أخطاء التفويض

4. **حالات حدية:**
   - رفع صورة بحجم 0 بايت
   - رفع صورة بحجم 5MB بالضبط
   - تسجيل نشاط بدون بيانات وصفية
   - عرض سجل نشاط فارغ

### استراتيجية التشخيص

لتسهيل تشخيص المشاكل الحالية والمستقبلية:

1. **تسجيل مفصل:**
   - تسجيل جميع عمليات الرفع (بداية، تقدم، نجاح، فشل)
   - تسجيل جميع محاولات تسجيل النشاط
   - تسجيل جميع الأخطاء مع السياق الكامل

2. **مراقبة:**
   - مراقبة معدل نجاح رفع الصور
   - مراقبة معدل نجاح تسجيل الأنشطة
   - مراقبة أوقات الاستجابة

3. **اختبارات التكامل:**
   - اختبار التكامل الكامل من الواجهة إلى Firebase
   - اختبار السيناريوهات الواقعية
   - اختبار معالجة الأخطاء

### خطة التنفيذ

1. **المرحلة 1: التشخيص**
   - فحص الكود الحالي
   - تحديد المشاكل الدقيقة
   - إضافة تسجيل مفصل

2. **المرحلة 2: الإصلاح**
   - إصلاح مشاكل رفع الصورة
   - إصلاح مشاكل تتبع النشاط
   - إضافة معالجة شاملة للأخطاء

3. **المرحلة 3: الاختبار**
   - كتابة اختبارات الخصائص
   - كتابة اختبارات الوحدة
   - التحقق من جميع الخصائص

4. **المرحلة 4: التحسين**
   - تحسين الأداء
   - إضافة التخزين المؤقت
   - تحسين تجربة المستخدم
