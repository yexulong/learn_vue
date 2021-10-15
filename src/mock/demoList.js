let successList = {
    data: {
        id: 500,
        mobile: "13456329361",
        username: "admin",
        token: "123132451321654",
    },
    meta: {
        msg: "登录成功",
        status: 200
    }
};

let menuList = {
    data: [
        {
            id: 101,
            authName: "用户管理",
            path: null,
            children: [
                {
                    id: 104,
                    authName: "用户列表",
                    path: 'users',
                    children: []
                }
            ]
        },
        {
            id: 201,
            authName: "权限管理",
            path: null,
            children: [
                {
                    id: 202,
                    authName: "角色列表",
                    path: 'roles',
                    children: []
                },
                {
                    id: 203,
                    authName: "权限列表",
                    path: 'rights',
                    children: []
                }
            ]
        },
        {
            id: 301,
            authName: "商品管理",
            path: null,
            children: [
                {
                    id: 302,
                    authName: "商品列表",
                    path: null,
                    children: []
                },
                {
                    id: 303,
                    authName: "分类参数",
                    path: null,
                    children: []
                },
                {
                    id: 304,
                    authName: "商品分类",
                    path: null,
                    children: []
                }
            ]
        },
        {
            id: 401,
            authName: "订单管理",
            path: null,
            children: [
                {

                }
            ]
        },
        {
            id: 501,
            authName: "数据统计",
            path: null,
            children: [
                {

                }
            ]
        }
    ],
    meta: {
        msg: "获取菜单成功",
        status: 200,
    }
};

let userList = {
    data: {
        pagenum: 1,
        total: 4,
        "users|4": [
            {
                "id|+1": 1,
                username: '@CNAME',
                "mobile|13": "@integer(1, 9)",
                type: '',
                email: '@EMAIL',
                create_time: '@datetime',
                mg_state: '@boolean',
                role_name: "超级管理员"
            }
        ]
    },
    meta: {
        msg: "获取管理员列表成功",
        status: 200,
    },
    filter: {

    }
};
export default {
    'post|login':  successList,
    'get|menus': menuList,
    'get|users': userList,
    'get|users?query=&pagenum=1&pagesize=2': userList
}