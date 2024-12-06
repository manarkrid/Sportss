/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";


interface PaginationProps {
  activePage: number;
  paginate: (pageNumber: number) => void;
  totalProducts: number;
  productsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  activePage,
  paginate,
  totalProducts,
  productsPerPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex  justify-center items-center mt-10">
      <li>
        <Link
          to="#"
          onClick={() => {
            if (activePage > 1) {
              paginate(activePage - 1);
            }
          }}
        >
          <FaAngleLeft className="mr-4 size-6" />
        </Link>
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`flex w-[46px] h-[46px] rounded-full items-center justify-center ${
            number === activePage ? "bg-black font-bold" : ""
          }`}
        >
          <button className="bg-transparent" onClick={() => paginate(number)}>
            {number}
          </button>
        </li>
      ))}

<li>
        <Link
          to="#"
          onClick={() => {
           
              paginate(activePage + 1);
            
          }}
        >
          <FaAngleRight className="ml-4 size-6" />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
