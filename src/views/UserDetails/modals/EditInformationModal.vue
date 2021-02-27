<template>
  <div>
    <form @submit.prevent="formValidator('frmEditInfo')" data-vv-scope="frmEditInfo">
      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">NIK</label>
            <input type="text" class="text-xs" name="NIK" 
                    v-model="editInfoData.idNumber"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.NIK') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.NIK') }}</small>
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tempat</label>
            <input type="text" class="text-xs" name="Tempat" 
                    v-model="editInfoData.birthPlace"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Tempat') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Tempat') }}</small>
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tanggal Lahir</label>
            <input type="date" class="text-xs" name="Tanggal Lahir" 
                    v-model="editInfoData.dob"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Tanggal Lahir') }"
                    v-validate="'required|date_format:mm/dd/yyyy'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Tanggal Lahir') }}</small>
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Jenis Kelamin</label>
            <select class="text-xs" name="Jenis Kelamin" 
                    v-model="editInfoData.gender"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Jenis Kelamin') }"
                    v-validate="'required'">
              <option>LAKI-LAKI</option>
              <option>PEREMPUAN</option>
            </select>
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Jenis Kelamin') }}</small>
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Alamat</label>
            <input type="text" class="text-xs" name="Alamat" 
                    v-model="editInfoData.address"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Alamat') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Alamat') }}</small>
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">RT/RW</label>
            <input type="text" class="text-xs" name="RT/RW" 
                    v-model="editInfoData.rtrw"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.RT/RW') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.RT/RW') }}</small>
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kelurahan</label>
            <input type="text" class="text-xs" name="Kelurahan" 
                    v-model="editInfoData.village"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Kelurahan') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kelurahan') }}</small>
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kecamatan</label>
            <input type="text" class="text-xs" name="Kecamatan" 
                    v-model="editInfoData.district"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Kecamatan') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kecamatan') }}</small>
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Provinsi</label>
            <input type="text" class="text-xs" name="Provinsi" 
                    v-model="editInfoData.province"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Provinsi') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Provinsi') }}</small>
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
// import axios from 'axios'

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
  	}
  },
  created() {
    let vm = this

    vm.editInfoData = {
      name: vm.user.ocrData.name,
      province: vm.user.ocrData.province,
      idNumber: vm.user.ocrData.idNumber,
      birthPlaceBirthday: vm.user.ocrData.birthPlaceBirthday,
      birthPlace: vm.user.ocrData.birthplace,
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
    console.log(vm.editInfoData);
  },
  methods: {
    /**
		 * Form Validator
		 *
		 * This will validate multiple forms
		 * 
		 * @param  String scope
		 */
		formValidator(scope) {
			let vm = this

			vm.$validator.validateAll(scope).then(result => {
				if (result) {
          console.log(result);
          vm.$swal('Success', 'No API yet.', 'success');
				}
			})
    },
    updateOCRDetails(){
      // let vm = this
      // console.log(vm.editInfoData);
      
      // let params  = {
      //   id: vm.user.user._id,
      //   occupation: vm.editInfoData.occupation,
      //   address: vm.editInfoData.address,
      //   gender: vm.editInfoData.gender,
      //   city: vm.editInfoData.city,
      //   ktp: vm.editInfoData.idNumber,
      //   bloodType: vm.editInfoData.bloodType,
      //   birthPlaceBirthday: vm.editInfoData.birthPlace + ', ' + this.$moment(vm.editInfoData.dob).format('DD-MM-YYYY'),
      //   religion: vm.editInfoData.religion,
      //   expiryDate: this.$moment(vm.editInfoData.expiryDate).format('DD-MM-YYYY'),
      //   rtrw: vm.editInfoData.rtrw,
      //   province: vm.editInfoData.province,
      //   nationality: vm.editInfoData.nationality,
      //   district: vm.editInfoData.district,
      //   name: vm.editInfoData.name,
      //   village: vm.editInfoData.village,
      //   maritalStatus: vm.editInfoData.maritalStatus
      // }
      // vm.toggleLoader(true);
      // await axios.put(`api/users/updateocr`, params, vm.requestedHeaders)
      // .then(async function (response) {
      //   console.log(response);
      //   if (response.data.status) {
      //     vm.requestSuccess('editInfo');
      //     vm.$swal('Success!', response.data.message, 'success');
      //   }else{
      //     vm.$swal('Error!', response.data.message, 'error');
      //   }
      //   vm.toggleLoader(false);
      // })
      // .catch(function (error) {
      //   console.log(error);
      //   console.log(error.response);
      //   vm.$swal('Error!', error.response.data.message, 'error');
      //   vm.toggleLoader(false);
      // })
    }

  }
}
</script>

<style lang="scss" scoped>
  
</style>
