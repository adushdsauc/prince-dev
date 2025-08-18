export const metadata = {
    title: "Forums",
    description: "Discuss, ask questions, and share updates with the community.",
  };
  
  type Thread = {
    id: string;
    title: string;
    author: string;
    replies: number;
    views: number;
    lastActivity: string;
    tag?: "General" | "Help" | "Showcase" | "Bug";
  };
  
  const sampleThreads: Thread[] = [
    {
      id: "t-001",
      title: "Welcome to the forums! Start here 👋",
      author: "Admin",
      replies: 4,
      views: 312,
      lastActivity: "Aug 15, 2025",
      tag: "General",
    },
    {
      id: "t-002",
      title: "Store product suggestions",
      author: "Mira",
      replies: 7,
      views: 201,
      lastActivity: "Aug 14, 2025",
      tag: "Showcase",
    },
    {
      id: "t-003",
      title: "Having trouble with checkout (mock)",
      author: "Ray",
      replies: 2,
      views: 145,
      lastActivity: "Aug 13, 2025",
      tag: "Help",
    },
  ];
  
  function Tag({ label }: { label: Thread["tag"] }) {
    const styles: Record<NonNullable<Thread["tag"]>, string> = {
      General: "bg-white/10 text-white",
      Help: "bg-blue-500/20 text-blue-200",
      Showcase: "bg-green-500/20 text-green-200",
      Bug: "bg-red-500/20 text-red-200",
    };
    return (
      <span className={`rounded-md px-2 py-1 text-xs ${label ? styles[label] : "bg-white/10 text-white"}`}>
        {label}
      </span>
    );
  }
  
  export default function ForumsPage() {
    const categories = [
      { slug: "announcements", name: "Announcements", desc: "Official updates and news." },
      { slug: "general", name: "General", desc: "Chat about anything related to the project." },
      { slug: "support", name: "Support", desc: "Ask for help or report issues." },
      { slug: "showcase", name: "Showcase", desc: "Share what you’ve built or bought." },
    ];
  
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Page header */}
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white">Forums</h1>
            <p className="mt-2 text-sm text-gray-400">
              Meet the community. Ask questions. Share feedback. (Auth & posting coming soon.)
            </p>
          </div>
          <button
            type="button"
            disabled
            title="Posting will be enabled when auth + backend is live."
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-gray-300 opacity-60"
          >
            New Thread (soon)
          </button>
        </header>
  
        {/* Categories */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`/forums/${c.slug}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-white">{c.name}</h3>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300">View</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">{c.desc}</p>
              </a>
            ))}
          </div>
        </section>
  
        {/* Latest threads (placeholder data) */}
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Latest Threads</h2>
          <ul className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
            {sampleThreads.map((t) => (
              <li key={t.id} className="p-4">
                <a href={`/forums/thread/${t.id}`} className="block">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {t.tag && <Tag label={t.tag} />}
                        <h3 className="truncate text-base font-medium text-white">{t.title}</h3>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        by <span className="text-gray-300">{t.author}</span> • Last activity {t.lastActivity}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-xs text-gray-400">
                      <span className="rounded-md bg-white/10 px-2 py-1">{t.replies} replies</span>
                      <span className="rounded-md bg-white/10 px-2 py-1">{t.views} views</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
  
        {/* Callout */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Roadmap</h2>
          <p className="mt-2 text-sm text-gray-300">
            We’ll add auth, thread creation, replies, search, and moderation. If you have feedback on structure or
            categories, drop it in the support category.
          </p>
        </section>
      </main>
    );
  }
  