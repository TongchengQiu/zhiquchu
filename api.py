# -*- coding: utf-8 -*-

#python
import logging
import datetime
import re

# django
from django.contrib import auth
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.core.exceptions import ObjectDoesNotExist

#surfers
from surfers.utils.utils import *
from surfers.web.decorators import *
from surfers.web.web_utils import *
from surfers.errors.errorcode import *
from surfers.errors.exception import *

from webapp.models import *
from operapp.models import *

#log
logger = logging.getLogger('app')

# 运营端首页
def index(request):
    logger.debug(str(request.REQUEST))

    return HttpResponseRedirect("/static/operapp/index.html")

# 运营端登录
# api_url: http://wanmujia.com/operapp/login
# method ：post
# in     ：username      #用户名
#        ：password      #密码
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
@csrf_exempt
@require_POST
@json_response
def login(request):
    logger.debug(str(request.REQUEST))

    if request.user.is_authenticated():
        logger.debug("logged in:" +  str(request.COOKIES))
    else:
        logger.debug("logging in" +  str(request.COOKIES))

        username = request.REQUEST.get("username", "")
        password = request.REQUEST.get("password", "")
        logger.debug("login:username=" + username + ",password=" + password)
        request_user = auth.authenticate(username=username, password=password)

        if request_user is not None :
            auth.login(request, request_user)
            logger.debug("login ok" + str(request.COOKIES))
        else:
            logger.debug("login faild" +  str(request.COOKIES))
            raise AppException(200000, "认证失败")

# 运营端退出
# api_url: http://wanmujia.com/operapp/logout
# method ：get
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
@json_response
def logout(request):
    logger.debug(str(request.REQUEST))

    if request.user.is_authenticated():
        logger.info("logging out : " + request.user.username)
        auth.logout(request)

# 运营端登录用户信息
# api_url: http://wanmujia.com/operapp/userinfo
# method ：get
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#        ：id            #用户ID
#        ：nickname      #姓名
#        ：username      #用户名
@check_admin_login
@json_response
def userinfo(request):
    logger.debug(str(request.REQUEST))

    if request.user.is_authenticated():
        info_map = {}
        info_map['id'] = request.user.id
        info_map['nickname'] = request.user.first_name
        info_map['username'] = request.user.username
        logger.info("auth: username-" + request.user.username)
        return info_map
    else:
        logger.info("auth: no login")
        raise AppException(200000, "未登录")

# 运营端新增用户
# api_url: http://wanmujia.com/operapp/adduser
# method ：post
# in     ：username      #用户名
#        ：password      #密码
#        ：nickname      #姓名
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
@csrf_exempt
@require_POST
@check_admin_login
@json_response
def adduser(request):
    logger.debug(str(request.REQUEST))

    username = request.REQUEST.get("username", "")
    password = request.REQUEST.get("password", "")
    nickname = request.REQUEST.get("nickname", "")

    if not re.match('^[0-9a-zA-Z]+$', username):
        raise AppException(APP_ERROR_PARAM_VALUE, u"用户名只能为字母和数字")

    user = User()
    user.username = username
    user.set_password(password)
    user.first_name = nickname
    user.last_name = "1"
    user.save()

# 运营端查询用户列表
# api_url: http://wanmujia.com/operapp/qryusers
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页条数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：id            #用户ID
#        ：nickname      #姓名
#        ：username      #用户名
@check_admin_login
@json_response
def qryusers(request):
    logger.debug(str(request.REQUEST))

    info_map = {}
    users = User.objects.filter(last_name='1')
    page = get_page_of_paged_objects(request, users)
    info_map["page"] = page.to_map()

    fields = ["id", "username", "first_name"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)

    for map_object in map_list:
        map_object["nickname"] = map_object["first_name"]

    info_map["data"] = map_list

    return info_map

