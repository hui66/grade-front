<template>
  <div style="width: 100%;">
    <el-card style="margin-top: 20px;">
      <el-select v-model="value" placeholder="请选择百分比" align="left">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" align="center">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
        <el-table-column label="编号"
                         type="index"
                         width="50">
        </el-table-column>
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程代码">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.courseCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.courseTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工程知识指标">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.theoryAbility }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设计/开发解决方案指标">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.codeAbility }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研究指标">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.practiceAbility }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个人和团队指标">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createAbility }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目管理指标">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.artAbility }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.status==null || scope.row.status==1"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" >选课
            </el-button>
            <el-button
              v-show="scope.row.status==0"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">退选
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
      <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="课程名称" label-width="120px">
            <el-input v-model="form.courseName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程代码" label-width="120px">
            <el-input v-model="form.courseCode" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyUser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { requestRecommendQuery, requestChoiceAdd, requestChoiceCancel } from '@/api/user'

export default {
  mounted () {
    this.onSubmit('formInline')
  },
  name: 'PageRecommend',
  data () {
    return {
      formInline: {
        currentPage: 1,
        pageSize: 10,
        rate: ''
      },
      tableData: [],
      rules: {
        param1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        param2: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      dialogFormVisible: false,
      form: {
        courseName: '',
        courseCode: '',
        index: 0,
        id: 0
      },
      options: [{
        value: '0.5',
        label: '50%'
      }, {
        value: '0.8',
        label: '80%'
      }, {
        value: '1',
        label: '100%'
      }],
      value: ''
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formInline.rate = this.value
          requestRecommendQuery(this.formInline).then(res => {
            this.$message({
              message: '查询成功！',
              type: 'success'
            })
            this.pageTotal = res.data.total
            this.tableData = res.data.records
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit (index, row) {
      this.form.index = index + (this.currentPage - 1) * this.pageSize
      this.form.courseName = row.courseName
      this.form.courseCode = row.courseCode
      this.form.id = row.id
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      this.form.index = index + (this.currentPage - 1) * this.pageSize
      this.form.courseName = row.courseName
      this.form.courseCode = row.courseCode
      this.form.id = row.id
      requestChoiceCancel(this.form).then(res => {
        this.$message({
          message: '退选成功！',
          type: 'success'
        })
      })
      this.onSubmit('formInline')
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    modifyUser () {
      this.tableData[this.form.index].name = this.form.name
      this.tableData[this.form.index].date = this.form.date
      this.tableData[this.form.index].address = this.form.address
      this.dialogFormVisible = false
      requestChoiceAdd(this.form).then(res => {
        this.$message({
          message: '选课成功！',
          type: 'success'
        })
      })
      this.onSubmit('formInline')
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
