const input = `/dir/file
/dir/dir2/file2
/dir/file3
/dir2/alpha/beta/gamma/delta
/dir2/alpha/beta/gamma/delta/
/dir3/file4
/dir3/file5`

function splitPart(str, separator, num) {
    if (num === 0) return str
    const strSplit = str.split(separator, num)
    const tailStr = str.slice(strSplit.join(separator).length+1)
    return tailStr === '' ? strSplit : strSplit.concat(tailStr)
}

function opera(branch, tree) {
    const parts = splitPart(branch, '/', 1)
    if (parts.length === 1) {
        tree.files.push(parts[0])
    } else {
        if (!tree[parts[0]]) {
            tree[parts[0]] = {
                files: []
            }
        }
        opera(parts[1], tree[parts[0]])
    }
}

const tree = {}
for (const item of input.split('\n')) {
    opera(item, tree)
}
console.log(JSON.stringify(tree, null, 4))
