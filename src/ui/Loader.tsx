import { Loader } from '@mantine/core'
import 'tailwindcss/tailwind.css'

export const LoadingIndicator = ({ size = 48, color = 'blue' }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader size={size} color={color} />
    </div>
  )
}
