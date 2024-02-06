import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <span>登录页</span>
      <br></br>
      <Link to="/article">声明式导航跳转到文章页</Link>
      <br></br>
      <button onClick={() => navigate("/article?id=1001&name=jack")}>searchParams传参</button>
      <button onClick={() => navigate("/article/1001/fengzi")}>Params传参</button>
      {/* <button onClick={() => navigate("/article",{state:{id:1234,name:'fengfeng'}})}>state传参</button> */}
    </div>
  );
}

export default Login;
