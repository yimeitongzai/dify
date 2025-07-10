import { BlockEnum } from './types'

// 聊天模式可用的块类型
export const ALL_CHAT_AVAILABLE_BLOCKS: BlockEnum[] = [
  BlockEnum.Start,
  BlockEnum.LLM,
  BlockEnum.KnowledgeRetrieval,
  BlockEnum.AutoKnowledgeRetrieval,
  BlockEnum.End,
  BlockEnum.Answer,
  BlockEnum.QuestionClassifier,
  BlockEnum.IfElse,
  BlockEnum.LoopEnd,
  BlockEnum.Iteration,
  BlockEnum.Loop,
  BlockEnum.Code,
  BlockEnum.TemplateTransform,
  BlockEnum.VariableAggregator,
  BlockEnum.DocExtractor,
  BlockEnum.Assigner,
  BlockEnum.ParameterExtractor,
  BlockEnum.HttpRequest,
  BlockEnum.ListFilter,
  BlockEnum.Agent,
]

// 补全模式可用的块类型
export const ALL_COMPLETION_AVAILABLE_BLOCKS: BlockEnum[] = [
  BlockEnum.Start,
  BlockEnum.LLM,
  BlockEnum.KnowledgeRetrieval,
  BlockEnum.AutoKnowledgeRetrieval,
  BlockEnum.End,
  BlockEnum.Answer,
  BlockEnum.QuestionClassifier,
  BlockEnum.IfElse,
  BlockEnum.LoopEnd,
  BlockEnum.Iteration,
  BlockEnum.Loop,
  BlockEnum.Code,
  BlockEnum.TemplateTransform,
  BlockEnum.VariableAggregator,
  BlockEnum.DocExtractor,
  BlockEnum.Assigner,
  BlockEnum.ParameterExtractor,
  BlockEnum.HttpRequest,
  BlockEnum.ListFilter,
  BlockEnum.Agent,
] 