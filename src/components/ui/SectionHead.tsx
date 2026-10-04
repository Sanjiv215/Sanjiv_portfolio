export default function SectionHead({ index, label, title, accent, id }: { index: string; label: string; title: string; accent: string; id: string }) {
  return (
    <header>
      <p className="tag rv"><b>{index}</b> — {label}</p>
      <h2 id={id} className="h2">
        <span className="rv-mask"><span>{title} <em>{accent}</em></span></span>
      </h2>
    </header>
  );
}
