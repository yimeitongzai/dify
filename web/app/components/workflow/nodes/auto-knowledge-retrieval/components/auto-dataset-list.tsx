import type { FC } from 'react'
import React from 'react'
import { AutoDatasetInfo } from '../types'
import { formatDatasetInfo } from '../utils'
import cn from '@/utils/classnames'

interface Props {
  datasets: AutoDatasetInfo[]
  loading?: boolean
}

const AutoDatasetList: FC<Props> = ({
  datasets,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <div className="mt-2 text-sm text-gray-500">正在获取知识库...</div>
      </div>
    )
  }

  if (datasets.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="text-gray-400 mb-2">📚</div>
        <div className="text-sm text-gray-500">暂无可用的外部知识库</div>
        <div className="text-xs text-gray-400 mt-1">请在知识库管理页面添加并启用知识库</div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-900 mb-3">
        自动检索的知识库 ({datasets.length})
      </div>
      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          className={cn(
            'p-3 border rounded-lg',
            dataset.enabled 
              ? 'border-green-200 bg-green-50' 
              : 'border-gray-200 bg-gray-50'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div className={cn(
                  'w-2 h-2 rounded-full mr-2',
                  dataset.enabled ? 'bg-green-500' : 'bg-gray-400'
                )}></div>
                <span className="text-sm font-medium text-gray-900">
                  {dataset.name}
                </span>
              </div>
              {dataset.description && (
                <div className="text-xs text-gray-600 mt-1 ml-4">
                  {dataset.description}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1 ml-4">
                {dataset.document_count} 个文档
              </div>
            </div>
            <div className={cn(
              'px-2 py-1 text-xs rounded',
              dataset.enabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            )}>
              {dataset.enabled ? '已启用' : '已禁用'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AutoDatasetList 