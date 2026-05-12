import { profile, skills, experience, projects, education } from "./data";

export type TerminalLine = {
  kind: "input" | "output" | "system" | "error" | "ascii";
  text: string;
};

export type CommandContext = {
  /** Append lines to the visible terminal output. */
  print: (lines: TerminalLine[] | TerminalLine) => void;
  /** Clear the entire output. */
  clear: () => void;
  /** Programmatically execute a command (used by clickable suggestions). */
  run: (cmd: string) => void;
};

export type Command = {
  name: string;
  aliases?: string[];
  description: string;
  /** Free-form usage string for `help` and `<cmd> --help` */
  usage?: string;
  run: (args: string[], ctx: CommandContext) => void | Promise<void>;
};

/* ----------------------------- helpers ----------------------------- */

const line = (text = "", kind: TerminalLine["kind"] = "output"): TerminalLine => ({
  kind,
  text,
});

const sys = (text: string): TerminalLine => ({ kind: "system", text });
const err = (text: string): TerminalLine => ({ kind: "error", text });

/* ----------------------------- commands ---------------------------- */

const help: Command = {
  name: "help",
  description: "List available commands",
  run: (_args, { print }) => {
    print([
      sys("Available commands — type any of these, or click below:"),
      line(""),
      ...COMMAND_LIST.map((c) =>
        line(
          `  ${c.name.padEnd(12)} ${c.description}${
            c.aliases?.length ? "  (alias: " + c.aliases.join(", ") + ")" : ""
          }`
        )
      ),
      line(""),
      sys("Tips: ↑/↓ for history · Tab to autocomplete · Ctrl+L to clear"),
    ]);
  },
};

const whoami: Command = {
  name: "whoami",
  description: "Print profile summary",
  run: (_args, { print }) => {
    print([
      line(`${profile.name}`),
      line(`${profile.role} — ${profile.location}`),
      line(""),
      line(profile.tagline),
      line(""),
      line(`  email   : ${profile.email}`),
      line(`  github  : github.com/${profile.githubHandle}`),
      line(`  edu     : ${education.degree}, ${education.school} · ${education.year}`),
    ]);
  },
};

const skillsCmd: Command = {
  name: "skills",
  description: "List technical skills, grouped",
  run: (_args, { print }) => {
    const out: TerminalLine[] = [sys("Skill stack:"), line("")];
    skills.forEach((g) => {
      out.push(line(`  ${g.label.padEnd(10)} ${g.items.join(", ")}`));
    });
    print(out);
  },
};

const projectsCmd: Command = {
  name: "projects",
  description: "List notable projects",
  usage: "projects [--verbose|-v]",
  run: (args, { print }) => {
    const verbose = args.includes("--verbose") || args.includes("-v");
    const out: TerminalLine[] = [sys("Personal projects:"), line("")];
    projects.forEach((p, i) => {
      out.push(line(`  [${i + 1}] ${p.name} — ${p.tagline}`));
      out.push(line(`      stack: ${p.stack.join(", ")}`));
      out.push(line(`      when:  ${p.period}`));
      if (verbose) {
        out.push(line(`      ${p.description}`));
        p.highlights.forEach((h) => out.push(line(`        · ${h}`)));
      }
      out.push(line(""));
    });
    if (!verbose) {
      out.push(sys("Run `projects --verbose` for full details."));
    }
    print(out);
  },
};

const experienceCmd: Command = {
  name: "experience",
  aliases: ["exp"],
  description: "Show work experience",
  run: (_args, { print }) => {
    const out: TerminalLine[] = [sys("Work history:"), line("")];
    experience.forEach((j) => {
      out.push(line(`  ${j.role} @ ${j.company}`));
      out.push(line(`  ${j.start} — ${j.end} · ${j.location}`));
      j.bullets.slice(0, 4).forEach((b) => out.push(line(`    · ${b}`)));
      if (j.bullets.length > 4) {
        out.push(line(`    · …+${j.bullets.length - 4} more (see Experience section)`));
      }
      out.push(line(""));
    });
    print(out);
  },
};

