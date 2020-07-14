<template>
    <div>
        <h3>Enter the below Parking space specificaton</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px">
        <el-form-item label="Total Number of slots" prop="totalSlots">
            <el-input v-model.number="ruleForm.totalSlots"></el-input>
        </el-form-item>
        <el-form-item label="Total Number of cars" prop="totalCars">
            <el-input v-model.number="ruleForm.totalCars"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data:function(){
        var validateSlots = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input number of slots'));
        }
        else if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
            callback();
          }
        }
        
      var validateCars = (rule, value, callback) => {
        if (!value && value!==0) {
          return callback(new Error('Please input the number of Cars'));
        }
       
        else if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value > this.ruleForm.totalSlots) {
            callback(new Error('Number of cars is more than the number of slots'));
          } else {
            callback();
          }
        }
      }
        return{
        ruleForm: {
          totalSlots: '',
          totalCars: ''
        },
        errorMessage:"",
        color:['black','white','blue','red'],
        rules: {
          totalSlots: [
            { validator: validateSlots, trigger: 'blur' }
          ],
          totalCars: [
            { validator: validateCars, trigger: 'blur' }
          ]
        }
    }},
    methods:{
        updateParkingLot(){
                let carData=[]
                for (let i=0;i<this.ruleForm.totalCars;i++){
                    let carObj={
                        regNo:this.getRegistrationNumber(),
                        color:this.color[this.randomGenerator(0,3)],
                        slot:i+1
                    }
                    carData.push(carObj)
                    
                
            }
            console.log(this.ruleForm)
            this.$store.dispatch('updateTotalSlots',this.ruleForm.totalSlots)
                this.$store.dispatch('updateTotalCars',this.ruleForm.totalCars)
                this.$store.dispatch('updateCarData',carData)
        },
        randomGenerator(min,max){
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        getRegistrationNumber(){
            let regNumber="KA-"
            for(let i=0;i<=9;i++){
                if (i==2 || i==5){
                    regNumber+='-'
                }else if(i==3 || i==4){
                    regNumber+=String.fromCharCode(this.randomGenerator(65,90))
                }else{
                    regNumber+=this.randomGenerator(0,9)
                }
            }
            return regNumber
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.updateParkingLot()
              this.$store.dispatch('updateInitialInp',false)
            //alert('submit!');

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
<style>

</style>