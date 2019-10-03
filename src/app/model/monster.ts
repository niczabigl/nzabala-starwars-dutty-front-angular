export class Monster {

    private name : string
	private classification : string
	private designation : string
	private average_height : string
	private skin_colors : string
	private hair_colors : string
	private eye_colors : string
	private average_lifespan : string
	private homeworld : string
	private language : string
	private people : string[]
	private films : string[]
	private created : string
	private edited : string
	private url : string
		
	constructor(name : string, classification : string, designation : string, average_height : string, skin_colors : string, hair_colors : string, eye_colors : string, average_lifespan : string, homeworld : string, language : string,
		people : string[], films : string[], created : string, edited : string, url : string){
        this.name = name
        this.classification = classification
        this.designation = designation
        this.average_height = average_height
        this.skin_colors = skin_colors
        this.hair_colors = hair_colors
        this.eye_colors = eye_colors
        this.average_lifespan = average_lifespan
        this.homeworld = homeworld
        this.language = language
        this.people = people
        this.films = films
        this.created = created
        this.edited = edited
        this.url = url
	}

			
}