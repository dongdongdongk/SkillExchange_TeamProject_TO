import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const TableForm = () => {
  const [receivedData, setReceivedData] = useState(null);

  // 데이터를 불러오는 함수
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/v1");
      const data = response.data;
      setReceivedData(data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error.message);
    }
  };

  // 컴포넌트가 마운트된 후에 데이터 불러오기
  useEffect(() => {
    fetchData();
  }, []);

  // useMemo 내부로 이동
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "글번호",
        size: 150,
      },
      {
        accessorKey: "writer",
        header: "글쓴이",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "제목",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "조회수",
        size: 150,
      },
      {
        accessorKey: "regdate",
        header: "등록일",
        size: 150,
      },
    ],
    []
  );

  // useMaterialReactTable 내부로 이동
  const table = useMaterialReactTable({
    columns,
    receivedData,
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: "pages",
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableSorting: false,
    enableColumnActions: false,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "0",
        border: "0px",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default TableForm;