const contactCmd: Command = {
  name: "contact",
  description: "Get in touch",
  run: (_args, { print }) => {
    print([
      sys("Ways to reach me:"),
      line(""),
      line(`  email  : ${profile.email}`),
      line(`  github : ${profile.github}`),
      line(`  phone  : ${profile.phone}`),
      line(`  resume : ${profile.resumePath}`),
    ]);
  },
};

const githubCmd: Command = {
  name: "github",
  description: "Open my GitHub profile in a new tab",
  run: (_args, { print }) => {
    print(sys(`Opening ${profile.github} …`));
    if (typeof window !== "undefined") {
      window.open(profile.github, "_blank", "noopener,noreferrer");
    }
  },
};

const resumeCmd: Command = {
  name: "resume",
  description: "Open my resume (PDF)",
  run: (_args, { print }) => {
    print(sys(`Opening ${profile.resumePath} …`));
    if (typeof window !== "undefined") {
      window.open(profile.resumePath, "_blank", "noopener,noreferrer");
    }
  },
};

const emailCmd: Command = {
  name: "email",
  description: "Compose an email to me",
  run: (_args, { print }) => {
    print(sys(`Launching mail client → ${profile.email}`));
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${profile.email}`;
    }
  },
};

const lsCmd: Command = {
  name: "ls",
  description: "List sections",
  run: (_args, { print }) => {
    print([
      line("about/      experience/   projects/    contact/"),
      line("skills.txt  resume.pdf    README.md"),
    ]);
  },
};

const catCmd: Command = {
  name: "cat",
  description: "Print the contents of a file",
  usage: "cat <file>",
  run: (args, { print, run }) => {
    const file = args[0]?.toLowerCase();
    if (!file) {
      print(err("usage: cat <file>  (try: cat README.md)"));
      return;
    }
    switch (file) {
      case "readme.md":
        print([
          sys("# README"),
          line(""),
          line(`Hi — I'm ${profile.name}, a ${profile.role.toLowerCase()} based`),
          line(`in ${profile.location}.`),
          line(""),
          line("This site is built with Next.js + TypeScript. The terminal you're"),
          line("typing into is real — try `help` to see what's available, or use"),
          line("`whoami`, `projects --verbose`, `skills`, or `contact`."),
        ]);
        return;
      case "skills.txt":
        run("skills");
        return;
      case "resume.pdf":
        run("resume");
        return;
      default:
        print(err(`cat: ${file}: no such file or directory`));
    }
  },
};

const echoCmd: Command = {
  name: "echo",
  description: "Echo arguments back",
  run: (args, { print }) => {
    print(line(args.join(" ")));
  },
};

const dateCmd: Command = {
  name: "date",
  description: "Show current date/time",
  run: (_args, { print }) => {
    print(line(new Date().toString()));
  },
};

const clearCmd: Command = {
  name: "clear",
  aliases: ["cls"],
  description: "Clear the terminal",
  run: (_args, { clear }) => clear(),
};

const bannerCmd: Command = {
  name: "banner",
  description: "Show the welcome banner",
  run: (_args, { print }) => {
    print([
      {
        kind: "ascii",
        text: BANNER,
      },
      line(""),
      sys(`Welcome — type \`help\` to begin.`),
    ]);
  },
};

const sudoCmd: Command = {
  name: "sudo",
  description: "Run a command as root (sort of)",
  run: (args, { print }) => {
    if (args[0] === "hire" && args[1] === "mustafa") {
      print([
        sys("[sudo] password for recruiter: ********"),
        line("Permission granted. ✅"),
        line(`Email dispatched to ${profile.email}.`),
        sys("(But really — please reach out via the contact section!)"),
      ]);
      return;
    }
    print(err(`sudo: nice try. (hint: \`sudo hire mustafa\`)`));
  },
};

const matrixCmd: Command = {
  name: "matrix",
  description: "Take the red pill (visual easter egg)",
  run: (_args, { print }) => {
    print([
      sys("Wake up, Neo…"),
      { kind: "ascii", text: MATRIX_RAIN },
      sys("The Matrix has you. (press any key to exit)"),
    ]);
  },
};

