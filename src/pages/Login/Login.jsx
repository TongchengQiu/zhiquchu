import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { login } from './store';
import './Login.scss';

const FormItem = Form.Item;
const createForm = Form.create;

@connect(state => ({
  ...state.login,
}), {
  login
})
class Login extends Component {
  static propTypes = {
    form: PropTypes.any,
    loginStarting: PropTypes.bool,
    // loginDone: PropTypes.bool,
    // loginError: PropTypes.string,
    login: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.loginStarting) {
      return;
    }
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.login(values);
    });
  }

  render() {
    const { loginStarting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div className='view view-login'>
        <h1 className='title'>知去处后台管理</h1>
        <Form
          horizontal
        >
          <FormItem
            {...formItemLayout}
            label='账号'
          >
            {getFieldDecorator('account', {
              initialValue: '',
              rules: [
                { required: true, message: '请输入账号' },
              ],
            })(
              <Input type='text' placeholder='请输入账号' />
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
          <Row style={{ paddingLeft: '1%' }}>
            <Col span={14}>
              <FormItem
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 13 }}
                label='验证码'
              >
                {getFieldDecorator('code', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请输入验证码' },
                  ],
                })(
                  <Input type='text' placeholder='请输入验证码' />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <div className='code-image'>
                验证码
              </div>
            </Col>
          </Row>
          <FormItem
            wrapperCol={{ span: 14, offset: 6 }}
            className='btn-submit-wrap'
          >
            <Button
              type='primary'
              onClick={::this.handleSubmit}
              loading={loginStarting}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

/* eslint no-class-assign: 0*/
export default Login = createForm()(Login);
