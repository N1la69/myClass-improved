"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Announcement = {
  id: number;
  title: string;
  classId: number;
  date: string;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AnnouncementListPage = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const userRole = user?.publicMetadata?.role || "user";
  const role = isSignedIn ? userRole : "user";

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/announcements?page=${page}&limit=10`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch Announcements");
        }

        const data = await response.json();

        setAnnouncements(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [page]);

  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.classId}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
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
            {role === "admin" && (
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={announcements} />
      )}

      {/* PAGINATION */}
      <Pagination totalPages={totalPages} currentPage={Number(page)} />
    </div>
  );
};

export default AnnouncementListPage;
