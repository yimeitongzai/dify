import { useCallback, useEffect, useRef } from 'react'
import produce from 'immer'
import { AutoKnowledgeRetrievalNodeType } from './types'
import { RETRIEVE_TYPE } from '@/types/app'
import { fetchDatasets } from '@/service/datasets'
import useNodeCrud from '@/app/components/workflow/nodes/_base/hooks/use-node-crud'
import { useDatasetsDetailStore } from '../../datasets-detail-store/store'

export const useConfig = (
  id: string,
  data: AutoKnowledgeRetrievalNodeType,
  onDataChange?: (newData: AutoKnowledgeRetrievalNodeType) => void,
) => {
  // 复用原生节点逻辑，通过 useNodeCrud 将修改写回 React-Flow 节点并同步草稿
  const { inputs, setInputs: doSetInputs } = useNodeCrud<AutoKnowledgeRetrievalNodeType>(id, data)
  const updateDatasetsDetail = useDatasetsDetailStore(s => s.updateDatasetsDetail)

  const inputRef = useRef(inputs)

  const setInputs = useCallback((newInputs: AutoKnowledgeRetrievalNodeType) => {
    doSetInputs(newInputs)
    inputRef.current = newInputs
    onDataChange?.(newInputs)
  }, [doSetInputs, onDataChange])

  const isMultipleRetrieval = inputs.retrieval_mode === RETRIEVE_TYPE.multiWay
  const isInIteration = inputs.isInIteration

  // 首次加载时，若未携带 _datasets，则自动获取 external 类型知识库并写回
  useEffect(() => {
    (async () => {
      if (inputRef.current._datasets && inputRef.current._datasets.length)
        return
      // 拉取 external 数据集列表（分页最多 100 条，可按需调整）
      try {
        const { data: dataSetsWithDetail } = await fetchDatasets({ url: '/datasets', params: { page: 1, limit: 100, include_all: true, provider: 'external' } as any })
        if (dataSetsWithDetail?.length) {
          const newInputs = produce(inputRef.current, (draft) => {
            draft.dataset_ids = dataSetsWithDetail.map((d: any) => d.id)
            // 完整保存数据集详情，便于复用原生组件 DatasetList
            draft._datasets = dataSetsWithDetail as any
          })
          updateDatasetsDetail(dataSetsWithDetail as any)
          setInputs(newInputs)
        }
      }
      catch (e) {
        console.error('auto knowledge retrieval load datasets error', e)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 处理查询变量变更
  const handleQueryVarChange = useCallback((value: string[]) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.query_variable_selector = value
    })
    setInputs(newInputs)
  }, [setInputs])

  // 处理检索模式变更  
  const handleRetrievalModeChange = useCallback((mode: RETRIEVE_TYPE) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.retrieval_mode = mode
    })
    setInputs(newInputs)
  }, [setInputs])

  // 处理多重检索配置变更
  const handleMultipleRetrievalConfigChange = useCallback((config: any) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.multiple_retrieval_config = config
    })
    setInputs(newInputs)
  }, [setInputs])

  // 处理单一检索配置变更
  const handleSingleRetrievalConfigChange = useCallback((config: any) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.single_retrieval_config = config
    })
    setInputs(newInputs)
  }, [setInputs])

  // 处理元数据过滤模式变更
  const handleMetadataFilteringModeChange = useCallback((mode: string) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.metadata_filtering_mode = mode as any
    })
    setInputs(newInputs)
  }, [setInputs])

  // 处理自动检索启用状态变更
  const handleAutoRetrievalToggle = useCallback((enabled: boolean) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.auto_retrieval_enabled = enabled
    })
    setInputs(newInputs)
  }, [setInputs])

  // 处理外部知识库专用模式变更
  const handleExternalOnlyToggle = useCallback((enabled: boolean) => {
    const newInputs = produce(inputRef.current, (draft) => {
      draft.external_only = enabled
    })
    setInputs(newInputs)
  }, [setInputs])

  return {
    inputs,
    isMultipleRetrieval,
    isInIteration,
    handleQueryVarChange,
    handleRetrievalModeChange,
    handleMultipleRetrievalConfigChange,
    handleSingleRetrievalConfigChange,
    handleMetadataFilteringModeChange,
    handleAutoRetrievalToggle,
    handleExternalOnlyToggle,
  }
} 