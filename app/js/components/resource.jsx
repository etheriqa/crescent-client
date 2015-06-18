export default class Resource extends React.Component {
  render() {
    let className = "resource"
    let amount = 0
    let max = 1
    switch (this.props.resourceType) {
    case "health":
      className += " resource-health"
      amount = this.props.unit.health()
      max = this.props.unit.healthMax()
      break
    case "mana":
      className += " resource-mana"
      amount = this.props.unit.mana()
      max = this.props.unit.manaMax()
      break
    }
    return (
      <div className={className}>
        <svg width="100" height="20">
          <rect rx="3" ry="3" width="100" height="6" stroke="white" strokeWidth="1" fill="none" />
          <rect rx="3" ry="3" width={amount/max*100} height="6" stroke="white" strokeWidth="1" fill="white" />
          <text x="100" y="20" textAnchor="end" fill="white">{amount}</text>
        </svg>
      </div>
    )
  }
}
