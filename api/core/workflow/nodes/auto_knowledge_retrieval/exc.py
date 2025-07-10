class AutoKnowledgeRetrievalNodeError(ValueError):
    """Base class for AutoKnowledgeRetrievalNode errors."""


class ModelNotExistError(AutoKnowledgeRetrievalNodeError):
    """Raised when the model does not exist."""


class ModelCredentialsNotInitializedError(AutoKnowledgeRetrievalNodeError):
    """Raised when the model credentials are not initialized."""


class ModelNotSupportedError(AutoKnowledgeRetrievalNodeError):
    """Raised when the model is not supported."""


class ModelQuotaExceededError(AutoKnowledgeRetrievalNodeError):
    """Raised when the model provider quota is exceeded."""


class InvalidModelTypeError(AutoKnowledgeRetrievalNodeError):
    """Raised when the model is not a Large Language Model."""


class NoExternalDatasetsError(AutoKnowledgeRetrievalNodeError):
    """Raised when no external datasets are available for retrieval.""" 