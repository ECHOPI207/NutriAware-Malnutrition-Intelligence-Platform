/**
 * Seed 10 realistic survey entries into Firebase
 * Run: node scripts/seedSurvey.mjs
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDi7Ma0He40TVqg6LnbxCwVQIMlnlA_QOk",
    authDomain: "nutriaware-platform-736b1.firebaseapp.com",
    projectId: "nutriaware-platform-736b1",
    storageBucket: "nutriaware-platform-736b1.firebasestorage.app",
    messagingSenderId: "409096977910",
    appId: "1:409096977910:web:1b56bbb7d3880596601bd7",
    measurementId: "G-CQZXB7V223"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper: pick random from array
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Helper: random Likert 1-5 with tendency
const likert = (min = 1, max = 5) => String(Math.floor(Math.random() * (max - min + 1)) + min);
// Helper: positive-leaning likert (3-5)
const posLikert = () => pick(["3", "4", "4", "5", "5"]);
// Helper: mixed likert (2-4)
const mixLikert = () => pick(["2", "3", "3", "4", "4"]);

const RESPONDENTS = [
    {
        // Person 1: أم شابة، طفل صغير، متعلمة
        demographics: {
            parentName: "سارة أحمد محمد",
            relationship: "أم",
            otherRelationship: "",
            parentAge: "25 – 35 سنة",
            education: "جامعي",
            childrenCount: "2-3 أطفال",
            childAge: "3 – 6 سنوات",
        },
        healthIndicators: {
            gender: "ذكر",
            weightPerception: "طبيعي",
            healthIssues: ["لا يعاني من أي مشاكل"],
            otherHealthIssue: "",
            infoSources: ["الأطباء", "الإنترنت"],
            otherInfoSource: "",
        },
        knowledge: { q1: "5", q2: "4", q3: "5", q4: "4", q5: "5" },
        practices: { q1: "4", q2: "5", q3: "4", q4: "5", q5: "3", q6: "5", q7: "2" },
        intervention: {
            stories: { q1: "5", q2: "5", q3: "4", q4: "5", q5: "5" },
            platform: {
                usability: { q1: "5", q2: "4", q3: "5" },
                content: { q1: "5", q2: "5", q3: "4" },
                tools: { q1: "4", q2: "5", q3: "4" },
                consultation: { q1: "4", q2: "5" },
            },
        },
        satisfaction: { q1: "5", q2: "5" },
        behavioralIntent: { q1: "5", q2: "4", q3: "5" },
        retrospective: {
            knowledge: { before: "متوسط", after: "عالٍ" },
            practices: { before: "متوسط", after: "عالٍ" },
        },
        openQuestions: {
            likedMost: "أعجبتني القصص المصورة جداً، طفلي تأثر بقصة الخضروات وبدأ يطلب الخضار بنفسه",
            challenges: "أحياناً الوقت لا يسمح بتحضير وجبات صحية كل يوم",
            suggestions: "إضافة مزيد من القصص المصورة عن الفواكه والحليب",
        },
    },
    {
        // Person 2: أب، طفل أكبر، تعليم ثانوي
        demographics: {
            parentName: "أحمد عبدالله حسن",
            relationship: "أب",
            otherRelationship: "",
            parentAge: "36 – 45 سنة",
            education: "ثانوي",
            childrenCount: "4 أطفال فأكثر",
            childAge: "7 – 10 سنوات",
        },
        healthIndicators: {
            gender: "أنثى",
            weightPerception: "وزن زائد",
            healthIssues: ["نقص فيتامين D"],
            otherHealthIssue: "",
            infoSources: ["الأطباء", "الأهل والأصدقاء"],
            otherInfoSource: "",
        },
        knowledge: { q1: "3", q2: "3", q3: "4", q4: "3", q5: "4" },
        practices: { q1: "3", q2: "4", q3: "3", q4: "4", q5: "2", q6: "4", q7: "3" },
        intervention: {
            stories: { q1: "4", q2: "4", q3: "3", q4: "4", q5: "4" },
            platform: {
                usability: { q1: "3", q2: "3", q3: "4" },
                content: { q1: "4", q2: "4", q3: "3" },
                tools: { q1: "3", q2: "4", q3: "3" },
                consultation: { q1: "3", q2: "4" },
            },
        },
        satisfaction: { q1: "4", q2: "3" },
        behavioralIntent: { q1: "4", q2: "3", q3: "4" },
        retrospective: {
            knowledge: { before: "منخفض", after: "متوسط" },
            practices: { before: "منخفض", after: "متوسط" },
        },
        openQuestions: {
            likedMost: "المنصة سهلة الاستخدام والمعلومات مفيدة عن التغذية",
            challenges: "تكلفة الأغذية الصحية مرتفعة مقارنة بالأكل الجاهز",
            suggestions: "يا ريت توفروا وصفات اقتصادية وسريعة",
        },
    },
    {
        // Person 3: أم كبيرة، طفل رضيع، دراسات عليا
        demographics: {
            parentName: "منى إبراهيم السيد",
            relationship: "أم",
            otherRelationship: "",
            parentAge: "36 – 45 سنة",
            education: "دراسات عليا",
            childrenCount: "طفل واحد",
            childAge: "أقل من 3 سنوات",
        },
        healthIndicators: {
            gender: "أنثى",
            weightPerception: "نحيف جداً",
            healthIssues: ["فقر دم (أنيميا)"],
            otherHealthIssue: "",
            infoSources: ["الأطباء", "الإنترنت", "وسائل التواصل الاجتماعي"],
            otherInfoSource: "",
        },
        knowledge: { q1: "5", q2: "5", q3: "5", q4: "5", q5: "4" },
        practices: { q1: "5", q2: "5", q3: "5", q4: "4", q5: "4", q6: "5", q7: "1" },
        intervention: {
            stories: { q1: "5", q2: "5", q3: "5", q4: "5", q5: "4" },
            platform: {
                usability: { q1: "5", q2: "5", q3: "5" },
                content: { q1: "5", q2: "5", q3: "5" },
                tools: { q1: "5", q2: "5", q3: "5" },
                consultation: { q1: "5", q2: "5" },
            },
        },
        satisfaction: { q1: "5", q2: "5" },
        behavioralIntent: { q1: "5", q2: "5", q3: "5" },
        retrospective: {
            knowledge: { before: "عالٍ", after: "عالٍ" },
            practices: { before: "متوسط", after: "عالٍ" },
        },
        openQuestions: {
            likedMost: "أداة حساب مؤشر كتلة الجسم ممتازة وخطط الوجبات مفصلة ومناسبة لعمر طفلتي",
            challenges: "طفلتي انتقائية في الأكل ولا تقبل أنواع كثيرة",
            suggestions: "إضافة قسم خاص بالأطفال الانتقائيين في الأكل مع نصائح عملية",
        },
    },
    {
        // Person 4: أم شابة جداً، تعليم متوسط
        demographics: {
            parentName: "فاطمة حسين علي",
            relationship: "أم",
            otherRelationship: "",
            parentAge: "أقل من 25 سنة",
            education: "دبلوم متوسط",
            childrenCount: "طفل واحد",
            childAge: "أقل من 3 سنوات",
        },
        healthIndicators: {
            gender: "ذكر",
            weightPerception: "لا أعلم",
            healthIssues: ["لا يعاني من أي مشاكل"],
            otherHealthIssue: "",
            infoSources: ["وسائل التواصل الاجتماعي", "الأهل والأصدقاء"],
            otherInfoSource: "",
        },
        knowledge: { q1: "3", q2: "2", q3: "3", q4: "2", q5: "3" },
        practices: { q1: "3", q2: "3", q3: "2", q4: "3", q5: "2", q6: "3", q7: "4" },
        intervention: {
            stories: { q1: "4", q2: "5", q3: "4", q4: "5", q5: "4" },
            platform: {
                usability: { q1: "4", q2: "4", q3: "4" },
                content: { q1: "4", q2: "5", q3: "4" },
                tools: { q1: "4", q2: "4", q3: "3" },
                consultation: { q1: "4", q2: "4" },
            },
        },
        satisfaction: { q1: "4", q2: "4" },
        behavioralIntent: { q1: "4", q2: "4", q3: "4" },
        retrospective: {
            knowledge: { before: "منخفض", after: "عالٍ" },
            practices: { before: "منخفض", after: "متوسط" },
        },
        openQuestions: {
            likedMost: "القصص كانت حلوة وسهلة الفهم، استفدت من معلومات كتير عن تغذية ابني",
            challenges: "مش بقدر أعمل جدول أكل ثابت عشان مشغولة في الشغل",
            suggestions: "ياريت تضيفوا فيديوهات قصيرة عن طريقة تحضير الأكل الصحي",
        },
    },
    {
        // Person 5: جدة (أخرى)، طفل كبير
        demographics: {
            parentName: "حنان محمود سالم",
            relationship: "أخرى",
            otherRelationship: "جدة",
            parentAge: "أكثر من 45 سنة",
            education: "أقل من ثانوي",
            childrenCount: "4 أطفال فأكثر",
            childAge: "11 – 14 سنة",
        },
        healthIndicators: {
            gender: "ذكر",
            weightPerception: "سمنة مفرطة",
            healthIssues: ["سكري الأطفال", "نقص فيتامين D"],
            otherHealthIssue: "",
            infoSources: ["الأطباء"],
            otherInfoSource: "",
        },
        knowledge: { q1: "2", q2: "2", q3: "3", q4: "2", q5: "3" },
        practices: { q1: "2", q2: "3", q3: "2", q4: "3", q5: "2", q6: "3", q7: "5" },
        intervention: {
            stories: { q1: "3", q2: "3", q3: "3", q4: "4", q5: "3" },
            platform: {
                usability: { q1: "2", q2: "2", q3: "3" },
                content: { q1: "3", q2: "4", q3: "3" },
                tools: { q1: "2", q2: "3", q3: "2" },
                consultation: { q1: "3", q2: "3" },
            },
        },
        satisfaction: { q1: "3", q2: "3" },
        behavioralIntent: { q1: "3", q2: "3", q3: "3" },
        retrospective: {
            knowledge: { before: "منخفض", after: "متوسط" },
            practices: { before: "منخفض", after: "منخفض" },
        },
        openQuestions: {
            likedMost: "الخطط الغذائية كانت مفيدة والمشروع فكرته حلوة",
            challenges: "صعوبة التعامل مع التكنولوجيا والمنصة، عيني ضعيفة والخط صغير",
            suggestions: "تكبير الخط وتبسيط المنصة أكثر لكبار السن",
        },
    },
    {
        // Person 6: أب شاب، طفل متوسط، جامعي
        demographics: {
            parentName: "محمد خالد عبدالرحمن",
            relationship: "أب",
            otherRelationship: "",
            parentAge: "25 – 35 سنة",
            education: "جامعي",
            childrenCount: "2-3 أطفال",
            childAge: "3 – 6 سنوات",
        },
        healthIndicators: {
            gender: "أنثى",
            weightPerception: "طبيعي",
            healthIssues: ["حساسية طعام"],
            otherHealthIssue: "حساسية من الفول السوداني",
            infoSources: ["الإنترنت", "الأطباء", "المدرسة"],
            otherInfoSource: "",
        },
        knowledge: { q1: "4", q2: "4", q3: "4", q4: "3", q5: "4" },
        practices: { q1: "4", q2: "4", q3: "4", q4: "4", q5: "3", q6: "4", q7: "2" },
        intervention: {
            stories: { q1: "5", q2: "4", q3: "4", q4: "4", q5: "5" },
            platform: {
                usability: { q1: "5", q2: "5", q3: "4" },
                content: { q1: "4", q2: "4", q3: "5" },
                tools: { q1: "5", q2: "5", q3: "4" },
                consultation: { q1: "4", q2: "4" },
            },
        },
        satisfaction: { q1: "5", q2: "4" },
        behavioralIntent: { q1: "4", q2: "5", q3: "4" },
        retrospective: {
            knowledge: { before: "متوسط", after: "عالٍ" },
            practices: { before: "متوسط", after: "عالٍ" },
        },
        openQuestions: {
            likedMost: "خاصية حساب BMI والذكاء الاصطناعي اللي بيقترح الأكل المناسب",
            challenges: "بنتي عندها حساسية أكل ومش كل الأكلات المقترحة مناسبة ليها",
            suggestions: "إضافة فلتر لاستبعاد الأطعمة المسببة للحساسية من خطط الوجبات",
        },
    },
    {
        // Person 7: أم، تعليم ثانوي، طفلين
        demographics: {
            parentName: "نور الهدى عمر",
            relationship: "أم",
            otherRelationship: "",
            parentAge: "25 – 35 سنة",
            education: "ثانوي",
            childrenCount: "2-3 أطفال",
            childAge: "7 – 10 سنوات",
        },
        healthIndicators: {
            gender: "ذكر",
            weightPerception: "نحيف جداً",
            healthIssues: ["فقر دم (أنيميا)", "نقص فيتامين D"],
            otherHealthIssue: "",
            infoSources: ["الإنترنت", "وسائل التواصل الاجتماعي"],
            otherInfoSource: "",
        },
        knowledge: { q1: "3", q2: "3", q3: "4", q4: "3", q5: "3" },
        practices: { q1: "3", q2: "4", q3: "3", q4: "3", q5: "3", q6: "4", q7: "4" },
        intervention: {
            stories: { q1: "4", q2: "5", q3: "4", q4: "5", q5: "4" },
            platform: {
                usability: { q1: "4", q2: "4", q3: "4" },
                content: { q1: "5", q2: "4", q3: "4" },
                tools: { q1: "4", q2: "4", q3: "4" },
                consultation: { q1: "4", q2: "5" },
            },
        },
        satisfaction: { q1: "4", q2: "5" },
        behavioralIntent: { q1: "5", q2: "4", q3: "4" },
        retrospective: {
            knowledge: { before: "منخفض", after: "عالٍ" },
            practices: { before: "منخفض", after: "متوسط" },
        },
        openQuestions: {
            likedMost: "القصص المصورة خلت ابني يفهم ليه لازم ياكل خضار وفواكه",
            challenges: "ابني بيرفض الأكل الصحي وبيفضل الشيبسي والحلويات",
            suggestions: "إضافة قصص عن أضرار الأكل الجاهز والمشروبات الغازية",
        },
    },
    {
        // Person 8: أب كبير، دراسات عليا، طفل مراهق
        demographics: {
            parentName: "عبدالرحمن يوسف إبراهيم",
            relationship: "أب",
            otherRelationship: "",
            parentAge: "أكثر من 45 سنة",
            education: "دراسات عليا",
            childrenCount: "2-3 أطفال",
            childAge: "أكبر من 14 سنة",
        },
        healthIndicators: {
            gender: "ذكر",
            weightPerception: "طبيعي",
            healthIssues: ["لا يعاني من أي مشاكل"],
            otherHealthIssue: "",
            infoSources: ["الأطباء", "الإنترنت", "المدرسة"],
            otherInfoSource: "",
        },
        knowledge: { q1: "5", q2: "5", q3: "4", q4: "5", q5: "5" },
        practices: { q1: "5", q2: "5", q3: "5", q4: "5", q5: "4", q6: "5", q7: "1" },
        intervention: {
            stories: { q1: "4", q2: "3", q3: "4", q4: "5", q5: "4" },
            platform: {
                usability: { q1: "5", q2: "5", q3: "5" },
                content: { q1: "5", q2: "5", q3: "5" },
                tools: { q1: "5", q2: "5", q3: "5" },
                consultation: { q1: "5", q2: "5" },
            },
        },
        satisfaction: { q1: "5", q2: "5" },
        behavioralIntent: { q1: "5", q2: "5", q3: "5" },
        retrospective: {
            knowledge: { before: "عالٍ", after: "عالٍ" },
            practices: { before: "عالٍ", after: "عالٍ" },
        },
        openQuestions: {
            likedMost: "المنصة شاملة ومتكاملة، الذكاء الاصطناعي يعطي إجابات دقيقة ومفيدة",
            challenges: "ابني المراهق ما يتقبل النصائح بسهولة ويفضل الأكل مع أصحابه",
            suggestions: "إضافة محتوى موجه للمراهقين مباشرة وليس فقط لأولياء الأمور",
        },
    },
    {
        // Person 9: أم، تعليم جامعي، 3 أطفال
        demographics: {
            parentName: "ريم عادل محمود",
            relationship: "أم",
            otherRelationship: "",
            parentAge: "36 – 45 سنة",
            education: "جامعي",
            childrenCount: "2-3 أطفال",
            childAge: "3 – 6 سنوات",
        },
        healthIndicators: {
            gender: "ذكر",
            weightPerception: "طبيعي",
            healthIssues: ["لا يعاني من أي مشاكل"],
            otherHealthIssue: "",
            infoSources: ["الإنترنت", "الأطباء"],
            otherInfoSource: "",
        },
        knowledge: { q1: "4", q2: "4", q3: "5", q4: "4", q5: "4" },
        practices: { q1: "4", q2: "5", q3: "4", q4: "4", q5: "3", q6: "5", q7: "2" },
        intervention: {
            stories: { q1: "5", q2: "5", q3: "5", q4: "5", q5: "5" },
            platform: {
                usability: { q1: "4", q2: "5", q3: "4" },
                content: { q1: "5", q2: "4", q3: "5" },
                tools: { q1: "4", q2: "5", q3: "4" },
                consultation: { q1: "5", q2: "4" },
            },
        },
        satisfaction: { q1: "5", q2: "5" },
        behavioralIntent: { q1: "5", q2: "4", q3: "5" },
        retrospective: {
            knowledge: { before: "متوسط", after: "عالٍ" },
            practices: { before: "متوسط", after: "عالٍ" },
        },
        openQuestions: {
            likedMost: "القصص جميلة جداً وأولادي بيحبوها، وأداة تقييم الوجبات ممتازة",
            challenges: "لا يوجد تحديات كبيرة الحمد لله",
            suggestions: "ممكن تضيفوا تطبيق موبايل عشان يكون أسهل في الاستخدام",
        },
    },
    {
        // Person 10: أم، تعليم متوسط، 4+ أطفال
        demographics: {
            parentName: "هدى سعيد عبدالعزيز",
            relationship: "أم",
            otherRelationship: "",
            parentAge: "36 – 45 سنة",
            education: "دبلوم متوسط",
            childrenCount: "4 أطفال فأكثر",
            childAge: "7 – 10 سنوات",
        },
        healthIndicators: {
            gender: "أنثى",
            weightPerception: "وزن زائد",
            healthIssues: ["فقر دم (أنيميا)"],
            otherHealthIssue: "",
            infoSources: ["الأهل والأصدقاء", "وسائل التواصل الاجتماعي", "الأطباء"],
            otherInfoSource: "",
        },
        knowledge: { q1: "3", q2: "3", q3: "3", q4: "3", q5: "4" },
        practices: { q1: "3", q2: "3", q3: "3", q4: "4", q5: "2", q6: "4", q7: "4" },
        intervention: {
            stories: { q1: "4", q2: "4", q3: "4", q4: "5", q5: "4" },
            platform: {
                usability: { q1: "3", q2: "4", q3: "3" },
                content: { q1: "4", q2: "4", q3: "4" },
                tools: { q1: "3", q2: "4", q3: "3" },
                consultation: { q1: "4", q2: "4" },
            },
        },
        satisfaction: { q1: "4", q2: "4" },
        behavioralIntent: { q1: "4", q2: "4", q3: "4" },
        retrospective: {
            knowledge: { before: "منخفض", after: "متوسط" },
            practices: { before: "منخفض", after: "متوسط" },
        },
        openQuestions: {
            likedMost: "استفدت كتير من معلومات الأنيميا وعرفت أكلات ترفع الحديد",
            challenges: "تكلفة الأكل الصحي مع 4 أطفال صعبة على ميزانية الأسرة",
            suggestions: "ياريت تعملوا قائمة بأكلات صحية رخيصة ومناسبة للأسر الكبيرة",
        },
    },
];

async function seed() {
    console.log("🌱 Starting to seed 10 survey entries...\n");

    for (let i = 0; i < RESPONDENTS.length; i++) {
        const person = RESPONDENTS[i];
        try {
            const docRef = await addDoc(collection(db, "project_evaluations"), {
                consent: true,
                ...person,
                createdAt: Timestamp.now(),
                userAgent: "Mozilla/5.0 (seed-script)",
                language: "ar",
            });
            console.log(`✅ [${i + 1}/10] ${person.demographics.parentName} → ID: ${docRef.id}`);
        } catch (err) {
            console.error(`❌ [${i + 1}/10] Failed for ${person.demographics.parentName}:`, err.message);
        }
    }

    console.log("\n🎉 Done! 10 entries seeded.");
    process.exit(0);
}

seed();
