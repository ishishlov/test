(function () {

	var data = getFromStorage() || {};
	var id = 1;

	resetKeyData();
	renderRows();

	$('.phonebook-table').on('click', '.cell-add', function (event) {
		var editId = $(event.target).attr('data-edit');
		var newData = {
			id: id,
			fio: $('.cell-fio-edit').val(),
			phone: $('.cell-phone-edit').val()
		};

		if (editId && editId != 0) {
			newData.id = editId;
			editData(newData);
		} else if (newData.phone && newData.fio) {
			addData(newData);
		}
	});

	$('.phonebook-table').on('click', '.cell-delete', function (event) {
		var rowId = $(event.target).attr('data-id');
		$('.phonebook-row-' + rowId).remove();
		delete data[rowId];
		resetKeyData();
		setStorage(data);
		renderRows();
	});

	$('.phonebook-table').on('click', '.cell-edit', function (event) {
		var rowId = $(event.target).attr('data-id');
		$('.phonebook-rows').hide();
		$('.cell-add')
			.val('Сохранить')
			.attr('data-edit', rowId);
		$('.cell-phone-edit').val(data[rowId].phone);
		$('.cell-fio-edit').val(data[rowId].fio);
	});

	function addData (newData) {
		data[id] = newData;
		setStorage(data);
		showNewRow (newData);
		$('.cell-phone-edit').val('');
		$('.cell-fio-edit').val('');
	}
	
	function editData (newData) {
		if (newData.fio && newData.phone) {
			data[newData.id] = newData;
			setStorage(data);
			$('.cell-phone-' + newData.id).text(newData.phone);
			$('.cell-fio-' + newData.id).text(newData.fio);
		}
		$('.phonebook-rows').show();
		$('.cell-add')
			.val('Добавить')
			.attr('data-edit', 0);
		$('.cell-phone-edit').val('');
		$('.cell-fio-edit').val('');
	}

	function renderRows () {
		$('.phonebook-rows').empty();
		$.each(data, function(idx, node){
			showNewRow(node);
		});
	}

	function showNewRow (newData) {
		var htmlRow = (
			'<div class="phonebook-row phonebook-row-' + newData.id + '"  data-id="' + newData.id + '">' +
				'<div class="phonebook-cell cell-phone cell-phone-' + newData.id + '">' + newData.phone + '</div>' +
				'<div class="phonebook-cell cell-fio cell-fio-' + newData.id + '">' + newData.fio + '</div>' +
				'<div class="phonebook-cell buttons-block">' +
					'<input class="phonebook-cell cell-edit" type="button" data-id="' + newData.id + '" value="Редактировать">' +
					'<input class="phonebook-cell cell-delete" type="button" data-id="' + newData.id + '" value="Удалить">' +
				'</div>' +
			'</div>'
		);
		$('.phonebook-rows').append(htmlRow);
		id++;
	}

	function resetKeyData () {
		var newData = {};
		var i = 1;
		$.each(data, function(idx, node){
			newData[i] = {
				id: i,
				fio: node.fio,
				phone: node.phone
			};
			i++;
		});
		data = newData;
	}

	function getFromStorage () {
		var phonebook = localStorage.getItem('phonebook');
		return JSON.parse(phonebook);
	}

	function setStorage (data) {
		return localStorage.setItem('phonebook', JSON.stringify(data));
	}

})();