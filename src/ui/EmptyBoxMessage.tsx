import { IconBox } from '@tabler/icons-react'

export const EmptyBoxMessage = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <IconBox size={48} strokeWidth={2} style={{ marginBottom: '10px' }} />
      <p>No data available</p>
    </div>
  )
}
