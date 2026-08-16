import fs from "fs";
import path from "path";
import { useState, useEffect, useRef, type RefObject } from "react";
import type { GetStaticProps } from "next";
import PanelLayout from "@/components/PanelLayout";

interface Position {
  link: string;
  group: string;
  title: string | string[];
  duration: string;
  skill: string[];
  desc: string[];
}

interface Experience {
  company: string;
  position: Position[];
}

interface BioItem {
  key: string;
  value: string;
  href?: string;
}

interface LinkItem {
  label: string;
  href: string;
}

interface AboutProps {
  about: BioItem[];
  links: LinkItem[];
  experiences: Experience[];
  skills: Record<string, string[]>;
}

const NAME = "WEITING CHEN";
const TYPE_SPEED = 80;

function useTypewriter(text: string, speed: number) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { typed, done };
}

function useReveal(threshold = 0.15): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

const revealStyle = (visible: boolean, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function About({ about, links, experiences, skills }: AboutProps) {
  const { typed, done } = useTypewriter(NAME, TYPE_SPEED);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [aboutShown, setAboutShown] = useState(false);
  const [expShown, setExpShown] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);

  // Flatten all experience positions for row-by-row animation
  const expRows = experiences.flatMap((exp) =>
    exp.position.map((pos) => ({ company: exp.company, pos }))
  );

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // After typing done, show about box
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setAboutShown(true), 400);
      return () => clearTimeout(t);
    }
  }, [done]);

  // After about shown, show experience rows one by one (like ls)
  useEffect(() => {
    if (aboutShown) {
      const t = setTimeout(() => setExpShown(true), 600);
      return () => clearTimeout(t);
    }
  }, [aboutShown]);

  useEffect(() => {
    if (expShown && visibleRows < expRows.length) {
      const t = setTimeout(() => setVisibleRows((v) => v + 1), 120);
      return () => clearTimeout(t);
    }
  }, [expShown, visibleRows, expRows.length]);

  return (
    <PanelLayout path="about/" title="About" terminalChrome>
      {/* Hero — big name with typing animation */}
      <section className="mt-10 md:mt-16 mb-20 md:mb-32">
        <div className="font-[family-name:var(--font-mono)] text-4xl md:text-6xl lg:text-7xl text-[var(--color-text)] tracking-tight uppercase">
          <span>{typed}</span>
          <span
            className="inline-block w-[4px] h-[0.9em] ml-1 align-baseline"
            style={{
              backgroundColor: cursorVisible ? "var(--color-iris)" : "transparent",
            }}
          />
        </div>
        <p
          className="font-[family-name:var(--font-mono)] text-base md:text-lg text-[var(--color-muted)] mt-4"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
          }}
        >
          Software Engineer
        </p>
      </section>

      {/* About — text in a box */}
      <section
        className="mb-28 md:mb-40"
        style={{
          opacity: aboutShown ? 1 : 0,
          transform: aboutShown ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <div className="rounded-lg border border-[var(--color-overlay)] bg-[var(--color-base)] p-6 md:p-8">
          <div className="space-y-5 text-[var(--color-text)] text-lg md:text-xl leading-relaxed">
            <p>
              Hi there! I&apos;m WeiTing Chen, a software engineer based in Switzerland.
            </p>
            <p>
              With several years of experience in developing{" "}
              <strong>Computer Geometry, CAD/CAM, Robotics, Desktop/Web Application, and Machine Learning</strong>.
            </p>
            <p>
              In my free time, I like contributing to open source projects and building my muscle at gym!
            </p>
          </div>
        </div>
      </section>

      <div className="h-12 md:h-16" />

      {/* Experience — bat/cat style */}
      <section
        className="mb-44 md:mb-56"
        style={{ opacity: expShown ? 1 : 0, transition: "opacity 0.4s ease-out" }}
      >
        {/* bat command prompt */}
        <p className="font-[family-name:var(--font-mono)] text-base md:text-lg text-[var(--color-muted)] mb-8">
          <span className="text-[var(--color-text)]">weiting@weitingworks ~ $</span>{" "}
          <span className="text-[var(--color-foam)]">cat</span> experiences.md
        </p>

        {/* bat frame */}
        <div className="rounded-lg border border-[var(--color-overlay)] bg-[var(--color-base)] overflow-hidden font-[family-name:var(--font-mono)]">
          {/* bat header */}
          <div className="px-4 py-2 border-b border-[var(--color-overlay)] bg-[var(--color-surface)]">
            <span className="text-xs" style={{ color: "var(--color-muted)", opacity: 0.5 }}>File: experiences.md</span>
          </div>

          {/* bat content with line numbers */}
          <div className="overflow-x-auto">
            <table className="w-full text-base md:text-lg">
              <tbody>
                {expRows.slice(0, visibleRows).map(({ company, pos }, idx) => {
                  const title = Array.isArray(pos.title) ? pos.title.join(", ") : pos.title;
                  return (
                    <tr
                      key={`${company}-${idx}`}
                      className="border-b border-[var(--color-overlay)] last:border-b-0 hover:bg-[var(--color-surface)] transition-colors"
                      style={{ animation: "fadeIn 0.3s ease-out forwards" }}
                    >
                      <td className="w-12 text-right pr-4 py-5 border-r border-[var(--color-overlay)] select-none" style={{ color: "var(--color-muted)", opacity: 0.5 }}>
                        {idx + 1}
                      </td>
                      <td className="pl-5 pr-6 py-5 whitespace-nowrap text-[var(--color-muted)]">{pos.duration}</td>
                      <td className="pr-6 py-5 whitespace-nowrap text-[var(--color-text)]">
                        {pos.link ? (
                          <a href={pos.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-love)] transition-colors">
                            {company}
                          </a>
                        ) : (
                          company
                        )}
                      </td>
                      <td className="pr-4 py-5 whitespace-nowrap text-[var(--color-subtle)]">{title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="h-12 md:h-16" />

      {/* Skills — fd style */}
      <section
        className="mb-10"
        style={{
          opacity: visibleRows >= expRows.length ? 1 : 0,
          transform: visibleRows >= expRows.length ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* grep command prompt */}
        <p className="font-[family-name:var(--font-mono)] text-base md:text-lg text-[var(--color-muted)] mb-8">
          <span className="text-[var(--color-text)]">weiting@weitingworks ~ $</span>{" "}
          <span className="text-[var(--color-foam)]">fd</span>{" "}
          . top_skills/
        </p>

        {/* grep results */}
        <div className="font-[family-name:var(--font-mono)] text-sm md:text-base space-y-1 overflow-x-auto">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex whitespace-nowrap">
              <span className="text-[var(--color-iris)]">{category}/</span>
              <span className="text-[var(--color-muted)] mx-2">:</span>
              <span>
                {items.map((skill, j) => (
                  <span key={skill}>
                    <span className="text-[var(--color-foam)]">{skill}</span>
                    {j < items.length - 1 && <span className="text-[var(--color-muted)]">, </span>}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PanelLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "public", "constant.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  return {
    props: {
      about: data.about,
      links: data.links,
      experiences: data.experiences,
      skills: data.skills,
    },
  };
};
