import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { FaFolder, FaGithub, FaLinkedin } from "react-icons/fa";

// react-icons v5 returns ReactNode which is incompatible with React 18 JSX types
const Folder = FaFolder as unknown as React.FC;
const Github = FaGithub as unknown as React.FC;
const Linkedin = FaLinkedin as unknown as React.FC;

function getFormattedDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "short" });
  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${hours}:${mins}`;
}

const directoryItems = [
  { perm: "drwxr-xr-x", size: "-", user: "weitingchen", icon: <Folder />, name: "about", href: "/about", external: false },
  { perm: "drwxr-xr-x", size: "-", user: "weitingchen", icon: <Folder />, name: "project", href: "/projects", external: false },
  { perm: "drwxr-xr-x", size: "-", user: "weitingchen", icon: <Folder />, name: "blog", href: "/blog", external: false },
  { perm: "-rw-r--r--", size: "-", user: "weitingchen", icon: <Github />, name: "github", href: "https://github.com/WeiTing1991", external: true },
  { perm: "-rw-r--r--", size: "-", user: "weitingchen", icon: <Linkedin />, name: "linkedin", href: "https://www.linkedin.com/in/chen-weiting/", external: true },
];

const COMMAND = "ls me/";
const TYPE_SPEED = 120;

export default function TerminalWindow() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(getFormattedDate());
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(interval);
        setTimeout(() => setTypingDone(true), 400);
      }
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div
        className="w-[92%] max-w-[1600px] h-[500px] md:h-[550px] flex flex-col rounded-lg border border-[var(--color-overlay)] bg-[var(--color-surface)] shadow-[0_0_10px_var(--color-overlay)] overflow-hidden"
        style={{ animation: "borderPulse 3s ease-in-out" }}
      >
        {/* Terminal title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-overlay)]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D75455]" />
            <span className="w-3 h-3 rounded-full bg-[#E2943B]" />
            <span className="w-3 h-3 rounded-full bg-[#7BA23F]" />
          </div>
          <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-subtle)]">
            weitingworks
          </span>
          <ThemeToggle />
        </div>

        {/* Terminal body */}
        <div className="flex-1 px-6 md:px-10 py-6 font-[family-name:var(--font-mono)] overflow-hidden">
          {/* Prompt line */}
          <div className="flex items-center text-xl md:text-2xl mb-4">
            <span className="text-[var(--color-text)] whitespace-pre">weiting@weitingworks ~ $ </span>
            <span className="text-[var(--color-text)]">{typed}</span>
            <span
              className="inline-block w-[3px] h-[1.2em] ml-[1px]"
              style={{
                backgroundColor: cursorVisible ? "var(--color-text)" : "transparent",
              }}
            />
          </div>

          {/* eza-style directory listing */}
          {typingDone && (
            <div
              className="py-4"
              style={{ animation: "fadeIn 0.4s ease-out forwards" }}
            >
              {/* Column header */}
              <div className="hidden md:flex items-center gap-0 text-xs text-[var(--color-muted)] mb-2 border-b border-[var(--color-overlay)] pb-1">
                <span className="w-28 shrink-0">Permissions</span>
                <span className="w-14 shrink-0 text-right">Size</span>
                <span className="w-28 shrink-0 ml-3">User</span>
                <span className="w-32 shrink-0">Date Modified</span>
                <span>Name</span>
              </div>

              {/* Rows */}
              <ul className="space-y-1">
                {directoryItems.map((item, index) => {
                  const isDir = item.perm.startsWith("d");

                  const content = (
                    <li
                      className="flex items-center gap-0 py-1 px-1 rounded hover:bg-[var(--color-overlay)] transition-colors cursor-pointer group text-base opacity-0"
                      style={{
                        animation: "fadeIn 0.3s ease-out forwards",
                        animationDelay: `${index * 0.07}s`,
                      }}
                    >
                      {/* Permissions */}
                      <span className="hidden md:inline w-28 shrink-0 text-[var(--color-muted)]">
                        <span className="text-[var(--color-subtle)]">{item.perm[0]}</span>
                        <span className="text-[var(--color-gold)]">{item.perm.slice(1, 4)}</span>
                        <span className="text-[var(--color-foam)]">{item.perm.slice(4, 7)}</span>
                        <span className="text-[var(--color-muted)]">{item.perm.slice(7)}</span>
                      </span>
                      {/* Size */}
                      <span className="hidden md:inline w-14 shrink-0 text-right text-[var(--color-foam)]">
                        {item.size}
                      </span>
                      {/* User */}
                      <span className="hidden md:inline w-28 shrink-0 ml-3 text-[var(--color-subtle)]">
                        {item.user}
                      </span>
                      {/* Date */}
                      <span className="hidden md:inline w-32 shrink-0 text-[var(--color-subtle)]">
                        {dateStr}
                      </span>
                      {/* Icon + Name */}
                      <span className="flex items-center gap-2 group-hover:text-[var(--color-love)] transition-colors">
                        <span>{item.icon}</span>
                        <span className={isDir ? "text-[var(--color-iris)] group-hover:text-[var(--color-love)]" : "text-[var(--color-text)] group-hover:text-[var(--color-love)]"}>
                          {item.name}
                        </span>
                      </span>
                    </li>
                  );

                  if (item.external) {
                    return (
                      <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={item.name} href={item.href}>
                      {content}
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
