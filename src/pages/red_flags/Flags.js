import React from "react";
import BackendService from "../../util/BackendService";
import CommonPage from "../../util/CommonPage";

export default () => {
    const backendService = new BackendService();
    const pageUrl = "/flags"
    return <CommonPage pageUrl={pageUrl} requestMethod={backendService.getFlags} />
};
