import React, {useEffect, useState} from "react";
import {CommonTable} from "../components/Tables";
import {capitalize, getDetailsUrl, getKeys, getPaginationUrl} from "../util/Util";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faCog, faHome, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown} from '@themesberg/react-bootstrap';
import BackendService from "./BackendService";

const queryString = require('query-string');

export default (props) => {
    const {requestMethod, pageUrl, showFilters} = props;
    const backendService = new BackendService();

    const searchByOptions = ["procuring entity", "tender"]

    const [data, setData] = useState([]);
    const [fields, setFields] = useState([])
    const [ready, setReady] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTender, setSearchTender] = useState("")
    const [searchEntity, setSearchEntity] = useState("")
    const [searchIrregularity, setSearchIrregularity] = useState("")
    const [searchBy, setSearchBy] = useState("")

    useEffect(() => {
        const getData = async () => {
            const {page, irregularity, tender, entity} = queryString.parse(window.location.search);
            const filter = {irregularity, tender, entity}
            console.log(irregularity, tender, entity)
            if (irregularity) {
                setSearchIrregularity(irregularity)
            }
            if (tender) {
                setSearchTender(tender)
            }
            if (entity) {
                setSearchEntity(entity)
            }

            let data, total;
            if (page && parseInt(page) > 0) {
                setCurrentPage(page)
                const {results, count} = await requestMethod(page * 10 - 10, filter)
                data = results
                total = count
            } else {
                const {results, count} = await requestMethod(0, filter)
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

    const viewDetails = (id) => {
        const url = getDetailsUrl(pageUrl === "" ? "flags" : pageUrl, id)
        console.log(url)
        window.location.href = url;
    }

    const handleNextPage = async () => {
        const filter = {irregularity: searchIrregularity, tender: searchTender, entity: searchEntity}
        const url = getPaginationUrl('plus', currentPage, pageUrl, totalCount, filter)
        console.log(url)
        window.location.href = url;
    }

    const handlePrevPage = async () => {
        const filter = {irregularity: searchIrregularity, tender: searchTender, entity: searchEntity}
        const url = getPaginationUrl('minus', currentPage, pageUrl, totalCount, filter)
        console.log(url)
        window.location.href = url;
    }

    const handleFirstPage = () => {
        const filter = {irregularity: searchIrregularity, tender: searchTender, entity: searchEntity}
        const url = getPaginationUrl('equal', 1, pageUrl, totalCount, filter)
        console.log(url)
        window.location.href = url;
    }

    const handleLastPage = () => {
        const filter = {irregularity: searchIrregularity, tender: searchTender, entity: searchEntity}
        const url = getPaginationUrl('equal', totalCount / 10 + 1, pageUrl, totalCount, filter)
        console.log(url)
        window.location.href = url;
    }

    const handlePageChange = (page) => {
        const filter = {irregularity: searchIrregularity, tender: searchTender, entity: searchEntity}
        const url = getPaginationUrl('equal', page, pageUrl, totalCount, filter)
        console.log(url)
        window.location.href = url;
    }

    const handleSearchTenderChange = (event) => {
        console.log(event.target.value)
        if (event.target.value) {
            setSearchTender(event.target.value)
        } else {
            setSearchTender("")
        }
    }

    const handleSearchIrregularityChange = (event) => {
        console.log(event.target.value)
        if (event.target.value) {
            setSearchIrregularity(event.target.value)
        } else {
            setSearchIrregularity("")
        }
    }

    const handleSearchEntityChange = (event) => {
        console.log(event.target.value)
        if (event.target.value) {
            setSearchEntity(event.target.value)
        } else {
            setSearchEntity("")
        }
    }

    const filterData = () => {
        const filter = {irregularity: searchIrregularity, tender: searchTender, entity: searchEntity}
        const url = getPaginationUrl('', 0, pageUrl, totalCount, filter)
        console.log(url)
        window.location.href = url;
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>{capitalize(pageUrl)}</h4>
                </div>
            </div>

            {showFilters && <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <Form.Group id="id" className="mb-4">
                            <Form.Label>{"Procuring entity"}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </InputGroup.Text>
                                <Form.Control type="text" placeholder="Search" value={searchEntity}
                                              onChange={handleSearchEntityChange}/>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <Form.Group id="id" className="mb-4">
                            <Form.Label>{"Irregularity"}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </InputGroup.Text>
                                <Form.Control type="text" placeholder="Search" value={searchIrregularity}
                                              onChange={handleSearchIrregularityChange}/>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <Form.Group id="id" className="mb-4">
                            <Form.Label>{"Tender"}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </InputGroup.Text>
                                <Form.Control type="text" placeholder="Search" value={searchTender}
                                              onChange={handleSearchTenderChange}/>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={filterData}>Search</Button>
                    </Col>
                </Row>
            </div>}
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
                viewDetails={viewDetails}
            />
        </>
    );
};
