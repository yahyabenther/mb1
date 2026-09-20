import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../hooks/useProjects";
import { useTestimonials } from "../../hooks/useTestimonials";
import ProjectForm from "./ProjectForm";
import TestimonialForm from "./TestimonialForm";
import type { FirestoreProject, FirestoreTestimonial } from "../../types/firestore";

const seedProjects: Omit<FirestoreProject, "id">[] = [
  {
    slug: "car-marketplace",
    number: "01",
    title: { en: "Car Marketplace", ar: "سوق بيع السيارات" },
    description: {
      en: "A complete marketplace platform for buying and selling vehicles, with search, filters, authentication, favorites and real-time messaging.",
      ar: "منصة سوق متكاملة لبيع وشراء السيارات، تتضمن البحث والفلاتر وتسجيل الدخول والمفضلة والمراسلة الفورية.",
    },
    category: { en: "Web Application", ar: "تطبيق ويب" },
    technologies: ["React", "Node.js", "MySQL", "Socket.io"],
    gradient: "from-[#1824A8] via-[#243BFF] to-[#635BFF]",
    iconKey: "car",
    images: [],
    liveUrl: "https://example.com",
    statLabel: { en: "Active listings", ar: "إعلانات نشطة" },
    statValue: "1,204",
    brief: {
      en: "The client had a static listings page with no way to filter inventory, no accounts, and no way for buyers and sellers to talk to each other directly.",
      ar: "كان لدى العميل صفحة إعلانات ثابتة بدون إمكانية فلترة المخزون، وبدون حسابات مستخدمين.",
    },
    approach: {
      en: "We rebuilt the platform around a proper search index with faceted filters, added authentication and saved favorites, and layered in real-time messaging.",
      ar: "أعدنا بناء المنصة حول فهرس بحث حقيقي مع فلاتر متعددة، وأضفنا تسجيل الدخول ومراسلة فورية.",
    },
    results: [
      { label: { en: "Active listings", ar: "إعلانات نشطة" }, value: "1,204" },
      { label: { en: "Avg. time to list", ar: "متوسط وقت النشر" }, value: "3 min" },
    ],
  },
  {
    slug: "ecommerce-platform",
    number: "02",
    title: { en: "E-commerce Platform", ar: "منصة تجارة إلكترونية" },
    description: {
      en: "A modern online store designed to help businesses manage products, customers and orders from one powerful platform.",
      ar: "متجر إلكتروني حديث لإدارة المنتجات والعملاء والطلبات من منصة واحدة.",
    },
    category: { en: "E-commerce", ar: "تجارة إلكترونية" },
    technologies: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-[#102A43] via-[#164E63] to-[#0F766E]",
    iconKey: "shopping-bag",
    images: [],
    liveUrl: "https://example.com",
    statLabel: { en: "Orders processed", ar: "طلبات تمت معالجتها" },
    statValue: "8,940",
    brief: {
      en: "Orders, inventory and customer data were split across spreadsheets and a third-party checkout tool.",
      ar: "كانت الطلبات والمخزون موزعة بين جداول بيانات وأداة دفع خارجية.",
    },
    approach: {
      en: "We built a single platform covering catalog management, checkout and order fulfillment.",
      ar: "بنينا منصة واحدة تغطي إدارة المنتجات والدفع وتنفيذ الطلبات.",
    },
    results: [
      { label: { en: "Orders processed", ar: "طلبات تمت معالجتها" }, value: "8,940" },
      { label: { en: "Checkout time", ar: "وقت الدفع" }, value: "-40%" },
    ],
  },
  {
    slug: "business-management",
    number: "03",
    title: { en: "Business Management", ar: "إدارة الأعمال" },
    description: {
      en: "Custom management software that helps businesses organize their daily operations, data and workflows.",
      ar: "برنامج إدارة مخصص لتنظيم العمليات اليومية والبيانات وسير العمل.",
    },
    category: { en: "Custom Software", ar: "برمجيات مخصصة" },
    technologies: [".NET", "Angular", "PostgreSQL"],
    gradient: "from-[#30115E] via-[#5B21B6] to-[#7C3AED]",
    iconKey: "bar-chart",
    images: [],
    liveUrl: "https://example.com",
    statLabel: { en: "Hours saved / mo", ar: "ساعات موفّرة شهريًا" },
    statValue: "120+",
    brief: {
      en: "Day-to-day operations were tracked across email threads and disconnected tools.",
      ar: "كانت العمليات اليومية تُتابع عبر رسائل بريد إلكتروني وأدوات منفصلة.",
    },
    approach: {
      en: "We designed a single internal dashboard around the team's existing workflow.",
      ar: "صممنا لوحة تحكم داخلية واحدة تتماشى مع سير عمل الفريق الحالي.",
    },
    results: [
      { label: { en: "Hours saved / mo", ar: "ساعات موفّرة شهريًا" }, value: "120+" },
      { label: { en: "Teams onboarded", ar: "فرق تم تفعيلها" }, value: "6" },
    ],
  },
];

const seedTestimonials: Omit<FirestoreTestimonial, "id">[] = [
  {
    quote: {
      en: "They didn't just build what we asked for — they pushed back on a couple of ideas that would've caused problems later, and they were right both times.",
      ar: "لم يكتفوا ببناء ما طلبناه فقط — بل اعترضوا على بعض الأفكار التي كانت ستسبب مشاكل لاحقًا، وكانوا محقين في المرتين.",
    },
    author: "Sarah Chen",
    role: { en: "Founder, Marketplace client", ar: "مؤسسة، عميل منصة تسويق" },
    featured: true,
  },
  {
    quote: {
      en: "Fast, communicative, and the code quality was noticeably better than the last agency we used.",
      ar: "سرعة وتواصل ممتازان، وجودة الكود كانت أفضل بشكل ملحوظ.",
    },
    author: "David Okafor",
    role: { en: "Operations Lead", ar: "مسؤول العمليات" },
    featured: false,
  },
];

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"projects" | "testimonials">("projects");
  const [seeding, setSeeding] = useState(false);

  const { projects } = useProjects();
  const { testimonials } = useTestimonials();

  const [editingProject, setEditingProject] = useState<FirestoreProject | "new" | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<FirestoreTestimonial | "new" | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const handleSeed = async () => {
    if (!confirm("Add the 3 sample projects and 2 sample testimonials to Firestore?")) return;
    setSeeding(true);
    try {
      for (const p of seedProjects) await addDoc(collection(db, "projects"), p);
      for (const t of seedTestimonials) await addDoc(collection(db, "testimonials"), t);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Admin</h1>
          <button onClick={handleLogout} className="text-sm text-white/50 hover:text-white">
            Log out
          </button>
        </div>

        {projects.length === 0 && (
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="mt-6 rounded-xl border border-[#35D6B0]/40 px-5 py-2.5 text-sm text-[#35D6B0] hover:bg-[#35D6B0]/10 disabled:opacity-50"
          >
            {seeding ? "Seeding…" : "Seed sample data (first-time setup)"}
          </button>
        )}

        <div className="mt-8 flex gap-2">
          <button
            onClick={() => setTab("projects")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === "projects" ? "bg-[#35D6B0] text-[#080B2A]" : "border border-white/20 text-white/70"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setTab("testimonials")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === "testimonials" ? "bg-[#35D6B0] text-[#080B2A]" : "border border-white/20 text-white/70"
            }`}
          >
            Testimonials
          </button>
        </div>

        {tab === "projects" && (
          <div className="mt-8 space-y-4">
            <button onClick={() => setEditingProject("new")} className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white hover:border-white">
              + Add project
            </button>

            {editingProject && (
              <ProjectForm project={editingProject === "new" ? null : editingProject} onDone={() => setEditingProject(null)} />
            )}

            {!editingProject &&
              projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div>
                    <p className="font-semibold text-white">{p.title.en}</p>
                    <p className="text-sm text-white/50">{p.slug}</p>
                  </div>
                  <button onClick={() => setEditingProject(p)} className="text-sm text-[#35D6B0] hover:underline">
                    Edit
                  </button>
                </div>
              ))}
          </div>
        )}

        {tab === "testimonials" && (
          <div className="mt-8 space-y-4">
            <button onClick={() => setEditingTestimonial("new")} className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white hover:border-white">
              + Add testimonial
            </button>

            {editingTestimonial && (
              <TestimonialForm testimonial={editingTestimonial === "new" ? null : editingTestimonial} onDone={() => setEditingTestimonial(null)} />
            )}

            {!editingTestimonial &&
              testimonials.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div>
                    <p className="font-semibold text-white">{t.author}</p>
                    <p className="line-clamp-1 text-sm text-white/50">{t.quote.en}</p>
                  </div>
                  <button onClick={() => setEditingTestimonial(t)} className="text-sm text-[#35D6B0] hover:underline">
                    Edit
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;