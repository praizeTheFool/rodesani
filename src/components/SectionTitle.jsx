import './SectionTitle.css'

export default function SectionTitle({ title, subtitle, accent }) {
  return (
    <div className="section-title">
      <h2>
        {accent && <span className="accent-bar" />}
        {title}
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
