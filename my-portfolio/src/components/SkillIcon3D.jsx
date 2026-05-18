export default function SkillIcon3D({ icon, name }) {
  return (
    <div className="skill-icon-card">
      <div className="skill-icon-card-inner">
        <img src={icon} alt="" className="skill-icon-img" draggable={false} />
      </div>
      {name ? <span className="skill-icon-label">{name}</span> : null}
    </div>
  )
}
