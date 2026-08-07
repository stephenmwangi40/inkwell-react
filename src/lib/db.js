const DB_KEY = "inkwell_db_v3";

/** $0.04 per word */
export const WORD_RATE = 0.04;
export const WORDS_PER_PAGE = 250;

export function priceFromWords(words) {
  const w = Math.max(0, Number(words) || 0);
  return Math.round(w * WORD_RATE * 100) / 100;
}

export function priceFromPages(pages) {
  return priceFromWords((Number(pages) || 0) * WORDS_PER_PAGE);
}

export function seedDB() {
  return {
    writerAuth: { username: "admin", password: "writer123", secret: "first pet" },
    session: { customerEmail: null, writerIn: false },
    customers: [
      { id: "c1", name: "Amara Chen", email: "amara@brightleaf.co", password: "demo1234", joined: "2026-03-02", avatarColor: "#007BFF", company: "Brightleaf Co." },
      { id: "c2", name: "Deacon Frost", email: "deacon@northline.io", password: "demo1234", joined: "2026-04-11", avatarColor: "#6C757D", company: "Northline" },
      { id: "c3", name: "Priya Nair", email: "priya@quillworks.com", password: "demo1234", joined: "2026-05-19", avatarColor: "#FFD700", company: "Quillworks" },
    ],
    orders: [
      { id: "ORD-1042", customerId: "c1", title: "Series A pitch narrative", type: "Business Copy", pages: 6, words: 1500, deadline: "2026-08-10", price: 60, status: "drafting", createdAt: "2026-08-01", notes: "" },
      { id: "ORD-1041", customerId: "c2", title: "Market research whitepaper", type: "Research Report", pages: 14, words: 3500, deadline: "2026-08-06", price: 140, status: "review", createdAt: "2026-07-28", notes: "" },
      { id: "ORD-1039", customerId: "c3", title: "Brand voice style guide", type: "Brand Copy", pages: 9, words: 2250, deadline: "2026-07-30", price: 90, status: "delivered", createdAt: "2026-07-19", notes: "" },
      { id: "ORD-1037", customerId: "c1", title: "Investor update — Q2", type: "Business Copy", pages: 3, words: 750, deadline: "2026-07-22", price: 30, status: "delivered", createdAt: "2026-07-10", notes: "" },
      { id: "ORD-1044", customerId: "c2", title: "Product launch press kit", type: "PR Copy", pages: 5, words: 1250, deadline: "2026-08-14", price: 50, status: "assigned", createdAt: "2026-08-03", notes: "" },
    ],
    payments: [
      { id: "PAY-9001", customerId: "c1", orderId: "ORD-1037", amount: 30, method: "Visa •••• 4291", date: "2026-07-10", status: "paid" },
      { id: "PAY-9002", customerId: "c3", orderId: "ORD-1039", amount: 90, method: "Mastercard •••• 7735", date: "2026-07-19", status: "paid" },
      { id: "PAY-9003", customerId: "c2", orderId: "ORD-1041", amount: 140, method: "Visa •••• 2280", date: "2026-07-28", status: "paid" },
      { id: "PAY-9004", customerId: "c1", orderId: "ORD-1042", amount: 60, method: "Visa •••• 4291", date: "2026-08-01", status: "pending" },
    ],
    paymentMethods: [
      { id: "pm1", customerId: "c1", brand: "Visa", last4: "4291", exp: "04/29", name: "Amara Chen", default: true },
      { id: "pm2", customerId: "c2", brand: "Visa", last4: "2280", exp: "11/28", name: "Deacon Frost", default: true },
      { id: "pm3", customerId: "c3", brand: "Mastercard", last4: "7735", exp: "08/27", name: "Priya Nair", default: true },
    ],
    messages: [
      { id: "m1", orderId: "ORD-1042", from: "writer", text: "Outline attached — let me know if the framing works before I draft slide copy.", time: "2026-08-02 09:14" },
      { id: "m2", orderId: "ORD-1042", from: "customer", text: "Looks great, please proceed. Can we add a competitor slide?", time: "2026-08-02 11:40" },
    ],
    documents: [],
    revisions: [],
    supportTickets: [],
    blogs: [
      {
        id: "b1",
        title: "How a shared order timeline cuts status meetings",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
        author: "Maya Okoye",
        date: "2026-07-12",
        body: "When client and writer share one status ribbon — Assigned, Drafting, Review, Delivered — the need for check-in calls drops sharply. Here is how we designed that workflow and what teams report after a month on the desk.\n\nStart with a clear brief, assign a specialist, and keep every revision on the same order card. Files and messages stay attached so nothing lives in a lost inbox.",
      },
      {
        id: "b2",
        title: "Pricing writing work by the word without surprises",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
        author: "Theo Marsh",
        date: "2026-06-28",
        body: "Transparent per-word rates help clients budget and writers plan capacity. At $0.04 per word, estimates update as soon as the brief’s length is set.\n\nWe still recommend a short scope call for research-heavy pieces, but the math stays visible on every order.",
      },
      {
        id: "b3",
        title: "What we look for when vetting a new writer",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop",
        author: "Admin Desk",
        date: "2026-05-15",
        body: "Portfolio strength, craft specialty, and response discipline matter more than a long generalist list. Writers who own a category — pitch copy, research, brand voice — deliver more consistent work for clients who return.",
      },
    ],
    samples: [
      {
        id: "s1",
        category: "Business",
        subcategory: "Pitch narrative",
        title: "Series A narrative — fintech",
        paper: "A six-page investor narrative covering problem, solution, market, and traction. Written for a seed-to-Series A fintech raising a growth round. Tone: confident, concrete, free of jargon.",
      },
      {
        id: "s2",
        category: "Research",
        subcategory: "Whitepaper",
        title: "Market whitepaper — B2B SaaS",
        paper: "Fourteen-page research overview with sourced claims, competitive landscape, and recommended positioning for a B2B analytics product entering mid-market.",
      },
      {
        id: "s3",
        category: "Brand",
        subcategory: "Style guide",
        title: "Brand voice style guide",
        paper: "Voice principles, do/don’t examples, and sample web copy for a consumer lifestyle brand expanding into subscription product pages.",
      },
      {
        id: "s4",
        category: "PR",
        subcategory: "Press kit",
        title: "Product launch press kit",
        paper: "Press release, founder bio, boilerplate, and FAQ designed for tech and trade outlets covering a hardware launch.",
      },
    ],
  };
}

