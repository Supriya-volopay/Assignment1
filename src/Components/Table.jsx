import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../store/reducers/gainer&LosserReducer";
import FormateTable from './tableFormate';

const Table = () => {
  const headerContent = [
    "Ticker",
    "Price",
    "Change Amount",
    "Change Percentage",
    "Volume",
  ];
  const headers = [
    "ticker",
    "price",
    "change_amount",
    "change_percentage",
    "volume",
  ];

  const dispatch = useDispatch();

  const {data,isLoading, isError} = useSelector((state) => state.GainerLooser);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);
  
  if (isLoading) {
    return <h1 className="text-4xl text-center">Loading....</h1>;
  } else if (isError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if(data){
    return (
      <>
        <h1 className="text-4xl text-center my-5">
          {data?.metadata}
        </h1>
        <FormateTable headerContent={headerContent} headers={headers} state={data?.top_losers} />
        <FormateTable headerContent={headerContent} headers={headers} state={data?.top_losers} />
      </>
    );
  }
};

export default Table;
