class aCappellaGroup {

  constructor({id, name, membership, college}) {
      this.id = id
      this.name = name
      this.membership = membership
      this.college = college
  }

  render() {
    return `<tr><td>${this.college.name}</td> <td>${this.name}</td> <td>${this.membership}</td> <td>${this.college.division}</td> <td><img src='./assets/trophy.png' data-id="${this.id}"/></td> </tr>`
  }

}
