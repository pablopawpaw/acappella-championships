const baseUrl = `http://localhost:3000/a_cappella_groups`

class Adapter {

  static getGroups() {
    return fetch(baseUrl)
      .then(res => res.json())
  }

  static getGroup(id) {
    return fetch(`${baseUrl}/${id}`)
      .then(res => res.json())
  }

}
