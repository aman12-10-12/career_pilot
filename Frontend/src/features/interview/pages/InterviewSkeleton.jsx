import "../style/interviewSkeleton.scss";

export default function InterviewSkeleton() {
  return (
    <div className="ips">
      <div className="ips__layout">

        {/* Sidebar */}
        <aside className="ips__sidebar glass-card">

          <div className="skeleton skeleton-logo" />

          <div className="ips__nav">
            {[...Array(4)].map((_, i) => (
              <div className="skeleton skeleton-nav" key={i} />
            ))}
          </div>

        </aside>

        {/* Main */}
        <main className="ips__main glass-card">

          <div className="skeleton skeleton-job" />

          <div className="skeleton skeleton-heading" />

          <div className="skeleton skeleton-subheading" />

          {[...Array(5)].map((_, i) => (
            <div className="accordion-skeleton" key={i}>
              <div className="skeleton skeleton-question" />
              <div className="skeleton skeleton-answer" />
            </div>
          ))}

        </main>

        {/* Right */}
        <aside className="ips__right">

          <div className="glass-card ips__panel">

            <div className="skeleton skeleton-title" />

            <div className="skeleton skeleton-ring" />

            <div className="skeleton skeleton-small" />

          </div>

          {[...Array(4)].map((_, i) => (
            <div className="glass-card ips__panel" key={i}>

              <div className="skeleton skeleton-title" />

              {[...Array(3)].map((__, j) => (
                <div
                  className="skeleton skeleton-chip"
                  key={j}
                />
              ))}

            </div>
          ))}

        </aside>

      </div>
    </div>
  );
}