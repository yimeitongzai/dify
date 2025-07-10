import type { FC } from 'react'
import React from 'react'
import { AutoKnowledgeRetrievalNodeType } from '../types'
import { getRetrievalModeDisplayName } from '../utils'

interface Props {
  data: AutoKnowledgeRetrievalNodeType
  onAutoRetrievalToggle?: (enabled: boolean) => void
  onExternalOnlyToggle?: (enabled: boolean) => void
  readonly?: boolean
}

const AutoConfig: FC<Props> = ({
  data,
  onAutoRetrievalToggle,
  onExternalOnlyToggle,
  readonly = false
}) => {
  return (
    <div className="space-y-4">
      {/* 自动检索配置 */}
      <div>
        <div className="text-sm font-medium text-gray-900 mb-2">
          自动检索配置
        </div>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={data.auto_retrieval_enabled !== false}
              onChange={(e) => onAutoRetrievalToggle?.(e.target.checked)}
              disabled={readonly}
            />
            <span className="ml-2 text-sm text-gray-700">启用自动检索</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={data.external_only !== false}
              onChange={(e) => onExternalOnlyToggle?.(e.target.checked)}
              disabled={readonly}
            />
            <span className="ml-2 text-sm text-gray-700">仅检索外部知识库</span>
          </label>
        </div>
      </div>

      {/* 检索模式显示 */}
      <div>
        <div className="text-sm font-medium text-gray-900 mb-2">
          检索模式
        </div>
        <div className="text-sm text-gray-600">
          {getRetrievalModeDisplayName(data.retrieval_mode)}
        </div>
      </div>

      {/* 状态指示器 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium text-blue-800">自动模式已启用</span>
        </div>
        <div className="text-xs text-blue-600 mt-1">
          将自动检索所有已启用的外部知识库，无需手动选择
        </div>
      </div>
    </div>
  )
}

export default AutoConfig 