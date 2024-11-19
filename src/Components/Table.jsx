import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../State/Slice/Gainer&LosserAPI";
import FormateTable from './TableFormate';

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

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchAPI());
  }, [dispatch]);

  console.log(state);
  if (state.GainerLooser.isLoading) {
    return <h1 className="text-4xl text-center">Loading....</h1>;
  } else if (state.GainerLooser.isError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if(state.GainerLooser.data?.data){
    return (
      <>
        <h1 className="text-4xl text-center my-5">
          {state.GainerLooser.data?.data?.metadata}
        </h1>
        <FormateTable headerContent={headerContent} headers = {headers} state={state.GainerLooser.data?.data?.top_losers} />
        <FormateTable headerContent={headerContent} headers = {headers} state={state.GainerLooser.data?.data?.top_losers} />
      </>
    );
  }
};

export default Table;
