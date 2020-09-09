权限组件，通过比对现有权限与准入权限，决定相关元素的展示。

<br>

## 核心思想
***

<br>

页面按钮资源在页面初始化过程的时候，计算当前页面的资源按钮，在业务页面加载完成之后，发送请求到后台访问资源。

<br>

## 使用方式

<br>

#### 1. 普通用法 【页面资源初始化的时候，按钮已经加载完成】

<br>

```
<AuthoriedButton code="10002">
  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
    编辑
  </Button>
</AuthoriedButton>
```

<br>

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| code    | 页面资源code           | string  | - |

<br><br><br>

#### 2. 扩展用法 【页面资源初始化的时候，按钮资源未加载完成】

<br>

<font style="color: red">此时我们需要扩展组件去代发按钮资源还没加载的数据</font>

<br>

```
<AuthoriedButton code="10001" extendCode={["10005"]}>
  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
    新建
  </Button>
</AuthoriedButton>
```

<br>

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| code    | 页面资源code           | string  | - |
| extendCode    | 需要代发请求的扩展code，例如表格行内的按钮           | string[]  | - |

<br>

<font style="color: red">假如当前页面没有初始化已经加载完成的按钮，则直接使用下面方式</font>

<br>

```
<AuthoriedButton extendCode={["10006"]} />

```

<br>

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| extendCode    | 需要代发请求的扩展code，例如表格行内的按钮           | string[]  | - |