import { useCallback } from 'react'
import { AutoKnowledgeRetrievalNodeType, AutoDatasetInfo } from './types'

export const useAutoDatasets = () => {
  const fetchAutoDatasets = useCallback(async (): Promise<AutoDatasetInfo[]> => {
    // 这里应该调用API获取自动数据集信息
    // 暂时返回示例数据
    return [
      {
        id: 'dataset-1',
        name: 'RAGFlow 知识库 1',
        description: '自动同步的外部知识库',
        document_count: 150,
        enabled: true
      },
      {
        id: 'dataset-2', 
        name: 'RAGFlow 知识库 2',
        description: '自动同步的外部知识库',
        document_count: 80,
        enabled: true
      }
    ]
  }, [])

  return {
    fetchAutoDatasets
  }
} 