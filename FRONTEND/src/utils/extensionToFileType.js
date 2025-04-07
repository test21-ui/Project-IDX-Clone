export const extensionToFileType = (extension) => {
    const fileTypeMap = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        html: "html",
        css: "css",
        json: "json",
        md: "markdown",
        java: "java",
        c: "c",
        cpp: "cpp",
        go: "go",
        php: "php",
        cpp: "cpp",
        rb: "ruby",
        swift: "swift",
        kotlin: "kotlin",
        sql: "sql",
        bash: "shell",
        sh: "shell",
        xml: "xml",
        svg: "svg",
    };

    return fileTypeMap[extension] || "plaintext"; // Default to plaintext if not found
}