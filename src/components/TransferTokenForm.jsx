import { Form, Input, Button, Spin, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const radioBtnStyle = { display: "flex", flex: 1, alignSelf: "stretch", alignItems:"center" };
const radioGrpStyle = { width: "100%", display: "flex", flexDirection: "row", };
const FormItem = Form.Item;

const tokenOptions = [
  {
    label: "ERC20",
    value: "ERC20"
  },
  {
    label: "BEP20",
    value: "BEP20"
  },
  {
    label: "TRC20",
    value: "TRC20"
  },
];

const formItemStyle = { 
  backgroundColor: "#f8f8f8", 
  marginTop:10,
  borderRadius: 8, 
  paddingLeft: 10, 
  paddingRight: 10, 
  paddingTop: 5, 
  paddingBottom: 5 
};

export const TransferTokenForm = ({ busy, onFinish }) => {
  return (
    <Form layout="vertical" onFinish={onFinish} labelAlign="right">

      <FormItem rules={[
        { message: "This field is required", required: true }
      ]} label="Send:" name="amount" style={formItemStyle} labelAlign="right">
        <Input placeholder="Amount" style={{ background: "transparent", border: "none", textAlign: "end" }} />
      </FormItem>

      <FormItem
        rules={[
          { message: "This field is required", required: true }
        ]}
        label="To:" name="address" style={formItemStyle} labelAlign="left">
        <Input placeholder="somereceiver.eth or eth-address" style={{ marginTop: 10, background: "transparent", border: "none", textAlign: "end" }} />
      </FormItem>

      <FormItem
        // rules={[
        //   { message: "This field is required", required: true }
        // ]}
        label="Via:" initialValue={tokenOptions[0].value} name="erc" style={formItemStyle} labelAlign="right">
        <Radio.Group style={radioGrpStyle} defaultValue={tokenOptions[0].value} buttonStyle="solid">
          {tokenOptions.map((option, index) => <Radio.Button key={index} style={radioBtnStyle} value={option.value}>{option.label}</Radio.Button>)}
        </Radio.Group>
      </FormItem>

      <Button
        htmlType="submit"
        type="primary"
        size="large"
        style={{ width: "100%", borderRadius: 8, marginTop: 10 }} disabled={busy}>
        {busy ? <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} spin />} /> : "Transfer"}
      </Button>

    </Form>
  );
};
