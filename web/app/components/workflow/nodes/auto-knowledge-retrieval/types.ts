import type {
  CommonNodeType,
  ModelConfig,
  ValueSelector,
} from '@/app/components/workflow/types'
import type { RETRIEVE_TYPE } from '@/types/app'
import type {
  DataSet,
  RerankingModeEnum,
  WeightedScoreEnum,
} from '@/models/datasets'

export type MultipleRetrievalConfig = {
  top_k: number
  score_threshold: number | null | undefined
  reranking_model?: {
    provider: string
    model: string
  }
  reranking_mode?: RerankingModeEnum
  weights?: {
    weight_type: WeightedScoreEnum
    vector_setting: {
      vector_weight: number
      embedding_provider_name: string
      embedding_model_name: string
    }
    keyword_setting: {
      keyword_weight: number
    }
  }
  reranking_enable?: boolean
}

export type SingleRetrievalConfig = {
  model: ModelConfig
}

export enum MetadataFilteringModeEnum {
  disabled = 'disabled',
  automatic = 'automatic',
  manual = 'manual',
}

export type AutoKnowledgeRetrievalNodeType = CommonNodeType & {
  query_variable_selector: ValueSelector
  dataset_ids?: string[]
  retrieval_mode: RETRIEVE_TYPE
  multiple_retrieval_config?: MultipleRetrievalConfig
  single_retrieval_config?: SingleRetrievalConfig
  _datasets?: DataSet[]
  metadata_filtering_mode?: MetadataFilteringModeEnum
  // 简化元数据过滤
  auto_retrieval_enabled?: boolean
  external_only?: boolean
}

export type AutoDatasetInfo = {
  id: string
  name: string
  description?: string
  document_count: number
  enabled: boolean
}
