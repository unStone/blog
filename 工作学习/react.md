### forceUpdate()

如果 render 方法依赖其他数据，可以通过 forceUpdate() 重新渲染

调用 forceUpdate() 会导致组件跳过 shouldComponentUpdate()，直接调用 render()。
这将触发子组件的正常生命周期，包括子组件的 shouleComponentUpdate() 方法