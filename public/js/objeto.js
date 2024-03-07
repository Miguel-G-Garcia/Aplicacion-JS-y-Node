"use strict"
class Client {
	constructor(client_id, client_name, address, phone_number, gmail) {
		this.client_id = client_id;
		this.client_name = client_name;
		this.address = address;
		this.phone_number = phone_number;
		this.gmail = gmail;
	}
}

class Reservation {

	constructor(reservation_id, client_id, check_in_date, check_out_date, room_number) {
		this.reservation_id = reservation_id;
		this.client_id = client_id;
		this.check_in_date = check_in_date;
		this.check_out_date = check_out_date;
		this.room_number = room_number;
	}

}


class Estancias {


	async addClient(oClient) {
		let respuesta = await peticionPOSTJSON("/clients", oClient);

		return respuesta;
	}

	async listClientsData() {
		let listado = "";

		let respuesta = await peticionGET("/clients", new FormData());

		if (respuesta.error) {
			listado = respuesta.mensaje;
		} else {
			listado = "<table class='table table-striped'>";
			listado += "<thead><tr><th>ID CLIENTE</th><th>NOMBRE</th><th>DIRECCION</th><th>NUMERO TELEFONO</th><th>CORREO ELECTRONICO</th><th>OPCIONES</th></tr></thead>";
			listado += "<tbody>";

			if (respuesta.datos !== null) {

				for (let client of respuesta.datos) {
					listado += "<tr><td>" + client.client_id + "</td>";
					listado += "<td>" + client.client_name + "</td>";
					listado += "<td>" + client.address + "</td>";
					listado += "<td>" + client.phone_number + "</td>";
					listado += "<td>" + client.gmail + "</td>";
					listado += "<td><button class='btn btn-primary btnEditClient' data-client='" + JSON.stringify(client) + "'><i class='bi bi-pencil-fill'></i></button>";
					listado += "<button class='btn btn-danger btnDeleteClient' data-idclient='" + client.client_id + "'><i class='bi bi-trash'></i></button></td></tr>";

				}
			}
			listado += "</tbody></table>";
		}

		return listado;
	}

	async removeClient(client_id) {

		let response = await peticionDELETE("/clients/"+client_id);

		return response;
	}

	async editClient(oClient){
		let data = new FormData();
		data.append("client",JSON.stringify(oClient));
		let response = await peticionPUT("/clients/"+oClient.client_id, oClient);

		return response;
	}

	async findClient(client_id){
		let data = new FormData();
		data.append("client_id", client_id);

		let response = await peticionGET("/clients/"+client_id, new FormData());

		return response;
	}

	async makeReservation(oReservation) {
		let datos = new FormData();
		datos.append("client_id", oReservation.client_id);
		datos.append("checkIn", oReservation.check_in_date);
		datos.append("checkOut", oReservation.check_out_date);
		datos.append("roomNmb", oReservation.room_number);

		let respuesta = await peticionPOST("add_reservation.php", datos);

		return respuesta;
	}

    async getReservations(){
        let datos = new FormData();

        let respuesta = await peticionGET("/reservations", datos);

		return respuesta;

    }

	async listReservationsData() {
		let listado = "";

		let respuesta = await peticionGET("list_reservations.php", new FormData());

		if (respuesta.error) {
			listado = respuesta.mensaje;
		} else {
			listado = "<table class='table table-striped'>";
			listado += "<thead><tr><th>ID RESERVA</th><th>ID CLIENTE</th><th>CHECK IN</th><th>CHECK OUT</th><th>ROOM NUMBER</th><th>OPCIONES</th></tr></thead>";
			listado += "<tbody>";

			if (respuesta.datos !== null) {

				for (let reserv of respuesta.datos) {

					listado += "<tr><td>" + reserv.reservation_id + "</td>";
					listado += "<td>" + reserv.client_id + "</td>";
					listado += "<td>" + reserv.check_in_date + "</td>";
					listado += "<td>" + reserv.check_out_date + "</td>";
					listado += "<td>" + reserv.room_number + "</td>";
					listado += "<td><button class='btn btn-primary btnEditReserv' data-reservation='" + JSON.stringify(reserv) + "'><i class='bi bi-pencil-fill'></i></button>";
					listado += "<button class='btn btn-danger btnDeleteReserv' data-idreserv='" + reserv.reservation_id + "'><i class='bi bi-trash'></i></button></td></tr>";

				}
			}
			listado += "</tbody></table>";
		}

		return listado;
	}

	async removeReserv(reservation_id) {
		let datos = new FormData();
		datos.append("reservation_id", reservation_id);

		let response = await peticionPOST("remove_reserve.php", datos);

		return response;
	}

	async editReservation(oReservation){
		let data = new FormData();
		data.append("reservation",JSON.stringify(oReservation));

		let response = await peticionPOST("edit_reservation.php", data);

		return response;
	}

	async findReservation(reservation_id){
		let data = new FormData();
		data.append("reservation_id", reservation_id);

		let response = await peticionGET("find_reservation_id.php", data);

		return response;
	}

}
