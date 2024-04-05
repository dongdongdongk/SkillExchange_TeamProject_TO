import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { placeName } from "../../static/data";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const UpdateTalent = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [myMainCategory, setMyMainCategory] = useState("");
  const [mySubCategory, setMySubCategory] = useState("");
  const [Category, setCategory] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const [place, setPlace] = useState("");
  const { id } = useParams();
  const [checkedDays, setCheckedDays] = useState({
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false,
  });
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (user) {
      // user가 정의되어 있을 때에만 초기값 업데이트
      setWriter(user.id || "");
      //   setAvatar(user.imgUrl || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER + `/v1/subjectCategory/list`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("카테고리 불러오기 실패", error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER}/v1/talent/${id}`
          );
          const talentData = response.data;

          setTitle(talentData.title || "");
          setContent(talentData.content || "");
          setPlace(talentData.placeName || "");
          setMainCategory(talentData.parentTeachingSubject || "");
          setSubCategory(talentData.teachingSubject || "");
          setMyMainCategory(talentData.parentTeachedSubject || "");
          setMySubCategory(talentData.teachedSubject || "");
          setSelectedDays(talentData.selectedDays || []);
          setMinAge(talentData.minAge || "");
          setMaxAge(talentData.maxAge || "");
          setGender(talentData.gender || "");

          setCheckedDays({
            MON: talentData.selectedDays.includes("MON"),
            TUE: talentData.selectedDays.includes("TUE"),
            WED: talentData.selectedDays.includes("WED"),
            THU: talentData.selectedDays.includes("THU"),
            FRI: talentData.selectedDays.includes("FRI"),
            SAT: talentData.selectedDays.includes("SAT"),
            SUN: talentData.selectedDays.includes("SUN"),
          });
        } else {
          setTitle("");
          setContent("");
          setPlace("");
          setMainCategory("");
          setSubCategory("");
          setMyMainCategory("");
          setMySubCategory("");
          setSelectedDays([]);
          setMinAge("");
          setMaxAge("");
          setGender("");

          setCheckedDays({
            MON: false,
            TUE: false,
            WED: false,
            THU: false,
            FRI: false,
            SAT: false,
            SUN: false,
          });
        }
      } catch (error) {
        console.error("재능 데이터 불러오기 실패", error);
      }
    };

    fetchTalentData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");

      const talentDto = {
        writer,
        placeName: place,
        teachingSubject: subCategory,
        teachedSubject: mySubCategory,
        selectedDays,
        minAge,
        maxAge,
        gender,
        title,
        content,
      };

      console.log("보내는 데이터:", talentDto); // 보내는 데이터 확인

      // FormData를 사용하여 이미지 및 필드 데이터를 모두 담음
      const formData = new FormData();

      const filesToUpload = files || [];
      console.log(filesToUpload);
      filesToUpload.forEach((file, index) => {
        // 파일 필드의 이름을 설정 (filename 속성 추가)
        formData.append(`files`, file.file, file.file.name);
      });

      // 나머지 데이터를 JSON 문자열로 변환하여 FormData에 추가
      formData.append(
        "talentDto",
        new Blob([JSON.stringify(talentDto)], {
          type: "application/json",
        })
      );

      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.patch(
        process.env.REACT_APP_SERVER + `/v1/talent/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: accessToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 여기서 axios 요청을 보내지 않고, 데이터만 콘솔에 출력합니다.
      console.log(response);
      toast.success(response.data.returnMessage);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleMainCategoryChange = (event) => {
    setMainCategory(event.target.value);
    setSubCategory("");
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleMyMainCategoryChange = (event) => {
    setMyMainCategory(event.target.value);
    setMySubCategory("");
  };

  const handleMySubCategoryChange = (event) => {
    setMySubCategory(event.target.value);
  };

  const getSubCategories = () => {
    const selectedMainCategory = Category.find(
      (category) => category.name === mainCategory
    );
    return selectedMainCategory ? selectedMainCategory.children : [];
  };

  const getMySubCategories = () => {
    const selectedMyMainCategory = Category.find(
      (category) => category.name === myMainCategory
    );
    return selectedMyMainCategory ? selectedMyMainCategory.children : [];
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
                  재능 등록
                </h3>
              </div>
              <form className="comment-form" onSubmit={handleSubmit}>
                <div className="form-group mt-8 md:col-12 lg:col-12">
                  <p className="mb-4 text-black ">글 제목</p>
                  {/* <label className="form-label" htmlFor="title">Full Name</label> */}
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="글 제목을 입력해주세요"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
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
                <p className="mb-4 mt-8 text-black">내용</p>
                <div className="form-group mb-4">
                  {/* <label className="form-label text-black" htmlFor="email">내용</label> */}
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="10"
                    required
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="글 내용을 입력해주세요"
                  ></textarea>
                </div>
                <div className="form-group mb-5">
                  <label className="form-label mb-4" htmlFor="place">
                    지역
                  </label>
                  <select
                    name="place"
                    id="place"
                    className="form-select"
                    value={place} // 선택한 place 값을 select 요소의 value로 설정
                    onChange={(e) => setPlace(e.target.value)} // 선택한 place 값을 업데이트
                    required
                  >
                    <option value="">지역을 선택해주세요</option>
                    {placeName.map((place, index) => (
                      <option key={index} value={place}>
                        {place}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 희망 카테고리 */}
                <div className="form-group mb-5">
                  <div className="row">
                    <div className="col-6">
                      <label
                        className="form-label col-6 mb-4"
                        htmlFor="mainCategory"
                      >
                        희망 재능
                      </label>
                      <select
                        name="mainCategory"
                        id="mainCategory"
                        value={mainCategory}
                        onChange={handleMainCategoryChange}
                        className="form-select"
                        required
                      >
                        <option value="">대분류 선택</option>
                        {Category.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6">
                      <label
                        className="form-label col-6 mb-4"
                        htmlFor="subCategory"
                      >
                        <br />
                      </label>
                      <select
                        name="subCategory"
                        id="subCategory"
                        value={subCategory}
                        onChange={handleSubCategoryChange}
                        className="form-select"
                        required
                      >
                        <option value="">소분류 선택</option>
                        {getSubCategories().map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.name}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 보유 재능 */}
                <div className="form-group mb-5">
                  <div className="row">
                    <div className="col-6">
                      <label
                        className="form-label col-6 mb-4"
                        htmlFor="myMainCategory"
                      >
                        보유 재능
                      </label>
                      <select
                        name="myMainCategory"
                        id="myMainCategory"
                        value={myMainCategory}
                        onChange={handleMyMainCategoryChange}
                        className="form-select"
                        required
                      >
                        <option value="">대분류 선택</option>
                        {Category.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6">
                      <label
                        className="form-label col-6 mb-4"
                        htmlFor="mySubCategory"
                      >
                        <br />
                      </label>
                      <select
                        name="mySubCategory"
                        id="mySubCategory"
                        value={mySubCategory}
                        onChange={handleMySubCategoryChange}
                        className="form-select"
                        required
                      >
                        <option value="">소분류 선택</option>
                        {getMySubCategories().map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.name}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 희망연령 */}
                <div className="form-group mb-5">
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label col-6 mb-4" htmlFor="minAge">
                        희망 최소 연령
                      </label>
                      <select
                        name="minAge"
                        id="minAge"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">최소 연령 선택</option>
                        {Array.from({ length: 66 }, (_, i) => i + 20).map(
                          (age) => (
                            <option key={age} value={age}>
                              {age}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label col-6 mb-4" htmlFor="maxAge">
                        희망 최대 연령
                      </label>
                      <select
                        name="maxAge"
                        id="maxAge"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">최대 연령 선택</option>
                        {Array.from({ length: 66 }, (_, i) => i + 20).map(
                          (age) => (
                            <option key={age} value={age}>
                              {age}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 희망 성별 */}
                <div className="form-group mb-5">
                  <label className="form-label col-6 mb-4" htmlFor="gender">
                    희망 성별
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="">희망 성별 선택</option>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                    <option value="UNKNOWN">무관</option>
                  </select>
                </div>

                {/* 희망 요일 */}
                <div>
                  <label className="form-label col-6 mb-4" htmlFor="희망 요일">
                    희망 요일
                  </label>
                  <div className="mb-5">
                    <FormGroup style={{ display: "inline-block" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("MON")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("MON")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "MON"
                                    )
                                  : [...prevSelectedDays, "MON"]
                              )
                            }
                          />
                        }
                        label="월요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("TUE")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("TUE")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "TUE"
                                    )
                                  : [...prevSelectedDays, "TUE"]
                              )
                            }
                          />
                        }
                        label="화요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("WED")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("WED")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "WED"
                                    )
                                  : [...prevSelectedDays, "WED"]
                              )
                            }
                          />
                        }
                        label="수요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("THU")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("THU")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "THU"
                                    )
                                  : [...prevSelectedDays, "THU"]
                              )
                            }
                          />
                        }
                        label="목요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("FRI")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("FRI")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "FRI"
                                    )
                                  : [...prevSelectedDays, "FRI"]
                              )
                            }
                          />
                        }
                        label="금요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("SAT")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("SAT")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "SAT"
                                    )
                                  : [...prevSelectedDays, "SAT"]
                              )
                            }
                          />
                        }
                        label="토요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDays.includes("SUN")}
                            onChange={() =>
                              setSelectedDays((prevSelectedDays) =>
                                prevSelectedDays.includes("SUN")
                                  ? prevSelectedDays.filter(
                                      (day) => day !== "SUN"
                                    )
                                  : [...prevSelectedDays, "SUN"]
                              )
                            }
                          />
                        }
                        label="일요일"
                      />
                    </FormGroup>
                  </div>
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
                        key={file.file.name}
                        alt=""
                        className="m-2 h-[120px] w-[120px] object-cover"
                      />
                    ))}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                  value="재능 등록"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateTalent;