# 运营端删除用户
# api_url: http://wanmujia.com/operapp/deluser
# method ：get
# in     ：id            #用户ID
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
@check_admin_login
@json_response
def deluser(request):
    logger.debug(str(request.REQUEST))

    id = request.REQUEST.get("id", "0")
    id = int(id)
    if not id:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id必填")

    logger.debug(str(id))

    try:
        user = User.objects.get(id=id)
        if user.username == 'admin':
            raise AppException(APP_ERROR_PARAM_VALUE, u"admin不能删除")
        user.delete()
    except:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id不存在")

# 运营端活动统计
# api_url: http://wanmujia.com/operapp/activity/stat
# method ：get
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#
#        ：sum           #总数
#        : via           #通过
#        : checking      #待审核
#        : disable       #禁用
#        : valid         #有效
#        : overdue       #过期
@check_admin_login
@json_response
def activity_stat(request):
    logger.debug(str(request.REQUEST))

    stat = ActivityStat.objects.get(id=1)
    fields = ["sum", "via", 'checking', 'disable', 'valid', 'overdue']
    info_map = obj_to_map(stat, fields)
    return info_map

# 运营端查询活动日统计
# api_url: http://wanmujia.com/operapp/activity/daystat
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：id            #用户ID
#        ：date          #日期
#        ：sum           #总数
@check_admin_login
@json_response
def activity_daystat(request):
    logger.debug(str(request.REQUEST))

    info_map = {}
    stats = ActivityDayStat.objects.all()
    page = get_page_of_paged_objects(request, stats)
    info_map["page"] = page.to_map()

    fields = ["id", "date", "sum", "create_time"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 运营端查询活动列表
# api_url: http://wanmujia.com/operapp/activity/qrys
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
#        : recommend     #1:推荐 0：不推荐    (选填)
#        : state         #0:待审核 1:通过 2:禁用 (选填)
#        : lstate        #0:过期 1:有效 (选填)
#        ：close         #0:没关闭 1：关闭(选填)
#        ：publisher_id  #活动发布者id (选填)
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：id            #活动ID
#        ：name          #活动名
#        ：recommend     #1:推荐 0：不推荐
#        ：state         #0:待审核 1:通过 2:禁用
#        : lstate        #0:过期 1:有效
#        ：close         #0:没关闭 1：关闭
#        : create_time   #发布时间
#        : pay_fee       #总支付金额
@check_admin_login
@json_response
def activity_qrys(request):
    logger.debug(str(request.REQUEST))

    #页面传的查询参数
    params = extract_params_from_request(request,
                [
                 ("recommend","9"),
                 ("state","9"),
                 ("lstate", "9"),
                 ("close", "9"),
                 ("publisher_id", "0"),
                ])
    activitys = Activity.objects.all()

    recommend = int(params["recommend"])
    if recommend >= 0 and recommend <= 1:
        activitys = activitys.filter(recommend=recommend)

    state = int(params["state"])
    if state >= 0 and state <= 2:
        activitys = activitys.filter(state=state)

    lstate = int(params["lstate"])
    if lstate >= 0 and lstate <= 1:
        activitys = activitys.filter(lstate=lstate)

    close = int(params["close"])
    if close >= 0 and close <= 1:
        activitys = activitys.filter(close=close)

    publisher_id = int(params["publisher_id"])
    if publisher_id:
        activitys = activitys.filter(publisher_id=publisher_id)

    info_map = {}
    page = get_page_of_paged_objects(request, activitys)
    info_map["page"] = page.to_map()

    fields = ["id", "name", "recommend", "state", "lstate", "close", "create_time", "pay_fee"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 运营端活动修改
# api_url: http://wanmujia.com/operapp/activity/mod
# method ：get
# in     ：id            #活动ID
#        : recommend     #1:推荐 0：不推荐    (选填)
#        : state         #0:待审核 1:通过 2:禁用 (选填)
#        : lstate        #0:过期 1:有效 (选填)
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
@check_admin_login
@json_response
def activity_mod(request):
    logger.debug(str(request.REQUEST))

    #页面传的查询参数
    params = extract_params_from_request(request,
                [
                 ("recommend","9"),
                 ("state","9"),
                 ("lstate", "9"),
                 ("id", "0"),
                ])

    id = int(params["id"])
    if not id:
        raise AppException(APP_ERROR_PARAM_VALUE, u"缺少id")

    try:
        activity = Activity.objects.get(id=id)
        recommend = int(params["recommend"])
        if recommend >= 0 and recommend <= 1:
            activity.recommend = recommend

        state = int(params["state"])
        if state >= 0 and state <= 2:
            activity.state = state

        lstate = int(params["lstate"])
        if lstate >= 0 and lstate <= 1:
            activity.lstate = lstate

        activity.save()
    except:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id不存在")

# 运营端查询活动
# api_url: http://wanmujia.com/operapp/activity/qry
# method ：get
# in     ：id            #活动ID
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述

#        ：id            #活动ID
#        ：name          #活动名
#        : pic           #封面图片
#        ：start_time    #开始时间
#        ：end_time      #结束时间
#        ：address       #详细地址
#        : tag1          #标签1
#        : tag2          #标签2
#        : tag3          #标签3
#        : type          #活动分类
#        : content       #活动内容
#        ：recommend     #1:推荐 0：不推荐
#        ：state         #0:待审核 1:通过 2:禁用
#        : lstate        #0:过期 1:有效
#        ：close         #0:没关闭 1：关闭
#        票种
#        ：id            #票种id
#        ：name          #名称
#        ：price         #价格
#        ：apply_num     #报名人数
#        ：num           #报名上线
#        : apply_price   #收款金额
@check_admin_login
@json_response
def activity_qry(request):
    logger.debug(str(request.REQUEST))

    #页面传的查询参数
    params = extract_params_from_request(request,
                [
                 ("id", "0"),
                ])
    id = int(params["id"])
    if not id:
        raise AppException(APP_ERROR_PARAM_VALUE, u"缺少id")

    try:
        activity = Activity.objects.get(id=id)
        fields = ["id", "name", 'pic', 'start_time', 'end_time', 'address', 'tag1', 'tag2', 'tag3', 'type', 'content', 'recommend', 'state', 'lstate', 'close']
        info_map = obj_to_map(activity, fields)

        fields = ["id", "name", "price", "apply_num", "num", "apply_price"]
        fees = activity.activityfee_set.all()
        map_list = objs_to_map_list(fees, fields)
        info_map["data"]=map_list

        return info_map
    except:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id不存在")

# 运营端报名列表
# api_url: http://wanmujia.com/operapp/apply/qrys
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
#        : state         #状态 0:待付款 1:待参与，支付成功 2：已经参加完成。3.退票中 4.退票成功 5.退票失败 （可选）
#        : parter_id     #参加用户的id（可选）
#        : id            #活动ID
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：activity_id   #活动ID
#        ：activity_name #活动名
#        ：link_name     #联系人姓名
#        ：link_phone    #联系人电话
#        ：fee_name      #票种名称
#        ：fee_price     #票种价格
#        : apply_time    #报名日期
#        ：modify_time   #操作时间
#        ：state         #状态 0:待付款 1:待参与，支付成功 2：已经参加完成。
#        ：favorite_time #收藏时间
#        ：nickname      #微信昵称
#        ：weixinuser_id #微信id
@check_admin_login
@json_response
def apply_qrys(request):
    logger.debug(str(request.REQUEST))

    #页面传的查询参数
    params = extract_params_from_request(request,
                [
                 ("id","0"),
                 ("state","9"),
                 ("parter_id","0"),
                ])
    applys = Apply.objects.all()
    id = int(params["id"])
    if id:
        applys = applys.filter(activity_id=id)

    parter_id = int(params["parter_id"])
    if parter_id:
        applys = applys.filter(weixinuser_id=parter_id)

    state = int(params["state"])
    if state >= 0 and state <= 2:
        applys = applys.filter(state=state)

    info_map = {}
    page = get_page_of_paged_objects(request, applys)
    info_map["page"] = page.to_map()

    fields = ["activity.id", "activity_name", "link_name", "link_phone", "fee_name", "fee_price", "apply_time", "modify_time", "state", "favorite_time", "nickname", "weixinuser.id"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 活动收藏用户
# api_url: http://wanmujia.com/operapp/activity/favorite
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
#        : id            #活动ID
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：create_time              #收藏时间
#        ：weixinuser_nickname      #微信昵称
#        ：weixinuser_id            #微信昵称
@check_admin_login
@json_response
def activity_favorite(request):
    logger.debug(str(request.REQUEST))

    id = request.REQUEST.get("id", "0")
    datas =  Favorite.objects.filter(activity_id=id)

    info_map = {}
    page = get_page_of_paged_objects(request, datas)
    info_map["page"] = page.to_map()

    fields = ["weixinuser.nickname", "create_time", "weixinuser.id"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 微信用户收藏活动
# api_url: http://wanmujia.com/operapp/wechat/favorite
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
#        : id            #用户ID
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：activity_id              #活动id
#        ：activity_name            #活动活动名
#        ：create_time              #收藏时间
@check_admin_login
@json_response
def wechat_favorite(request):
    logger.debug(str(request.REQUEST))

    id = request.REQUEST.get("id", "0")
    datas =  Favorite.objects.filter(weixinuser_id=id)

    info_map = {}
    page = get_page_of_paged_objects(request, datas)
    info_map["page"] = page.to_map()

    fields = ["activity.name", "create_time", "activity.id"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 运营端微信用户统计
# api_url: http://wanmujia.com/operapp/wechat/stat
# method ：get
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#
#        ：sum           #总数
@check_admin_login
@json_response
def wechat_stat(request):
    logger.debug(str(request.REQUEST))
    stat = WeChatStat.objects.get(id=1)
    fields = ["sum", "disable", 'valid']
    info_map = obj_to_map(stat, fields)
    return info_map

# 运营端微信用户日统计
# api_url: http://wanmujia.com/operapp/wechat/daystat
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：id            #微信用户
#        ：date          #日期
#        ：sum           #总数
@check_admin_login
@json_response
def wechat_daystat(request):
    logger.debug(str(request.REQUEST))

    info_map = {}
    stats = WeChatDayStat.objects.all()
    page = get_page_of_paged_objects(request, stats)
    info_map["page"] = page.to_map()

    fields = ["id", "date", "sum", "create_time"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 运营端微信用户列表
# api_url: http://wanmujia.com/operapp/wechat/qrys
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：id            #活动ID
#        ：nickname      #昵称
#        ：pub_act_num   #发布活动个数
#        ：part_act_num  #参加活动个数
@check_admin_login
@json_response
def wechat_qrys(request):
    logger.debug(str(request.REQUEST))

    info_map = {}
    users = WeiXinUser.objects.all()
    page = get_page_of_paged_objects(request, users)
    info_map["page"] = page.to_map()

    fields = ["id", "nickname", "pub_act_num", "part_act_num"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 运营端微信用户查询
# api_url: http://wanmujia.com/operapp/wechat/qry
# method ：get
# in     ：id            #微信用户ID
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述

#        ：id            #活动ID
#        ：nickname      #昵称
#        : headimgurl    #头像
#        ：sex
#        ：create_time
#        ：pub_act_num   #发布活动个数
#        ：part_act_num  #参加活动个数
#        : pay_fee       #总支付金额
#        : revenue_fee   #营收金额
@check_admin_login
@json_response
def wechat_qry(request):
    logger.debug(str(request.REQUEST))

    id = request.REQUEST.get("id", "0")
    id = int(id)
    if not id:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id必填")

    try:
        user = WeiXinUser.objects.get(id=id)
        fields = ["id", "nickname", 'headimgurl', 'sex', 'create_time', 'pub_act_num', 'part_act_num', 'pay_fee', 'revenue_fee']
        info_map = obj_to_map(user, fields)
        return info_map
    except:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id不存在")

# 运营端资金统计
# api_url: http://wanmujia.com/operapp/capital/stat
# method ：get
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#
#        ：pay_fee       #进账
#        : refund_fee    #出帐
#        : balance_fee   #净利
@check_admin_login
@json_response
def capital_stat(request):
    logger.debug(str(request.REQUEST))

    stat = CapitalStat.objects.get(id=1)
    fields = ["pay_fee", "refund_fee", 'balance_fee']
    info_map = obj_to_map(stat, fields)
    return info_map

# 运营端资金日统计
# api_url: http://wanmujia.com/operapp/capital/daystat
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：id            #用户ID
#        ：date          #日期
#        ：pay_fee       #进账
#        : refund_fee    #出帐
#        : balance_fee   #净利
@check_admin_login
@json_response
def capital_daystat(request):
    logger.debug(str(request.REQUEST))

    info_map = {}
    stats = CapitalDayStat.objects.all()
    page = get_page_of_paged_objects(request, stats)
    info_map["page"] = page.to_map()

    fields = ["id", "date", "pay_fee", "refund_fee", "balance_fee"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map


# 运营端订单查询
# api_url: http://wanmujia.com/operapp/order/qrys
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
#        : date          #年-月-日 2016-11-01
#        ：weixinuser_id #用户用户id (选填)
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#        ：activity_id   #活动ID
#        ：nickname      #昵称
#        ：activity_name #活动名
#        ：fee_name      #票种名称
#        ：fee_price     #票种价格
#        ：weixinuser_id #微信用户id
@check_admin_login
@json_response
def order_qrys(request):
    logger.debug(str(request.REQUEST))

    date = request.REQUEST.get("date", "0")
    if date == "0":
        raise AppException(APP_ERROR_PARAM_VALUE, u"date必填")

    start_time = start_time_of_day(date)
    end_time = end_time_of_day(date)

    orders = Order.objects.filter(create_time__gte=start_time)
    orders = orders.filter(create_time__lte=end_time)

    weixinuser_id = int(request.REQUEST.get("weixinuser_id", "0"))
    if weixinuser_id:
        orders = orders.filter(weixinuser_id=weixinuser_id)

    info_map = {}
    page = get_page_of_paged_objects(request, orders)
    info_map["page"] = page.to_map()

    fields = ["activity.id", "nickname", "activity_name", "fee_name", "fee_price", "weixinuser.id"]
    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)
    info_map["data"] = map_list

    return info_map

# 运营端退款单查询
# api_url: http://wanmujia.com/operapp/refund/qrys
# method ：get
# in     ：page          #页数，从1开始
#        ：page_size     #默认10，可以不填
#        : date          #年-月-日 (可选)
#        : state         #0:申请 1:同意 2:拒绝 3:成功 4:失败
#        ：weixinuser_id #用户用户id (选填)
#        ：activity_id   #活动id (选填)
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
#          分页数据
#        ：count         #条数
#        ：page_size     #单页页数
#        ：num_pages     #页数
#        ：page_number   #页码
#        ：has_next      #是否有下一页
#        ：next_page_number #下页页数
#        ：has_previous  #是否有上一页
#        ：previous_page_number #上一页页数
#          单项数据
#          id            #退款但ID
#        ：activity_id   #活动ID
#        ：weixinuser_id #用户ID
#        ：nickname      #昵称
#        ：activity_name #活动名
#        ：fee_name      #票种名称
#        ：fee_price     #票种价格
#        ：state         #0:申请 1:同意 2:拒绝 3:成功 4:失败
@check_admin_login
@json_response
def refund_qrys(request):
    logger.debug(str(request.REQUEST))

    refunds = Refund.objects.all()

    date = request.REQUEST.get("date", "0")
    if date == "0":
        pass
    else:
        start_time = start_time_of_day(date)
        end_time = end_time_of_day(date)

        refunds = refunds.filter(create_time__gte=start_time)
        refunds = refunds.filter(create_time__lte=end_time)

    weixinuser_id = int(request.REQUEST.get("weixinuser_id", "0"))
    if weixinuser_id:
        refunds = refunds.filter(weixinuser_id=weixinuser_id)

    activity_id = int(request.REQUEST.get("activity_id", "0"))
    if activity_id:
        refunds = refunds.filter(activity_id=activity_id)

    state = int( request.REQUEST.get("state", "9"))
    if state != 9:
        refunds = refunds.filter(state=state)

    info_map = {}
    page = get_page_of_paged_objects(request, refunds)
    info_map["page"] = page.to_map()


    fields = ["id", "activity_id", "weixinuser_id", "nickname", "activity_name", "fee_name", "fee_price", "state"]

    map_list = objs_to_map_list(page.objects, fields)
    logger.debug(map_list)

    info_map["data"] = map_list

    return info_map

# 运营端退款单审核
# api_url: http://wanmujia.com/operapp/refund/check
# method ：get
# in     ：id            #退款单ID
#        : state         #1:同意 2:拒绝
# 返回为json格式
# out    ：retcode       #错误码
#        ：retmsg        #错误描述
@check_admin_login
@json_response
def refund_check(request):
    logger.debug(str(request.REQUEST))

    #页面传的查询参数
    params = extract_params_from_request(request,
                [
                 ("id","0"),
                 ("state","9"),
                ])
    state = int(params["state"])
    if state > 2 and state < 1:
        raise AppException(APP_ERROR_PARAM_VALUE, u"state错误")

    id = int(params["id"])
    if not id:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id必填")

    try:
        refund = Refund.objects.get(id = id)
        if state == 2:
            # @_@ 状态变化
            refund.state = 2
            refund.save()
        else:
            # @_@ 状态变化
            #进入退款流程
            indict = dict()
            indict["device_info"] = str(refund.id)
            indict["transaction_id"] = refund.transaction_id
            indict["out_trade_no"] = refund.coding
            indict["out_refund_no"] = refund.mch_refund_id
            indict["total_fee"] = str(refund.fee_price)
            indict["refund_fee"] = str(efund.fee_price)
            indict["refund_fee_type"] = 'CNY'

            order = Order.objects.get(coding=refund.coding)
            client = WxScanPayClient()
            (ret, errmsg, retdict) = client.refund(indict)
            logger.error(errmsg)

            if ret == ERR_CODE_WX_SUCCESS:
                # 退款成功
                refund.state = 3
                refund.weixin_refund_id = retdict["refund_id"]
                refund.refund_time = datetime.datetime.now()
                refund.save()


                order.state = 4
                order.save()

                apply = Apply.objects.get(order_id=order.id)
                apply.state = 0
                apply.save()

                order.weixinuser.exit_activity(refund.fee_price)
                apply.activity.weixinuser.activity_norevenue(refund.fee_price)
                apply.activity.exit_ok(refund.fee_price)
                order.activityfee.exit_ok()

                msg = Msg(weixinuser=order.weixinuser)
                msg.title = u"退款"
                msg.content = u"你报名%s活动, 退款已经发起，2-3个工作日到帐。" %  apply.activity.name
                msg.save()
            else:
                # 退款失败
                refund.state = 4
                refund.create_error = u'创建退款单失败: ' + errmsg
                refund.save()

                raise AppException(200000, refund.create_error)

    except:
        raise AppException(APP_ERROR_PARAM_VALUE, u"id不存在")
