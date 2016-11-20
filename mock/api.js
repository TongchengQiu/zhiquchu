var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success'
    })
  }, 200);
});

router.get('/logout', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success'
    })
  }, 200);
});

router.get('/auth', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        id: 'id',
        nickname: 'nickname',
        username: 'username',
      }
    })
  }, 200);
});

router.post('/adduser', (req, res) => {
  console.log(req);
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success'
    })
  }, 200);
});

router.get('/qryusers', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { nickname: "nickname1", username: "username1", id: 'id1' },
          { nickname: "nickname2", username: "username2", id: 'id2' },
          { nickname: "nickname3", username: "username3", id: 'id3' },
          { nickname: "nickname4", username: "username4", id: 'id4' },
          { nickname: "nickname5", username: "username5", id: 'id5' },
          { nickname: "nickname6", username: "username6", id: 'id6' },
          { nickname: "nickname7", username: "username7", id: 'id7' },
          { nickname: "nickname8", username: "username8", id: 'id8' },
          { nickname: "nickname9", username: "username9", id: 'id9' },
          { nickname: "nickname10", username: "username10", id: 'id10' },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/deluser', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success'
    })
  }, 200);
});

router.get('/activity/stat', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        sum: 1000,
        via: 2000,
        checking: 3000,
        disable: 4000,
        valid: 5000,
        overdue: 6000,
      }
    })
  }, 200);
});

router.get('/activity/daystat', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { id: "id1", date: "2016-11-1", sum: '10' },
          { id: "id2", date: "2016-11-2", sum: '20' },
          { id: "id3", date: "2016-11-3", sum: '30' },
          { id: "id4", date: "2016-11-4", sum: '40' },
          { id: "id5", date: "2016-11-5", sum: '50' },
          { id: "id6", date: "2016-11-6", sum: '60' },
          { id: "id7", date: "2016-11-7", sum: '70' },
          { id: "id8", date: "2016-11-8", sum: '80' },
          { id: "id9", date: "2016-11-9", sum: '90' },
          { id: "id10", date: "2016-11-10", sum: '99' },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/activity/qrys', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { id: "id1", name: "name1", recommend: 1, state: 0, lstate: 0, close: 1, create_time: '2016-11-10', pay_fee: '100' },
          { id: "id2", name: "name2", recommend: 0, state: 1, lstate: 1, close: 0, create_time: '2016-11-11', pay_fee: '100' },
          { id: "id3", name: "name3", recommend: 1, state: 2, lstate: 0, close: 1, create_time: '2016-11-12', pay_fee: '100' },
          { id: "id4", name: "name4", recommend: 0, state: 0, lstate: 1, close: 0, create_time: '2016-11-13', pay_fee: '100' },
          { id: "id5", name: "name5", recommend: 1, state: 1, lstate: 0, close: 1, create_time: '2016-11-14', pay_fee: '100' },
          { id: "id6", name: "name6", recommend: 0, state: 2, lstate: 1, close: 0, create_time: '2016-11-15', pay_fee: '100' },
          { id: "id7", name: "name7", recommend: 1, state: 0, lstate: 0, close: 1, create_time: '2016-11-16', pay_fee: '100' },
          { id: "id8", name: "name8", recommend: 0, state: 1, lstate: 1, close: 0, create_time: '2016-11-17', pay_fee: '100' },
          { id: "id9", name: "name9", recommend: 1, state: 2, lstate: 0, close: 1, create_time: '2016-11-18', pay_fee: '200' },
          { id: "id10", name: "name10", recommend: 0, state: 0, lstate: 1, close: 0, create_time: '2016-11-19', pay_fee: '100' },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/activity/mod', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success'
    })
  }, 200);
});

router.get('/activity/qry', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        id: "id7",
        name: "name7",
        pic: 1,
        start_time: '2016-11-16',
        end_time: '2016-11-22',
        address: 'address',
        tag1: 'tag1',
        tag2: 'tag2',
        tag3: 'tag3',
        type: 1,
        content: '活动内容',
        recommend: 1,
        state: 1,
        lstate: 1,
        close: 1,
        // TODO: 票种
        pisozhong: [
          { id: 'id1', name: 'name1', price: '100', apply_num: '211', num: '123', apply_price: '212' },
          { id: 'id2', name: 'name2', price: '100', apply_num: '211', num: '123', apply_price: '212' },
          { id: 'id3', name: 'name3', price: '100', apply_num: '211', num: '123', apply_price: '212' },
          { id: 'id0', name: 'name0', price: '100', apply_num: '211', num: '123', apply_price: '212' },
        ]
      },
    })
  }, 200);
});

