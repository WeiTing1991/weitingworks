import Head from "next/head";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface PanelLayoutProps {
  path: string;
  title?: string;
  children: React.ReactNode;
  terminalChrome?: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Project" },
  { href: "/blog", label: "Blog" },
];

export default function PanelLayout({ path, title, children, terminalChrome }: PanelLayoutProps) {
  const pageTitle = title ? `${title} — Weiting Chen` : "Weiting Chen";

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-8 md:py-12 bg-[var(--color-base)]">
      <Head>
        <title>{pageTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="w-[92%] min-h-[90vh] max-h-[90vh] flex flex-col rounded-lg border border-[var(--color-overlay)] bg-[var(--color-surface)] shadow-lg overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-6 md:px-10 py-2.5 border-b border-[var(--color-overlay)] bg-[var(--color-surface)] shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {terminalChrome && (
              <>
                <span className="w-3 h-3 rounded-full bg-[#eb6f92]" />
                <span className="w-3 h-3 rounded-full bg-[#f6c177]" />
                <span className="w-3 h-3 rounded-full bg-[#31748f]" />
                <span className="mx-1" />
              </>
            )}
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-iris)]">
              {path}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-[var(--color-muted)]">|</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
