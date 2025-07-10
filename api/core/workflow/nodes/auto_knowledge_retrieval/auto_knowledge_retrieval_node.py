import logging
from typing import cast

from core.variables import StringSegment
from core.workflow.entities.node_entities import NodeRunResult
from core.workflow.nodes.enums import NodeType
from core.workflow.nodes.knowledge_retrieval import KnowledgeRetrievalNode
from core.workflow.nodes.knowledge_retrieval.entities import KnowledgeRetrievalNodeData
from extensions.ext_database import db
from models.dataset import Dataset
from models.workflow import WorkflowNodeExecutionStatus

logger = logging.getLogger(__name__)

class AutoKnowledgeRetrievalNode(KnowledgeRetrievalNode):
    """
    Auto Knowledge Retrieval Node that inherits from KnowledgeRetrievalNode.
    This node automatically retrieves from all enabled knowledge bases.
    """
    _node_data_cls = KnowledgeRetrievalNodeData
    _node_type = NodeType.AUTO_KNOWLEDGE_RETRIEVAL

    def _run(self) -> NodeRunResult:
        """
        覆盖父类的_run方法，确保query被正确传递
        """
        node_data = cast(KnowledgeRetrievalNodeData, self.node_data)
        
        # 从变量池中获取查询变量
        variable = self.graph_runtime_state.variable_pool.get(node_data.query_variable_selector)
        if not isinstance(variable, StringSegment):
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.FAILED,
                inputs={},
                error="Query variable is not string type.",
            )
            
        query = variable.value
        if not query:
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.FAILED,
                inputs={},
                error="Query is required.",
            )

        try:
            # 调用检索方法
            results = self._fetch_dataset_retriever(node_data=node_data, query=query)
            
            # 返回结果
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.SUCCEEDED,
                inputs={"query": query},
                outputs={"result": results}
            )
        except Exception as e:
            return NodeRunResult(
                status=WorkflowNodeExecutionStatus.FAILED,
                inputs={"query": query},
                error=str(e)
            )

    def _fetch_dataset_retriever(self, node_data: KnowledgeRetrievalNodeData, query: str):
        # 自动获取所有 external 类型知识库
        all_datasets = db.session.query(Dataset).filter(
            Dataset.tenant_id == self.tenant_id,
            Dataset.provider == 'external'
        ).all()
        node_data.dataset_ids = [str(ds.id) for ds in all_datasets]
        # 其它逻辑全部交给原生节点
        return super()._fetch_dataset_retriever(node_data, query) 