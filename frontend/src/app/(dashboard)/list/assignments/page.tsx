"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Assignment = {
  id: number;
  title: string;
  startDate: string;
  dueDate: string;
  lessonId: number;
  results: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AssignmentListPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/assignments?page=${page}&limit=10`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch Assignments");

        const data = await response.json();

        setAssignments(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [page]);

  const renderRow = (item: Assignment) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.lessonId}</td>
      <td>{item.title}</td>
      <td className="hidden md:table-cell">{item.startDate}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal table="assignment" type="update" data={item} />
                <FormModal table="assignment" type="delete" id={item.id} />
              </>
            ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" ||
              (role === "teacher" && (
                <FormModal table="assignment" type="create" />
              ))}
          </div>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={assignments} />
      )}

      {/* PAGINATION */}
      <Pagination totalPages={totalPages} currentPage={Number(page)} />
    </div>
  );
};

export default AssignmentListPage;
