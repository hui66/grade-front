import { requestChoiceCancel } from '@/api/user'

export default {
  onCancel (form) {
    requestChoiceCancel(this.form).then(res => {
      this.$message({
        message: '退选成功！',
        type: 'success'
      })
    })
  }
}
