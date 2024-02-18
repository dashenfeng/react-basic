// 获取频道列表

const { getChannelAPI } = require("@/apis/article");
const { useEffect, useState } = require("react");

function useChannel() {
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);

  return {channelList}
}

export {useChannel}