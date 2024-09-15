import React, { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeProduct = async (productID) => {
    const response = await axios.post(`${url}/api/product/remove`, {
      id: productID,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 sm:p-10 box-border w-full bg-white rounded-xl">
      <h4 className="bold-22 uppercase">Product List</h4>
      <div className="overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left">Products</th>
              <th className="p-1 text-left">Title</th>
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr
                key={product._id} className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left"
              >
                <td>
                  <img
                    src={`${url}/images/` + product.image}
                    alt=""
                    height={38}
                    width={38}
                    className="rounded-lg ring-1 ring-slate-900/5 m-1"
                  />
                </td>
                <td className="p-1">
                  <div className="line-clamp-3">{product.name}</div>
                </td>
                <td className="p-1">${product.price}</td>
                <td className="p-1">
                  <div className="bold-22">
                    <TbTrash onClick={() => removeProduct(product._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