const exitCmd: Command = {
  name: "exit",
  description: "Quit the terminal (not really)",
  run: (_args, { print }) => {
    print([
      sys("logout"),
      line("Connection to portfolio.dev closed."),
      sys("…just kidding. Type `banner` to start over."),
    ]);
  },
};

const themeCmd: Command = {
  name: "theme",
  description: "List or set color theme",
  usage: "theme [classic|amber|cyan]",
  run: (args, { print }) => {
    const target = args[0]?.toLowerCase();
    const themes: Record<string, { accent: string; dim: string; glow: string }> = {
      classic: {
        accent: "#5eff84",
        dim: "#3aaf5f",
        glow: "rgba(94, 255, 132, 0.35)",
      },
      amber: {
        accent: "#ffb86c",
        dim: "#c08a4a",
        glow: "rgba(255, 184, 108, 0.35)",
      },
      cyan: {
        accent: "#79e2f2",
        dim: "#3aa8b8",
        glow: "rgba(121, 226, 242, 0.35)",
      },
    };
    if (!target) {
      print([
        sys("Available themes: classic, amber, cyan"),
        line("usage: theme <name>"),
      ]);
      return;
    }
    const t = themes[target];
    if (!t) {
      print(err(`theme: unknown theme '${target}'`));
      return;
    }
    if (typeof document !== "undefined") {
      const r = document.documentElement.style;
      r.setProperty("--accent", t.accent);
      r.setProperty("--accent-dim", t.dim);
      r.setProperty("--accent-glow", t.glow);
    }
    print(sys(`theme set → ${target}`));
  },
};

const BANNER = String.raw`
  __  __           _        __
 |  \/  |_   _ ___| |_ __ _/ _| __ _
 | |\/| | | | / __| __/ _\` | |_ / _\` |
 | |  | | |_| \__ \ || (_| |  _| (_| |
 |_|  |_|\__,_|___/\__\__,_|_|  \__,_|

         A L H E L A W E   //   portfolio.dev
`;

const MATRIX_RAIN = String.raw`
  ｱ ｲ ﾜ ﾑ ｴ 0 1 1 0 ｲ ﾐ ｦ ﾈ ｵ 0 1 0 ｵ ｾ ﾜ
  ｲ ﾜ ﾈ ｵ ﾈ ﾑ ｵ ｾ ﾜ ｲ ﾜ ﾑ ｴ 0 1 0 ﾈ ｵ ｱ
  ﾈ ｵ ﾑ ｴ 0 1 0 ｾ ﾜ ｲ ｦ ｴ 0 0 1 1 ｲ ｦ
`;

export const COMMAND_LIST: Command[] = [
  help,
  whoami,
  skillsCmd,
  projectsCmd,
  experienceCmd,
  contactCmd,
  emailCmd,
  githubCmd,
  resumeCmd,
  lsCmd,
  catCmd,
  echoCmd,
  dateCmd,
  themeCmd,
  bannerCmd,
  sudoCmd,
  matrixCmd,
  exitCmd,
  clearCmd,
];

const COMMAND_MAP = new Map<string, Command>();
COMMAND_LIST.forEach((c) => {
  COMMAND_MAP.set(c.name, c);
  c.aliases?.forEach((a) => COMMAND_MAP.set(a, c));
});

export function findCommand(name: string): Command | undefined {
  return COMMAND_MAP.get(name.toLowerCase());
}

/** Return commands whose name starts with `prefix` (for autocomplete) */
export function completeCommand(prefix: string): string[] {
  const p = prefix.toLowerCase();
  return COMMAND_LIST.map((c) => c.name)
    .filter((n) => n.startsWith(p))
    .sort();
}

export const ALL_COMMAND_NAMES = COMMAND_LIST.map((c) => c.name);

/** Suggested quick-launch commands shown beneath the input. */
export const SUGGESTED = [
  "whoami",
  "skills",
  "projects --verbose",
  "experience",
  "contact",
  "help",
];
