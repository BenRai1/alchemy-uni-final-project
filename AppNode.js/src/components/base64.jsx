const base64Example =
    "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"

export default base64Example
