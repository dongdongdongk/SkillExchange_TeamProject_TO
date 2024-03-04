import React, { useState, useEffect  } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const initialData = {
  id: 8,
  writer: "admin",
  title: "공지합니다",
  content: "유저를 늘리세요",
  regDate: "2024-02-29T08:48:31.702298",
  modDate: "2024-02-29T08:48:31.702298",
  imgUrl: [
    "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/09/Table_of_Contents.png",
    "https://i0.wp.com/cmosshoptalk.com/wp-content/uploads/2022/01/Contents-page00.png?fit=1000%2C720&ssl=1",
  ],
  returnCode: 200,
  returnMessage: "조회하는데 성공하였습니다.",
};

const UpdateNotice = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    // 초기 데이터가 있을 경우 폼 초기화
    if (initialData && initialData.imgUrl) {
      setTitle(initialData.title || "");
      setContents(initialData.content || "");
  
      // 초기 이미지 URL 배열을 객체로 변환하여 files 상태에 설정
      const initialImages = initialData.imgUrl.map((url, index) => ({
        file: null, // 이미지 파일이 아니므로 null
        preview: url,
        id: index.toString(), // 각 이미지에 고유한 ID 부여
      }));
  
      setFiles(initialImages);
      console.log("배열 이미지",initialImages)
    }
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);

    // MIME 타입이 이미지가 아닌 경우에 사용할 기본 이미지 경로
    const defaultImagePath =
      "https://image.zdnet.co.kr/2021/04/20/9c747492edd39cd3d885f3bc16bb0f1b.jpg";

    setFiles((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : defaultImagePath,
      })),
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData를 사용하여 이미지 및 필드 데이터를 모두 담음
    const newForm = new FormData();

    files.forEach((file) => {
      newForm.append("files", file);
    });
    newForm.append("title", title);
    newForm.append("contents", contents);
    for (const entry of newForm.entries()) {
      console.log(entry);
    }
  };

  return (
    <>
      {/* floating assets */}
      <img
        className="floating-bubble-1 absolute right-0 top-0 -z-[1]"
        src="images/floating-bubble-1.svg"
        alt=""
      />
      <img
        className="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
        src="images/floating-bubble-2.svg"
        alt=""
      />
      <img
        className="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
        src="images/floating-bubble-3.svg"
        alt=""
      />
      {/* ./end floating assets */}

      {/* blog single */}
      <section className="section blog-single">
        <div className="container">
          <div className="row justify-center">
            <div className="mt-4 max-w-[810px] lg:col-9">
              <div className="comments mb-6">
                <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
                  공지 수정
                </h3>
              </div>
              <form className="comment-form" onSubmit={handleSubmit}>
                <div className="form-group mt-8 md:col-12 lg:col-12">
                  <p className="mb-4">공지 제목</p>

                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder=""
                  />
                </div>
                {/* <div className="row mb-8">
                  <div className="form-group mt-8 md:col-6 lg:col-4">
                    <input type="text" placeholder="Email" />
                  </div>
                  <div className="form-group mt-8 md:col-6 lg:col-4">
                    <input type="text" placeholder="Website" />
                  </div>
                </div> */}
                <p className="mb-4 mt-8">공지 내용</p>
                <div className="form-group mb-4">
                  <textarea
                    cols="30"
                    rows="10"
                    required
                    type="text"
                    name="contents"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                  ></textarea>
                </div>

                <label className="pb-4">
                  이미지 업로드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name=""
                  id="upload"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <div className="flex w-full flex-wrap items-center">
                  <label htmlFor="upload">
                    <AiOutlinePlusCircle
                      size={30}
                      className="mt-3"
                      color="#555"
                    />
                  </label>
                  {files &&
                    files.map((file) => (
                      <img
                        src={file.preview}
                        key={file.id}
                        alt=""
                        className="m-2 h-[120px] w-[120px] object-cover"
                      />
                    ))}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                  value="공지 수정"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* ./end blog-single */}
    </>
  );
};

export default UpdateNotice;
