interface PasswordStrengthIndicatorProps {
  strength: number // 0-4 scale
}

export default function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
        return "Very weak"
      case 1:
        return "Weak"
      case 2:
        return "Medium"
      case 3:
        return "Strong"
      case 4:
        return "Very strong"
      default:
        return "Very weak"
    }
  }

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-green-600"
      default:
        return "bg-red-500"
    }
  }

  const getStrengthWidth = () => {
    return `${(strength / 4) * 100}%`
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs text-gray-500">Password strength:</p>
        <p className="text-xs font-medium" style={{ color: getStrengthColor().replace("bg-", "text-") }}>
          {getStrengthLabel()}
        </p>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getStrengthColor()} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: getStrengthWidth() }}
        ></div>
      </div>
    </div>
  )
}
