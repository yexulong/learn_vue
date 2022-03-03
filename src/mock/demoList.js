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
                    path: "categories",
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
                "role_name|1": ["超级管理员", "测试角色"]
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

let rightList = {
    "data": [
        {
            id: 101,
            "authName": "商品管理",
            level: '0',
            path: 'goods',
            pid: '0'
        },
        {
            id: 102,
            "authName": "订单管理",
            level: '0',
            path: 'orders',
            pid: '0'
        },
        {
            id: 103,
            "authName": "权限管理",
            level: '0',
            path: 'rights',
            pid: '0'
        },
        {
            id: 104,
            "authName": "商品列表",
            level: '1',
            path: 'goods',
            pid: '0'
        },
        {
            id: 105,
            "authName": "添加商品",
            level: '2',
            path: 'goods',
            pid: '0'
        }
    ],
    meta: {
        msg: "获取权限列表成功",
        status: 200,
    },
};

let rightTree = {
    data: [
        {
            id: 101,
            authName: "商品管理",
            path: null,
            children: [
                {
                    id: 104,
                    authName: "商品列表",
                    path: null,
                    children: [
                        {
                            id: 105,
                            authName: "添加商品",
                            path: null,
                        }
                    ]
                },
                {
                    id: 124,
                    authName: "商品分类",
                    path: null,
                    children: [
                        {
                            id: 135,
                            authName: "添加分类",
                            path: null,
                        },
                        {
                            id: 136,
                            authName: "删除分类",
                            path: null,
                        }
                    ]
                }
            ]
        },
    ],
    meta: {
        msg: "获取权限树成功",
        status: 200,
    },
};

let roleList = {
    data: [
        {
            id: 30,
            roleName: "主管",
            roleDesc: "技术负责人",
            children: [
                {
                    id: 101,
                    authName: "商品管理",
                    path: null,
                    children: [
                        {
                            id: 104,
                            authName: "商品列表",
                            path: null,
                            children: [
                                {
                                    id: 105,
                                    authName: "添加商品",
                                    path: null,
                                }
                            ]
                        },
                        {
                            id: 124,
                            authName: "商品分类",
                            path: null,
                            children: [
                                {
                                    id: 135,
                                    authName: "添加分类",
                                    path: null,
                                },
                                {
                                    id: 136,
                                    authName: "删除分类",
                                    path: null,
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 201,
                    authName: "订单管理",
                    path: null,
                    children: [
                        {
                            id: 204,
                            authName: "订单列表",
                            path: null,
                            children: [
                                {
                                    id: 205,
                                    authName: "添加订单",
                                    path: null,
                                }
                            ]
                        }
                    ]
                }
            ],
        },
        {
            id: 40,
            roleName: "测试角色",
            roleDesc: "测试角色描述",
            children: [
                {
                    id: 101,
                    authName: "商品管理",
                    path: null,
                    children: [
                        {
                            id: 104,
                            authName: "商品列表",
                            path: null,
                            children: [
                                {
                                    id: 105,
                                    authName: "添加商品",
                                    path: null,
                                }
                            ]
                        }
                    ]
                }
            ],
        }
    ],
    meta: {
        msg: "获取角色列表成功",
        status: 200,
    },
};

let categoriesList = {
    data: {
        pagenum: 1,
        pagesiz: 5,
        total: 4,
        "result|4": [
            {
                "cat_id|+1": 1,
                "cat_name": '@string(lower, 5)',
                "cat_pid": 0,
                "cat_level": 0,
                "cat_delete|1": [false, true],
                "children": [
                    {
                        "cat_id|+1": 5,
                        "cat_name": '@string(lower, 5)',
                        "cat_pid": 1,
                        "cat_level": 1,
                        "cat_delete|1": [false, true],
                        "children": [
                                {
                                    "cat_id|+1": 6,
                                    "cat_name": '@string(lower, 5)',
                                    "cat_pid": 2,
                                    "cat_level": 2,
                                    "cat_delete|1": [false, true],
                                }
                        ],
                    }
                ],
            }
        ]
    },
    meta: {
        msg: "获取商品分类列表成功",
        status: 200,
    },
};

let categoriesList2 = {
    data: {
        pagenum: 1,
        pagesiz: 5,
        total: 4,
        "result|4": [
            {
                "cat_id|+1": 1,
                "cat_name": '@string(lower, 5)',
                "cat_pid": 0,
                "cat_level": 0,
                "cat_delete|1": [false, true],
                "children": [
                    {
                        "cat_id|+1": 5,
                        "cat_name": '@string(lower, 5)',
                        "cat_pid": 1,
                        "cat_level": 1,
                        "cat_delete|1": [false, true],
                        "children": [
                        ],
                    }
                ],
            }
        ]
    },
    meta: {
        msg: "获取商品分类列表成功",
        status: 200,
    },
};

let categoriesPost = {
    data: {
        'cat_id|+1': 62,
        "cat_name": '@string(lower, 5)',
        "cat_pid|1-2": '@integer(1, 9)',
        "cat_level|1": [0, 1, 2],
    },
    meta: {
        msg: "创建成功",
        status: 201,
    },
};

export default {
    'post|login':  successList,
    'get|menus': menuList,
    'get|users': userList,
    'get|users?query=&pagenum=1&pagesize=2': userList,
    'get|rights/list': rightList,
    'get|rights/tree': rightTree,
    'get|roles': roleList,
    'get|categories.*type=2': categoriesList2,
    'get|categories': categoriesList,
    'post|categories': categoriesPost,
}