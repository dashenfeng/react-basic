import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  createArticleAPI,
  getArticleById,
  updateArticleAPI,
} from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel();
  const navigator = useNavigate();

  // 提交表单
  const onFinish = (formValue) => {
    if (imageList.length !== imageType)
      return message.warning("封面类型和图片数量不匹配");
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }), // 图片列表(新增模式)
      },
      channel_id,
    };
    // 提交  根据是否有id调用不同接口（编辑|新增）
    const submitData = async () => {
      let res;
      if (articleId) {
        res = await updateArticleAPI({ ...reqData, id: articleId }); // 修改
      } else {
        res = await createArticleAPI(reqData); // 新增
      }
      return res;
    };
    submitData();
    message.success('提交成功')
    navigator('/article')

  };
  // 上传图片
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    // console.log(value,'uploadValue');
    setImageList(value.fileList);
  };
  // 切换封面类型
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };
  // 回传数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  // console.log(articleId,'articleId');
  const [form] = Form.useForm(); // antd里面的设计
  useEffect(() => {
    // 通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      // console.log(res.data,'res.data');
      const data = res.data;
      const { cover, ...formValue } = data; // { title, content, channel_id } = formValue;
      form.setFieldsValue({ ...formValue, type: cover.type });
      // 回填图片列表
      setImageType(data.cover.type); // 改变封面类型（几张图）
      setImageList(
        data.cover.images.map((url) => {
          return { url };
        })
      );
    }
    articleId && getArticleDetail(); //编辑时才调用
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onChange}
                maxCount={imageType}
                fileList={imageList}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}>
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
