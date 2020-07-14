<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Registration Number" prop="regNumber">
    <el-input v-model="ruleForm.regNumber"></el-input>
  </el-form-item>
  <el-form-item label="Color" prop="color">
    <el-select v-model="ruleForm.color" placeholder="Car Color">
      <el-option v-for="color in colorArr" :key="color" :label="color" :value="color.toLowerCase()"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Enter Parking Zone</el-button>
    <el-button @click="resetForm('ruleForm')">Cancel</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
    data() {
      var validateColor = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input number of slots'));
        }
       else {
            callback();
          }
        }
        
      var validateRegNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the Registration Number'));
        } else {
          const regex = RegExp('^[a-zA-Z]{2}[-][0-9]{2}[-][a-zA-Z]{2}[-][0-9]{4}$');
          if (!regex.test(value)) {
            callback(new Error('Please enter Registration number in (KA-01-TY-1234) format'));
          } else {
            callback();
          }
        }
      }
      return {
        ruleForm: {
          regNumber: '',
          color: ''
        },
        colorArr:['black','white','blue','red'],
        rules: {
          regNumber: [
            { validator: validateRegNumber, trigger: 'blur' }
          ],
          color: [
            { validator: validateColor, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
