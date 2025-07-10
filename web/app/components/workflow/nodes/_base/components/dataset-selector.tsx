import { FC } from 'react'
import type { DataSet } from '@/models/datasets'

interface DatasetSelectorProps {
  datasets: DataSet[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  readonly?: boolean
}

const DatasetSelector: FC<DatasetSelectorProps> = ({
  datasets,
  selectedIds,
  onChange,
  readonly = false
}) => {
  const handleSelect = (id: string) => {
    if (readonly) return
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id]
    onChange(newIds)
  }

  return (
    <div className="space-y-2">
      {datasets.map(dataset => (
        <div
          key={dataset.id}
          className={`flex items-center p-3 rounded-lg border ${
            selectedIds.includes(dataset.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          } ${readonly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          onClick={() => handleSelect(dataset.id)}
        >
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">{dataset.name}</div>
            {dataset.description && (
              <div className="mt-1 text-xs text-gray-500">{dataset.description}</div>
            )}
          </div>
          <div className="ml-4">
            <input
              type="checkbox"
              checked={selectedIds.includes(dataset.id)}
              onChange={() => {}}
              disabled={readonly}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DatasetSelector 