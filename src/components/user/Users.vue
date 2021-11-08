<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.mg_state">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>

                        <!-- 删除按钮 -->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </el-tooltip>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                        </el-tooltip>
                        {{ scope.row }}
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </el-card>

        <!-- 分配权限的对话框 -->
        <el-dialog
            title="分配角色"
            :visible.sync="setRoleDialogVisible"
            width="50%"
            @close="setRoleDialogClosed"
        >
            <div>
                <p>当前的用户: {{ userInfo.username }}</p>
                <p>当前的角色: {{ userInfo.role_name }}</p>
                <p>分配新角色:
                    <el-select v-model="selectedRoleId" placeholder="请选择">
                        <el-option
                            v-for="item in rolesList"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Users",
        data() {
            return {
                // 获取用户列表的参数对象
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 2,
                },
                userlist: [],
                total: 0,
                // 控制分配角色对话框的显示与隐藏
                setRoleDialogVisible: false,
                // 需要被分配权限的角色信息
                userInfo: {},
                // 所有角色的数据列表
                rolesList: [],
                // 已选中的角色id值
                selectedRoleId: '',
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                const { data: res } = await this.$http.get('users', { params: this.queryInfo });
                if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！');
                this.userlist = res.data.users;
                this.total = res.data.total;
            },
            // 监听 pagesize 改变的事件
            handleSizeChange(newsize) {
                console.log(newsize);
                this.queryInfo.pagesize = newsize;
                this.getUserList()
            },
            // 监听页码值改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getUserList()
            },
            // 展示分配角色的对话框
            async setRole(userInfo) {
                this.userInfo = userInfo;
                // 在展示对话框之前获取所有角色的列表
                const { data: res } = await this.$http.get('roles/');
                if(res.meta.status !== 200){
                    return this.$message.error('获取角色列表失败！')
                }
                this.rolesList = res.data;
                this.setRoleDialogVisible = true;
            },
            saveRoleInfo(){
                if(!this.selectedRoleId){
                    return this.$message.error('请选择要分配的角色')
                }
                this.setRoleDialogVisible = false
            },
            // 监听设置角色对话框的关闭事件
            setRoleDialogClosed() {
                this.selectedRoleId = '';
                this.userInfo = [];
            }
        }
    }
</script>

<style scoped>

</style>