import { BlockEnum, ErrorHandleMode } from '../../types'
import type { NodeDefault } from '../../types'
import type { KnowledgeRetrievalNodeType } from '../knowledge-retrieval/types'
import {
  ALL_CHAT_AVAILABLE_BLOCKS,
  ALL_COMPLETION_AVAILABLE_BLOCKS,
} from '@/app/components/workflow/blocks'
import { RETRIEVE_TYPE } from '@/types/app'
import { WeightedScoreEnum, RerankingModeEnum } from '@/models/datasets'

const i18nPrefix = 'workflow'

const nodeDefault: NodeDefault<KnowledgeRetrievalNodeType> = {
  defaultValue: {
    query_variable_selector: [],
    dataset_ids: [], // 这个字段会被后端自动填充
    retrieval_mode: RETRIEVE_TYPE.multiWay,
    multiple_retrieval_config: {
      top_k: 3,
      score_threshold: 0.7,
      reranking_enable: false,
      reranking_mode: RerankingModeEnum.WeightedScore,
      weights: {
        weight_type: WeightedScoreEnum.SemanticFirst,
        vector_setting: {
          vector_weight: 1,
          embedding_provider_name: '',
          embedding_model_name: ''
        },
        keyword_setting: {
          keyword_weight: 0
        }
      }
    }
  },
  getAvailablePrevNodes(isChatMode: boolean) {
    const nodes = isChatMode
      ? ALL_CHAT_AVAILABLE_BLOCKS
      : ALL_COMPLETION_AVAILABLE_BLOCKS.filter(
        type => type !== BlockEnum.End,
      )
    return nodes
  },
  getAvailableNextNodes(isChatMode: boolean) {
    const nodes = isChatMode
      ? ALL_CHAT_AVAILABLE_BLOCKS
      : ALL_COMPLETION_AVAILABLE_BLOCKS
    return nodes
  },
  checkValid(payload: KnowledgeRetrievalNodeType, t: any) {
    let errorMessages = ''

    if (!errorMessages && (!payload.query_variable_selector || payload.query_variable_selector.length === 0)) {
      errorMessages = t(`${i18nPrefix}.errorMsg.fieldRequired`, {
        field: t(`${i18nPrefix}.nodes.knowledgeRetrieval.query`),
      })
    }

    return {
      isValid: !errorMessages,
      errorMessage: errorMessages,
    }
  },
}

export default nodeDefault 