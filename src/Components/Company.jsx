import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyOverviewDataSelector, companyOverviewLoadingSelector, companyOverviewErrorSelector} from '../store/selectors/companyOverviewSelector';
import { quarterlyReportsSelector, annualReportsSelector, incomeStatementLoadingSelector, incomeStatementErrorSelector } from '../store/selectors/incomeStatementSelector';
import { useParams } from "react-router-dom";
import { fetchCompanyOverviewAPI } from '../store/reducers/companyOverviewReducer';
import { fetchIncomeStatementAPI } from '../store/reducers/incomeStatementReducer';
import Chart from './Chart';
import logo from '../assets/img/logo/logo.png'

const Company = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompanyOverviewAPI({ param: id }));
        dispatch(fetchIncomeStatementAPI({ param: id }));
    }, [id]);

    const companyOverviewData = useSelector(companyOverviewDataSelector);
    const companyOverviewLoading = useSelector(companyOverviewLoadingSelector);
    const companyOverviewError = useSelector(companyOverviewErrorSelector);
    const annualReports = useSelector(annualReportsSelector);
    const quarterlyReports = useSelector(quarterlyReportsSelector);
    const incomeStatementLoading = useSelector(incomeStatementLoadingSelector);
    const incomeStatementError = useSelector(incomeStatementErrorSelector);

    const xAxisData = annualReports.map((data) => data?.fiscalDateEnding) || [];
    const yAxisData = annualReports.map((data) => data?.totalRevenue) || [];

    // // Handle loading
    // if (companyOverviewLoading && incomeStatementLoading) {
    //     return <div>Loading...</div>;
    // }

    // // Handle errors
    // if (companyOverviewError && incomeStatementError) {
    //     return <div>Error loading data. Please try again later.</div>;
    // }

    // const descriptionPreview =
    //     companyOverviewData?.Description
    //         ? companyOverviewData.Description.substring(0, 30)
    //         : "No description available";

    const descriptionPreview =
        companyOverviewData?.Description
            ? companyOverviewData.Description.substring(0, 30)
            : "No description available";

    return(
        <>
        <div>
            <div>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <div>
                <span>
                    <i className="fa-solid fa-building"></i>
                    <h3>{companyOverviewData?.AssetType}</h3>
                </span>
                <h2>{companyOverviewData?.Name}</h2>
                </div>
                <div>
                    <button>
                        <i className="fa-solid fa-bolt"></i>
                        CONNECT TO CRM
                    </button>
                    <button>
                    <i className="fa-solid fa-circle-plus"></i>
                    SAVE
                    </button>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        </div>
        {/* Conditional rendering for About section */}
        {companyOverviewData ? (
            <div>
                <h2>About</h2>
                <p>{companyOverviewData?.Description ?? "No description available"}</p>
                <div>
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{companyOverviewData?.Address ?? "No address available"}</p>
                </div>
            </div>
        ) : companyOverviewError ? (
            <div>Error loading data. Please try again later.</div>
        ) : null}
        <div><Chart xAxisData={xAxisData} yAxisData={yAxisData} /></div>
        </>
    );
}

export default Company;