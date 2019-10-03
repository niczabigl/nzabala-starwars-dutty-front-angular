export class Starship {

  private name : string
	private model : string
	private manufacturer : string
	private cost_in_credits : string
	private length : string
	private max_atmosphering_speed : string
	private crew : string
	private passengers : string
	private cargo_capacity : string
	private consumables : string
	private hyperdrive_rating : string
	private MGLT : string
	private starship_class : string
	private pilots : string[]
	private films : string[]
	private created : string
	private edited : string
	private url : string
	
	constructor (
		name : string, 
		model : string, 
		manufacturer : string, 
		cost_in_credits : string, 
		length : string, 
		max_atmosphering_speed : string, 
		crew : string, 
		passengers : string, 
		cargo_capacity : string, 
		consumables : string, 
		hyperdrive_rating : string,
		MGLT : string,
		starship_class : string,
		pilots : string[], 
		films : string[],
		created : string,
		edited : string,
		url : string) {
		this.name = name
		this.model = model
		this.manufacturer = manufacturer
		this.cost_in_credits = cost_in_credits
		this.length = length
		this.max_atmosphering_speed = max_atmosphering_speed
		this.crew = crew
		this.passengers = passengers
		this.cargo_capacity = cargo_capacity
		this.consumables = consumables
		this.hyperdrive_rating = hyperdrive_rating
		this.MGLT = MGLT
		this.starship_class = starship_class
		this.pilots = pilots
		this.films = films
		this.created = created
		this.edited = edited
		this.url = url
		}
}
