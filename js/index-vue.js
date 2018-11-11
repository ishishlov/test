const app = new Vue({
	el:'#app',
	data: {
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