<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 警告区域 -->
            <el-alert title="注意: 只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon>
            </el-alert>

            <!-- 选择商品分类区域 -->
            <el-row class="cat_opt">
                <el-col>
                    <span>选择的商品分类: </span>
                    <!-- 选择商品分类的级联选择框 -->
                    <el-cascader
                        v-model="selectCateKeys"
                        :options="cateList"
                        :props="cateProps"
                        @change="handleChange"
                    >
                    </el-cascader>
                </el-col>
            </el-row>

            <!--  -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="first">动态参数</el-tab-pane>
                <el-tab-pane label="静态属性" name="second">静态属性</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Params",
        data() {
            return {
                cateList: [],
                // 级联选择框的配置对象
                cateProps: {
                    expandTrigger: 'hover',
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children',
                },
                // 级联选择框双向绑定到的数组
                selectCateKeys: [],
                // 被激活的页签的名称
                activeName: 'first'
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            // 获取所有的商品分类
            async getCateList() {
                const {data: res} = await this.$http.get('categories');
                if(res.meta.status !== 200) {
                    this.$message.error('获取商品分类失败')
                }

                this.cateList = res.data.result;
                console.log(this.cateList)
            },
            // 级联选择框选中项变化，触发这个函数
            handleChange() {
                console.log(this.selectCateKeys)
            },
            // Tab页签点击事件的处理函数
            handleTabClick() {
                console.log(this.activeName)
            }
        },
    }
</script>

<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0;
    }
</style>