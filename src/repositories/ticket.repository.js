export class TicketRepository {
  constructor(ticketDAO) {
    this.dao = ticketDAO;
  }
  create(data) {
    return this.dao.create(data);
  }
}