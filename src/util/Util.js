export const baseUrl = "http://localhost:3000"

export const getKeys = (data) => {
    const row = data[0];
    return row ? Object.keys(row) : [];
}

export const getPagination = (currentPage, totalCount) => {
    const page = parseInt(currentPage)
    const total = totalCount / 10
    if (page >= 4 && page <= total - 3) {
        const pagination = []
        for (let i = page - 3; i < page + 4; i++) {
            pagination.push(i)
        }
        return pagination
    }
    else if (page < 4) {
        const pagination = []
        for (let i = page - 3; i < page + 3; i++) {
            if (i > 0 && i <= total + 1) {
                pagination.push(i)
            }
        }
        return pagination
    }
    else if (page > total - 3) {
        const pagination = []
        for (let i = page - 3; i < page + 3; i++) {
            if (i <= total + 1) {
                pagination.push(i)
            }
        }
        return pagination
    }
}

export const getPaginationUrl = (mode, currentPage, pageUrl, totalCount) => {
    const page = parseInt(currentPage)
    const total = totalCount / 10
    if (page && page > 0 && page <= total + 1) {
        if (mode === 'plus' && page < total) {
            return `${baseUrl}/?page=${page + 1}#${pageUrl}`
        }
        else if (mode === 'minus' && page > 1) {
            return `${baseUrl}/?page=${page - 1}#${pageUrl}`
        }
        else if (mode === 'equal') {
            return `${baseUrl}/?page=${page}#${pageUrl}`
        }
        else {
            return `${baseUrl}/?page=${page}#${pageUrl}`
        }
    }
    else {
        return `${baseUrl}/#${pageUrl}`
    }
}