function StatCard({
  icon: Icon,
  title,
  value,
  change,
  type = "default"
}) {

  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        <Icon size={22} />
      </div>

      <div className="stat-content">

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small
          className={
            type === "danger"
              ? "negative"
              : "positive"
          }
        >
          {change}
        </small>

      </div>

    </div>
  );
}

export default StatCard;