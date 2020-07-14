<template>
    <div>
        <el-button type="success" round @click='$store.dispatch("updateInitialInp",true)'>Go Back</el-button>
        <hr>
        <el-button type="primary" round :disabled="this.totalSlots-this.carData.length===0" v-if="isCheckIn" @click="isCheckIn=false">Check In Car</el-button>
        
        <div v-else>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
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
        </div>
        <p>Remaining Number of slots: {{this.totalSlots-this.carData.length}}</p>
        <hr>
        <el-button @click="resetColorFilter" plain type="primary">Reset Color filter</el-button>
        <el-button @click="clearFilter" plain type="warning">Reset All filters</el-button>
        
        <el-table
    ref="filterTable"
    :data="carData.filter(data => !search || data.regNo.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      prop="regNo"
      label="Registration Number"
      sortable
      width="180"
      
    >
    </el-table-column>
    <el-table-column
      prop="color"
      label="Color"
      width="180"
      sortable
      column-key="color"
      :filters="[{text: 'Black', value: 'black'}, {text: 'White', value: 'white'}, {text: 'Blue', value: 'blue'}, {text: 'Red', value: 'red'}]"
      :filter-method="filterHandler">
      
    </el-table-column>
    <el-table-column
      prop="slot"
      label="Slot No"
      sortable>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header">
        <input
          v-model="search"
          type="text"
          placeholder="Search for Reg Number"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleDelete(scope.$index, scope.row)">Check Out</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
export default {
    data:function(){
        var validateColor = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please select a color'));
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
          }else {
              const dupRegNum=this.carData.find(obj=>obj.regNo.toUpperCase()===value.toUpperCase())
              console.log(dupRegNum)
              if(dupRegNum){
                  callback(new Error('Registration Number already checked in'));
              }
            else{
                callback();
            }            
          }
        }
      }
        return{
            msg:"",
        search: '',
        isCheckIn:true,
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
    methods:{
        addCar(){
            let elemFound=false
            let carObj={regNo:this.ruleForm.regNumber,color:this.ruleForm.color,slot:null}
            console.log(this.carData)
            for (let i=1;i<=this.carData.length;i++){
                console.log(i,this.carData[i-1])
                if (i!==this.carData[i-1].slot){
                    elemFound=true
                    carObj.slot=i
                    this.$store.dispatch('addCar',{index:i-1,car:carObj})
                    break;
                }
            }
            if (!elemFound){
                carObj.slot=this.carData.length+1
                this.$store.dispatch('addCar',{index:this.carData.length,car:carObj})
            }
        },
      handleDelete(index, row) {
        console.log(index, row);
        this.$store.dispatch('deleteCar',row.slot)

      },
      resetColorFilter() {
        this.$refs.filterTable.clearFilter('color');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
        this.search=null
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addCar()
            this.resetForm(formName)

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.isCheckIn=true
      }
    },
    computed:{
        carData(){
            return this.$store.getters.carData
        },
        totalSlots(){
            return this.$store.getters.totalSlots
        }
    }
}
</script>
<style>

</style>