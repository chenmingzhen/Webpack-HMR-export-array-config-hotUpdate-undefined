import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return (
        <>
            <div>div</div>
            <span>span</span>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

/** 添加后，不再刷新整个页面 */
if (module.hot) module.hot.accept()
