<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

         <!-- 卡片视图区域 -->
        <el-card class="box-card" >
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col>
                    <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <tree-table
                    class="treeTable"
                    :data="cateList"
                    :columns="columns"
                    :selection-type="false"
                    :expand-type="false"
                    :show-index="true"
                    index-text="#"
                    border
                    :show-row-hover="false"
            >
                <!-- 是否有效 -->
                <template slot="isOK" slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_delete === false" style="color: lightgreen"/>
                    <i class="el-icon-error" v-else style="color: red"/>
                </template>
                <!-- 排序 -->
                <template slot="order" slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag type="warning" size="mini" v-else>三级</el-tag>
                </template>
                <!-- 操作 -->
                <template slot="opt" slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" v-if="scope.row" @click="showEditCateDialog(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </tree-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加分类的对话框 -->
        <el-dialog
            title="添加分类"
            :visible.sync="addCateDialogVisible"
            width="50%"
            @close="addCateDialogClosed"
        >
            <!-- 添加分类的表单 -->
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称: " prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"/>
                </el-form-item>
                <el-form-item label="父级分类: ">
                    <!-- options指定数据源 -->
                    <el-cascader
                        v-model="selectedKeys"
                        :options="parentCateList"
                        :props="cascaderProps"
                        @change="parentCateChanged"
                        clearable
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑分类的对话框 -->
        <el-dialog
            title="编辑分类"
            :visible.sync="setEditCateDialogVisible"
            width="50%"
            @close="setEditCateDialogClosed"
        >
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="editForm.cat_name"/>
                </el-form-item>
                <el-form-item label="分类是否有效" prop="cat_delete">
                    <el-switch
                         :value="!editForm.cat_delete"
                        @change="editForm.cat_delete=!editForm.cat_delete"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序" prop="cat_level">
                    <el-select v-model="editForm.cat_level" placeholder="请选择">
                        <el-option label="一级" :value="0">
                            <el-tag size="mini">一级</el-tag>
                        </el-option>
                        <el-option label="二级" :value="1">
                            <el-tag type="success" size="mini">二级</el-tag>
                        </el-option>
                        <el-option label="三级" :value="2">
                            <el-tag type="warning" size="mini">三级</el-tag>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类父id" prop="cat_pid">
                    <el-input v-model="editForm.cat_pid"/>
                </el-form-item>
                <el-form-item label="父级分类: ">
                    <!-- options指定数据源 -->
                    <el-cascader
                        v-model="selectedKeys"
                        :options="parentCateList"
                        :props="cascaderProps"
                        @change="parentCateChanged"
                        clearable
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setEditCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCate">确 定</el-button>
            </span>
        </el-dialog>
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
                    },
                    {
                        label: '排序',
                        prop: '',
                        type: 'template',
                        template: 'order',
                    },
                    {
                        label: '操作',
                        prop: '',
                        type: 'template',
                        template: 'opt',
                    }
                ],
                // 控制添加分类对话框的显示与隐藏
                addCateDialogVisible: false,
                // 添加分类的表单对象
                addCateForm: {
                    // 将要添加的分类名称,
                    cat_name: '',
                    // 父级分类id
                    cat_pid: 0,
                    // 分类等级默认要添加的是1级分类
                    cat_level: 0,
                },
                addCateFormRules: {
                    cat_name: [
                        {
                            required: true,
                            message: '请输入分类名称',
                            trigger: 'blur',
                        }
                    ]
                },
                // 父级分类的列表
                parentCateList: [],
                // 指定级联选择器配置对象
                cascaderProps: {
                    expandTrigger: 'hover',
                    checkStrictly: 'true',
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children',
                },
                // 选中的父级分类的Id数组
                selectedKeys: [],
                // 控制编辑分类对话框的显示与隐藏
                setEditCateDialogVisible: false,
                // 需要编辑的分类信息
                editForm: [],
                //
                editFormRules: {},
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            // 获取商品的分类数据
            async getCateList() {
                const {data: res} = await this.$http.get('categories', { params: this.queryInfo });
                if (res.meta.status !== 200) {
                    return this.$message.error('获取商品分类失败')
                }
                // 把数据列表赋值给分类列表
                this.cateList = res.data.result;
                this.total = res.data.total;
            },
            // 监听pagesize变化
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getCateList()
            },
            // 监听 pagenum变化
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getCateList()

            },
            // 点击按钮，展示添加分类的对话框
            showAddCateDialog() {
                // 先获取父级分类的数据
                this.getParentCateList();
                this.addCateDialogVisible = true;
            },
            // 获取父级分类的数据列表
            getParentCateList() {
                // const {data: res} = this.$http.get('categories', { params: { type: 2 } });
                this.$http.get('categories', { params: { type: 2 } }).then(res=>{
                    if (res.data.meta.status !== 200) {
                    return this.$message.error('获取父级分类失败')
                    }
                    this.parentCateList = res.data.data.result;
                })

            },
            // 选择项发生变化时触发这个函数
            parentCateChanged() {
                // 如果 selectedKeys 数组中的 length 大于0，证明选中的是父级分类
                // 反之，就说明没有选中任何父级分类
                if (this.selectedKeys.length > 0) {
                    // 父级分类Id
                    this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
                    // 为当前分类的等级赋值
                    this.addCateForm.cat_level = this.selectedKeys.length;
                }else{
                    // 父级分类Id
                    this.addCateForm.cat_pid = 0;
                    // 为当前分类的等级赋值
                    this.addCateForm.cat_level = 0;
                }
            },
            // 点击按钮，添加新的分类
            addCate() {
                this.$refs.addCateFormRef.validate(async valid => {
                   if (!valid) return;
                    const {data: res} = await this.$http.post('categories', this.addCateForm)

                    if(res.meta.status !== 201){
                        this.addCateDialogVisible = false;
                        return this.$message.error('添加分类失败！')

                    }

                    this.$message.success('添加分类成功！');
                    this.getCateList();
                    this.addCateDialogVisible = false
                });

            },
            // 监听添加分类对话框的关闭事件,重置表单数据
            addCateDialogClosed() {
                this.$refs.addCateFormRef.resetFields();
                this.selectedKeys = [];
                this.addCateForm.cat_level = 0;
                this.addCateForm.cat_pid = 0;
            },
            // 监听编辑分类对话框的关闭事件
            setEditCateDialogClosed() {

            },
            // 保存编辑分类
            saveCate() {

            },
            // 显示编辑分类对话框
            showEditCateDialog(cate) {
                this.editForm = cate;
                // 先获取父级分类的数据
                this.getParentCateList();
                console.log(this.editForm.cat_pid);
                this.selectedKeys.push(this.editForm.cat_pid);
                console.log(cate);
                this.setEditCateDialogVisible = true;
            }
        }
    }
</script>

<style scoped>
    .treeTable{
        margin-top: 15px;
    }

    .el-cascader {
        width: 100%;
    }
</style>