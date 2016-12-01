import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Card, Table } from 'antd';
import TTable from '../../../components/Table';
import {
  getDetail, changeObject, getApplyPayList, getApplyPartList, getApplyFinishList, getFavoList
} from '../store';

const applyMeta = [{
  title: '姓名',
  key: 'nickname'
}, {
  title: '电话',
  key: 'link_phone'
}, {
  title: '所选票种',
  key: 'fee_name',
}, {
  title: '报名时间',
  key: 'apply_time'
}, {
  title: '查看用户信息',
  key: 'OPTIONS',
  render: (i, r) => <Button><Link to={`/users/list/${r.weixinuser_id}`}>查看</Link></Button>
}];

const DEFAULT_PROPSTYPES = {
  changeStarting: PropTypes.any,
  getDetailStarting: PropTypes.any,
  detail: PropTypes.any,
  getDetail: PropTypes.func,
  changeObject: PropTypes.func,
  params: PropTypes.any,

  getApplyPayList: PropTypes.func,
  getApplyPayListStarting: PropTypes.bool,
  getApplyPayListDone: PropTypes.bool,
  getApplyPayListError: PropTypes.any,
  applyPayList: PropTypes.any,
  applyPayPage: PropTypes.any,

  getApplyPartList: PropTypes.func,
  getApplyPartListStarting: PropTypes.bool,
  getApplyPartListDone: PropTypes.bool,
  getApplyPartListError: PropTypes.any,
  applyPartList: PropTypes.any,
  applyPartPage: PropTypes.any,

  getApplyFinishList: PropTypes.func,
  getApplyFinishListStarting: PropTypes.bool,
  getApplyFinishListDone: PropTypes.bool,
  getApplyFinishListError: PropTypes.any,
  applyFinishList: PropTypes.any,
  applyFinishPage: PropTypes.any,

  getFavoList: PropTypes.func,
  getFavoListStarting: PropTypes.bool,
  getFavoListDone: PropTypes.bool,
  getFavoListError: PropTypes.any,
  favoList: PropTypes.any,
  favoPage: PropTypes.any,
};

