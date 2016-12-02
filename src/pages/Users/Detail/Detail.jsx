import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'antd';
import Table from '../../../components/Table';
import { getUserDetail, getUserPublishList, getUserPartList, getUserFavoList } from '../store';
import './index.scss';

const STATE_OPTIONS = {
  0: '待审核',
  1: '通过',
  2: '禁用',
};

const STATE2_OPTIONS = {
  0: '待付款',
  1: '待参与',
  2: '已完成',
};

const DEFAULT_PROPSTYPES = {
  getUserDetail: PropTypes.func,
  // getUserDetailStarting: PropTypes.bool,
  // getUserDetailDone: PropTypes.bool,
  // getUserDetailError: PropTypes.any,
  userDetail: PropTypes.any,

  getUserPublishList: PropTypes.func,
  getUserPublishListStarting: PropTypes.bool,
  getUserPublishListDone: PropTypes.bool,
  getUserPublishListError: PropTypes.any,
  userPublishList: PropTypes.any,
  userPublishPage: PropTypes.any,

  getUserPartList: PropTypes.func,
  getUserPartListStarting: PropTypes.bool,
  getUserPartListDone: PropTypes.bool,
  getUserPartListError: PropTypes.any,
  userPartList: PropTypes.any,
  userPartPage: PropTypes.any,

  getUserFavoList: PropTypes.func,
  getUserFavoListStarting: PropTypes.bool,
  getUserFavoListDone: PropTypes.bool,
  getUserFavoListError: PropTypes.any,
  userFavoList: PropTypes.any,
  userFavoPage: PropTypes.any,

  children: PropTypes.any,
  params: PropTypes.any,
};

