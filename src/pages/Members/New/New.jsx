import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { createItem } from '../store';

const FormItem = Form.Item;
const createForm = Form.create;

@connect(state => ({
  ...state.members
}), {
  createItem
})
class New extends Component {
  static propTypes = {
    form: PropTypes.any,
    createStarting: PropTypes.bool,
    createError: PropTypes.any,
    createItem: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prewProps) {
    if (!prewProps.createStarting && this.props.createStarting && !this.props.createError) {
      message.success('创建成功');
      this.props.form.resetFields();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.createStarting) {
      return;
    }
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.createItem(values);
    });
  }

  render() {
    const { createStarting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <div style={{ maxWidth: '500px', paddingTop: '30px' }}>
        <Form
          horizontal
        >
          <FormItem
            {...formItemLayout}
            label='姓名'
          >
            {getFieldDecorator('nickname', {
              initialValue: '',
              rules: [
                { required: true, message: '请输入姓名' },
              ],
            })(
              <Input type='text' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='账号'
          >
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [
                { required: true, message: '请输入账号' },
              ],
            })(
              <Input type='text' placeholder='支持英文与数字的组合，英文开头' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='密码'
          >
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                { required: true, message: '请输入密码' },
              ],
            })(
              <Input type='password' placeholder='请输入密码' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            wrapperCol={{
              offset: 6
            }}
          >
            <Button
              type='primary'
              onClick={::this.handleSubmit}
              loading={createStarting}
            >
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

/* eslint no-class-assign: 0*/
export default New = createForm()(New);
