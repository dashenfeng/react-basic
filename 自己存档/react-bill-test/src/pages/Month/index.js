import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DayBill";

const Month = () => {
  const billList = useSelector((state) => state.bill.billList);
  // 按照月来做分组
  // 在渲染的时候会根据依赖项是否变化来决定是否使用缓存，减少计算
  const monthGroup = useMemo(() => {
    // return出去 lodash按照日期分组后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);
  const [dateVisible, setDateVisibile] = useState(false);
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs(new Date()).format("YYYY-MM")
  );
  const [currentMonthList,setcurrentMonthList] = useState([])

  // 初始化的时候把当前月的统计数据显示出来
  useEffect(()=>{
    const nowDate = dayjs().format("YYYY-MM") // 不传的话就当前默认时间
    monthGroup[nowDate] && setcurrentMonthList(monthGroup[nowDate])
  },[monthGroup])

  // 确认回调
  const onConfirm = (date) => {
    const formatDate = dayjs(date).format("YYYY-MM");
    // console.log(date);
    setDateVisibile(false);
    console.log(monthGroup,'monthGroup');
    setcurrentMonthList(monthGroup[formatDate]) // 把数据存进去
    setCurrentDate(formatDate);
  };

  const monthResult = useMemo(()=>{
    // 支出 收入  结余
    let pay = 0,income = 0
    if(currentMonthList) {
      pay = currentMonthList.filter(item=>item.type === 'pay').reduce((a,c)=>a+c.money,0) ||0
      income = currentMonthList.filter(item=>item.type === 'income').reduce((a,c)=>a+c.money,0) ||0
    }
    return {
      pay,
      income,
      total:pay+income
    }
  },[currentMonthList])

  // 当前月按照日来做分组
  const dayGroup = useMemo(() => {
    // return出去 lodash按照日期分组后的值
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
    const keys = Object.keys(groupData)
    return {
      groupData,
      keys
    }
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div
            className="date"
            onClick={() => {
              setDateVisibile(true);
            }}>
            <span className="text">{currentDate + ""}账单</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onConfirm={onConfirm}
            onClose={() => setDateVisibile(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {
          dayGroup.keys.map(key =>{
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]}></DailyBill>
          })
        }
      </div>
    </div>
  );
};

export default Month;
