import { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";


// const data = [
//   {
//     id: "3",
//     writer: "문화_엔터테인먼트기자",
//     title: "영화 소식: 신작 '환상의 여행' 개봉 예정",
//     content:
//       "한국 영화계에 새로운 흥행작이 나옵니다. '환상의 여행'은 감각적인 시각 효과와 감동적인 스토리로 관객들을 사로잡을 것으로 예상됩니다. 개봉 예정일과 주요 배우들에 대한 소식을 확인하세요.",
//     regdate: "2024-02-16T09:30:00Z",
//     moddate: "2024-02-16T09:30:00Z",
//   },
//   {
//     id: "4",
//     writer: "과학_기술전문가",
//     title: "혁신 기술 소식: 인공지능 로봇의 최신 도전",
//     content:
//       "세계적으로 주목받고 있는 인공지능 로봇이 새로운 기술 도전에 나서고 있습니다. 혁신적인 개발로 인해 로봇 기술의 한계를 뛰어넘을 것으로 예측되며, 이에 대한 상세 내용을 알아보세요.",
//     regdate: "2024-02-16T10:45:00Z",
//     moddate: "2024-02-16T10:45:00Z",
//   },
//   {
//     id: "5",
//     writer: "스포츠_해설가",
//     title: "스포츠 소식: 최신 리그 결과 및 팀 업데이트",
//     content:
//       "최근 스포츠 리그에서 발생한 결과와 각 팀의 업데이트 소식을 알려드립니다. 역동적인 경기와 팀 간의 치열한 경쟁에 대한 정보를 확인하고, 스포츠 팬들은 놓치지 마세요.",
//     regdate: "2024-02-17T08:15:00Z",
//     moddate: "2024-02-17T08:15:00Z",
//   },
//   {
//     id: "6",
//     writer: "여행_이벤트플래너",
//     title: "여행 이벤트 소식: 세계 각지의 특별한 축제",
//     content:
//       "세계 각국에서 다가오는 특별한 여행 이벤트와 축제 소식을 전해드립니다. 다양한 문화와 음식을 즐길 수 있는 행사들에 참여해 보세요. 여행 계획에 참고가 될 정보가 가득합니다.",
//     regdate: "2024-02-17T09:50:00Z",
//     moddate: "2024-02-17T09:50:00Z",
//   },
//   {
//     id: "7",
//     writer: "IT_보안전문가",
//     title: "사이버 보안 경고: 최신 보안 취약점과 대응 전략",
//     content:
//       "사이버 공격이 늘어나면서 최신 보안 취약점에 대한 경고가 발령되었습니다. 기업과 개인 모두를 위협할 수 있는 새로운 위험에 대비하기 위한 대응 전략을 상세히 알아보세요.",
//     regdate: "2024-02-18T11:20:00Z",
//     moddate: "2024-02-18T11:20:00Z",
//   },
//   {
//     id: "8",
//     writer: "음악_음향기술자",
//     title: "음악 세계 소식: 신규 음반 발매 및 아티스트 인터뷰",
//     content:
//       "음악 산업에서 일어나는 최신 소식을 전해드립니다. 다가오는 음반 발매 소식과 아티스트들의 인터뷰 내용을 통해 음악의 다양한 면을 즐겨보세요.",
//     regdate: "2024-02-18T12:45:00Z",
//     moddate: "2024-02-18T12:45:00Z",
//   },
//   {
//     id: "9",
//     writer: "환경_지속가능전문가",
//     title: "지속 가능한 미래: 친환경 기술과 프로젝트 소개",
//     content:
//       "환경 보호를 위한 최신 기술과 지속 가능한 프로젝트에 대한 소식을 전합니다. 지구 환경을 지키기 위한 노력들을 확인하고 친환경 기술의 발전에 대한 기대를 나눠보세요.",
//     regdate: "2024-02-19T09:00:00Z",
//     moddate: "2024-02-19T09:00:00Z",
//   },
//   {
//     id: "10",
//     writer: "건강_영양전문가",
//     title: "건강 소식: 최근 영양 트렌드와 식품 안전 정보",
//     content:
//       "건강을 위한 영양 트렌드와 식품 안전에 관한 최신 정보를 제공합니다. 다양한 영양소를 고루 섭취하고 식품 안전에 주의하여 건강한 삶을 지향하는 데 도움이 될 내용을 확인하세요.",
//     regdate: "2024-02-19T10:30:00Z",
//     moddate: "2024-02-19T10:30:00Z",
//   },
//   {
//     id: "11",
//     writer: "교육_교수",
//     title: "교육 소식: 현대 교육의 동향과 학습 방법 변화",
//     content:
//       "교육 분야에서 일어나고 있는 변화와 현대 교육의 동향에 대해 알려드립니다. 학습 방법과 교육 프로그램에 대한 최신 정보를 확인하여 학문적 성공을 향해 나아가세요.",
//     regdate: "2024-02-20T11:15:00Z",
//     moddate: "2024-02-20T11:15:00Z",
//   },
//   {
//     id: "12",
//     writer: "예술_미술평론가",
//     title: "예술 소식: 현대 미술의 다양한 양상과 작가 소개",
//     content:
//       "현대 미술의 다양한 양상과 유망한 작가들에 대한 소식을 전합니다. 예술의 다양성과 창의성을 즐겨보고, 현대 예술계의 흥미로운 동향을 살펴보세요.",
//     regdate: "2024-02-20T12:30:00Z",
//     moddate: "2024-02-20T12:30:00Z",
//   },
//   {
//     id: "13",
//     writer: "사회복지_봉사활동가",
//     title: "사회 소식: 봉사활동과 사회적 기부의 가치",
//     content:
//       "사회적 책임감을 갖고 봉사활동과 기부에 참여하는 소식을 전합니다. 사회적으로 의미 있는 활동에 기여하고 다양한 사회 문제에 대한 인식을 높여보세요.",
//     regdate: "2024-02-21T08:45:00Z",
//     moddate: "2024-02-21T08:45:00Z",
//   },
//   {
//     id: "14",
//     writer: "언론_미디어전문가",
//     title: "미디어 트렌드: 새로운 미디어 형식과 소비자 행동 변화",
//     content:
//       "미디어 산업에서 일어나고 있는 트렌드와 소비자들의 행동 변화에 대한 분석을 제공합니다. 다양한 미디어 형식을 경험하고 소비자들의 관심을 파악하는 데 도움이 될 정보를 확인하세요.",
//     regdate: "2024-02-21T10:00:00Z",
//     moddate: "2024-02-21T10:00:00Z",
//   },
//   {
//     id: "15",
//     writer: "모바일_IT전문가",
//     title: "모바일 테크놀로지: 최신 앱 개발 및 스마트폰 동향",
//     content:
//       "모바일 테크놀로지 분야에서 일어나고 있는 최신 개발 소식과 스마트폰의 동향을 알려드립니다. 효율적인 앱 활용과 모바일 기기의 활용 방법에 대한 유용한 정보를 확인하세요.",
//     regdate: "2024-02-22T09:15:00Z",
//     moddate: "2024-02-22T09:15:00Z",
//   },
//   {
//     id: "16",
//     writer: "법률_변호사",
//     title: "법률 소식: 새로운 법안 제정과 법적 이슈 해설",
//     content:
//       "새로 제정된 법안과 법적으로 주목받고 있는 이슈에 대한 해설을 제공합니다. 시민들에게 필요한 법률 지식을 제공하고 법적인 변화에 대한 이해를 높이세요.",
//     regdate: "2024-02-22T10:30:00Z",
//     moddate: "2024-02-22T10:30:00Z",
//   },
//   {
//     id: "17",
//     writer: "맛집_식품평론가",
//     title: "맛집 탐방: 도시의 다양한 음식 트렌드와 추천 맛집",
//     content:
//       "도시의 다양한 음식 트렌드와 맛있는 음식을 즐길 수 있는 맛집들을 탐방합니다. 식도락 여행을 즐기고 다양한 음식 문화를 경험하세요.",
//     regdate: "2024-02-23T08:00:00Z",
//     moddate: "2024-02-23T08:00:00Z",
//   },
//   {
//     id: "18",
//     writer: "인테리어_디자이너",
//     title: "인테리어 트렌드: 새로운 디자인 스타일과 가구 소식",
//     content:
//       "인테리어 디자인 분야에서 일어나고 있는 새로운 트렌드와 디자인 스타일에 대한 정보를 전합니다. 집을 더 아름답게 꾸미고 싶은 이들을 위한 유용한 팁과 소식을 확인하세요.",
//     regdate: "2024-02-23T09:30:00Z",
//     moddate: "2024-02-23T09:30:00Z",
//   },
//   {
//     id: "19",
//     writer: "연예인_스타일리스트",
//     title: "스타일 소식: 연예계 스타들의 패션과 뷰티 트렌드",
//     content:
//       "연예인들의 패션과 뷰티 트렌드에 대한 소식을 전합니다. 최신 스타일과 뷰티 제품에 대한 정보를 통해 스타일을 업그레이드하세요.",
//     regdate: "2024-02-24T10:15:00Z",
//     moddate: "2024-02-24T10:15:00Z",
//   },
//   {
//     id: "20",
//     writer: "테크_전문기자",
//     title: "기술 소식: 최신 테크놀로지 동향과 기기 리뷰",
//     content:
//       "기술 분야에서 일어나고 있는 최신 소식과 테크놀로지 동향에 대한 정보를 전합니다. 다양한 기기의 리뷰와 혁신적인 기술에 대한 통찰을 얻어보세요.",
//     regdate: "2024-02-24T11:45:00Z",
//     moddate: "2024-02-24T11:45:00Z",
//   },
// ];


const TableForm = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // /v1/notices/list에서 데이터를 가져옴
    axios.get("http://localhost:3001/notice")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "글번호",
        size: 40,
        // Cell: ({ cell }) => (
        //   <Button
        //     color="primary"
        //     component={Link}
        //     to={`/notice-detail/${cell.row.original.id}`}
        //     style={{ textDecoration: 'none', color: 'inherit',}}
        //   >
        //     <div className="clickable-cell">
        //       {cell.row.original.id}
        //     </div>
        //   </Button>
        // ),
      },
      {
        accessorKey: "writer",
        header: "작성자",
        size: 150,
        Cell: ({ cell }) => (
          <Button
            color="primary"
            component={Link}
            to={`/notice-detail/${cell.row.original.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="clickable-cell">
              {cell.row.original.writer}
            </div>
          </Button>
        ),
      },
      {
        accessorKey: "title", //normal accessorKey
        header: "제목",
        size: 200,
        // Cell: ({ cell }) => (
        //   <Button
        //     color="primary"
        //     component={Link}
        //     to={`/notice-detail/${cell.row.original.id}`}
        //     style={{ textDecoration: 'none', color: 'inherit' }}
        //   >
        //     <div className="clickable-cell">
        //       {cell.row.original.title}
        //     </div>
        //   </Button>
        // ),

      },
      {
        accessorKey: "moddate",
        header: "조회수",
        size: 150,
        

      },
      {
        accessorKey: "regdate",
        header: "작성일",
        size: 150,

      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilters: false,
    enableColumnActions : false,
    enableSorting: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableRowSelection: false,
    onColumnVisibilityChange : false,
    muiTableBodyCellProps: {
      sx: {
        paddingY: '70px',
      },
    },
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      component: Link,
      to: `/notice-detail/${row.original.id}`,
      sx: { cursor: 'pointer', textDecoration: 'none', color: 'inherit' },
    }),
    
    muiTablePaperProps: {
      elevation: 0, // 쉐도우 제거
      sx: {
        // 추가적인 스타일링이 필요하다면 여기에 작성
      },
    },
    muiTableHeadCellProps: {
      align: 'left',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
    
    
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',

    positionToolbarAlertBanner: 'bottom', //show selected rows count on bottom toolbar
    //add custom action buttons to top-left of top toolbar
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
    //     <Button
    //       color="primary"
    //       onClick={() => {
    //         alert('Create New Account');
    //       }}
    //       variant="contained"
    //     >
    //       글쓰기
    //     </Button>
    //   </Box>
    // ),

  });

  

  return <MaterialReactTable table={table} />;
};
export default TableForm;
