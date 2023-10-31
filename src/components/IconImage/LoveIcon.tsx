
const LoveIcon = ({ color, height = 16, width=16}) => {
  return (
    <svg viewBox="0 0 1024 1024" fill={color ? color : color} width={width } height={height}>
      <path d="M895.86 419.06a238.52 238.52 0 0 0-13.19-78.52c-0.09-0.24-0.17-0.49-0.25-0.73-0.48-1.35-1-2.69-1.47-4-0.15-0.42-0.31-0.84-0.47-1.26-0.55-1.47-1.12-2.92-1.71-4.37-0.06-0.17-0.13-0.34-0.2-0.5a238.46 238.46 0 0 0-367.72-98.38 236.47 236.47 0 0 0-146.15-50h-0.34a238.33 238.33 0 0 0-189 383l300.37 303.82a48.94 48.94 0 0 0 30.64 14.26 20.14 20.14 0 0 0 10.59-0.23 48.94 48.94 0 0 0 28.54-14l300.75-303.48a236.51 236.51 0 0 0 49.61-145.61z">
    </path>
    </svg>
  )
}

export default LoveIcon