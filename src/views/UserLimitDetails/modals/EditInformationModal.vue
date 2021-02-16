<template>
  <div>
    <form @submit.prevent="formValidator('frmEditInfo')" data-vv-scope="frmEditInfo">
      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Nama</label>
            <input type="text" class="text-xs" name="Nama" v-model="editInfoData.name">
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">NIK</label>
            <input type="text" class="text-xs" name="NIK" v-model="editInfoData.idNumber">
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tempat</label>
            <input type="text" class="text-xs" name="Tempat" v-model="editInfoData.birthPlace">
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tgl Lahir</label>
            <input type="date" class="text-xs" name="tgl Lahir" v-model="editInfoData.dob">
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Jenis Kelamin</label>
            <select class="text-xs" name="Jenis Kelamin" v-model="editInfoData.gender">
              <option>LAKI-LAKI</option>
              <option>PEREMPUAN</option>
            </select>
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Jenis Kelamin') }}</small>
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Pekerjaan</label>
            <input type="text" class="text-xs" name="Pekerjaan" v-model="editInfoData.occupation">
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Golongan Darah</label>
            <input type="text" class="text-xs" name="Golongan Darah" v-model="editInfoData.bloodType">
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
            <label for="" class="text-xs block mb-1">Kota</label>
            <input type="text" class="text-xs" name="Kota" 
                    v-model="editInfoData.city"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Kota') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kota') }}</small>
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Propinsi</label>
            <input type="text" class="text-xs" name="Propinsi" 
                    v-model="editInfoData.province"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Propinsi') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Propinsi') }}</small>
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kelurahan</label>
            <input type="text" class="text-xs" name="Kelurahan" 
                    v-model="editInfoData.village"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Kelurahan') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kelurahan') }}</small>
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kecamatan</label>
            <input type="text" class="text-xs" name="Kecamatan" 
                    v-model="editInfoData.district"
                    :class="{ 'border-dangerMsg': errors.first('frmEditInfo.Kecamatan') }"
                    v-validate="'required'">
            <small class="text-dangerMsg mt-2 block">{{ errors.first('frmEditInfo.Kecamatan') }}</small>
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Agama</label>
            <input type="text" class="text-xs" name="Agama" v-model="editInfoData.religion">
          </div>
        </div>
        <div class="flex-1 ml-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Status Pernikahan</label>
            <input type="text" class="text-xs" name="Status Pernikahan" v-model="editInfoData.maritalStatus">
          </div>
        </div>
      </div>

      <div class="flex mb-2">
        <div class="flex-1 mr-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Kewarganegaraan</label>
            <input type="text" class="text-xs" name="Kewarganegaraan" v-model="editInfoData.nationality">
          </div>
        </div>
        <div class="flex-1 mx-2">
          <div class="input-div">
            <label for="" class="text-xs block mb-1">Tanggal Kadaluarsa</label>
            <input type="date" class="text-xs" name="Tanggal Kadaluarsa" v-model="editInfoData.expiryDate">
          </div>
        </div>
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
      editInfoData: {}
  	}
  },
  created() {
    let vm = this
    console.log(vm.user.sideDetails);
    vm.setEditInfo();
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
          vm.updatePersonalInfo();
				}
			})
    },
    setEditInfo(){
      let vm = this
      vm.editInfoData = {
        address: vm.user.sideDetails.address,
        birthPlaceBirthday: vm.user.sideDetails.birthPlaceBirthday,
        bloodType: vm.user.sideDetails.bloodType,
        city: vm.user.sideDetails.city,
        district: vm.user.sideDetails.district,
        expiryDate: vm.user.sideDetails.expiryDate,
        gender: vm.user.sideDetails.gender,
        idNumber: vm.user.sideDetails.idNumber,
        maritalStatus: vm.user.sideDetails.maritalStatus,
        name: vm.user.sideDetails.name,
        nationality: vm.user.sideDetails.nationality,
        occupation: vm.user.sideDetails.occupation,
        province: vm.user.sideDetails.province,
        religion: vm.user.sideDetails.religion,
        rtrw: vm.user.sideDetails.rtrw,
        village: vm.user.sideDetails.village,
        birthPlace: vm.user.sideDetails.birthPlaceBirthday.split(',')[0],
        dob: vm.$moment(vm.user.sideDetails.birthPlaceBirthday.split(',')[1].replace(' ', ''), 'MM-DD-YYYY').format('YYYY-MM-DD'),
      };
      console.log(vm.editInfoData);
    },
    async updatePersonalInfo()  {
      let vm = this
      console.log(vm.editInfoData);

      let params  = {
        id: vm.user.user._id,
        occupation: vm.editInfoData.occupation,
        address: vm.editInfoData.address,
        gender: vm.editInfoData.gender,
        city: vm.editInfoData.city,
        ktp: vm.editInfoData.idNumber,
        bloodType: vm.editInfoData.bloodType,
        birthPlaceBirthday: vm.editInfoData.birthPlace + ', ' + this.$moment(vm.editInfoData.dob).format('DD-MM-YYYY'),
        religion: vm.editInfoData.religion,
        expiryDate: this.$moment(vm.editInfoData.expiryDate).format('DD-MM-YYYY'),
        rtrw: vm.editInfoData.rtrw,
        province: vm.editInfoData.province,
        nationality: vm.editInfoData.nationality,
        district: vm.editInfoData.district,
        name: vm.editInfoData.name,
        village: vm.editInfoData.village,
        maritalStatus: vm.editInfoData.maritalStatus
      }
      vm.toggleLoader(true);
      await axios.put(`api/users/updateocr`, params, vm.requestedHeaders)
      .then(async function (response) {
        console.log(response);
        if (response.data.status) {
          vm.requestSuccess();
          vm.$swal('Success!', response.data.message, 'success');
        }else{
          vm.$swal('Error!', response.data.message, 'error');
        }
        vm.toggleLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        vm.$swal('Error!', error.response.data.message, 'error');
        vm.toggleLoader(false);
      })
    },

  }
}
</script>

<style lang="scss" scoped>
  .input-div input, .input-div select{
    @apply px-2 rounded-md text-xxs;
  }
</style>
