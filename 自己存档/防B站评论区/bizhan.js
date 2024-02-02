import { useState } from "react";
import "./bizhan.scss";
function Bizhan() {
  let [peopleList, setPeopleList] = useState([
    {
      img: "../public/logo192.png",
      name: "jack1",
      content:
        "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
      time: "2023-11-10",
      number: 100,
    },
    {
      img: "../public/logo192.png",
      name: "jack2",
      content: "测试",
      time: "2023-11-11",
      number: 104,
    },
    {
      img: "../public/logo192.png",
      name: "jack3",
      content: "测试",
      time: "2023-11-12",
      number: 108,
    },
  ]);

  const addItem = (e) => {
    let testObj = {
      img: "../public/logo192.png",
      name: "jack",
      content: "测试",
      time: "2023-11-15",
      number: 1077,
    };
    setPeopleList([...peopleList, testObj]);
  };

  const deleteItem = (name) => {
    console.log(name,'name');
    let newList = peopleList.filter((item)=>item.name !== name)
    setPeopleList(newList);
  };

  const newest = () => {
    console.log(peopleList);
    peopleList.sort((a, b) => a.time - b.time);
    console.log(peopleList);
    setPeopleList([...peopleList]);
  };
  const hottest = () => {
    let temp = [...peopleList];
    console.log(temp);
    temp.sort((a, b) => b.number - a.number);
    console.log(temp);
    setPeopleList(temp);
  };

  return (
    <div className="box">
      <div className="comment">
        <span>评论</span>
        <span>number</span>
        <button onClick={newest}>最新</button>
        <span>|</span>
        <button onClick={hottest}>最热</button>
      </div>
      <div className="show">
        <div className="self">
          {/* 这三个都是行内块元素 */}
          <img src="/public/logo192.png" alt="头像"></img>
          <input placeholder="发一条友善的评论"></input>
          <button onClick={addItem}>发布</button>
        </div>
        <div className="allPeople">
          <ul>
            {peopleList.map((item) => (
              <li key={item.time}>
                <img
                  src={item.img}
                  alt=""
                  style={{ height: "30px", width: "30px" }}></img>
                <div className="imgRight">
                  <div>{item.name}</div>
                  <div>{item.content}</div>
                  <div className="infobuttom">
                    <span>{item.time}</span>
                    <span>点赞数：{item.number}</span>
                    <button onClick={() => deleteItem(item.name)}>删除</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Bizhan;
