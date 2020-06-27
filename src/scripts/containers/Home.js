import React from 'react'
import CodeView from '../components/CodeView'
import Input from '../components/Input'
import { getMethodDescription } from '../helper'
import { codeStore, historyStore, settingsStore } from '../store'

const Home = (props) => {
    const { width, height } = props.frame
    const { code } = codeStore.useStore()
    const previewTheme = settingsStore.useStore(s => s.previewTheme)
    const previewFontSize = settingsStore.useStore(s => s.previewFontSize)

    const onChange = sender => {
        sender.text = sender.text.trim()
        const description = getMethodDescription(sender.text)
        if (!description) return
        sender.blur()
        codeStore.update(state => {
            state.code = description
        })
        historyStore.update(draft => {
            if (!draft.history.some(item => item === sender.text)) {
                draft.history.unshift(sender.text)
            }
        })
    }

    return (
        <view {...props}>
            <Input
                key="input"
                frame={$rect(4, 4, width - 8, 32)}
                onChange={onChange}
            />
            <CodeView frame={$rect(0, 40, width, height - 40)} hidden={!code} content={code} theme={previewTheme} fontSize={previewFontSize} />
        </view>
    )
}

export default Home