@connect(state => ({
  ...state.activitys
}), {
  getDetail,
  changeObject,
  getApplyPayList,
  getApplyPartList,
  getApplyFinishList,
  getFavoList,
})
export default class Detail extends Component {
  static propTypes = DEFAULT_PROPSTYPES

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDetail({
      id: this.props.params.id
    });
  }

  getPayTableSettings() {
    const {
      getApplyPayListStarting, getApplyPayListDone, getApplyPayListError, applyPayList, applyPayPage
    } = this.props;
    return {
      getList: this.props.getApplyPayList,
      getListStarting: getApplyPayListStarting,
      getListDone: getApplyPayListDone,
      getListError: getApplyPayListError,
      data: applyPayList,
      pageSize: 10,
      defaultQuery: {
        id: this.props.params.id
      },
      ...applyPayPage,
      needReload: true,
      meta: applyMeta,
      title: `待支付（${applyPayPage && applyPayPage.count}）`
    };
  }

  getPartTableSettings() {
    const {
      getApplyPartListStarting, getApplyPartListDone, getApplyPartListError, applyPartList, applyPartPage
    } = this.props;
    return {
      getList: this.props.getApplyPartList,
      getListStarting: getApplyPartListStarting,
      getListDone: getApplyPartListDone,
      getListError: getApplyPartListError,
      data: applyPartList,
      pageSize: 10,
      defaultQuery: {
        id: this.props.params.id
      },
      ...applyPartPage,
      needReload: true,
      meta: applyMeta,
      title: `待参与（${applyPartPage && applyPartPage.count}）`
    };
  }

  getFinishTableSettings() {
    const {
      getApplyFinishListStarting, getApplyFinishListDone, getApplyFinishListError, applyFinishList, applyFinishPage
    } = this.props;
    return {
      getList: this.props.getApplyFinishList,
      getListStarting: getApplyFinishListStarting,
      getListDone: getApplyFinishListDone,
      getListError: getApplyFinishListError,
      data: applyFinishList,
      pageSize: 10,
      defaultQuery: {
        id: this.props.params.id
      },
      ...applyFinishPage,
      meta: applyMeta,
      needReload: true,
      title: `已完成（${applyFinishPage && applyFinishPage.count}）`
    };
  }

  getFavoTableSettings() {
    const {
      getFavoListStarting, getFavoListDone, getFavoListError, favoList, favoPage
    } = this.props;
    const meta = [{
      title: '姓名',
      key: 'weixinuser_nickname'
    }, {
      title: '操作时间',
      key: 'create_time',
    }, {
      title: '用户信息',
      key: 'OPTIONS',
      render: (i, r) => <Button><Link to={`/users/list/${r.weixinuser_id}`}>查看</Link></Button>
    }];
    return {
      getList: this.props.getFavoList,
      getListStarting: getFavoListStarting,
      getListDone: getFavoListDone,
      getListError: getFavoListError,
      data: favoList,
      pageSize: 10,
      defaultQuery: {
        id: this.props.params.id
      },
      ...favoPage,
      meta,
      needReload: true,
      title: `收藏人数（${favoPage && favoPage.count}）`
    };
  }

  renderDetail() {
    const { detail, getDetailStarting } = this.props;
    const pisozMeta = [{
      title: '票种名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '票价',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '报名／限报',
      dataIndex: 't',
      key: 't',
      render: (i, r) => (`${r.apply_num}/${r.num}`)
    }, {
      title: '收入',
      dataIndex: 'apply_price',
      key: 'apply_price',
    }];
    return (
      <div className='clearfix'>
        <Card className='detail-box'>
          <ul>
            <li>
              <div className='til'>活动主题</div>
              <div className='cont'>{detail.name}</div>
            </li>
            <li>
              <div className='til'>活动编号</div>
              <div className='cont'>{detail.id}</div>
            </li>
            <li>
              <div className='til'>封面图片</div>
              <div className='cont'>
                {detail.pic_url && <img src={`http://wanmujia.com/${detail.pic_url}`} alt='封面图片' />}
              </div>
            </li>
            <li>
              <div className='til'>开始时间</div>
              <div className='cont'>{detail.start_time}</div>
            </li>
            <li>
              <div className='til'>结束时间</div>
              <div className='cont'>{detail.end_time}</div>
            </li>
            <li>
              <div className='til'>举办地点</div>
              <div className='cont'>{detail.address}</div>
            </li>
            <li>
              <div className='til'>联系电话</div>
              <div className='cont'>{detail.link_phone}</div>
            </li>
            <li>
              <div className='til'>标签</div>
              <div className='cont'>{detail.tag1} {detail.tag2} {detail.tag3}</div>
            </li>
            <li>
              <div className='til'>活动分类</div>
              <div className='cont'>{detail.type_name}</div>
            </li>
            <li>
              <div className='til'>内容</div>
              <div className='cont'>{detail.content}</div>
            </li>
          </ul>
        </Card>
        <Table
          dataSource={detail.data || []}
          columns={pisozMeta}
          style={{ width: '400px', float: 'left', marginTop: '16px' }}
          loading={getDetailStarting}
        />
      </div>
    );
  }

  renderBtns() {
    const { detail, changeStarting } = this.props;
    return (
      <div className='btn-group'>
        {
          +detail.state !== 1 &&
          <Button onClick={this.props.changeObject.bind(null, { id: detail.id, state: 1 })}>
            通过审核
          </Button>
        }
        {
          +detail.state !== 2 &&
          <Button onClick={this.props.changeObject.bind(null, { id: detail.id, state: 2 })}>
            禁用活动
          </Button>
        }
        {
          +detail.recommend !== 0 &&
          <Button
            onClick={this.props.changeObject.bind(null, { id: detail.id, recommend: '0' })}
          >
            取消推荐
          </Button>
        }
        {
          +detail.recommend !== 1 &&
          <Button
            onClick={this.props.changeObject.bind(null, { id: detail.id, recommend: 1 })}
          >
            推荐
          </Button>
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Button type='primary'><Link to='/activitys/list'>返回</Link></Button>
        <br />
        <h1 className='t-title'>基本信息</h1>
        {this.renderBtns()}
        {this.renderDetail()}
        <h1 className='t-title'>报名信息</h1>
        <TTable {...this.getPayTableSettings()} />
        <TTable {...this.getPartTableSettings()} />
        <TTable {...this.getFinishTableSettings()} />
        <h1 className='t-title'>收藏信息</h1>
        <TTable {...this.getFavoTableSettings()} />
      </div>
    );
  }
}
