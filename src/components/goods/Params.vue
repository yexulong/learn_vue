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
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag
                                    v-for="(item, i) in scope.row.attr_vals"
                                    :key="i"
                                    closable
                                    @close="handleDelete(i, scope.row)"
                                >
                                    {{ item }}
                                </el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
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
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag
                                    v-for="(item, i) in scope.row.attr_vals"
                                    :key="i"
                                    closable
                                    @close="handleDelete(i, scope.row)"
                                >
                                    {{ item }}
                                </el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
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
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改参数的对话框 -->
            <el-dialog
                :title="'修改' + titleText"
                :visible.sync="editDialogVisible"
                width="30%"
                @close="editDialogClosed"
            >
                <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                    <el-form-item :label="titleText" prop="attr_name">
                        <el-input v-model="editForm.attr_name"/>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParams">确 定</el-button>
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
                },
                // 修改对话框的显示与隐藏
                editDialogVisible: false,
                // 修改表单的数据对象
                editForm: {},
                // 修改表单的验证规则
                editFormRules: {
                    attr_name: [
                        {
                            required: true,
                            message: '请输入参数名称',
                            trigger: 'blur'
                        }
                    ]
                },
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
                console.log("selectCateKeys:", this.selectCateKeys);
                if (this.selectCateKeys.length !== 3) {
                    this.selectCateKeys = []
                    this.onlyTabData = []
                    this.manyTabData = []
                    return
                }
                // 根据所选分类的id，和当前所处的面板，获取对应的参数
                const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`,
                    {
                        params: {sel: this.activeName}
                    });
                if(res.meta.status !== 200) {
                    return this.$message.error('获取参数列表失败！')
                }
                console.log(res.data);
                res.data.forEach(item => {
                    item.inputVisible = false;
                    item.inputValue = ''
                });

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
            },
            // 点击按钮，展示修改对话框
            showEditDialog(row) {
                this.editForm = Object.assign({}, row);
                this.editDialogVisible =  true;
            },
            // 重置修改的表单
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
            // 点击按钮，修改参数信息
            editParams() {
                this.$refs.editFormRef.validate(valid => {
                    if (!valid) return
                    this.$http.post(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, {
                        attr_name: this.editForm.attr_name,
                        attr_sel: this.activeName
                    }).then(response => {
                        if (response.data.meta.status !== 200) {
                            return this.$message.error('修改参数失败！')
                        }
                        this.$message.success('修改参数成功！');
                        this.getParamsData();
                        this.editDialogVisible = false;
                    })
                })
            },
            // 根据id，删除对应的参数项
            removeParams(attr_id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`).then(response => {
                        if (response.data.meta.status !== 200) {
                            return this.$message.error('删除参数失败！')
                        }

                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });

                        this.getParamsData();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 文本框失去焦点或enter都会触发
            handleInputConfirm(row) {
                if (row.inputValue.trim().length === 0){
                    row.inputValue = '';
                    row.inputVisible = false;
                    return
                }
                // 需要发送请求
                row.attr_vals.push(row.inputValue.trim());
                row.inputValue = '';
                row.inputVisible = false;
                this.saveAttrVals(row)
            },
            saveAttrVals(row) {
                this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
                    attr_name: row.attr_name,
                    attr_sel: row.attr_sel,
                    attr_vals: row.attr_vals
                }).then(response => {
                    if (response.data.meta.status !== 200){
                        return this.$message.error('修改参数失败！')
                    }
                    this.$message.success('修改参数成功！');
                })
            },
            // 点击tag按钮展示文本输入框
            showInput(row) {
                row.inputVisible = true;
                // $nextTick: 当页面上的元素被重新渲染之后，才会调用指定回调函数
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            // 删除对应的参数tag
            handleDelete(i, row) {
                row.attr_vals.splice(i);
                this.saveAttrVals(row)
            }
        },
    }
</script>

<style lang="less" scoped>
    .cat_opt {
        margin: 15px 0;
    }
    .el-tag {
        margin: 5px;
    }
    .button-new-tag {
        margin-left: 5px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 5px;
    }
</style>