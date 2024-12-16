import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import content from "../../data/content.json";

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
      { title: "쇼핑", path: "/" },
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
              className="h-full w-full max-h-[520px] border rounded-lg cursor-pointer object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-[60%] px-10">
        {/* Product Description */}
        <Breadcrumb links={breadcrumbLinks} />
      </div>
    </div>
  );
};

export default ProductDetails;