export function getDB() {
  let raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    // migrate from v1 if present
    const old = localStorage.getItem("inkwell_db_v1");
    if (old) {
      try {
        const parsed = JSON.parse(old);
        const seeded = seedDB();
        const merged = { ...seeded, ...parsed, paymentMethods: parsed.paymentMethods || seeded.paymentMethods, blogs: parsed.blogs || seeded.blogs, samples: parsed.samples || seeded.samples };
        localStorage.setItem(DB_KEY, JSON.stringify(merged));
        return merged;
      } catch {}
    }
    const seeded = seedDB();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const data = JSON.parse(raw);
    const seeded = seedDB();
    if (!Array.isArray(data.blogs)) data.blogs = seeded.blogs;
    if (!Array.isArray(data.samples)) data.samples = seeded.samples;
    if (!Array.isArray(data.documents)) data.documents = [];
    if (!Array.isArray(data.paymentMethods)) data.paymentMethods = seeded.paymentMethods || [];
    return data;
  } catch {
    const seeded = seedDB();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  try {
    window.dispatchEvent(new Event("inkwell-db-updated"));
  } catch {}
}

export const STATUS_LABELS = {
  assigned: "Assigned",
  drafting: "Drafting",
  review: "In review",
  revision: "Revision",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_COLORS = {
  assigned: "bg-blue-tint text-blue-dark",
  drafting: "bg-amber-50 text-amber-800",
  review: "bg-purple-50 text-purple-800",
  revision: "bg-orange-50 text-orange-800",
  delivered: "bg-green-50 text-green-800",
  cancelled: "bg-red-50 text-red-700",
};

export const STATUS_ORDER = ["assigned", "drafting", "review", "revision", "delivered"];
