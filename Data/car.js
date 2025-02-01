class car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model} ${this.speed} ${this.isTrunkOpen}`);
    }

    go() {
        if (this.speed < 200 && this.isTrunkOpen === false) {
            this.speed += 5; 
        }
    }
    brake() {
        if (this.speed > 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if(this.speed === 0)
        this.isTrunkOpen = true;
    }
    closeTrunk() {
        this.isTrunkOpen = false; 
    }
}
const toyota = new car({
    brand: 'Toyota',
    model: 'Carolla'
});
const tesla = new car({
    brand: 'Tesla',
    model: 'Model3'
});



tesla.go();
tesla.go();
tesla.go();
tesla.go();

toyota.go();
toyota.go();
toyota.brake(); 

tesla.displayInfo();
toyota.displayInfo();

console.log(toyota);
console.log(tesla);



class RaceCar extends car {
	acceleration;
	constructor(carDetails) {
		super(carDetails);
		this.acceleration = carDetails.acceleration;
	}
	go() {
		if (
			this.speed >= 0 &&
			this.speed < 295 &&
			this.isTrunkOpen === false
		) {
			this.speed += this.acceleration;
		}
	}
	openTrunk() {
		console.log('Race cars do not have a trunk.');
	}

	closeTrunk() {
		console.log('Race cars do not have a trunk.');
	}
}

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
})

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();

raceCar.openTrunk();

raceCar.displayInfo();