document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');

  const table = document.getElementById('table-body')
  const winner = document.getElementById('winner')
  const winnerDiv = document.getElementById('winner-container')
  const header = document.getElementById('table-head')
  const fetchedData = []

  // render all data from API
  Adapter.getGroups()
    .then(groups => {
      fetchedData.splice(0, fetchedData.length)
      table.innerHTML = ""
      groups.forEach((group) => {
        fetchedData.push(group)
        const newGroup = new aCappellaGroup(group)
        table.innerHTML += newGroup.render()
      })
    })

  // all table events
  table.addEventListener('click', (e) => {
    // change winners when click event on trophy img
    if(e.target.nodeName === "IMG") {
      console.log('clicked img');
      e.target.parentElement.parentElement.remove()
      const winner_id = e.target.dataset.id
      Adapter.getGroup(winner_id)
        .then(group => {
          if(winner.innerText === "Winner:") {
            console.log('there was no winner');
          } else {
            const formerWinnerId = winner.dataset.id
            Adapter.getGroup(formerWinnerId)
              .then(winnerObj => {
                const formerWinner = new aCappellaGroup(winnerObj)
                table.innerHTML += formerWinner.render()
                console.log('there was a winner!');
              })
          }
          return group
        })
        .then(group => {
          winner.dataset.id = group.id
          winner.innerHTML = `Winner: ${group.college.name}'s ${group.name}`
          winnerDiv.style.display = "block"
          return group.id
        })
    } else {
      console.log('clicked elsewhere on table');
    }
  })

  // sort table by column
  header.addEventListener('click', (e) => {
    console.log('header');

    if(e.target.innerText === "College") {
      console.log('college');
      renderSorted(sortCollegeNames())
    } else if(e.target.innerText === "Group Name") {
      console.log('group name');
      renderSorted(sortGroupNames())
    } else if(e.target.innerText === "Membership") {
      console.log('membership');
      renderSorted(sortMemberships())
    } else if(e.target.innerText === "Division") {
      console.log('division');
      renderSorted(sortDivisions())
    } else if(e.target.innerText === "Crown as Winner") {
      console.log('crown');
    } else {
      console.log('else');
    }

  })

  // helper functions for sorting
  function sortCollegeNames(){
    return fetchedData.sort((x,y)=>x.college.name.localeCompare(y.college.name))
  }

  function sortGroupNames(){
    return fetchedData.sort((x,y)=>x.name.localeCompare(y.name))
  }

  function sortMemberships(){
    return fetchedData.sort((x,y)=>x.membership.localeCompare(y.membership))
  }

  function sortDivisions(){
    return fetchedData.sort((x,y)=>x.college.division.localeCompare(y.college.division))
  }

  // render sorted data by column
  function renderSorted(sortedData){
    table.innerHTML = ""
    sortedData.forEach((group) => {
      const newGroup = new aCappellaGroup(group)
      table.innerHTML += newGroup.render()
    })
    console.log('sorted the table');
  }

})
