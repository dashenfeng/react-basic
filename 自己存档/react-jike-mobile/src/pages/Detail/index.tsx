import { DetailDataType, fetchDetailAPI } from "@/apis/detail";
import { NavBar } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Detail() {
  const [detail, setDetail] = useState<DetailDataType | null>(null);
  // 获取路由参数
  const [params] = useSearchParams();
  useEffect(() => {
    const id = params.get("id") || "";
    const getDetail = async () => {
      try {
        const res = await fetchDetailAPI(id);
        setDetail(res.data.data);
      } catch (error) {
        throw new Error("fetch error");
      }
    };
    getDetail();
  }, [params]);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1); // 返回上一层
  };

  // 数据返回前显示
  if (!detail) {
    return <div>loading...</div>;
  }
  // 数据返回后正式渲染
  return (
    <div>
      <NavBar onBack={back}>{detail?.title}</NavBar>
      <div
        dangerouslySetInnerHTML={{
          __html: detail?.content,
        }}></div>
    </div>
  );
}
