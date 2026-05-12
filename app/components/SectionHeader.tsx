type Props = {
  num: string;
  title: string;
  command: string;
};

/** Section heading rendered as a fake shell prompt: `$ cat 02_experience.md` */
export default function SectionHeader({ num, title, command }: Props) {
  return (
    <div className="section-header">
      <span className="h-num">{num}.</span>
      <span className="h-title">{title}</span>
      <span style={{ color: "var(--fg-muted)" }}>{command}</span>
      <span className="h-rule" aria-hidden="true" />
    </div>
  );
}
