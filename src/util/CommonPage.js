import React, {useEffect, useState} from "react";
import {CommonTable} from "../components/Tables";
import {getKeys, getPaginationUrl} from "../util/Util";

const queryString = require('query-string');

export default (props) => {
    const {requestMethod, pageUrl} = props;

    const [data, setData] = useState([]);
    const [fields, setFields] = useState([])
    const [ready, setReady] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const getData = async () => {
            const {page} = queryString.parse(window.location.search);
            let data, total;
            if (page && parseInt(page) > 0) {
                setCurrentPage(page)
                const {results, count} = await requestMethod(page * 10 - 10)
                data = results
                total = count
            } else {
                const {results, count} = await requestMethod()
                data = results
                total = count
            }
            console.log("page", page)

            if (page && parseInt(page) < 1 || parseInt(page) > total / 10 + 1) {
                window.location.replace(getPaginationUrl('', 0, pageUrl, total));
            }


            const keys = getKeys(data)

            setTotalCount(total)
            setFields(keys)
            setData(data)
            setReady(true)
        }
        getData()
    }, [])

    const handleNextPage = async () => {
        const url = getPaginationUrl('plus', currentPage, pageUrl, totalCount)
        console.log(url)
        window.location.href = url;
    }

    const handlePrevPage = async () => {
        const url = getPaginationUrl('minus', currentPage, pageUrl, totalCount)
        console.log(url)
        window.location.href = url;
    }

    const handleFirstPage = () => {
        const url = getPaginationUrl('equal', 1, pageUrl, totalCount)
        console.log(url)
        window.location.href = url;
    }

    const handleLastPage = () => {
        const url = getPaginationUrl('equal', totalCount / 10 + 1, pageUrl, totalCount)
        console.log(url)
        window.location.href = url;
    }

    const handlePageChange = (page) => {
        const url = getPaginationUrl('equal', page, pageUrl, totalCount)
        console.log(url)
        window.location.href = url;
    }

    return (
        <>
            <CommonTable
                ready={ready}
                data={data}
                fields={fields}
                totalCount={totalCount}
                currentPage={currentPage}
                pageUrl={pageUrl}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleFirstPage={handleFirstPage}
                handleLastPage={handleLastPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
};
