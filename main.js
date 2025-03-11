class Jogador {
	constructor(nick, classe) {
		this.nick = nick;
		this.classe = classe;
	}
}
class Personagem extends Jogador {
	constructor(nick, classe, level, hp, ataque, defesa) {
		super(nick, classe);
		this.level = level;
		this.hp = hp;
		this.ataque = ataque;
		this.defesa = defesa;
	}
	atacar() {
		console.log(`${this.nick} atacou com ${this.ataque} de dano`);
	}
}
class Guerreiro extends Personagem {
	constructor(nick, level, hp, ataque) {
		super(nick, "Guerreiro", level, hp, ataque, "escudo");
	}
}
class Mago extends Personagem {
	constructor(nick, level, hp, ataque, mana) {
		super(nick, "Mago", level, hp, ataque, "escudo mágico");
		this.mana = mana;
	}
	lançarMagia() {
		if (this.mana > 0) {
			console.log(`${this.nick} lançou uma magia poderosa com ${this.ataque} de dano!`);
			this.mana -= 10;
		} else {
			console.log(`${this.nick} está sem mana!`);
		}
	}
}

const jogador1 = new Guerreiro("Thor", 5, 50, 15);
const jogador2 = new Mago("Merlin", 7, 30, 20, 50);
const jogador3 = new Mago("Gandalf", 10, 40, 25, 80);

console.log(jogador1);
console.log(jogador2);
console.log(jogador3);
jogador1.atacar();
jogador2.lançarMagia();
jogador3.lançarMagia();
