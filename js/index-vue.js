const app = new Vue({
	el:'#app',
	data: {
		showAddForm: true,
		showEditForm: false,
		editPhone: '',
		editFio: '',
		editId: '',
		phoneBookVue: {

		},
		id: 0,
		fio: null,
		phone: null
	},
	mounted() {
		if(localStorage.getItem('phoneBookVue')) {
			try {
				this.phoneBookVue = JSON.parse(localStorage.getItem('phoneBookVue'));
			} catch(e) {
				localStorage.removeItem('phoneBookVue');
			}
		}
	},
	methods: {
		addPhoneBookVue() {
			if(!this.fio || !this.phone) return;
			this.id = (Object.keys(this.phoneBookVue).length) + 1;
			this.phoneBookVue[this.id] = ({
				fio: this.fio,
				phone: this.phone
			});
			this.fio = '';
			this.phone = '';
			this.savePhoneBookVue();
		},
		removePhoneBookVue(x) {
			delete this.phoneBookVue[x];
			this.savePhoneBookVue();
		},
		editForm (y) {
			this.editPhone = this.phoneBookVue[y].phone;
			this.editFio = this.phoneBookVue[y].fio;
			this.editId = y;
			this.showAddForm = false;
			this.showEditForm = true;
		},
		editPhoneBookVue() {
			if (this.editPhone && this.editFio) {
				this.phoneBookVue[this.editId] = {
					fio: this.editFio,
					phone: this.editPhone
				};
			}
			this.editPhone = '';
			this.editFio = '';
			this.showAddForm = true;
			this.showEditForm = false;
			this.savePhoneBookVue();
		},
		savePhoneBookVue() {
			this.resetKeyData();
			let parsed = JSON.stringify(this.phoneBookVue);
			localStorage.setItem('phoneBookVue', parsed);
		},
		resetKeyData () {
			let newData = {};
			let i = 1;
			for (let key in this.phoneBookVue) {
				let obj = this.phoneBookVue[key];
				newData[i] = {
					fio: obj.fio,
					phone: obj.phone
				};
				i++;
			}
			this.phoneBookVue = newData;
		}
	}
});