@connect(state => ({
  ...state.users
}), {
  getUserDetail,
  getUserPublishList,
  getUserPartList,
  getUserFavoList
})
export default class Detail extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.userDetail || (this.props.params.id !== this.props.userDetail.id)) {
      this.getUserDetail();
      // this.getUserPublishList();
      // this.getUserPartList();
      // this.getUserFavoList();
    }
  }

  getUserDetail(args) {
    this.props.getUserDetail({
      id: this.props.params.id,
      ...args
    });
  }

  getUserPublishList(args) {
    this.props.getUserPublishList({
      publisher_id: this.props.params.id,
      ...args
    });
  }

  getUserPartList(args) {
    this.props.getUserPartList({
      parter_id: this.props.params.id,
      ...args
    });
  }

  getUserFavoList(args) {
    this.props.getUserFavoList({
      id: this.props.params.id,
      ...args
    });
  }

  getPartTableSettings() {
    const {
      getUserPartListStarting, getUserPartListDone, getUserPartListError, userPartList, userPartPage
    } = this.props;
    const meta = [{
      title: '活动名称',
      key: 'activity_name'
    }, {
      title: '活动编号',
      key: 'activity_id'
    }, {
      title: '报名名字',
      key: 'link_name'
    }, {
      title: '报名电话',
      key: 'link_phone'
    }, {
      title: '所选票种',
      key: 'fee_name'
    }, {
      title: '状态',
      key: 'state',
      render: (i, r) => (STATE2_OPTIONS[r.state])
    }, {
      title: '参与时间',
      key: 'apply_time'
    }, {
      title: '支付金额',
      key: 'fee_price',
      render: (i, r) => (r.fee_price ? r.fee_price / 100 : 0)
    }, {
      title: '查看活动',
      key: 'SUME_RECORD',
      render: (index, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }];
    return {
      getList: ::this.getUserPartList,
      getListStarting: getUserPartListStarting,
      getListDone: getUserPartListDone,
      getListError: getUserPartListError,
      data: userPartList,
      needReload: true,
      ...userPartPage,
      meta,
    };
  }

  getPublishTableSettings() {
    const {
      getUserPublishListStarting, getUserPublishListDone, getUserPublishListError, userPublishList, userPublishPage
    } = this.props;
    const meta = [{
      title: '活动名称',
      key: 'name'
    }, {
      title: '活动编号',
      key: 'id'
    }, {
      title: '发布时间',
      key: 'create_time'
    }, {
      title: '状态',
      key: 'state',
      render: (i, r) => (STATE_OPTIONS[r.state])
    }, {
      title: '赚得金额',
      key: 'pay_fee',
      render: (i, r) => (r.pay_fee ? r.pay_fee / 100 : 0)
    }, {
      title: '查看活动',
      key: 'SUME_RECORD',
      render: (index, record) => (<Link to={`/activitys/list/${record.id}`}>查看</Link>)
    }];
    return {
      getList: ::this.getUserPublishList,
      getListStarting: getUserPublishListStarting,
      getListDone: getUserPublishListDone,
      getListError: getUserPublishListError,
      data: userPublishList,
      needReload: true,
      ...userPublishPage,
      meta,
    };
  }

  getFavoTableSettings() {
    const {
      getUserFavoListStarting, getUserFavoListDone, getUserFavoListError, userFavoList, userFavoPage
    } = this.props;
    const meta = [{
      title: '活动名称',
      key: 'activity_name'
    }, {
      title: '活动编号',
      key: 'activity_id'
    }, {
      title: '收藏时间',
      key: 'create_time'
    }, {
      title: '查看活动',
      key: 'SUME_RECORD',
      render: (index, record) => (<Link to={`/activitys/list/${record.activity_id}`}>查看</Link>)
    }];
    return {
      getList: ::this.getUserFavoList,
      getListStarting: getUserFavoListStarting,
      getListDone: getUserFavoListDone,
      getListError: getUserFavoListError,
      data: userFavoList,
      needReload: true,
      ...userFavoPage,
      meta,
    };
  }

  render() {
    if (this.props.children) {
      return <div>{this.props.children}</div>;
    }
    const { userDetail } = this.props;
    return (
      <div className='user-detail-view'>
        <Button type='primary'><Link to='/users/list'>返回</Link></Button>
        <br />
        <h1 className='t-title'>基本信息</h1>
        <ul className='detail-box'>
          <li>
            <div className='til'>微信名</div>
            <div className='cont'>{userDetail.nickname}</div>
          </li>
          <li>
            <div className='til'>用户编号</div>
            <div className='cont'>{userDetail.id}</div>
          </li>
          <li>
            <div className='til'>头像</div>
            <div className='cont'>
              {userDetail.headimgurl && <img src={`${userDetail.headimgurl}`} alt='头像' />}
            </div>
          </li>
          <li>
            <div className='til'>性别</div>
            <div className='cont'>{userDetail.sex}</div>
          </li>
          <li>
            <div className='til'>注册时间</div>
            <div className='cont'>{userDetail.create_time}</div>
          </li>
          <li>
            <div className='til'>发布活动数</div>
            <div className='cont'>{userDetail.pub_act_num}</div>
          </li>
          <li>
            <div className='til'>参加活动数</div>
            <div className='cont'>{userDetail.part_act_num}</div>
          </li>
          <li>
            <div className='til'>总消费</div>
            <div className='cont'>{userDetail.pay_fee ? userDetail.pay_fee / 100 : 0}</div>
          </li>
          <li>
            <div className='til'>总收入</div>
            <div className='cont'>{userDetail.revenue_fee ? userDetail.revenue_fee / 100 : 0}</div>
          </li>
        </ul>
        <h1 className='t-title'>
          参与活动 总花费金额: (
          {userDetail.pay_fee ? userDetail.pay_fee / 100 : 0}
          )
        </h1>
        <Table {...this.getPartTableSettings()} />
        <h1 className='t-title'>
          发布活动 总盈利: (
          {userDetail.revenue_fee ? userDetail.revenue_fee / 100 : 0}
          )
        </h1>
        <Table {...this.getPublishTableSettings()} />
        <h1 className='t-title'>收藏活动</h1>
        <Table {...this.getFavoTableSettings()} />
      </div>
    );
  }
}
