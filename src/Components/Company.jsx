import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  companyOverviewDataSelector,
  companyOverviewLoadingSelector,
  companyOverviewErrorSelector,
} from "../store/selectors/companyOverviewSelector";
import {
  quarterlyReportsSelector,
  annualReportsSelector,
  incomeStatementLoadingSelector,
  incomeStatementErrorSelector,
} from "../store/selectors/incomeStatementSelector";
import { useParams } from "react-router-dom";
import { fetchCompanyOverviewAPI } from "../store/reducers/companyOverviewReducer";
import { fetchIncomeStatementAPI } from "../store/reducers/incomeStatementReducer";
import BarChart from "./core/BarChart";
import logo from "../assets/img/logo/logo.png";
import IconAndText from "./core/IconAndText";

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

  const xAxisData = annualReports?.map((data) => data?.fiscalDateEnding) || [];
  const yAxisData = annualReports?.map((data) => data?.totalRevenue) || [];

  const companyOverviewMap = [
    {
      icon: "fa-solid fa-location-dot pe-1",
      text: companyOverviewData?.Address ?? "No address available",
    },
    {
      icon: "fa-solid fa-dollar-sign pe-1",
      text: companyOverviewData?.Currency ?? "No Currency avialable",
    },
    {
      icon: "fa-solid fa-flag pe-1",
      text: companyOverviewData?.Sector ?? "No Sector avialable",
    },
    {
      icon: "fa-solid fa-earth-americas pe-1",
      text: companyOverviewData?.OfficialSite ?? "No Site avialable",
    },
    {
      icon: "fa-solid fa-signal pe-1",
      text: companyOverviewData?.CIK ?? "No Data avialable",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-start items-center bg-slate-200">
        <div className="w-1/6 border-0 rounded-sm p-8">
          <img className="w-full overflow-hidden" src={logo} alt="logo" />
        </div>
        <div className="w-5/6 flex justify-between items-center">
          <div>
            <span className="flex justify-start items-center">
              <IconAndText
                data={{
                  icon: "fa-solid fa-building pe-1",
                  text: companyOverviewData?.AssetType,
                }}
              />
            </span>
            <h2 className="text-2xl">{companyOverviewData?.Name}</h2>
          </div>
          <div className="m-8 flex items-center">
            <button className="me-1 border-2 p-2 border-orange-500 bg-white rounded-lg">
              <i className="fa-solid fa-bolt m-1 text-orange-500"></i>
              CONNECT TO CRM
            </button>
            <button className="me-2 border-2 p-2 text-white bg-blue-700 rounded-lg">
              <i className="fa-solid fa-circle-plus m-1"></i>
              SAVE
            </button>
            <button className="mx-2">
              <i className="fa-solid fa-ellipsis-vertical text-3xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-start items-center mt-8">
        {/* Left Body */}
        {companyOverviewLoading ? (
          <div>Loading...</div>
        ) : companyOverviewError ? (
          <div>Error loading data. Please try again later.</div>
        ) : (
          <div className="w-1/3 mx-10 pe-4 border-e-2">
            {companyOverviewData ? (
              <div>
                <h2 className="mb-5 text-2xl">About</h2>
                <p className="my-6 text-base text-neutral-600">
                  {companyOverviewData?.Description?.slice(0, 150) ??
                    "No description available"}
                </p>

                <div>
                  {companyOverviewMap?.map((data, index) => (
                    <IconAndText data={data} key={index} />
                  ))}
                </div>
              </div>
            ) : companyOverviewError ? (
              <div>Error loading data. Please try again later.</div>
            ) : null}
          </div>
        )}

        {/* Right Body */}
        <div className="w-2/3 me-8">
          {incomeStatementLoading ? (
            <div>Loading...</div>
          ) : incomeStatementError ? (
            <div>Error loading data. Please try again later.</div>
          ) : (
            <BarChart xAxisData={xAxisData} yAxisData={yAxisData} />
          )}
        </div>
      </div>
    </>
  );
};

export default Company;
