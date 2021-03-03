<template>
  <div>
    <form @submit.prevent="formValidator('frmEditInfo')" data-vv-scope="frmEditInfo">
      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">NIK</label>
            <input type="text" class="text-xs" name="NIK" 
                    v-model="editInfoData.idNumber">
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.NIK') }}</small> -->
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tempat</label>
            <input type="text" class="text-xs" name="Tempat" 
                    v-model="editInfoData.birthplace">
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Tempat') }}</small> -->
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tanggal Lahir</label>
            <input type="date" class="text-xs" name="Tanggal Lahir" 
                    v-model="editInfoData.dob">
            <!-- <small class="text-dangerMsg mt-2 block">{{ dateInputError }}</small> -->
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Jenis Kelamin</label>
            <select class="text-xs" name="Jenis Kelamin" 
                    v-model="editInfoData.gender">
              <option>LAKI-LAKI</option>
              <option>PEREMPUAN</option>
            </select>
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Jenis Kelamin') }}</small> -->
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Alamat</label>
            <input type="text" class="text-xs" name="Alamat" 
                    v-model="editInfoData.address">
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Alamat') }}</small> -->
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">RT/RW</label>
            <input type="text" class="text-xs" name="RT/RW" 
                    placeholder="e.g 00/00"
                    v-model="editInfoData.rtrw"
                    v-on:keypress="filterRTRW($event)"
                    :class="{ 'border-dangerMsg': rtrwIsError != '' }">
            <!-- <small class="text-dangerMsg mt-2 block">{{ rtrwIsError }}</small> -->
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kelurahan</label>
            <input type="text" class="text-xs" name="Kelurahan" 
                    v-model="editInfoData.village">
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kelurahan') }}</small> -->
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kecamatan</label>
            <input type="text" class="text-xs" name="Kecamatan" 
                    v-model="editInfoData.district">
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kecamatan') }}</small> -->
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Provinsi</label>
            <input type="text" class="text-xs" name="Provinsi" 
                    v-model="editInfoData.province">
            <!-- <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Provinsi') }}</small> -->
          </div>
        </div>
        
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Status Pernikahan</label>
            <input type="text" class="text-xs" name="Status Pernikahan" 
                    v-model="editInfoData.maritalStatus"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Status Pernikahan') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Status Pernikahan') }}</small>
          </div>
        </div>
        <div class="flex-1 mx-2"></div>
        <div class="flex-1 ml-2"></div>
      </div>

      <div class="text-right mt-5">
        <button @click.prevent="closeModal(false, 'editInfo')" class="btn px-4 py-2 mx-1 bg-closeBtn text-white rounded-md text-sm">Close</button>
        <button class="btn px-4 py-2 mx-1 bg-primaryBtn text-white rounded-md text-sm">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    closeModal: Function,
    requestSuccess: Function,
    toggleLoader: Function,
    user: Object
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem("auth_token")
        }
      },
      editInfoData: {},
      dateInputError: '',
      rtrwIsError: '',
  	}
  },
  created() {
    let vm = this

    vm.editInfoData = {
      name: vm.user.ocrData.name,
      province: vm.user.ocrData.province,
      idNumber: vm.user.ocrData.idNumber,
      birthPlaceBirthday: vm.user.ocrData.birthPlaceBirthday,
      birthplace: vm.user.ocrData.birthplace,
      dob: vm.user.ocrData.dob,
      bloodType: vm.user.ocrData.bloodType,
      address: vm.user.ocrData.address,
      rtrw: vm.user.ocrData.rtrw,
      village: vm.user.ocrData.village,
      district: vm.user.ocrData.district,
      religion: vm.user.ocrData.religion,
      maritalStatus: vm.user.ocrData.maritalStatus,
      occupation: vm.user.ocrData.occupation,
      expiryDate: vm.user.ocrData.expiryDate,
      gender: vm.user.ocrData.gender,
    }
  },
  methods: {
    /**
		 * Form Validator
		 *
		 * This will validate multiple forms
		 * 
		 * @param  String scope
		 */
		formValidator() {
      // (scope)
			let vm = this
      // if(!vm.editInfoData.dob || vm.editInfoData.dob == ''){
      //   vm.dateInputError = 'The Tanggal Lahir field is required';
      // }
      // if(!vm.editInfoData.rtrw){
      //   vm.rtrwIsError = 'The RT/RW field is required';
      // }else{
      //   let regex = /[0-9]?[0-9][0-9][/][0-9]?[0-9][0-9]/;
      //   if(regex.test(vm.editInfoData.rtrw) == false){
      //     vm.rtrwIsError = 'Format should be e.g 00/00';
      //   }
      // }
			// vm.$validator.validateAll(scope).then(result => {
			// 	if (result) {
      //     console.log(result);
            vm.updateOCRDetails();
				// }
			// })
    },
    updateOCRDetails(){
      let vm = this
      console.log(vm.editInfoData);
      
      let params = {
        birthday: vm.editInfoData.dob,
        address: vm.editInfoData.address,
        occupation: vm.editInfoData.occupation,
        gender: vm.editInfoData.gender,
        expiry_date: vm.editInfoData.expiryDate,
        issue_location: 'NI5:3509119303870003',
        religion: vm.editInfoData.religion,
        nik: vm.editInfoData.idNumber,
        marital_status: vm.editInfoData.maritalStatus,
        nationality: vm.editInfoData.nationality,
        birthplace: vm.editInfoData.birthplace,
        issue_date: "08082012",
        street: vm.editInfoData.district,
        blood_type: vm.editInfoData.bloodType,
        name: vm.editInfoData.name,
        village: vm.editInfoData.village,
        rt_rw: vm.editInfoData.rtrw,
        provinsi: vm.editInfoData.province,
      }

      vm.toggleLoader(true);
      axios.post(`https://minion.empatkali.co.id/advance/postktp.php?id=${vm.user._id}&t=sb`, params, vm.requestedHeaders)
      .then(function (response) {
        console.log(response);
        if (response.status) {
          vm.requestSuccess('editInfo');
          vm.$swal('Success!', 'updated.', 'success');
        }
        vm.toggleLoader(false);
      })
      .catch(function (error) {
        vm.$swal('Error!', error.message, 'error');
        vm.toggleLoader(false);
      })
    },
    filterRTRW(e){
      let char = String.fromCharCode(e.keyCode); // Get the character
      if(/^[0-9/]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    },

  }
}
</script>

<style lang="scss" scoped>
  
</style>