router.get('/apply/qrys', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { activity_id: "id1", activity_name: "name1", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-10', modify_time: '2016-11-11', state: 1, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id2", activity_name: "name2", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-11', modify_time: '2016-11-11', state: 0, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id3", activity_name: "name3", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-12', modify_time: '2016-11-11', state: 1, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id4", activity_name: "name4", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-13', modify_time: '2016-11-11', state: 0, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id5", activity_name: "name5", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-14', modify_time: '2016-11-11', state: 1, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id6", activity_name: "name6", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-15', modify_time: '2016-11-11', state: 0, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id7", activity_name: "name7", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-16', modify_time: '2016-11-11', state: 1, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id8", activity_name: "name8", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-17', modify_time: '2016-11-11', state: 0, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id9", activity_name: "name9", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-18', modify_time: '2016-11-11', state: 1, favorite_time: '2016-12-22', nickname: 'nickname' },
          { activity_id: "id10", activity_name: "name10", link_name: 'link_name', link_phone: 19810999082, fee_name: 'fee_name', fee_price: 123, apply_time: '2016-11-19', modify_time: '2016-11-11', state: 0, favorite_time: '2016-12-22', nickname: 'nickname' },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/wechat/stat', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        sum: 2123
      }
    })
  }, 200);
});

router.get('/wechat/daystat', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { id: "id1", date: "2016-11-23", sum: 100 },
          { id: "id2", date: "2016-11-24", sum: 100 },
          { id: "id3", date: "2016-11-25", sum: 100 },
          { id: "id4", date: "2016-11-26", sum: 100 },
          { id: "id5", date: "2016-11-27", sum: 100 },
          { id: "id6", date: "2016-11-28", sum: 100 },
          { id: "id7", date: "2016-11-29", sum: 100 },
          { id: "id8", date: "2016-11-12", sum: 100 },
          { id: "id9", date: "2016-11-22", sum: 100 },
          { id: "id10", date: "2016-11-33", sum: 100 },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/wechat/qrys', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { id: "id1", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id2", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id3", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id4", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id5", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id6", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id7", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id8", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id9", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
          { id: "id10", nickname: 'nickname', pub_act_num: 12, part_act_num: 12312 },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/wechat/qry', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        id: 123,
        nickname: 'nickname',
        headimgurl: 'headimgurl',
        sex: '123',
        create_time: '2014-23-21',
        pub_act_num: 123,
        part_act_num: 123,
        pay_fee: 23,
        revenue_fee: 23123123,
      }
    })
  }, 200);
});

router.get('/capital/stat', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        pay_fee: 2323,
        refund_fee: 123123,
        balance_fee: 213123,
      }
    })
  }, 200);
});

router.get('/capital/daystat', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { id: "id1", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id2", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id3", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id4", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id5", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id6", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id7", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id8", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id9", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
          { id: "id10", date: '2016-03-22', pay_fee: 12, refund_fee: 12312, balance_fee: 213213 },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/order/qrys', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { activity_id: "activity_id1", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id2", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id3", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id4", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id5", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id6", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id7", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id8", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id9", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
          { activity_id: "activity_id10", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name' },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});
router.get('/operapp/refund/qrys', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
      data: {
        data: [
          { weixinuser_id: 'weixinuser_id1', activity_id: "activity_id1", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 0 },
          { weixinuser_id: 'weixinuser_id2', activity_id: "activity_id2", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 1 },
          { weixinuser_id: 'weixinuser_id3', activity_id: "activity_id3", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 2 },
          { weixinuser_id: 'weixinuser_id4', activity_id: "activity_id4", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 3 },
          { weixinuser_id: 'weixinuser_id5', activity_id: "activity_id5", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 4 },
          { weixinuser_id: 'weixinuser_id6', activity_id: "activity_id6", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 0 },
          { weixinuser_id: 'weixinuser_id7', activity_id: "activity_id7", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 1 },
          { weixinuser_id: 'weixinuser_id8', activity_id: "activity_id8", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 2 },
          { weixinuser_id: 'weixinuser_id9', activity_id: "activity_id9", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 3 },
          { weixinuser_id: 'weixinuser_id0', activity_id: "activity_id10", nickname: 'nickname', fee_price: 12, activity_name: 'activity_name', fee_name: 'fee_name', state: 4 },
        ],
        page: {
          count: 100,
          has_next: true,
          num_pages: 1,
          next_page_number: 2,
          page_size: 10,
          page_number: 1,
          has_previous: true,
          previous_page_number: 0
        }
      },
    })
  }, 200);
});

router.get('/refund/check', (req, res) => {
  setTimeout(() => {
    res.json({
      retcode: 0,
      retmsg: 'success',
    })
  }, 200);
});

module.exports = router;


// {
//   "data": {
//     "data": [
//       {"username": "admin", "first_name": "\u80e1\u9e3f\u8fd0", "nickname": "\u80e1\u9e3f\u8fd0", "id": 3}
//     ],
//     "page": {
//       "count": 1, "has_next": false, "num_pages": 1, "next_page_number": 2, "page_size": 10, "page_number": 1, "has_previous": false, "previous_page_number": 0
//     }
//   },
//   "retcode": 0,
//   "retmsg": "success"
// }
