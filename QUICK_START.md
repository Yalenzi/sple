# دليل البدء السريع - PharmaQuest

## 🚀 تشغيل التطبيق في 3 خطوات

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. تشغيل الخادم التطويري
```bash
npm run dev
```

### 3. فتح التطبيق
افتح [http://localhost:3000](http://localhost:3000) في المتصفح

## 📱 الصفحات المتاحة

- **الصفحة الرئيسية**: `/` - لوحة التحكم الرئيسية مع الأقسام الستة
- **الاختبارات**: 
  - `/quiz/pharmaceutical` - العلوم الصيدلانية
  - `/quiz/clinical` - العلوم السريرية
  - `/quiz/basic-medical` - العلوم الطبية الأساسية
  - `/quiz/social` - العلوم الاجتماعية والسلوكية
- **الحاسبات**: `/calculator` - حاسبات الجرعات والتراكيز
- **الكيمياء**: `/chemistry` - مخططات التراكيب الكيميائية
- **الملف الشخصي**: `/profile` - تتبع التقدم والإحصائيات
- **الإعدادات**: `/settings` - إعدادات التطبيق
- **لوحة الإدارة**: `/admin` - إدارة الأسئلة والمستخدمين

## 🎯 الميزات الجاهزة للاستخدام

### ✅ نظام الاختبارات
- أسئلة متعددة الخيارات مع تفسيرات
- تتبع الوقت والنتائج
- تغذية راجعة فورية

### ✅ الحاسبات التفاعلية
- حاسبة الجرعات
- حاسبة التراكيز
- محول الوحدات

### ✅ نظام التقدم
- إحصائيات مفصلة
- رسوم بيانية للأداء
- تحليل نقاط القوة والضعف

### ✅ لوحة تحكم الإدارة
- إضافة/تحديث/حذف الأسئلة
- استيراد/تصدير البيانات
- إحصائيات النظام

## 🔧 إضافة أسئلة جديدة

### طريقة 1: عبر واجهة الإدارة
1. اذهب إلى `/admin`
2. اضغط "إضافة سؤال جديد"
3. املأ البيانات واحفظ

### طريقة 2: استيراد ملف JSON
1. أنشئ ملف JSON بالتنسيق المطلوب:
```json
{
  "0": {
    "question_text": "نص السؤال؟",
    "option_a": "الخيار أ",
    "option_b": "الخيار ب", 
    "option_c": "الخيار ج",
    "option_d": "الخيار د",
    "correct_choice": "A",
    "rationale": "تفسير الإجابة الصحيحة",
    "subject": "Pharmaceutical Sciences",
    "exam_id": "SPLE2024",
    "examname": "SPLE",
    "file_name": "2024"
  }
}
```
2. اذهب إلى `/admin`
3. اضغط "استيراد" واختر الملف

## 🎨 تخصيص المظهر

### تغيير الألوان
عدل الألوان في `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
    // ...
  }
}
```

### إضافة لغة جديدة
أضف الترجمات في `src/providers/LanguageProvider.tsx`

## 📊 البيانات الافتراضية

التطبيق يأتي مع:
- **20 سؤال نموذجي** في ملف `public/data/questions.json`
- أسئلة موزعة على الأقسام الستة
- بيانات تقدم وهمية
- 3 مركبات كيميائية للعرض

### 📍 مكان ملف الأسئلة
```
public/data/questions.json
```

### 📋 إضافة أسئلة جديدة
راجع ملف [QUESTIONS_GUIDE.md](QUESTIONS_GUIDE.md) للتفاصيل الكاملة.

## 🔍 استكشاف الأخطاء

### المشكلة: التطبيق لا يعمل
```bash
# تأكد من إصدار Node.js
node --version  # يجب أن يكون 18+

# امسح node_modules وأعد التثبيت
rm -rf node_modules package-lock.json
npm install
```

### المشكلة: خطأ في الخطوط
تأكد من اتصال الإنترنت لتحميل خطوط Google Fonts

### المشكلة: البيانات لا تُحفظ
البيانات تُحفظ في localStorage - تأكد من تفعيل JavaScript

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع ملف README.md الكامل
2. تحقق من console المتصفح للأخطاء
3. تأكد من تثبيت جميع التبعيات

---

**نصيحة**: ابدأ بإضافة أسئلة في قسم واحد أولاً لتجربة النظام قبل إضافة المحتوى الكامل.
