<template>
    <el-container class="home-container">
        <!--   头部区域     -->
        <el-header>
            <div>
                <img src="../assets/logo.png" height="60px" width="60px" alt=""/>
                <span>后台管理系统</span>
            </div>
            <el-container>
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#373d41"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-container>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--    页面主体区域    -->
        <el-container>
            <!--     侧边栏       -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!--      侧边栏菜单区域      -->
                <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409eff"
                        unique-opened
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        router
                        :default-active="activePath"
                >
                    <!--     一级菜单    -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavStatus('/' + subItem.path)">
                            <!-- 二级菜单的模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{ subItem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                // 左侧菜单数据
                menulist: [],
                iconsObj: {
                    '101': 'el-icon-s-custom',
                    '201': 'el-icon-s-check',
                    '301': 'el-icon-s-cooperation',
                    '401': 'el-icon-s-order',
                    '501': 'el-icon-s-marketing',
                },
                // 是否折叠
                isCollapse: false,
                // 被激活的链接地址
                activePath: ''
            }
        },
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login')
            },
            // 获取所有的菜单
            async getMenuList() {
                const {data: res} = await this.$http.get('menus');
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
                this.menulist = res.data;
            },
            // 点击折叠展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态
            saveNavStatus(activePath) {
                window.sessionStorage.setItem('activePath', activePath);
                this.activePath = window.sessionStorage.getItem('activePath')
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: 0;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    .el-menu.el-menu--horizontal {
        border-bottom: 0;
    }

    .home-container {
        height: 100%;
    }
</style>