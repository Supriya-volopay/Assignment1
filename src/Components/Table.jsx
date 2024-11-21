import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGainerLooserAPI } from "../store/reducers/gainer&LosserReducer";
import FormateTable from './TableFormate';
import { gainerAndLoserErrorSelector, gainerAndLoserLoadingSelector, metadataSelector, gainerSelector, loserSelector } from "../store/selectors/gainAndLosersSelector";

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

  const metadata = useSelector(metadataSelector)
  const gainerData = useSelector(gainerSelector)
  const loserData = useSelector(loserSelector)
  const isLoading = useSelector(gainerAndLoserLoadingSelector) 
  const isError = useSelector(gainerAndLoserErrorSelector)
  
  useEffect(() => {
    dispatch(fetchGainerLooserAPI());
  }, []);
  
  if (isLoading) {
    return <h1 className="text-4xl text-center">Loading....</h1>;
  } else if (isError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if(gainerData || loserData){
    return (
      <>
        <h1 className="text-4xl text-center my-5">
          {metadata}
        </h1>
        <FormateTable tableName='Top Gainer' headerContent={headerContent} headers={headers} state={gainerData} />
        <FormateTable tableName='Top Loser' headerContent={headerContent} headers={headers} state={loserData} />
      </>
    );
  }
};

export default Table;
