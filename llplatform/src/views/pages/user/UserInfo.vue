<template>
  <div style="width: 100%;">
    <el-card style="margin-top: 20px;" v-show="false">
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
        <el-table-column label="学校">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.school }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.schoolNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.profession }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="民族">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ethnicGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
      </el-table>
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
import { requestUserInfosLogout, requestChoiceAdd, requestChoiceCancel } from '@/api/user'

export default {
  mounted () {
    this.onSubmit('formInline')
  },
  name: 'PageTable',
  data () {
    return {
      formInline: {
        currentPage: 1,
        pageSize: 10

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
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          requestUserInfosLogout(this.formInline).then(res => {
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
</style>
