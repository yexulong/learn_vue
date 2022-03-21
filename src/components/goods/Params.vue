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
                        clearable
                    >
                    </el-cascader>
                </el-col>
            </el-row>

            <!-- tab 页签区域 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <!-- 添加动态参数的面板 -->
                <el-tab-pane label="动态参数" name="many">
                    <!-- 添加参数的按钮 -->
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>
                    <!-- 动态参数表格 -->
                    <el-table :data="manyTabData" border stripe>
                        <!-- 展开行 -->
                        <el-table-column type="expand"></el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                                {{scope.row}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 添加静态属性的面板 -->
                <el-tab-pane label="静态属性" name="only">
                    <!-- 添加属性的按钮 -->
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>
                    <!-- 静态参数表格 -->
                    <el-table :data="onlyTabData" border stripe>
                        <!-- 展开行 -->
                        <el-table-column type="expand"></el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                                {{scope.row}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

            <!-- 添加参数的对话框 -->
            <el-dialog
                :title="'添加' + titleText"
                :visible.sync="addDialogVisible"
                width="30%"
                @close="addDialogClosed"
            >
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                    <el-form-item :label="titleText" prop="attr_name">
                        <el-input v-model="addForm.attr_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
                </span>
            </el-dialog>
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
                activeName: 'many',
                // 动态参数的数据
                manyTabData: [],
                // 静态属性的数据
                onlyTabData: [],
                // 控制添加对话框的显示与隐藏
                addDialogVisible: false,
                // 添加参数的表单数据对象
                addForm: {
                    attr_name: '',

                },
                // 添加表单的数据验证对象
                addFormRules: {
                    attr_name: [
                        {
                            required: true,
                            message: '请输入参数名称',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        created() {
            this.getCateList();
        },
        computed: {
            // 如果按钮需要被禁用，则返回true,否则返回false
            isBtnDisabled() {
                return this.selectCateKeys.length !== 3;
            },
            // 当前选中的三级分类的id
            cateId() {
                if(this.selectCateKeys.length === 3){
                    return this.selectCateKeys[2]
                }
                return null
            },
            // 动态计算标题的文本
            titleText() {
                if (this.activeName === 'many') {
                    return '动态参数'
                }else{
                    return '静态属性'
                }
            }
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
                this.getParamsData();
            },
            // Tab页签点击事件的处理函数
            handleTabClick() {
                console.log(this.activeName);
                this.getParamsData();
            },
            // 获取参数的列表数据
            async getParamsData() {
                console.log(this.selectCateKeys);
                // 根据所选分类的id，和当前所处的面板，获取对应的参数
                const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`,
                    {
                        params: {sel: this.activeName}
                    });
                if(res.meta.status !== 200) {
                    return this.$message.error('获取参数列表失败！')
                }
                console.log(res.data);
                if(this.activeName === 'many'){
                    this.manyTabData = res.data;
                }else{
                    this.onlyTabData = res.data
                }
            },
            // 监听对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            // 点击按钮，添加参数
            addParams() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return;
                    const {data: res} = await this.$http.post(`categories/${this.cateId}/attributes`, {
                        attr_name: this.addForm.attr_name,
                        attr_sel: this.activeName,
                    });
                    if(res.meta.status !== 201){
                        return this.$message.error('添加参数失败！')
                    }
                    this.$message.success('添加参数成功！');
                    this.addDialogVisible = false;
                    this.getParamsData();
                });

            }
        },
    }
</script>

<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0;
    }
</style>