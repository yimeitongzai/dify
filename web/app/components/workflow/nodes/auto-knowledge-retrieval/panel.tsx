import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { NodePanelProps } from '../../types'
import type { AutoKnowledgeRetrievalNodeType } from './types'
import KnowledgeRetrievalPanel from '../knowledge-retrieval/panel'
import { useConfig } from './use-config'
import Field from '@/app/components/workflow/nodes/_base/components/field'
import DatasetList from '../knowledge-retrieval/components/dataset-list'

const AutoKnowledgeRetrievalPanel: FC<NodePanelProps<AutoKnowledgeRetrievalNodeType>> = ({ id, data }) => {
  const { t } = useTranslation()

  // 使用自动检索 useConfig，内部会自动拉取 external 数据集并通过 onDataChange 写回
  useConfig(id, data)

  const selectedDatasets = (data._datasets || []) as any[]

  return (
    <div>
      {/* 添加提示信息 */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium text-blue-800">
            {t('workflow.nodes.autoKnowledgeRetrieval.autoMode')}
          </span>
        </div>
        <div className="text-xs text-blue-600 mt-1">
          {t('workflow.nodes.autoKnowledgeRetrieval.tip')}
        </div>
      </div>

      {/* 使用 Field + DatasetList，保持与原生 UI 一致 */}
      {!!selectedDatasets.length && (
        <div className="mb-4 px-4">
          <Field title={t('workflow.nodes.knowledgeRetrieval.knowledge')} required>
            <DatasetList list={selectedDatasets as any} onChange={() => {}} readonly />
          </Field>
        </div>
      )}

      {/* 使用原生面板组件，但隐藏知识库选择器 */}
      <KnowledgeRetrievalPanel 
        id={id}
        data={{
          ...data,
          dataset_ids: data.dataset_ids || [],
          hideDatasetSelector: true,
        } as any}
      />
    </div>
  )
}

export default AutoKnowledgeRetrievalPanel
