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
    } else if (page < 4) {
        const pagination = []
        for (let i = page - 3; i < page + 3; i++) {
            if (i > 0 && i <= total + 1) {
                pagination.push(i)
            }
        }
        return pagination
    } else if (page > total - 3) {
        const pagination = []
        for (let i = page - 3; i < page + 3; i++) {
            if (i <= total + 1) {
                pagination.push(i)
            }
        }
        return pagination
    }
}

export const getPaginationUrl = (mode, currentPage, pageUrl, totalCount, filter) => {
    const page = parseInt(currentPage)
    const total = totalCount / 10
    let irregularity="", tender="", entity="";
    if (filter) {
        if (filter.irregularity) {
            irregularity = filter.irregularity
        }
        if (filter.tender) {
            tender = filter.tender
        }
        if (filter.entity) {
            entity = filter.entity
        }
    }
    let parsedPage = page

    if (page && page > 0 && page <= total + 1) {
        if (mode === 'plus' && page < total) {
            parsedPage = page + 1
        } else if (mode === 'minus' && page > 1) {
            parsedPage = page - 1
        }
        return `${baseUrl}/?page=${parsedPage}&irregularity=${irregularity}&tender=${tender}&tender__procuring_entity=${entity}#/${pageUrl}`
    } else {
        if (filter) {
            return `${baseUrl}/?irregularity=${irregularity}&tender=${tender}&tender__procuring_entity=${entity}#/${pageUrl}`
        }
        else {
            return `${baseUrl}/#/${pageUrl}`
        }
    }
}

export const getDetailsUrl = (page, id) => {
    return `${baseUrl}/#/details/${page}/${id}`
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}