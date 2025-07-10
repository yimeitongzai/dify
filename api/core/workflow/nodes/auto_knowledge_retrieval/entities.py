from collections.abc import Sequence
from typing import Any, Literal, Optional

from pydantic import BaseModel, Field

from core.workflow.nodes.base import BaseNodeData
from core.workflow.nodes.llm.entities import VisionConfig


class RerankingModelConfig(BaseModel):
    """
    Reranking Model Config.
    """

    provider: str
    model: str


class VectorSetting(BaseModel):
    """
    Vector Setting.
    """

    vector_weight: float
    embedding_provider_name: str
    embedding_model_name: str


class KeywordSetting(BaseModel):
    """
    Keyword Setting.
    """

    keyword_weight: float


class WeightedScoreConfig(BaseModel):
    """
    Weighted score Config.
    """

    vector_setting: VectorSetting
    keyword_setting: KeywordSetting


class MultipleRetrievalConfig(BaseModel):
    """
    Multiple Retrieval Config.
    """

    top_k: int
    score_threshold: Optional[float] = None
    reranking_mode: str = "reranking_model"
    reranking_enable: bool = True
    reranking_model: Optional[RerankingModelConfig] = None
    weights: Optional[WeightedScoreConfig] = None


class ModelConfig(BaseModel):
    """
    Model Config.
    """

    provider: str
    name: str
    mode: str
    completion_params: dict[str, Any] = {}


class SingleRetrievalConfig(BaseModel):
    """
    Single Retrieval Config.
    """

    model: ModelConfig


SupportedComparisonOperator = Literal[
    # for string or array
    "contains",
    "not contains",
    "start with",
    "end with",
    "is",
    "is not",
    "empty",
    "not empty",
    # for number
    "=",
    "≠",
    ">",
    "<",
    "≥",
    "≤",
    # for time
    "before",
    "after",
]


class Condition(BaseModel):
    """
    Conditon detail
    """

    name: str
    comparison_operator: SupportedComparisonOperator
    value: str | Sequence[str] | None | int | float = None


class MetadataFilteringCondition(BaseModel):
    """
    Metadata Filtering Condition.
    """

    logical_operator: Optional[Literal["and", "or"]] = "and"
    conditions: Optional[list[Condition]] = Field(default=None, deprecated=True)


class AutoKnowledgeRetrievalNodeData(BaseNodeData):
    """
    Auto Knowledge retrieval Node Data.
    自动知识检索节点数据 - 不需要手动选择知识库，自动检索所有外部知识库
    """

    type: str = "auto-knowledge-retrieval"
    query_variable_selector: list[str]
    # 移除 dataset_ids，改为自动获取
    # dataset_ids: list[str]  # 不再需要手动指定
    retrieval_mode: Literal["single", "multiple"]
    multiple_retrieval_config: Optional[MultipleRetrievalConfig] = None
    single_retrieval_config: Optional[SingleRetrievalConfig] = None
    metadata_filtering_mode: Optional[Literal["disabled", "automatic", "manual"]] = "disabled"
    metadata_model_config: Optional[ModelConfig] = None
    metadata_filtering_conditions: Optional[MetadataFilteringCondition] = None
    vision: VisionConfig = Field(default_factory=VisionConfig)
    
    # 新增配置项
    auto_retrieval_enabled: bool = True  # 是否启用自动检索
    external_only: bool = True  # 是否只检索外部知识库 