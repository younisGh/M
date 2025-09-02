import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <section className="grid gap-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-extrabold">سياسة الخصوصية</h1>
      </div>
      <div className="space-y-4 rounded-2xl border bg-card p-4 leading-7 text-sm text-foreground/80">
        <p>
          نحترم خصوصيتك ونسعى لحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع
          معلوماتك واستخدامها ومشاركتها عند استخدامك لمنصّة محترف.
        </p>
        <h2 className="text-lg font-bold">المعلومات التي نجمعها</h2>
        <ul className="list-disc pr-6">
          <li>
            معلومات الحساب الأساسية مثل الاسم ورقم الهاتف والبريد الإلكتروني.
          </li>
          <li>محتوى المنشورات والتعليقات والرسائل داخل المنصّة.</li>
          <li>
            بيانات الاستخدام مثل الصفحات التي تزورها وإجراءاتك داخل التطبيق.
          </li>
        </ul>
        <h2 className="text-lg font-bold">كيفية استخدام المعلومات</h2>
        <ul className="list-disc pr-6">
          <li>تقديم الخدمات وتحسين الأداء وتجربة المستخدم.</li>
          <li>
            حماية الحسابات ومنع إساءة الاستخدام والامتثال للمتطلبات القانونية.
          </li>
          <li>إرسال إشعارات متعلقة بالخدمة وتحديثات المزايا.</li>
        </ul>
        <h2 className="text-lg font-bold">مشاركة البيانات</h2>
        <p>
          لا نشارك بياناتك مع أطراف ثالثة إلا عند الضرورة لتقديم الخدمة أو
          بموافقتك أو للالتزام بالقانون. نحرص على تطبيق إجراءات أمان مناسبة
          لحماية بياناتك.
        </p>
        <h2 className="text-lg font-bold">حقوقك</h2>
        <ul className="list-disc pr-6">
          <li>الوصول إلى بياناتك وتحديثها أو حذفها متى ما رغبت.</li>
          <li>إلغاء الاشتراك في الرسائل التسويقية.</li>
          <li>طلب نسخة من بياناتك أو تقييد معالجتها وفقاً للقانون.</li>
        </ul>
        <p className="text-foreground/60">
          لأي استفسار حول الخصوصية تواصل معنا عبر صفحة الدعم داخل التطبيق.
        </p>
      </div>
    </section>
  );
}
