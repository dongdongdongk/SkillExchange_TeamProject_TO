import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { placeName } from "../../static/data";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const CreateTalent = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [Category , setCategory] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `/v1/subjectCategory/list`,
      );
      setCategory(response.data);
    } catch (error) {
      console.error("카테고리 불러오기 실패", error);
    }
  };

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

    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const noticeDto = {
        writer,
        title,
        content,
        mainCategory,
        subCategory,
        selectedDays,
        minAge,
        maxAge,
        gender
      };

      console.log("보내는 데이터:", noticeDto); // 보내는 데이터 확인

      // 여기서 axios 요청을 보내지 않고, 데이터만 콘솔에 출력합니다.
    } catch (error) {
      console.log(error);
      toast.error("데이터 전송 중 오류가 발생했습니다.");
    }
  };

  const handleMainCategoryChange = (event) => {
    setMainCategory(event.target.value);
    setSubCategory("");
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const getSubCategories = () => {
    const selectedMainCategory = Category.find(
      (category) => category.name === mainCategory
    );
    return selectedMainCategory ? selectedMainCategory.children : [];
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
                  <label className="form-label mb-4" htmlFor="reason">
                    지역
                  </label>
                  <select
                    name="reason"
                    id="reason"
                    className="form-select"
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
                        대분류
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
                        소분류
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
                            defaultChecked={selectedDays.includes("MON")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "MON"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "MON"
                                    )
                                  )
                            }
                          />
                        }
                        label="월요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={selectedDays.includes("TUE")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "TUE"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "TUE"
                                    )
                                  )
                            }
                          />
                        }
                        label="화요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={selectedDays.includes("WED")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "WED"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "WED"
                                    )
                                  )
                            }
                          />
                        }
                        label="수요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={selectedDays.includes("THU")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "THU"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "THU"
                                    )
                                  )
                            }
                          />
                        }
                        label="목요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={selectedDays.includes("FRI")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "FRI"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "FRI"
                                    )
                                  )
                            }
                          />
                        }
                        label="금요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={selectedDays.includes("SAT")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "SAT"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "SAT"
                                    )
                                  )
                            }
                          />
                        }
                        label="토요일"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={selectedDays.includes("SUN")}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedDays([...selectedDays, "SUN"])
                                : setSelectedDays(
                                    selectedDays.filter(
                                      (day) => day !== "SUN"
                                    )
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

export default CreateTalent;
