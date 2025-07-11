import type { ComponentType } from 'react'
import { BlockEnum } from '../types'
import StartNode from './start/node'
import StartPanel from './start/panel'
import EndNode from './end/node'
import EndPanel from './end/panel'
import AnswerNode from './answer/node'
import AnswerPanel from './answer/panel'
import LLMNode from './llm/node'
import LLMPanel from './llm/panel'
import KnowledgeRetrievalNode from './knowledge-retrieval/node'
import KnowledgeRetrievalPanel from './knowledge-retrieval/panel'
import AutoKnowledgeRetrievalNode from './auto-knowledge-retrieval/node' // 新增自定义节点
import AutoKnowledgeRetrievalPanel from './auto-knowledge-retrieval/panel' // 新增自定义节点
import QuestionClassifierNode from './question-classifier/node'
import QuestionClassifierPanel from './question-classifier/panel'
import IfElseNode from './if-else/node'
import IfElsePanel from './if-else/panel'
import CodeNode from './code/node'
import CodePanel from './code/panel'
import TemplateTransformNode from './template-transform/node'
import TemplateTransformPanel from './template-transform/panel'
import HttpNode from './http/node'
import HttpPanel from './http/panel'
import ToolNode from './tool/node'
import ToolPanel from './tool/panel'
import VariableAssignerNode from './variable-assigner/node'
import VariableAssignerPanel from './variable-assigner/panel'
import AssignerNode from './assigner/node'
import AssignerPanel from './assigner/panel'
import ParameterExtractorNode from './parameter-extractor/node'
import ParameterExtractorPanel from './parameter-extractor/panel'
import IterationNode from './iteration/node'
import IterationPanel from './iteration/panel'
import LoopNode from './loop/node'
import LoopPanel from './loop/panel'
import DocExtractorNode from './document-extractor/node'
import DocExtractorPanel from './document-extractor/panel'
import ListFilterNode from './list-operator/node'
import ListFilterPanel from './list-operator/panel'
import AgentNode from './agent/node'
import AgentPanel from './agent/panel'
import { TransferMethod } from '@/types/app'

export const NodeComponentMap: Record<string, ComponentType<any>> = {
  [BlockEnum.Start]: StartNode,
  [BlockEnum.End]: EndNode,
  [BlockEnum.Answer]: AnswerNode,
  [BlockEnum.LLM]: LLMNode,
  [BlockEnum.KnowledgeRetrieval]: KnowledgeRetrievalNode,
  [BlockEnum.AutoKnowledgeRetrieval]: AutoKnowledgeRetrievalNode, // 新增自定义节点
  [BlockEnum.QuestionClassifier]: QuestionClassifierNode,
  [BlockEnum.IfElse]: IfElseNode,
  [BlockEnum.Code]: CodeNode,
  [BlockEnum.TemplateTransform]: TemplateTransformNode,
  [BlockEnum.HttpRequest]: HttpNode,
  [BlockEnum.Tool]: ToolNode,
  [BlockEnum.VariableAssigner]: VariableAssignerNode,
  [BlockEnum.Assigner]: AssignerNode,
  [BlockEnum.VariableAggregator]: VariableAssignerNode,
  [BlockEnum.ParameterExtractor]: ParameterExtractorNode,
  [BlockEnum.Iteration]: IterationNode,
  [BlockEnum.Loop]: LoopNode,
  [BlockEnum.DocExtractor]: DocExtractorNode,
  [BlockEnum.ListFilter]: ListFilterNode,
  [BlockEnum.Agent]: AgentNode,
}

export const PanelComponentMap: Record<string, ComponentType<any>> = {
  [BlockEnum.Start]: StartPanel,
  [BlockEnum.End]: EndPanel,
  [BlockEnum.Answer]: AnswerPanel,
  [BlockEnum.LLM]: LLMPanel,
  [BlockEnum.KnowledgeRetrieval]: KnowledgeRetrievalPanel,
  [BlockEnum.AutoKnowledgeRetrieval]: AutoKnowledgeRetrievalPanel, // 新增自定义节点
  [BlockEnum.QuestionClassifier]: QuestionClassifierPanel,
  [BlockEnum.IfElse]: IfElsePanel,
  [BlockEnum.Code]: CodePanel,
  [BlockEnum.TemplateTransform]: TemplateTransformPanel,
  [BlockEnum.HttpRequest]: HttpPanel,
  [BlockEnum.Tool]: ToolPanel,
  [BlockEnum.VariableAssigner]: VariableAssignerPanel,
  [BlockEnum.VariableAggregator]: VariableAssignerPanel,
  [BlockEnum.Assigner]: AssignerPanel,
  [BlockEnum.ParameterExtractor]: ParameterExtractorPanel,
  [BlockEnum.Iteration]: IterationPanel,
  [BlockEnum.Loop]: LoopPanel,
  [BlockEnum.DocExtractor]: DocExtractorPanel,
  [BlockEnum.ListFilter]: ListFilterPanel,
  [BlockEnum.Agent]: AgentPanel,
}

export const CUSTOM_NODE_TYPE = 'custom'

export const FILE_TYPE_OPTIONS = [
  { value: 'image', i18nKey: 'image' },
  { value: 'document', i18nKey: 'doc' },
  { value: 'audio', i18nKey: 'audio' },
  { value: 'video', i18nKey: 'video' },
]

export const TRANSFER_METHOD = [
  { value: TransferMethod.local_file, i18nKey: 'localUpload' },
  { value: TransferMethod.remote_url, i18nKey: 'url' },
]

export const SUB_VARIABLES = ['type', 'size', 'name', 'url', 'extension', 'mime_type', 'transfer_method', 'related_id']
export const OUTPUT_FILE_SUB_VARIABLES = SUB_VARIABLES.filter(key => key !== 'transfer_method')
