<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

         <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 搜索与添加区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <tree-table
                    :data="cateList"
                    :columns="columns"
                    :selection-type="false"
                    :expand-type="false"
                    :show-index="true"
                    index-text="#"
                    border
                    :show-row-hover="false"
            >
                <template slot="isOK" slot-scope="scope">

                    <i class="el-icon-success" v-if="scope.row.cat_delete === false" style="color: lightgreen"/>
                    <i class="el-icon-error" v-else style="color: red"/>
                </template>
            </tree-table>
            <!-- 分页 -->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Cate",
        data() {
            return {
                queryInfo: {
                    type: 3,
                    pagenum: 1,
                    pagesize: 5,
                },
                // 商品分类的数据列表
                cateList: [],
                total: 0,
                columns: [
                    {
                        label: '分类名称',
                        prop: 'cat_name'
                    },
                    {
                        label: '是否有效',
                        prop: '',
                        type: 'template',
                        template: 'isOK',
                    }
                ]
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            // 获取商品的分类数据
            async getCateList() {
                const {data: res} = await this.$http.get('categories', { params: this.queryInfo })
                if (res.meta.status !== 200) {
                    return this.$message.error('获取商品分类失败')
                }
                console.log(res.data);
                // 把数据列表赋值给分类列表
                this.cateList = res.data.result;
                this.total = res.data.total;
            }
        }
    }
</script>

<style scoped>

</style>