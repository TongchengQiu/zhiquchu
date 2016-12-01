import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { getUserDetail, getUserPublishList, getUserPartList, getUserFavoList } from '../store';

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
  // getUserPartListStarting: PropTypes.bool,
  // getUserPartListDone: PropTypes.bool,
  // getUserPartListError: PropTypes.any,
  // userPartList: PropTypes.any,
  // userPartPage: PropTypes.any,

  getUserFavoList: PropTypes.func,
  // getUserFavoListStarting: PropTypes.bool,
  // getUserFavoListDone: PropTypes.bool,
  // getUserFavoListError: PropTypes.any,
  // userFavoList: PropTypes.any,
  // userFavoPage: PropTypes.any,

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
      this.getUserPublishList();
      this.getUserPartList();
      this.getUserFavoList();
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
      title: '报名名字',
      key: 'pub_act_num'
    }, {
      title: '报名电话',
      key: 'part_act_num'
    }, {
      title: '所选票种',
      key: 'part_act_num'
    }, {
      title: '状态',
      key: 'part_act_num'
    }, {
      title: '参见时间',
      key: 'part_act_num'
    }, {
      title: '支付金额',
      key: 'part_act_num'
    }, {
      title: '查看活动',
      key: 'SUME_RECORD',
      render: (index, record) => (<Link to={`/users/list/${record.id}/consume`}>查看</Link>)
    }];
    return {
      getList: ::this.getUserPublishList,
      getListStarting: getUserPublishListStarting,
      getListDone: getUserPublishListDone,
      getListError: getUserPublishListError,
      data: userPublishList,
      ...userPublishPage,
      meta,
    };
  }

  render() {
    if (this.props.children) {
      return <div>{this.props.children}</div>;
    }
    return <div>Detail</div>;
  }
}
