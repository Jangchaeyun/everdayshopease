import React, { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import content from "../../data/content.json";
import Rating from "../../components/Rating/Rating";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductColors from "./ProductColors";

const categories = content?.categories;

const ProductDetails = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState(
    product?.images[0]?.startsWith("http")
      ? product?.images[0]
      : product?.thumbnail
  );
  const [breadcrumbLinks, setBreadcrumbLinks] = useState([]);

  const productCategory = useMemo(() => {
    return categories?.find(
      (category) => category?.id === product?.category_id
    );
  }, [product]);

  useEffect(() => {
    setBreadcrumbLinks([]);
    const arrayLinks = [
      { title: "홈", path: "/" },
      {
        title: productCategory?.name,
        path: productCategory?.path,
      },
    ];
    const productType = productCategory?.types?.find(
      (item) => item?.type_id === product?.type_id
    );
    if (productType) {
      arrayLinks?.push({
        title: productType?.name,
        path: productType?.name,
      });
    }
    setBreadcrumbLinks(arrayLinks);
  }, [productCategory, product]);

  return (
    <div className="flex flex-col md:flex-row p-10">
      <div className="w-[100%] lg:w-[50%]  md:w-[40%]">
        {/* Image */}
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[20%] justify-center h-[40px] md:h-[420px]">
            {/* Stack images */}
            <div className="flex flex-row md:flex-col justify-center h-full">
              {product?.images[0].startsWith("http") &&
                product?.images?.map((item, index) => (
                  <button
                    onClick={() => setImage(item)}
                    className="rounded-lg w-fit p-2 mb-2"
                  >
                    <img
                      src={item}
                      className="h-[60px] w-[60px] bg-center bg-cover hover:scale-105"
                      alt={"sample-" + index}
                    />
                  </button>
                ))}
            </div>
          </div>
          <div className="w-full md:w-[80%] flex justify-center md:pt-0 pt-10">
            <img
              src={image}
              className="h-full w-full max-h-[620px] border rounded-lg cursor-pointer object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-[60%] px-10">
        {/* Product Description */}
        <Breadcrumb links={breadcrumbLinks} />
        <p className="text-3xl pt-4">{product?.title}</p>
        <Rating rating={product?.rating} />
        <div className="flex flex-col">
          <div className="flex gap-2">
            <p className="text-sm bold">사이즈 선택</p>
            <Link
              className="text-sm text-gray-500 hover:text-gray-900"
              to={"https://ko.wikipedia.org/wiki/%EC%98%B7_%ED%81%AC%EA%B8%B0"}
            >
              {"사이즈 가이드 ->"}
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <SizeFilter sizes={product?.size} hidleTitle />
        </div>
        <div>
          <p className="text-lg">가능한 색상</p>
          <ProductColors colors={product?.color} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
