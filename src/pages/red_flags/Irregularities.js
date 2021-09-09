import React from "react";
import BackendService from "../../util/BackendService";
import CommonPage from "../../util/CommonPage";

export default () => {
    const backendService = new BackendService();
    const pageUrl = "/irregularities"
    return <CommonPage pageUrl={pageUrl} requestMethod={backendService.getIrregularities} />
};
