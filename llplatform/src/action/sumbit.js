import { requestUserQuery } from '@/api/user'

export default {
  onSubmit (formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        requestUserQuery(this.formInline).then(res => {
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
  }
}
