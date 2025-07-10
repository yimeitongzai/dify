import { AutoKnowledgeRetrievalNodeType, AutoDatasetInfo } from './types'

/**
 * 检查是否配置了查询变量
 */
export const isQueryVariableConfigured = (data: AutoKnowledgeRetrievalNodeType): boolean => {
  return !!(data.query_variable_selector && data.query_variable_selector.length > 0)
}

/**
 * 检查是否启用了自动检索
 */
export const isAutoRetrievalEnabled = (data: AutoKnowledgeRetrievalNodeType): boolean => {
  return data.auto_retrieval_enabled !== false
}

/**
 * 检查是否只检索外部知识库
 */
export const isExternalOnly = (data: AutoKnowledgeRetrievalNodeType): boolean => {
  return data.external_only !== false
}

/**
 * 格式化数据集信息
 */
export const formatDatasetInfo = (dataset: AutoDatasetInfo): string => {
  return `${dataset.name} (${dataset.document_count} 文档)`
}

/**
 * 获取检索模式显示名称
 */
export const getRetrievalModeDisplayName = (mode: string): string => {
  switch (mode) {
    case 'single':
      return '单路检索'
    case 'multiple':
      return '多路检索'
    default:
      return '未知模式'
  }
}

/**
 * 检查节点配置是否有效
 */
export const validateNodeConfig = (data: AutoKnowledgeRetrievalNodeType): { isValid: boolean; message?: string } => {
  if (!isQueryVariableConfigured(data)) {
    return {
      isValid: false,
      message: '请配置查询变量'
    }
  }

  if (!isAutoRetrievalEnabled(data)) {
    return {
      isValid: false, 
      message: '自动检索未启用'
    }
  }

  return { isValid: true }
} 