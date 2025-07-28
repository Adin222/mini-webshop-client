import React, { useState } from "react";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import { Filters } from "../../components/core/Filters";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../components/core/cards/ProductCard";
import { FilterModal } from "../../components/core/FilterModal";
import { SortModal } from "../../components/core/SortModal";

//Services
import { Get } from "../../services/services";

//Paths
import { getProductsPath } from "../../paths/paths";

export const HomePage = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [filterData, setFilterData] = useState({
    name: "",
    min_price: 0,
    max_price: 0,
    quantity: 0,
    sort: "desc",
  });

  const buildQueryString = () => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filterData)) {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    }

    setQueryString(params.toString());
    setSortModal(false);
    setFilterModal(false);
  };

  const clearFilter = () => {
    setFilterData({
      name: "",
      min_price: 0,
      max_price: 0,
      quantity: 0,
      sort: "desc",
    });
    setQueryString("");
  };

  const handleFilterData = (e) => {
    setFilterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-data", queryString],
    queryFn: () => Get(`${getProductsPath}?${queryString}`),
    retry: false,
  });

  const products = data?.data ?? [];

  return (
    <React.Fragment>
      <div className="mb-10">
        <MarginWrapper>
          <Filters
            setFilterModal={setFilterModal}
            setSortModal={setSortModal}
            queryString={queryString}
            clearFilter={clearFilter}
          />

          {isLoading && <p className="mt-6">Loading products...</p>}
          {isError && (
            <p className="mt-6 text-red-500">Failed to load products.</p>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <p className="mt-6 text-center text-gray-500 text-xl">
              Web shop is empty
            </p>
          )}

          {products.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.product_name}
                  price={product.price}
                  imageUrl={product.image_url}
                  quantity={product.quantity}
                />
              ))}
            </div>
          )}
        </MarginWrapper>
      </div>
      <FilterModal
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        filterData={filterData}
        handleFilterData={handleFilterData}
        buildQueryString={buildQueryString}
        clearFilter={clearFilter}
      />
      <SortModal
        sortModal={sortModal}
        setSortModal={setSortModal}
        filterData={filterData}
        handleFilterData={handleFilterData}
        buildQueryString={buildQueryString}
        clearFilter={clearFilter}
      />
    </React.Fragment>
  );
};
