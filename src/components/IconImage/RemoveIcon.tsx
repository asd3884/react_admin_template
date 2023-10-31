
const RemoveIcon = ({ color, height = 16, width=16 }) => {
  return (
    <svg viewBox="0 0 24 24" fill={color ? color : color} width={width } height={height}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  )
}

export default RemoveIcon
