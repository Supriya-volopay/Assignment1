import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAPI } from "../store/reducers/productsReducer";
import {
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector,
  totalProductsSelector,
  productsPagesSelector,
} from "../store/selectors/productsSelector";
import FormateTable from "./core/TableFormate";
import { useInView } from "react-intersection-observer";
import { setLoading, setPagination } from "../store/reducers/productsReducer";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const headerContent = [
    "Product Name",
    "Category",
    "Price",
    "Rating",
    "Stock",
  ];
  const headers = ["title", "category", "price", "rating", "stock"];

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(productsSelector);
  const totalProducts = useSelector(totalProductsSelector);
  const productsLoading = useSelector(productsLoadingSelector);
  const productsError = useSelector(productsErrorSelector);
  const pages = useSelector(productsPagesSelector);

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (bottomInView && !productsLoading && pages.skip <= totalProducts) {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(fetchProductsAPI({ skip: pages.skip }));
        dispatch(setPagination(pages.skip));
        searchParams.set("skip", pages.skip);
        setSearchParams(searchParams);
        dispatch(setLoading(false));
      }, 500);
    }
  }, [bottomInView, productsLoading, dispatch, pages.skip]);

  if (productsError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if (products) {
    return (
      <div className="">
        <FormateTable
          tableName="Product Page"
          headerContent={headerContent}
          headers={headers}
          state={products}
          click={false}
        />
        <div
          ref={bottomRef}
          style={{ height: 50, background: "lightgray", margin: "20px 0" }}
        >
          {pages.skip >= totalProducts
            ? "No More Products"
            : productsLoading
            ? "Loading..."
            : "Load more..."}
        </div>
      </div>
    );
  }
};

export default Products;
