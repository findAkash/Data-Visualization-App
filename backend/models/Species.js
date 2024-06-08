class Species {
  constructor(name, continent, weight, height, horns, picture) {
    this.name = name;
    this.continent = continent;
    this.weight = weight;
    this.height = height;
    this.horns = horns;
    this.picture = picture;
  }

  static fromJson(data) {
    return new Species(
      data.name,
      data.continent,
      data.weight,
      data.height,
      data.horns,
      data.picture
    );
  }
}

module.exports = Species;
