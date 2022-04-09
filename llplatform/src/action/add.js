import { requestChoiceAdd } from '@/api/user'

export default {
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
  }
}
