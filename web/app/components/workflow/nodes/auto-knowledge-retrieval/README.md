# Auto Knowledge Retrieval 前端文件夹

这是完整的自动知识检索节点前端文件夹，包含所有必要的文件。

## 文件结构

```
auto-knowledge-retrieval/
├── README.md                      # 说明文件
├── types.ts                       # 类型定义
├── default.ts                     # 默认配置
├── node.tsx                       # 节点组件
├── panel.tsx                      # 面板组件
├── hooks.ts                       # 自定义hooks
├── use-config.ts                  # 配置hook
├── utils.ts                       # 工具函数
└── components/                    # 子组件
    ├── auto-dataset-list.tsx      # 自动数据集列表
    └── auto-config.tsx            # 自动配置组件
```

## 使用方法

1. **复制文件夹**：
   将整个 `auto-knowledge-retrieval` 文件夹复制到 Dify 项目中：
   ```
   cp -r auto-knowledge-retrieval /path/to/dify/web/app/components/workflow/nodes/
   ```

2. **注册节点**：
   按照完整部署指南中的步骤注册节点：
   - 修改后端枚举和映射
   - 修改前端类型定义
   - 修改节点选择器配置
   - 修改前端组件映射

3. **重启服务**：
   重启 Dify 的前端和后端服务

## 文件说明

### 核心文件
- `types.ts` - 定义了 AutoKnowledgeRetrievalNodeType 等类型
- `default.ts` - 节点的默认配置和验证逻辑
- `node.tsx` - 工作流画布中显示的节点组件
- `panel.tsx` - 节点配置面板组件

### 辅助文件
- `hooks.ts` - 自定义React hooks
- `use-config.ts` - 配置相关的hook
- `utils.ts` - 工具函数

### 组件文件
- `components/auto-dataset-list.tsx` - 显示自动数据集列表
- `components/auto-config.tsx` - 自动配置组件

## 特性

- ✅ 自动获取所有外部知识库
- ✅ 支持重排序和权重配置
- ✅ 支持元数据过滤
- ✅ 与原生节点性能一致
- ✅ 美观的界面设计
- ✅ 完整的类型定义

## 注意事项

1. 这个文件夹是基于原生知识检索节点的结构创建的
2. 移除了手动选择知识库的功能，改为自动获取
3. 简化了一些复杂的配置，但保留了核心功能
4. 所有文件都已经适配了自动检索的逻辑

## 兼容性

- 兼容 Dify 最新版本
- 支持 React 18+
- 支持 TypeScript
- 使用 Tailwind CSS 样式 