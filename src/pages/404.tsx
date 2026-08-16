import Link from "next/link";
import Head from "next/head";
import ThemeToggle from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-base)]">
      <Head>
        <title>404 — Weiting Chen</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="w-[95%] rounded-lg border border-[var(--color-overlay)] bg-[var(--color-surface)] shadow-lg overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-overlay)]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D75455]" />
            <span className="w-3 h-3 rounded-full bg-[#E2943B]" />
            <span className="w-3 h-3 rounded-full bg-[#7BA23F]" />
          </div>
          <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)]">
            404
          </span>
          <ThemeToggle />
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 py-10 font-[family-name:var(--font-mono)]">
          <p className="text-base md:text-lg text-[var(--color-muted)] mb-6">
            <span className="text-[var(--color-text)]">weiting@weitingworks ~ $</span>{" "}
            <span className="text-[var(--color-text)]">project</span>
          </p>
          <p className="text-base md:text-lg text-[var(--color-love)] mb-8">
            command not found: project
          </p>
          <Link
            href="/"
            className="inline-block text-sm text-[var(--color-iris)] hover:text-[var(--color-text)] transition-colors"
          >
            &gt; cd ~
          </Link>
        </div>
      </div>
    </div>
  );
}
