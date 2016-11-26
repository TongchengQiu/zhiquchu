import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import './index.scss';

const DEFAULT_PAGESIZE = 20;

export default class ExtTable extends Component {

  static propTypes = {
    getListStarting: PropTypes.bool,
    getListDone: PropTypes.bool,
    getListError: PropTypes.any,
    getList: PropTypes.func,
    pageSize: PropTypes.any,
    pageNumber: PropTypes.any,
    count: PropTypes.any,
    meta: PropTypes.array.isRequired,
    data: PropTypes.any.isRequired,
    defaultQuery: PropTypes.any,
    needReload: PropTypes.bool,
    title: PropTypes.string,
  }

  static defaultProps = {
    pagination: false,
    data: [],
    pageSize: DEFAULT_PAGESIZE,
    defaultQuery: {}
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.getListData = this.getListData.bind(this);
  }

  componentDidMount() {
    if (!this.props.data || !this.props.data.length < this.props.pageSize || this.props.needReload) {
      this.getListData();
    }
  }

  getPagenationSettings() {
    const { pageNumber, count, pageSize } = this.props;
    return {
      current: +pageNumber,
      defaultCurrent: 1,
      total: count,
      pageSize,
      defaultPageSize: DEFAULT_PAGESIZE,
      showSizeChanger: false,
      showQuickJumper: true,
    };
  }

  getTableSettings() {
    const { getListStarting, getListDone, data, meta, title } = this.props;
    const columns = meta.map(item => ({
      ...item,
      dataIndex: item.key
    }));
    const result = {
      pagination: this.getPagenationSettings(),
      dataSource: data,
      columns,
      loading: getListStarting,
      onChange: ::this.handleTableChange
    };
    if (title) {
      result.title = () => this.props.title;
    }
    return result;
  }

  getListData(args = {}) {
    const { pageSize, pageNumber, getList, defaultQuery } = this.props;
    getList({
      page: args.page || this.props.pageNumber || 1,
      page_size: pageSize,
      ...args.filter,
      ...defaultQuery
    });
  }

  handleTableChange(pagination, filters) {
    const newF = {};
    Object.keys(filters).forEach((key) => {
      newF[key] = filters[key][0];
    });
    this.getListData({
      filter: newF,
      page: pagination.current
    });
  }

  render() {
    const { getListError } = this.props;
    if (!getListError) {
      return <Table ref={(table) => { this.table = table; }} {...this.getTableSettings()} />;
    }
    return <div className='getListError'>{getListError}</div>;
  }
}
