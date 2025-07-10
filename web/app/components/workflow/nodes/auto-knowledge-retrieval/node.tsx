import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { NodeProps } from '../../types'
import type { KnowledgeRetrievalNodeType } from '../knowledge-retrieval/types'
import KnowledgeRetrievalNode from '../knowledge-retrieval/node'

const AutoKnowledgeRetrievalNode: FC<NodeProps<KnowledgeRetrievalNodeType>> = ({ id, data }) => {
  const { t } = useTranslation()

  // 强制设置为只读模式，这样用户就不能修改知识库选择了
  return (
    <KnowledgeRetrievalNode 
      id={id} 
      data={{
        ...data,
        title: t('workflow.nodes.autoKnowledgeRetrieval.title'),
        desc: t('workflow.nodes.autoKnowledgeRetrieval.desc'),
        // 强制设置为只读模式
        readonly: true,
        // 添加提示信息
        tip: t('workflow.nodes.autoKnowledgeRetrieval.tip')
      }} 
    />
  )
}

export default AutoKnowledgeRetrievalNode
